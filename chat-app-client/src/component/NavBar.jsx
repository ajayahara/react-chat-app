import { useContext } from "react"
import { Navbar, Nav, Stack, Container } from "react-bootstrap"
import { Link } from "react-router-dom"
import { AuthContext } from "../context/AuthContext"
import { ChatContext } from "../context/ChatContext"
export const NavBar = () => {
    const { user, logoutUser } = useContext(AuthContext);
    const { unSeenMessage } = useContext(ChatContext)

    return (
        <Navbar bg="dark" className="mb-1" style={{ height: "3.75rem" }} >
            <Container>
                <h2>
                    <Link className="text-decoration-none link-light" to="/">ChatApp</Link>
                </h2>
                <span className="text-warning mr-5">Logged in as {user?.name}</span>
                <span className="position-relative">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-chat-right-fill" viewBox="0 0 16 16">
                        <path d="M14 0a2 2 0 0 1 2 2v12.793a.5.5 0 0 1-.854.353l-2.853-2.853a1 1 0 0 0-.707-.293H2a2 2 0 0 1-2-2V2a2 2 0 0 1 2-2h12z" />
                    </svg>
                    <span className="notification-badge">{unSeenMessage.length}</span>
                </span>
                <Nav>
                    <Stack direction="horizontal" gap="3">
                        {
                            user ? <Link className="text-decoration-none link-light" onClick={logoutUser}>Logout</Link> : <>
                                <Link className="text-decoration-none link-light" to="/login">Login</Link>
                                <Link className="text-decoration-none link-light" to="/register">Register</Link>
                            </>
                        }
                    </Stack>
                </Nav>
            </Container>

        </Navbar>
    )
}
