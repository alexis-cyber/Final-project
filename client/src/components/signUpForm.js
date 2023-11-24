import { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import "./sign-log.css";
import Footer from "./footer"

function Register() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    async function handleRegister(e) {
        e.preventDefault();
        let res = await axios.post("http://localhost:8000/register", {email, password});
        alert(res.data.msg);
        navigate("/login");
    } 
    
    return (
    <div className="formContainer">
        <form onSubmit={handleRegister} value="SignUpForm" className="form">
            <h2>Sign Up</h2><br/>
            <label>Email</label><br/>
            <input type="text" value={email} onChange={(e) => setEmail(e.target.value)}/><br/>
            <label>Password</label><br/>
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)}/><br/>
            <input type="submit" value="Sign Up"/>
            <Link to="/login" className="logg" ><p>Already signed up?</p></Link>
        </form>
       
    </div>
    )
};

export default Register;