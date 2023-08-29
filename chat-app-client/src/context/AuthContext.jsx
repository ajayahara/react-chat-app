import { createContext, useState } from "react";
import { baseUrl, postReq } from "../utility/untility";
const AuthContext = createContext();
const AuthContextProvider = ({ children }) => {
    const [user, setUser] = useState(JSON.parse(localStorage.getItem("user"))|| null);
    const [signinError, setSigninError] = useState(null);
    const [loginError, setLoginError] = useState(null);
    const [loading, setLoading] = useState(false);
    const [signinInfo, setSigninInfo] = useState({name: "",email: "",password: ""})
    const [loginInfo, setLoginInfo] = useState({password: "",email: ""})
    const updateSigninInfo = (info) => {
        setSigninInfo({ ...signinInfo, ...info });
    }
    const updateLoginInfo = (info) => {
        setLoginInfo({ ...loginInfo, ...info })
    }
    const registerUser = async (e) => {
        e.preventDefault();
        setSigninError(null);
        setLoading(true);
        const res = await postReq(`${baseUrl}/user/register`, signinInfo);
        if (res.error) {
            setSigninError(res.message)
        } else {
            localStorage.setItem("user", JSON.stringify(res))
            setUser(res);
        }
        setLoading(false)
    }
    const loginUser = async (e) => {
        e.preventDefault();
        setLoginError(null);
        setLoading(true);
        const res = await postReq(`${baseUrl}/user/login`, loginInfo);
        if (res.error) {
            setLoginError(res.message)
        } else {
            localStorage.setItem("user", JSON.stringify(res))
            setUser(res);
        }
        setLoading(false)
    }
    const logoutUser=()=>{
        localStorage.removeItem("user");
        setUser(null)
    }
    return <AuthContext.Provider
        value={{
            user,
            signinInfo,
            loginInfo,
            updateSigninInfo,
            updateLoginInfo,
            loginUser,
            loginError,
            registerUser,
            signinError,
            loading,
            logoutUser
        }}>
        {children}
    </AuthContext.Provider>
}
export { AuthContext, AuthContextProvider }