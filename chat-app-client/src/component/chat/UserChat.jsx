import { Stack } from "react-bootstrap";
import { useRecipient } from "../../hook/useRecipient"
import { ChatContext } from "../../context/ChatContext";
import { useContext, useEffect, useState } from "react";
export const UserChat = ({ user, chat }) => {
    const [recipient] = useRecipient(chat, user);
    const {onlineUser,unSeenMessage}=useContext(ChatContext);
    const [count,setCount]=useState(0);
    useEffect(()=>{
        setCount(unSeenMessage?.filter((message)=>message.chatId==chat?._id).length)
    },[unSeenMessage,chat])
    return (
        <Stack direction="horizontal" gap={3} className="chat-box justify-content-between align-items-center p-2">
            <div className="d-flex">
                <div className="me-2">
                    <img src="profile.svg" height="50px"/>
                </div>
                <div className="text-content">
                    <div className="name">
                        {recipient?.name}
                    </div>
                    <div className="text">
                        new message
                    </div>
                </div>
            </div>
            <div className="d-flex flex-column align-items-end">
            <span className={`online-status ${(onlineUser.some(user=>user.userId==recipient?._id))?"green-light":"red-light"}`}></span>
                <div className="date">
                    12/12/20
                </div>
                {
                    (!count?null:<div className="notification">
                        {count}
                    </div>)
                }
            </div>
        </Stack>
    )
}
