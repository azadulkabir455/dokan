import React from 'react'
import { BsFillCameraVideoFill, BsFillPersonPlusFill, BsThreeDots,BsPaperclip } from "react-icons/bs";
import Message from './Message';
import "../../../assets/css/chats.scss"


export default function Chats() {
    return (
        <>
            <div className="chatContainer">
                <div className="chatNav bg-primary d-flex p-2 justify-content-between align-items-center">
                    <div className="contactName">
                        <p className='m-0 text-white'>Azad</p>
                    </div>
                    <div className="chatIcons">
                        <button className="btn btn-sm btn-warning rounded-circle">
                            <BsFillCameraVideoFill />
                        </button>
                        <button className="btn btn-sm btn-warning rounded-circle ms-1">
                            <BsFillPersonPlusFill />
                        </button>
                        <button className="btn btn-sm btn-warning rounded-circle ms-1">
                            <BsThreeDots />
                        </button>
                    </div>
                </div>
                <div className="chats">
                    <div className="messages">
                        <Message owner={"owner"} />
                        <Message />
                        <Message owner={"owner"} />
                        <Message />
                    </div>
                </div>
                <div className="chatInput">
                    <form onSubmit={(e) => e.preventDefault()} className="d-flex">
                        <input type="email" className="form-control rounded-0 border-0 flex-grow-1" id="email" name="email" placeholder="Type here..." />
                        <label htmlFor="img" className='mx-1 cursor-pointer' role="button"><BsPaperclip /></label>
                        <input type="file" id="img" className='d-none'/>
                        <input type="submit" value="Send" className='btn btn-sm btn-primary rounded-0' />
                    </form>
                </div>
            </div>
        </>
    )
}
