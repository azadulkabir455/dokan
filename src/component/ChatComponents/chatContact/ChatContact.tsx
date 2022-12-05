import React, { useState, useContext, useEffect } from 'react'
import { database } from '../../../firebase-config';
import { collection, doc, getDoc, getDocs, onSnapshot, query, serverTimestamp, setDoc, updateDoc, where } from 'firebase/firestore';
import { useSelector } from 'react-redux';
import { GlobalContextProvider } from '../../../contextAPI/GlobalContext';
import SingleContact from './SingleContact'
import "../../../assets/css/chatContact.scss"
export default function ChatContact() {
    const [username, setUsername] = useState<string>("");
    const [user, setUser] = useState<any>(null);
    const [err, setErr] = useState<boolean>(false);
    const [chats, setChats] = useState<any>([]);

    // Extract Current UserData
    const { currentUser }: any = useContext(GlobalContextProvider)
    const { users } = useSelector((state: any) => state.users);
    const presentUser = users && users.find((user: any) => user.id === currentUser.uid);

    // Fucntion for UserSearch
    const userSearch = async () => {
        const userRef = collection(database, "userProfiles");
        const userQuery = query(userRef, where("name", "==", username));

        try {
            const querySnapshot = await getDocs(userQuery);
            querySnapshot.forEach((doc) => {
                setUser(doc.data())
            });
        } catch (err) {
            setErr(true);
        }
    };
    const keyHandler = (e: any) => {
        e.key === "Enter" && userSearch();
    };

    // Fuction For Select User
    const selectUserHandler = async () => {
        const combinedId = presentUser.id > user.id ? presentUser.id + user.id : user.id + presentUser.id
        try {
            const res = await getDoc(doc(database, "chats", combinedId));
            if (!res.exists()) {
                await setDoc(doc(database, "chats", combinedId), { messages: [] });

                // create user chats
                await updateDoc(doc(database, "userChats", presentUser.id), {
                    [combinedId + ".userInfo"]: {
                        uid: user.id,
                        userName: user.name,
                        photoUrl: user.userImgUrl
                    },
                    [combinedId + ".date"]: serverTimestamp()
                });
                await updateDoc(doc(database, "userChats", user.id), {
                    [combinedId + ".userInfo"]: {
                        uid: presentUser.id,
                        userName: presentUser.name,
                        photoUrl: presentUser.userImgUrl
                    },
                    [combinedId + ".date"]: serverTimestamp()
                })
            }
        } catch (err) { }
        setUser(null);
        setUsername("");
    }

    // Fucntion for Fetch User
    useEffect(() => {
        const getData = () => {
            const unSub = onSnapshot(doc(database, "userChats", currentUser.uid), (doc) => {
                setChats(doc.data())
            })
            return () => {
                unSub();
            }
        }
        currentUser.uid && getData()
    }, [currentUser.uid]);
    return (
        <>
            <div className="contactList">
                <div className="searchContact mb-2">
                    <form onSubmit={(e) => e.preventDefault()} className="d-flex">
                        <input
                            type="text"
                            className="form-control rounded-0 border-0 border-bottom flex-grow-1"
                            placeholder="Find user by full name..."
                            onChange={(e) => setUsername(e.target.value)}
                            value={username}
                            onKeyUp={keyHandler}
                        />
                    </form>
                    {
                        err && <><p className='text-danger'>User Not Found</p></>
                    }
                    {
                        user &&
                        <>
                            <div className="searchContact p-2 d-flex align-items-center border-bottom" role="button" onClick={selectUserHandler}>
                                <img src={user.userImgUrl} alt="" style={{ width: "40px", height: "40px", objectFit: "cover" }} className="rounded-circle d-inline-block" />
                                <p className='ps-2 m-0'>{user.name}</p>
                            </div>
                        </>
                    }
                </div>
                <div className="cotacts">
                    {
                    Object.entries(chats)?.sort((a:any,b:any)=>b[1].date - a[1].date).map((chat:any) => (
                        <div key={chat[0]}>
                            <SingleContact imgUrl={chat[1].userInfo.photoUrl} name={chat[1].userInfo.userName} text={chat[1].lastMessage?.text} userInfo={chat[1].userInfo}/>
                        </div>
                    ))
                    }
                </div>
            </div>
        </>
    )
}
