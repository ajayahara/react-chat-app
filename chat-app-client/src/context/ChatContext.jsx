import { createContext, useEffect, useState } from "react";
import { baseUrl, getReq, postReq } from "../utility/untility";
export const ChatContext = createContext();
export const ChatContextProvider = ({ children, user }) => {
    const [userChats, setUserChats] = useState(null);
    const [userChatsLoading, setUserChatLoading] = useState(false);
    const [userChatError, setUserChatError] = useState(null);
    const [notChated, setNotChated] = useState([]);
    const [chat, setChat] = useState(null);
    const [messages, setMessages] = useState(null);
    const [messagesLoading, setMessagesLoading] = useState(false);
    const [messagesError, setMessagesError] = useState(null);


    useEffect(() => {
        const getUser = async () => {
            const response = await getReq(`${baseUrl}/user`);
            if (response.error) {
                console.log(response.error);
                return;
            }
            const xchat = response.filter((item) => {
                let isChatCreated = false
                if (user?._id === item._id) return false;
                if (userChats) {
                    isChatCreated = userChats?.some((chats) => {
                        return chats.members[0] === item._id || chats.members[1] === item._id
                    })
                }
                return !isChatCreated
            });
            setNotChated(xchat);
        }
        getUser()
    }, [userChats, user]);
    useEffect(() => {
        const getUserChats = async () => {
            setUserChatLoading(true);
            setUserChatError(null);
            const response = await getReq(`${baseUrl}/chat/${user?._id}`);
            if (response.error) {
                setUserChatError(response.error);
            } else {
                setUserChats(response);
            }
            setUserChatLoading(false);
        }
        if (user?._id) {
            getUserChats();
        }
    }, [user?._id])
    useEffect(() => {
        const getChatMessages = async () => {
            setMessagesLoading(true);
            setMessagesError(null);
            const response = await getReq(`${baseUrl}/message/${chat?._id}`);
            if (response.error) {
                setMessagesError(response.messages);
            } else {
                setMessages(response);
            }
            setMessagesLoading(false);
        }
        getChatMessages();
    }, [chat])
    const createChat = async (secondId) => {
        const response = await postReq(`${baseUrl}/chat`, { firstId: user._id, secondId });
        if (response.error) {
            console.log(response.error);
        }
        setUserChats([...userChats, response]);
    }
    const updateChat = (data) => {
        setChat(data);
    }
    const updateMessage=(data)=>{
        setMessages(data)
    }
    return <ChatContext.Provider value={{ messages, messagesError, messagesLoading, userChats, userChatsLoading, userChatError, notChated, createChat, updateChat, chat,updateMessage }}>
        {children}
    </ChatContext.Provider>
}