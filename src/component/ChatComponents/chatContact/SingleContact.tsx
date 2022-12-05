import React,{useContext} from 'react'
import { GlobalContextProvider } from '../../../contextAPI/GlobalContext'

export default function SingleContact({imgUrl, name, text, userInfo}: any) {
    const {dispatch}:any = useContext(GlobalContextProvider)

    const userChatSelectHandler = (userInfo:any) => {
        dispatch({type:"CHANGE_USER", payload:userInfo});
    }
    return (
        <>
            <div className="singleContant px-2 pb-2 d-flex align-items-center" onClick={() => userChatSelectHandler(userInfo)} role="button">
                <img src={imgUrl} alt="" style={{ width: "40px", height: "40px", objectFit: "cover" }} className="rounded-circle d-inline-block" />
                <div className="cotactContent ms-2">
                    <small><b>{name}</b></small>
                    <p className='m-0 text-primary' style={{fontSize: "12px"}}>{text}</p>
                </div>
            </div>
        </>
    )
}
