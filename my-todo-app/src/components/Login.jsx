import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { loginUser } from '../api';
import AuthMessage from './AuthMessage'; // Assuming AuthMessage component is created

const Login = ({ setAuthToken }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    const [messageType, setMessageType] = useState(''); // 'success' or 'error'
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setMessage(''); // Clear previous messages
        setMessageType('');

        try {
            const response = await loginUser({ email, password });
            // Assuming your backend sends back { token: "...", user: {...} }
            localStorage.setItem('token', response.token); // Store token in local storage
            setAuthToken(response.token); // Update parent's state
            setMessage('Login successful!');
            setMessageType('success');
            navigate('/'); // Redirect to the To-Do list
        } catch (error) {
            setMessage(error.message || 'Login failed. Invalid credentials or account not verified.');
            setMessageType('error');
            console.error('Login error:', error);
        }
    };

    return (
        <div className="auth-container">
            <h2>Login</h2>
            <AuthMessage message={message} type={messageType} />
            <form onSubmit={handleSubmit} className="auth-form">
                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
                <button type="submit">Login</button>
            </form>
            <p>
                Don't have an account? <span className="auth-link" onClick={() => navigate('/signup')}>Sign Up</span>
            </p>
        </div>
    );
};

export default Login;