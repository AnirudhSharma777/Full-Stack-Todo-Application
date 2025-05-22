import React, { useState, useEffect } from 'react';

const TodoForm = ({ addTodo, editTodo, currentTodo, setEditingTodo }) => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');

    // This effect runs whenever 'currentTodo' changes
    // It pre-fills the form fields if we're in "edit" mode
    useEffect(() => {
        if (currentTodo) {
            setTitle(currentTodo.title);
            setDescription(currentTodo.description);
        } else {
            // Clear the form if we're not editing
            setTitle('');
            setDescription('');
        }
    }, [currentTodo]); // Dependency array: re-run when currentTodo changes

    const handleSubmit = (e) => {
        e.preventDefault(); // Prevent default form submission behavior (page reload)

        if (!title.trim()) {
            alert('Todo title cannot be empty!');
            return; // Don't submit if title is empty
        }

        if (currentTodo) {
            // If currentTodo exists, it means we are editing
            editTodo(currentTodo.id, { title, description, completed: currentTodo.completed }); // Pass existing completed status
            setEditingTodo(null); // Exit editing mode
        } else {
            // Otherwise, we are adding a new todo
            addTodo({ title, description, completed: false }); // New todos are not completed by default
        }

        // Clear the form fields after submission
        setTitle('');
        setDescription('');
    };

    return (
        <form onSubmit={handleSubmit} className="todo-form">
            <input
                type="text"
                placeholder="Todo Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required // HTML5 validation: field is required
            />
            <textarea
                placeholder="Todo Description (optional)"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
            ></textarea>
            <button type="submit">{currentTodo ? 'Update Todo' : 'Add Todo'}</button>
            {currentTodo && ( // Only show "Cancel Edit" button if we are editing
                <button type="button" onClick={() => setEditingTodo(null)}>
                    Cancel Edit
                </button>
            )}
        </form>
    );
};

export default TodoForm;