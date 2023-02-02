import './App.css';
import Login from './component/login';
import Register from './component/register';
import { Routes, Route } from 'react-router-dom';
import Todo from './component/todo';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path='/' element={<Login/>}/>
        <Route path='/register' element={<Register/>}/>
        <Route path='/todo' element={<Todo/>}/>
      </Routes>
    </div>
  );
}

export default App;
