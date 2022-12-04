import React from 'react'
import "../../../assets/css/chats.scss"

export default function Message(props:any) {
  return (
    <>
        <div className="message m-2">
            <div className={`chatMsg d-flex ${props.owner}`}>
                <div className="chatHead d-flex flex-column">
                    <img src="https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=600" alt="" />
                    <small>Just Now</small>
                </div>
                <div className='chatContent px-2 mt-2'>
                    <p className='p-2 bg-primary rounded-end rounded-bottom text-white m-0 d-inline-block'>Hi there..</p>
                    <img src="https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=600" alt=""  className='rounded-end rounded-bottom mt-2'/>
                </div>
            </div>
        </div>
    </>
  )
}
