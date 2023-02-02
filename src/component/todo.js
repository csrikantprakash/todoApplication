import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./todo.css"

const Todo = () => {
    
    const [history, setHistory] = useState([]);
    const [index, setIndex] = useState();
    const [display, setDisplay] = useState("none");
    const [todo, setTodo] = useState({task: "", timeTaken: ""});
    const [todos, setTodos] = useState([]);
    const [reload, setReload] = useState(1);
    const [event, setEvent] = useState(false);
    const [time, setTime] = useState(1);
    const user = localStorage.getItem("user");
    const navigate = useNavigate();

    const handleClick = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        navigate("/");
    }
    const todoOpen = () =>{
        if(display === "none") setDisplay("block");
        else setDisplay("none");
    } 
    const startTime = () =>{
        setTime(time+1);
        console.log(time);
    }
    const handleStart = (i) =>{
        setIndex(i);
        if(event){
            alert("you cannot start more than one event")
        }else{
            setInterval(startTime, 1000);
            setEvent(true);
        }
    }
    const handleStop = (i) =>{
        if(index == i) setEvent(false);
        else{
            alert(`please stop ${todos[index].task} first`)
            return;
        }
        let data = {
            task : todos[index].task,
            timeTaken : "10",
            status : "completed"
        }
        axios.put("https://todo-backend-6jdn.onrender.com/todos", data)
        .then((res)=>{
            console.log(res);
        })
        setReload(reload+1);
    }
    const handleSubmit = (e) =>{
        e.preventDefault();
        axios.post("https://todo-backend-6jdn.onrender.com/todos", todo)
        .then((res)=>{
            console.log(res);
        })
        setDisplay("none");
        setReload(reload+1);
        console.log(reload);
    }
    useEffect(() => {
        const token = localStorage.getItem("token");
        axios.post("https://todo-backend-6jdn.onrender.com/verify", {
            headers: {
                authorization: token
            }
        })
            .then((res) => {
                if (res.data.status === "expired") {
                    navigate("/");
                }
            })
        
        axios.get("https://todo-backend-6jdn.onrender.com/todos")
            .then((res)=>{
                setTodos(res.data.todos);
            })
        let filter = todos.filter((item)=>{
                return item.task == "completed"
        })
        setHistory(todos);
    },[reload])

    return (
        <div className="todo-container">
            <header className="todo-header">
                <h1>Welcome {user}</h1>
                <button className="logout" onClick={handleClick}>Logout</button>
            </header>
            <section className="todo-body">
                <section className="todo-history">
                    <h1>To Do History</h1>
                    <p>Completed</p>
                    {history.length === 0? null : history.map((history,i)=>{
                        return(<div style={{marginBottom : "10px"}} key={i}> 
                            <div>
                                {history.task}  
                            </div>
                            <div>Time:{history.timeTaken}m</div>
                        </div>)
                    })}
                </section>
                <section className="todo-main">
                    <div className="todo-task">
                        <div className="hidden" style={{ display: display }}>
                            <form onSubmit={handleSubmit}>
                                <input type="text" placeholder="Enter Task" onChange={(e)=>setTodo({...todo, task:e.target.value})} />
                                <button type="submit">Submit</button>
                            </form>
                        </div>
                        <button className="todo-task-button" onClick={todoOpen}>Add New Activity</button>
                    </div>
                    <div className="todo-table">
                        <table>
                            <thead>
                                <tr>
                                    <td>Activity</td>
                                    <td>Status</td>
                                    <td>Time Taken</td>
                                    <td>Action</td>
                                </tr>
                            </thead>
                            <tbody>
                                {todos.length == 0? null : todos.map((task, i)=>{
                                    return (
                                        <tr key={i}>
                                            <td>{task.task}</td>
                                            <td>{task.status}</td>
                                            <td>{task.timeTaken}</td>
                                            <td>
                                                <button onClick={()=>handleStart(i)}>Start</button>
                                                <button onClick={()=>handleStop(i)}>Stop</button>
                                            </td>
                                        </tr>
                                    )
                                })}
                            </tbody>
                        </table>
                    </div>
                </section>
            </section>
        </div>
    )
}

export default Todo;