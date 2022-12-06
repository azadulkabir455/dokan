import React, { useContext, useEffect, useRef } from 'react'
import { useSelector } from 'react-redux'
import { GlobalContextProvider } from '../../../contextAPI/GlobalContext'
import "../../../assets/css/chats.scss"

export default function Message({ messages }: any) {
    const { currentUser, data }: any = useContext(GlobalContextProvider)
    const { users } = useSelector((state: any) => state.users);
    const presentUser = users && users.find((user: any) => user.id === currentUser.uid);

    // Fuction for Recent message show
    const ref: any = useRef();
    useEffect(() => {
        ref.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages]);

    // Extract Time from Timestamp
    const getDate = (date: any) => {
        const year = date.getFullYear();
        const month = date.getMonth();
        const day = date.getDate();
        const houre = date.getHours();
        const min = date.getMinutes();
        const seconds = date.getSeconds();
        const combineDate = houre + ":" + min + ":" + seconds;
        return combineDate;
    }
    return (
        <>
            <div className="message m-2" ref={ref}>
                <div className={`chatMsg d-flex flex-row-reverse ms-auto ${messages.senderId === currentUser.uid && "owner"}`}>
                    <div className="chatHead d-flex flex-column">
                        <img src={messages.senderId === currentUser.uid ? presentUser.userImgUrl : data.user.photoUrl} alt="" />
                        <small>{getDate(new Date(messages.date * 1000))}</small>
                    </div>
                    <div className='chatContent px-2 mt-2'>
                        <p className={`p-2 bg-primary rounded-start rounded-bottom text-white m-0 d-inline-block ${messages.text?"d-block":"d-none"}`}>{messages.text}</p>
                        {
                            messages.img && <img src={messages.img} alt="" className='rounded-start rounded-bottom mt-2' />
                        }

                    </div>
                </div>
            </div>
        </>
    )
}
