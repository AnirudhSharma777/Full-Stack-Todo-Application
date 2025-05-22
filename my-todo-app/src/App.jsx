import React, { useState, useEffect } from 'react';
import TodoForm from './components/TodoForm';
import TodoList from './components/TodoList';
// Import all functions from your API helper
import {
    getTodos,
    addTodo as apiAddTodo,       // Renamed to avoid clash with local addTodo function
    updateTodo as apiUpdateTodo, // Renamed to avoid clash with local editTodo function
    deleteTodo as apiDeleteTodo, // Renamed to avoid clash with local deleteTodo function
    sendSummaryToSlack
} from './api';
import './styles.css'; // Import your main styles

function App() {
    const [todos, setTodos] = useState([]); // State to hold the list of todos
    const [editingTodo, setEditingTodo] = useState(null); // State to hold the todo being edited
    const [slackMessage, setSlackMessage] = useState(''); // State for Slack operation messages
    const [slackMessageType, setSlackMessageType] = useState(''); // 'success' or 'failure' for message styling

    // useEffect to fetch todos when the component mounts
    useEffect(() => {
        fetchTodos();
    }, []); // Empty dependency array means this runs once on mount

    const fetchTodos = async () => {
        try {
            const data = await getTodos(); // Call API to get todos
            setTodos(data); // Update state with fetched todos
        } catch (error) {
            console.error('Failed to fetch todos:', error);
            // Optionally, display an error message to the user
            setSlackMessage('Error fetching todos. Please try again later.');
            setSlackMessageType('failure');
            setTimeout(() => setSlackMessage(''), 5000);
        }
    };

    const addTodo = async (todo) => {
        try {
            const newTodo = await apiAddTodo(todo); // Call API to add todo
            setTodos([...todos, newTodo]); // Add new todo to the existing list
        } catch (error) {
            console.error('Failed to add todo:', error);
            setSlackMessage('Error adding todo. Please try again.');
            setSlackMessageType('failure');
            setTimeout(() => setSlackMessage(''), 5000);
        }
    };

    const editTodo = async (id, updatedTodo) => {
        try {
            const response = await apiUpdateTodo(id, updatedTodo); // Call API to update todo
            setTodos(todos.map((todo) => (todo.id === id ? response : todo))); // Update the specific todo in state
        } catch (error) {
            console.error('Failed to update todo:', error);
            setSlackMessage('Error updating todo. Please try again.');
            setSlackMessageType('failure');
            setTimeout(() => setSlackMessage(''), 5000);
        }
    };

    const deleteTodo = async (id) => {
        try {
            await apiDeleteTodo(id); // Call API to delete todo
            setTodos(todos.filter((todo) => todo.id !== id)); // Remove deleted todo from state
        } catch (error) {
            console.error('Failed to delete todo:', error);
            setSlackMessage('Error deleting todo. Please try again.');
            setSlackMessageType('failure');
            setTimeout(() => setSlackMessage(''), 5000);
        }
    };

    const toggleComplete = async (id) => {
        const todoToUpdate = todos.find(todo => todo.id === id);
        if (!todoToUpdate) return; // Should not happen if ID is valid

        const updatedTodo = { ...todoToUpdate, completed: !todoToUpdate.completed };
        try {
            const response = await apiUpdateTodo(id, updatedTodo);
            setTodos(todos.map((todo) => (todo.id === id ? response : todo)));
        } catch (error) {
            console.error('Failed to toggle todo completion:', error);
            setSlackMessage('Error toggling completion. Please try again.');
            setSlackMessageType('failure');
            setTimeout(() => setSlackMessage(''), 5000);
        }
    };

    const handleSendSummary = async () => {
        setSlackMessage('Sending summary to Slack...');
        setSlackMessageType(''); // Clear previous type

        try {
            const response = await sendSummaryToSlack(); // Call API to send summary
            setSlackMessage(response.message || 'Summary sent to Slack successfully!');
            setSlackMessageType('success');
        } catch (error) {
            console.error('Slack summary error:', error);
            setSlackMessage(error.response?.data?.message || 'Failed to send summary to Slack. Check server logs.');
            setSlackMessageType('failure');
        } finally {
            // Clear the message after a few seconds
            setTimeout(() => {
                setSlackMessage('');
                setSlackMessageType('');
            }, 5000);
        }
    };

    return (
        <div className="App">
            <h1>My To-Do List</h1>

            <TodoForm
                addTodo={addTodo}
                editTodo={editTodo}
                currentTodo={editingTodo}
                setEditingTodo={setEditingTodo}
            />

            <TodoList
                todos={todos}
                deleteTodo={deleteTodo}
                setEditingTodo={setEditingTodo}
                toggleComplete={toggleComplete}
            />

            <button onClick={handleSendSummary} className="slack-summary-button">
                Generate and Send Slack Summary
            </button>

            {/* Display Slack operation success/failure message */}
            {slackMessage && (
                <div className={`slack-message ${slackMessageType}`}>
                    {slackMessage}
                </div>
            )}
        </div>
    );
}

export default App;