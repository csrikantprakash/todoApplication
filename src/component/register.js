import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Register = () =>{
    const navigate = useNavigate();
    const [form, setForm] = useState({username:"", password: "", Cpassword: ""});
    const [error, setError] = useState({error:""});

    const handleSubmit = (e) =>{
        e.preventDefault();
        if(form.password !== form.Cpassword){
            setError({...error, error:"passwords dont match"});
            return;
        }
        axios.post("https://todo-backend-6jdn.onrender.com/register", form)
            .then((res)=>{
                console.log(res);
                if(res.data.status === "failed"){
                    console.log(res.data.message);
                    setError({...error, error: res.data.message});
                    console.log(error);
                    return;
                }else{
                    alert("Registration success");
                    navigate("/");
                }
            })
            .catch((e)=>console.log(e));
    }
    return(
        <div className="login-container">
            <form onSubmit={handleSubmit}>
                <h1> Register New Member</h1>
                <input type="text" id="username" onChange={(e)=>setForm({...form, username:e.target.value})} placeholder="Username" required/>
                <br></br>
                <input type="password" id="password" onChange={(e)=>setForm({...form, password:e.target.value})} placeholder="password" required/>
                <br></br>
                <input type="password" id="Cpassword" onChange={(e)=>setForm({...form, Cpassword:e.target.value})} placeholder="confirm password" required/>
                {error.error === ""? null: <p className="error">{error.error}</p>}
                <br></br>
                <button type="submit">Submit</button>
                <Link to="/">
                    <h6>Already a member? Click to sign in</h6>
                </Link>
                
            </form>
        </div>
    )
}
export default Register;