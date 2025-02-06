import React, { useState, useEffect } from 'react';

const ToDoList = () => {
    const [todos, setTodos] = useState([]);
    const [task, setTask] = useState('');
    const [userId, setUserId] = useState(''); // Add user ID here, possibly from context or props

    useEffect(() => {
        const fetchTodos = async () => {
            const response = await fetch(`http://localhost:5000/api/todos/${userId}`); // Fetch To-Dos for the user
            const data = await response.json();
            setTodos(data);
        };
        fetchTodos();
    }, [userId]);

    const addTodo = async (e) => {
        e.preventDefault();
        const response = await fetch('http://localhost:5000/api/todos', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ task, userId }), // Send task and user ID
        });
        const newTodo = await response.json();
        setTodos([...todos, newTodo.todo]);
        setTask('');
    };

    const updateTodo = async (id, updatedTask) => {
        await fetch(`http://localhost:5000/api/todos/${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ task: updatedTask }),
        });
        setTodos(todos.map(todo => (todo._id === id ? { ...todo, task: updatedTask } : todo)));
    };

    const deleteTodo = async (id) => {
        await fetch(`http://localhost:5000/api/todos/${id}`, { method: 'DELETE' });
        setTodos(todos.filter(todo => todo._id !== id));
    };

    const completeTodo = async (id) => {
        await fetch(`http://localhost:5000/api/todos/${id}/complete`, { method: 'PATCH' });
        setTodos(todos.map(todo => (todo._id === id ? { ...todo, completed: true } : todo)));
    };

    return (
        <div>
            <h1>To-Do List</h1>
            <form onSubmit={addTodo}>
                <input
                    type="text"
                    placeholder="Add a new task"
                    value={task}
                    onChange={(e) => setTask(e.target.value)}
                    required
                />
                <button type="submit">Add</button>
            </form>
            <ul>
                {todos.map(todo => (
                    <li key={todo._id}>
                        <span style={{ textDecoration: todo.completed ? 'line-through' : 'none' }}>{todo.task}</span>
                        <button onClick={() => updateTodo(todo._id, prompt('Update task:', todo.task))}>Edit</button>
                        <button onClick={() => deleteTodo(todo._id)}>Delete</button>
                        <button onClick={() => completeTodo(todo._id)} disabled={todo.completed}>Complete</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default ToDoList;
