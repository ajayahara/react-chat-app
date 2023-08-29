import { useContext } from "react"
import { Form, Row, Col, Stack, Button, Alert } from "react-bootstrap"
import { AuthContext } from "../context/AuthContext"
export const Register = () => {
    const {signinInfo,updateSigninInfo,loading,registerUser,signinError}=useContext(AuthContext);
    return (
        <Form onSubmit={registerUser}>
            <Row style={{
                height: "90vh",
                justifyContent: "center"
            }}>
                <Col xs="6">
                    {
                        signinError?<Alert variant="danger">{signinError}</Alert>:null
                    }
                    <Stack gap="3">
                        <h2 style={{ textAlign: "center" }}>Register</h2>
                        <Form.Control type="text" placeholder="Name" value={signinInfo.name}  onChange={(e)=>updateSigninInfo({name:e.target.value})}/>
                        <Form.Control type="email" placeholder="Email" value={signinInfo.email} onChange={(e)=>updateSigninInfo({email:e.target.value})}/>
                        <Form.Control type="password" placeholder="Password" value={signinInfo.password} onChange={(e)=>updateSigninInfo({password:e.target.value})}/>
                        <Button type='submit' variant="primary" disabled={loading?true:false} >{loading?"Loading":"Register"}</Button>
                    </Stack>
                </Col>
            </Row>
        </Form>
    )
}
