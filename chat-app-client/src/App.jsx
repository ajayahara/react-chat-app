import { Route, Routes, Navigate } from "react-router-dom"
import { Chat } from "./pages/Chat"
import { Login } from "./pages/Login"
import { Register } from "./pages/Register"
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container } from "react-bootstrap";
import { NavBar } from "./component/Navbar";
import { useContext } from "react";
import { AuthContext } from "./context/AuthContext";
import { ChatContextProvider } from "./context/ChatContext";
function App() {
  const {user}=useContext(AuthContext)
  return (
    <ChatContextProvider user={user}>
      <NavBar />
      <Container className="text-secondary">
        <Routes>
          <Route path="/" element={user?<Chat />:<Navigate to="/login"></Navigate>} />
          <Route path="/register" element={!user?<Register />:<Navigate to="/"></Navigate>} />
          <Route path="/login" element={!user?<Login />:<Navigate to="/"></Navigate>} />
          <Route path="*" element={<Navigate to="/"></Navigate>} />
        </Routes>
      </Container>
    </ChatContextProvider>
  )
}

export default App
