import { useContext } from "react"
import { ChatContext } from "../../context/ChatContext"
import { Stack } from "react-bootstrap";

export const NotChated = () => {
    const { notChated, createChat } = useContext(ChatContext);
    return (
        <Stack direction="horizontal" gap={4} className="notchated mb-4">
            {notChated.map((items, i) => {
                return <div className="singleUser" key={i} onClick={() => createChat(items._id)}>
                    {items
                        .name}
                    <span>+</span>
                </div>
            })}
        </Stack>
    )
}
