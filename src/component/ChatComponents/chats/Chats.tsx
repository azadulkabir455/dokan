import React, { useContext, useState, useEffect } from 'react'
import { database, storage } from '../../../firebase-config';
import { arrayUnion, doc, onSnapshot, serverTimestamp, Timestamp, updateDoc } from 'firebase/firestore';
import { GlobalContextProvider } from '../../../contextAPI/GlobalContext';
import { BsFillCameraVideoFill, BsFillPersonPlusFill, BsThreeDots, BsPaperclip } from "react-icons/bs";
import Message from './Message';
import "../../../assets/css/chats.scss"
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';
import { v4 } from 'uuid';


export default function Chats() {
    const [text, setText] = useState<string>("");
    const [img, setImg] = useState<null | any>(null)
    const [imgUploadProgress, setImgUploadProgress] = useState<number | null | any>(null)
    const [messages, setMessages] = useState<any>([])
    const { data, currentUser }: any = useContext(GlobalContextProvider);



    useEffect(() => {
        const unSub = data.chatId && onSnapshot(doc(database, "chats", data.chatId), (doc) => {
            doc.exists() && setMessages(doc.data().messages);
        });

        return () => {
            unSub();
        };
    }, [data.chatId]);

    // Function for send messages

    const sendTextHandler = async () => {
        if (img) {
            // Message sent with img
            const storageRef = ref(storage, `/messagesImg/${img.name + v4()}`);
            const uploadTask = uploadBytesResumable(storageRef, img);
            uploadTask.on("state_changed", (snapshot) => {
                const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                setImgUploadProgress(progress);

                switch (snapshot.state) {
                    case "paused":
                        console.log("Image Uploading is running");
                        break;
                    case "running":
                        console.log("Imgae uploading is running");
                        break;
                    default:
                        console.log("Image Upload is done");
                }
            }, (error) => {
                console.log(error.message)
            },
                () => {
                    getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
                        await updateDoc(doc(database, "chats", data.chatId), {
                            messages: arrayUnion({
                                id: v4(),
                                text,
                                senderId: currentUser.uid,
                                date: Timestamp.now(),
                                img: downloadURL,
                            }),
                        });
                    });
                }
            );
        } else {
            // message sent without img
            await updateDoc(doc(database, "chats", data.chatId), {
                messages: arrayUnion({
                    id: v4(),
                    text,
                    senderId: currentUser.uid,
                    date: Timestamp.now(),
                }),
            });
        }

        await updateDoc(doc(database, "userChats", currentUser.uid), {
            [data.chatId + ".lastMessage"]: {
                text,
            },
            [data.chatId + ".date"]: serverTimestamp(),
        });

        // Update for Last message
        await updateDoc(doc(database, "userChats", data.user.uid), {
            [data.chatId + ".lastMessage"]: {
                text,
            },
            [data.chatId + ".date"]: serverTimestamp(),
        });

        setText("");
        setImg(null);
    }
    return (
        <>
            <div className="chatContainer">
                <div className="chatNav bg-primary d-flex p-2 justify-content-between align-items-center">
                    <div className="contactName d-flex align-items-center">
                        <img src={data.user?.photoUrl} alt="" style={{ width: "30px", height: "30px", objectFit: "cover" }} className="rounded-circle d-inline-block" />
                        <p className='m-0 text-white ps-1'>{data.user?.userName}</p>
                    </div>
                    <div className="chatIcons">
                        <button className="btn btn-sm  rounded-circle">
                            <BsFillCameraVideoFill />
                        </button>
                        {/* <button className="btn btn-sm btn-warning rounded-circle ms-1">
                            <BsFillPersonPlusFill />
                        </button> */}
                        <button className="btn btn-sm rounded-circle ">
                            <BsThreeDots />
                        </button>
                    </div>
                </div>
                <div className="chats">
                    <div className="messages">
                        {
                            messages.map((msg: any) =>
                                <Message messages={msg} />
                            )
                        }
                    </div>
                </div>
                <div className="chatInput">
                    <form onSubmit={(e) => e.preventDefault()} className="d-flex">
                        <input type="text" className="form-control rounded-0 border-0 flex-grow-1" placeholder="Type here..." value={text} onChange={(e) => setText(e.target.value)} />
                        <label htmlFor="img" className='mx-1 cursor-pointer' role="button"><BsPaperclip /></label>
                        <input type="file" id="img" className='d-none' onChange={(e: any) => setImg(e.target.files[0])} />
                        <input type="submit" value="Send" className='btn btn-sm btn-primary rounded-0' onClick={sendTextHandler}
                            disabled={(imgUploadProgress != null && imgUploadProgress > 100) ? true : false} />
                    </form>
                </div>
            </div>
        </>
    )
}
