import { useContext, useEffect, useRef, useState } from "react"
import { AuthContext } from "../../context/AuthContext"
import { ChatContext } from "../../context/ChatContext"
import { useRecipient } from "../../hook/useRecipient"
import { Stack, Form, Button } from "react-bootstrap"
import { baseUrl, postReq } from "../../utility/untility"

export const ChatBox = () => {
    const { user } = useContext(AuthContext)
    const { messages, messagesLoading,chat,updateMessage } = useContext(ChatContext);
    const [recipient] = useRecipient(chat, user);
    const chatBoxRef=useRef(null)
    const [text,setText]=useState("");
    const handleSubmit=async (e)=>{
            e.preventDefault()
        const res=await postReq(`${baseUrl}/message`,{chatId:chat?._id,text:text,senderId:user?._id});
        if(!res.error){
            updateMessage([...messages,res])
        }
        setText("");
    }
    useEffect(()=>{
       if(chatBoxRef.current){
        chatBoxRef.current.scrollTop = chatBoxRef.current.scrollHeight;
       }
    },[messages])
    if (!chat) {
        return <h3>No caht yet</h3>
    }
    if (messagesLoading) {
        return <h3>Messages Loading</h3>
    }
    return <Stack className="message-box text-bg-dark p-1" gap={3}>
        <div className="message-name">
        Messaging {recipient?.name}
        </div>
        <div className="message-div" ref={chatBoxRef}>
        {messages&&messages.map((message,i)=>{
            const date=new Date(message.createdAt);
            return <div key={i} className={`single-message ${(message.senderId==user?._id?"right-float":"left-float")}`}>
                {message.text}
                <span>{date.getUTCHours()+":"+date.getUTCMinutes()}</span>
            </div>
        })}
        </div>
        <div className="message-send">
            <Form className="d-flex" onSubmit={handleSubmit}>
                <Form.Control type="text" value={text}  onChange={(e)=>setText(e.target.value)} ></Form.Control>
                <Button type="submit">Send</Button>
            </Form>
        </div>
    </Stack>
}
