import { useContext } from "react"
import { Form, Row, Col, Stack, Button, Alert } from "react-bootstrap"
import { AuthContext } from "../context/AuthContext"
export const Login = () => {
    const {loginInfo, updateLoginInfo, loginUser, loginError, loading } = useContext(AuthContext);
    return (
        <Form onSubmit={loginUser}>
            <Row style={{
                height: "90vh",
                justifyContent: "center"
            }}>
                <Col xs="6">
                    {
                        loginError?<Alert variant="danger">{loginError}</Alert>:null
                    }
                    <Stack gap="3">
                        <h2 style={{ textAlign: "center" }}>Login</h2>
                        <Form.Control type="email" placeholder="Email" value={loginInfo.email} onChange={(e) => updateLoginInfo({ email: e.target.value })} />
                        <Form.Control type="password" placeholder="Password" value={loginInfo.password} onChange={(e) => updateLoginInfo({ password: e.target.value })} />
                        <Button type='submit' variant="primary" disabled={loading?true:false} >{loading?"Loading":"Login"}</Button>
                    </Stack>
                </Col>
            </Row>
        </Form>
    )
}
