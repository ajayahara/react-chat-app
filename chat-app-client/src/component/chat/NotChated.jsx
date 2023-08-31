import { useContext } from "react"
import { ChatContext } from "../../context/ChatContext"
import { Stack } from "react-bootstrap";

export const NotChated = () => {
    const { notChated, createChat } = useContext(ChatContext);
    return (
        <div className="not-chated-box text-bg-dark p-2 mb-1">
            <h5>You are not chated with:</h5>
            <Stack direction="horizontal" gap={4} className="notchated mb-2">
                {notChated.map((items, i) => {
                    return <div className="singleUser" key={i} onClick={() => createChat(items._id)}>
                        {items
                            .name}
                        <span>+</span>
                    </div>
                })}
            </Stack>
        </div>
    )
}
