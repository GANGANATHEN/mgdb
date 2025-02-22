import { useState, useEffect } from 'react';

const ToDoList = () => {
    const [todos, setTodos] = useState([]);
    const [task, setTask] = useState('');
    const [userId, setUserId] = useState(localStorage.getItem('userId') || ''); // Get userId from storage

    useEffect(() => {
        if (!userId) {
            console.warn("User ID is missing! Please log in.");
            return;
        }

        const fetchTodos = async () => {
            try {
                const response = await fetch(`http://localhost:5000/api/todos/${userId}`);
                if (!response.ok) throw new Error('Failed to fetch todos');

                const data = await response.json();
                setTodos(data);
            } catch (error) {
                console.error("Error fetching todos:", error);
            }
        };

        fetchTodos();
    }, [userId]);

    const addTodo = async (e) => {
        e.preventDefault();
        if (!task.trim()) return alert("Task cannot be empty!");

        try {
            const response = await fetch('http://localhost:5000/api/todos', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ task, userId }),
            });

            if (!response.ok) throw new Error('Failed to add task');

            const newTodo = await response.json();
            setTodos([...todos, newTodo.todo]);
            setTask('');
        } catch (error) {
            console.error("Error adding task:", error);
        }
    };

    const updateTodo = async (id, updatedTask) => {
        if (!updatedTask.trim()) return alert("Task cannot be empty!");

        try {
            await fetch(`http://localhost:5000/api/todos/${id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ task: updatedTask }),
            });

            setTodos(todos.map(todo => (todo._id === id ? { ...todo, task: updatedTask } : todo)));
        } catch (error) {
            console.error("Error updating task:", error);
        }
    };

    const deleteTodo = async (id) => {
        try {
            await fetch(`http://localhost:5000/api/todos/${id}`, { method: 'DELETE' });
            setTodos(todos.filter(todo => todo._id !== id));
        } catch (error) {
            console.error("Error deleting task:", error);
        }
    };

    const completeTodo = async (id) => {
        try {
            await fetch(`http://localhost:5000/api/todos/${id}/complete`, { method: 'PATCH' });
            setTodos(todos.map(todo => (todo._id === id ? { ...todo, completed: true } : todo)));
        } catch (error) {
            console.error("Error completing task:", error);
        }
    };

    return (
        <div style={{ maxWidth: '400px', margin: 'auto', textAlign: 'center', padding: '20px' }}>
            <h1>To-Do List</h1>

            {userId ? (
                <>
                    <form onSubmit={addTodo} style={{ marginBottom: '20px' }}>
                        <input
                            type="text"
                            placeholder="Add a new task"
                            value={task}
                            onChange={(e) => setTask(e.target.value)}
                            required
                            style={{ padding: '8px', width: '70%', marginRight: '5px' }}
                        />
                        <button type="submit">Add</button>
                    </form>

                    <ul style={{ listStyleType: 'none', padding: 0 }}>
                        {todos.length > 0 ? (
                            todos.map(todo => (
                                <li key={todo._id} style={{ marginBottom: '10px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                                    <span style={{ textDecoration: todo.completed ? 'line-through' : 'none' }}>{todo.task}</span>
                                    <div>
                                        <button onClick={() => updateTodo(todo._id, prompt('Update task:', todo.task))}>Edit</button>
                                        <button onClick={() => deleteTodo(todo._id)}>Delete</button>
                                        <button onClick={() => completeTodo(todo._id)} disabled={todo.completed}>Complete</button>
                                    </div>
                                </li>
                            ))
                        ) : (
                            <p>No tasks found.</p>
                        )}
                    </ul>
                </>
            ) : (
                <p style={{ color: 'red' }}>User ID is missing! Please log in.</p>
            )}
        </div>
    );
};

export default ToDoList;
