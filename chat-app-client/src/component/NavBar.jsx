import { useContext } from "react"
import { Navbar, Nav, Stack, Container } from "react-bootstrap"
import { Link } from "react-router-dom"
import { AuthContext } from "../context/AuthContext"
export const NavBar = () => {
    const { user, logoutUser } = useContext(AuthContext);
    return (
        <Navbar bg="dark" className="mb-1" style={{ height: "3.75rem" }} >
            <Container>
                <h2>
                    <Link className="text-decoration-none link-light" to="/">ChatApp</Link>
                </h2>
                <span className="text-warning mr-5">Logged in as {user?.name}</span>
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
