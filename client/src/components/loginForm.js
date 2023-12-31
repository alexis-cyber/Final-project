import { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import "./sign-log.css";
import Footer from "./footer"


function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();
    // let decoded;
    // let token;

    async function handleLogin(e) {
        try {
            e.preventDefault();
            let res = await axios.post("http://localhost:8000/login", { email, password });
            console.log(res.data);
            if (res.status === 200) {
                localStorage.setItem("token", res.data.token);
                navigate("/");
            }
        } catch (err) {
            alert("Log in failed, check your email or password.");
        }  
    }
        // decoded = jwt_decode(token);
        // console.log(decoded.email);

    return (
        <div className="formContainer">
            <form onSubmit={handleLogin} value="LogInForm" className="form">
                <h2>Log in</h2><br/>
                <label>Email</label><br/>
                <input type="text" value={email} onChange={(e) => setEmail(e.target.value)}/><br/>
                <label>Password</label><br/>
                <input type="password" value={password} onChange={(e) => setPassword(e.target.value)}/><br/>
                <input type="submit" value="Log in"/>
                <Link to="/register" className="logg" ><p>Not Signed Up?</p></Link>
            
            </form>
            
        </div>
    );
}

export default Login;