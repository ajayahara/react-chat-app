import { useContext } from "react"
import { ChatContext } from "../context/ChatContext"
import { Container, Stack } from "react-bootstrap";
import { AuthContext } from "../context/AuthContext";
import { UserChat } from "../component/chat/UserChat";
import { NotChated } from "../component/chat/NotChated";
import { ChatBox } from "../component/chat/ChatBox";

export const Chat = () => {
  const { userChats, userChatsLoading, updateChat } = useContext(ChatContext);
  const { user } = useContext(AuthContext);
  return (
    <Container>
      <NotChated />
      {userChats?.length < 1 ? null :
        <Stack direction="horizontal" gap={2} className="chat-container">
          <Stack className="flex-grow-0 p-2">
            {userChatsLoading ? <p>Chat Loading...</p> : null}
            {userChats?.map((chat, i) => {
              return <div key={i} onClick={() => updateChat(chat)}>
                <UserChat user={user} chat={chat}></UserChat>
              </div>
            })}
          </Stack>
          <ChatBox />
        </Stack>
      }
    </Container>
  )
}
