import React from 'react'
import SingleContact from './SingleContact'
import "../../../assets/css/chatContact.scss"
export default function ChatContact() {
    return (
        <>
            <div className="contactList">
                <div className="searchContact">
                    <form onSubmit={(e) => e.preventDefault()} className="d-flex">
                        <input type="email" className="form-control rounded-0 border-0 border-bottom flex-grow-1" id="email" name="email" placeholder="Search contact..." />
                    </form>
                    <div className="searchContact p-2 d-flex align-items-center border-bottom">
                        <img src="https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=600" alt="" style={{ width: "40px", height: "40px", objectFit: "cover" }} className="rounded-circle d-inline-block" />
                        <p className='ps-2 m-0'>Jarin</p>
                    </div>
                </div>
                <div className="cotacts">
                    <SingleContact />
                    <SingleContact />
                    <SingleContact />
                    <SingleContact />
                </div>
            </div>
        </>
    )
}
