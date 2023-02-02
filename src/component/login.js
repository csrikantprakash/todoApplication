import axios from "axios";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Login = () =>{

    const [form, setForm] = useState({username:"", password: ""})
    const [error, setError] = useState({error:""});
    const navigate = useNavigate();

    const handleSubmit = (e) =>{
        e.preventDefault();
        axios.post("https://todo-backend-6jdn.onrender.com/login", form)
            .then((res)=>{
                if(res.data.status === "failed"){
                    console.log(res.data.message);
                    setError({...error, error: res.data.message});
                    console.log(error);
                }else{
                    console.log(res.data);
                    localStorage.setItem("token", res.data.token);
                    localStorage.setItem("user", res.data.user)
                    alert("Login Success")
                    navigate("/todo")
                }
            });

    }
    return(
        <div className="login-container">
            <form onSubmit={handleSubmit}>
                <h1>Member Login</h1>
                <input type="text" id="username" onChange={(e)=>setForm({...form, username:e.target.value})} placeholder="Username"/>
                <br></br>
                <input type="password" id="password" onChange={(e)=>setForm({...form, password:e.target.value})} placeholder="Password" required/>
                <br></br>
                {error.error === ""? null: <p className="error">{error.error}</p>}
                <button type="submit">LOG IN</button>
                <Link to="/register">
                    <h6>New user? Register here</h6>
                </Link>
            </form>
        </div>
    )
}
export default Login;