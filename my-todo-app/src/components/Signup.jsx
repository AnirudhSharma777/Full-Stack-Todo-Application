import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { signupUser } from '../api';
import AuthMessage from './AuthMessage'; // Assuming AuthMessage component is created

const Signup = () => {
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
            const response = await signupUser({ email, password });
            setMessage(response.message || 'Signup successful! Please check your email for a verification code.');
            setMessageType('success');
            // Navigate to verification screen, passing email as state
            navigate('/verify', { state: { email } });
        } catch (error) {
            setMessage(error.message || 'Signup failed. Please try again.');
            setMessageType('error');
            console.error('Signup error:', error);
        }
    };

    return (
        <div className="auth-container">
            <h2>Sign Up</h2>
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
                <button type="submit">Sign Up</button>
            </form>
            <p>
                Already have an account? <span className="auth-link" onClick={() => navigate('/login')}>Login</span>
            </p>
        </div>
    );
};

export default Signup;