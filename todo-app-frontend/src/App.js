import React, { useState, useEffect } from "react";
import axios from "axios";

const App = () => {
    const [todos, setTodos] = useState([]);
    const [title, setTitle] = useState("");

    // Fetch todos
    useEffect(() => {
        const fetchTodos = async () => {
            const res = await axios.get("http://localhost:5000/api/todos");
            setTodos(res.data);
        };
        fetchTodos();
    }, []);

    // Add a new todo
    const addTodo = async () => {
        const res = await axios.post("http://localhost:5000/api/todos", { title });
        setTodos([...todos, res.data]);
        setTitle("");
    };

    // Toggle complete
    const toggleComplete = async (id, completed) => {
        const res = await axios.put(`http://localhost:5000/api/todos/${id}`, {
            completed: !completed,
        });
        setTodos(todos.map((todo) => (todo._id === id ? res.data : todo)));
    };

    // Delete a todo
    const deleteTodo = async (id) => {
        await axios.delete(`http://localhost:5000/api/todos/${id}`);
        setTodos(todos.filter((todo) => todo._id !== id));
    };

    return (
        <div style={{ textAlign: "center", marginTop: "50px" }}>
            <h1>To-Do List</h1>
            <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Add a new todo"
            />
            <button onClick={addTodo}>Add</button>
            <ul>
                {todos.map((todo) => (
                    <li key={todo._id}>
                        <span
                            style={{
                                textDecoration: todo.completed ? "line-through" : "none",
                            }}
                            onClick={() => toggleComplete(todo._id, todo.completed)}
                        >
                            {todo.title}
                        </span>
                        <button onClick={() => deleteTodo(todo._id)}>Delete</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default App;
