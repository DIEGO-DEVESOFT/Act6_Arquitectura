import React, { useState } from 'react';

function App() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [tasks, setTasks] = useState([]);
    const [task, setTask] = useState('');
    const [token, setToken] = useState('');

    const register = async () => {
        await fetch('http://localhost:4000/register', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username, password }),
        });
        alert('User registered!');
    };

    const login = async () => {
        const response = await fetch('http://localhost:4000/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username, password }),
        });
        const data = await response.json();
        console.log('Token received:', data.token);
        setToken(data.token);
        alert('User logged in!');
    };

    const createTask = async () => {
        await fetch('http://localhost:4001/tasks', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': token,
            },
            body: JSON.stringify({ title: task, description: 'Sample description', completed: false }),
        });
        alert('Task created!');
    };
    
    const fetchTasks = async () => {
        const response = await fetch('http://localhost:4001/tasksfind', {
            headers: { 'Authorization': token },
        });
        const data = await response.json();
        setTasks(data);
    };
    
    return (
        <div>
            <h1>Task Manager</h1>

            <h2>Register & Login</h2>
            <input type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} />
            <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
            
            {/* Contenedor para los botones "Register" y "Login" en una misma fila */}
            <div style={{ display: 'flex', gap: '10px', marginTop: '10px' }}>
                <button onClick={register}>Register</button>
                <button onClick={login}>Login</button>
            </div>

            <h2>Create Task</h2>
            <input type="text" placeholder="Task" value={task} onChange={(e) => setTask(e.target.value)} />
            <button onClick={createTask}>Create Task</button>

            <h2>Tasks</h2>
            <button onClick={fetchTasks}>Fetch Tasks</button>
            <ul>
                {tasks.map((t, index) => (
                    <li key={index}>{t.title}</li>
                ))}
            </ul>
        </div>
    );
}

export default App;
