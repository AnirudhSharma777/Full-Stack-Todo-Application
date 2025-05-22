import React from 'react';
import TodoItem from './TodoItem'; // Import the individual todo item component

const TodoList = ({ todos, deleteTodo, setEditingTodo, toggleComplete }) => {
    return (
        <ul className="todo-list">
            {/* Map over the 'todos' array and render a TodoItem for each */}
            {todos.length === 0 ? (
                <p style={{ textAlign: 'center', color: '#666' }}>No todos yet! Add some above.</p>
            ) : (
                todos.map((todo) => (
                    <TodoItem
                        key={todo.id} // Essential for React list rendering optimization
                        todo={todo}
                        deleteTodo={deleteTodo}
                        setEditingTodo={setEditingTodo}
                        toggleComplete={toggleComplete}
                    />
                ))
            )}
        </ul>
    );
};

export default TodoList;