import { useContext } from "react"
import { ChatContext } from "../context/ChatContext"
import { Container, Stack } from "react-bootstrap";
import { AuthContext } from "../context/AuthContext";
import { UserChat } from "../component/chat/UserChat";
import { NotChated } from "../component/chat/NotChated";

export const Chat = () => {
  const {userChats,userChatsLoading}=useContext(ChatContext);
  const {user}=useContext(AuthContext);
  return (
      <Container>
        <NotChated/>
        {userChats?.length<1?null:
        <Stack direction="horizontal" gap={4} className="align=items-start">
          <Stack className="flex-grow-0">
            {userChatsLoading?<p>Chat Loading...</p>:null}
            {userChats?.map((chat,i)=>{
              return <div key={i}>
                <UserChat user={user} chat={chat}></UserChat>
              </div>
            })}
          </Stack>
          <p>Chat box</p>
        </Stack>
        }
      </Container>
  )
}
