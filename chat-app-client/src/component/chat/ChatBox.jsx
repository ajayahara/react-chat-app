import { useContext, useEffect, useRef } from "react"
import { AuthContext } from "../../context/AuthContext"
import { ChatContext } from "../../context/ChatContext"
import { useRecipient } from "../../hook/useRecipient"
import { Stack, Form, Button } from "react-bootstrap"
export const ChatBox = () => {
    const { user } = useContext(AuthContext)
    const {text,updateText,messages, messagesLoading,chat,handleSubmit } = useContext(ChatContext);
    const [recipient] = useRecipient(chat, user);
    const chatBoxRef=useRef(null)
    useEffect(()=>{
       if(chatBoxRef.current){
        chatBoxRef.current.scrollTop = chatBoxRef.current.scrollHeight;
       }
    },[messages])
    if (!chat) {
        return <Stack className="no-message">Please create a chat</Stack>
    }
    if (messagesLoading) {
        return <Stack className="no-message">Messages Loading for this chat</Stack>
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
                <span>{`${date.getHours().toLocaleString()}:${date.getMinutes().toLocaleString()}`}</span>
            </div>
        })}
        </div>
        <div className="message-send">
            <Form className="d-flex" onSubmit={(e)=>{
                e.preventDefault()
                handleSubmit()
                }}>
                <Form.Control type="text" value={text}  onChange={(e)=>updateText(e.target.value)} ></Form.Control>
                <Button type="submit">Send</Button>
            </Form>
        </div>
    </Stack>
}
