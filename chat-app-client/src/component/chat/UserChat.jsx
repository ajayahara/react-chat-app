import { Stack } from "react-bootstrap";
import { useRecipient } from "../../hook/useRecipient"
export const UserChat = ({ user, chat }) => {
    const [recipient] = useRecipient(chat, user);
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
                        text message
                    </div>
                </div>
            </div>
            <div className="d-flex flex-column align-items-end">
            <span className="online-status"></span>
                <div className="date">
                    12/12/20
                </div>
                <div className="notification">
                    2
                </div>
            </div>
        </Stack>
    )
}
