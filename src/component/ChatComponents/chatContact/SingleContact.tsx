import React from 'react'

export default function SingleContact() {
    return (
        <>
            <div className="singleContant px-2 pb-2 d-flex align-items-center">
                <img src="https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=600" alt="" style={{ width: "40px", height: "40px", objectFit: "cover" }} className="rounded-circle d-inline-block" />
                <div className="cotactContent ms-2">
                    <small>Jarin</small>
                    <p className='m-0'>Hello There</p>
                </div>
            </div>
        </>
    )
}
