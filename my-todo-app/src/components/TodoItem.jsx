import React from 'react';

const TodoItem = ({ todo, deleteTodo, setEditingTodo, toggleComplete }) => {
    return (
        // Apply 'completed' class if todo.completed is true for styling
        <li className={`todo-item ${todo.completed ? 'completed' : ''}`}>
            <input
                type="checkbox"
                checked={todo.completed} // Checkbox state reflects todo completion
                onChange={() => toggleComplete(todo.id)} // Toggle completion on click
            />
            <div>
                <h3>{todo.title}</h3>
                {/* Only show description if it exists */}
                {todo.description && <p>{todo.description}</p>}
            </div>
            <div className="todo-actions">
                <button onClick={() => setEditingTodo(todo)}>Edit</button>
                <button onClick={() => deleteTodo(todo.id)}>Delete</button>
            </div>
        </li>
    );
};

export default TodoItem;