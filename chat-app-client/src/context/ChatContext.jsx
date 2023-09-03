import { createContext, useEffect, useState } from "react";
import { baseUrl, getReq, postReq } from "../utility/untility";
import { io } from "socket.io-client"
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
    const [socket, setSocket] = useState(null);
    const [onlineUser, setOnlineUser] = useState([]);
    const [text, setText] = useState("");
    const [newMessage, setNewMessage] = useState(null);
    useEffect(() => {
        const newSocket = io("http://localhost:3000");
        setSocket(newSocket);
        return () => {
            newSocket.disconnect()
        }
    }, [user])
    useEffect(() => {
        if (socket == null) return;
        socket.emit("addNewUser", user?._id);
        socket.on("getOnlineUser", (users) => {
            setOnlineUser([...users])
        })
        return () => {
            socket.off("getOnlineUser")
        }
    }, [socket, user])
    useEffect(() => {
        if (socket == null || newMessage == null) return;
        const recipientId = chat?.members?.find((item) => item !== user?._id)
        socket.emit("sendMessage", { ...newMessage, recipientId });
        setNewMessage(null);
        return () => {
            socket.off("sendMessage")
        }
    }, [newMessage, socket, chat, user])
    useEffect(() => {
        if (socket == null) return;
        socket.on("getMessage",async (message) => {
            if (chat?._id == message.chatId) {
                setMessages([...messages, message])
            }
            const audio = new Audio("/audio.mp3");
            audio.volume=0.2
            await audio.play()
        })
    }, [socket, chat, messages, user])

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
    const handleSubmit = async () => {
        if (text == "") return;
        const message = { chatId: chat?._id, text: text, senderId: user?._id }
        const res = await postReq(`${baseUrl}/message`, message);
        if (!res.error) {
            setMessages([...messages, res])
            setNewMessage(res)
        }
        setText("");
    }
    const updateText = (data) => {
        setText(data)
    }
    return <ChatContext.Provider value={{ messages, messagesError, messagesLoading, userChats, userChatsLoading, userChatError, notChated, createChat, updateChat, chat, onlineUser, text, updateText, handleSubmit }}>
        {children}
    </ChatContext.Provider>
}