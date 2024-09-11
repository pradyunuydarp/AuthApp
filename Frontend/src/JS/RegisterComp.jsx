/* eslint-disable react/prop-types */
import { useState } from "react";
import '../CSS/RegisterComp.css';
// import PropTypes from 'prop-types';
function Register(props) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState(''); 
    const [name, setName] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(email);
        try {
            const response = await fetch('http://localhost:5001/create-account', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ name, username: email, password }),
            });

            const data = await response.json();

            if (response.ok) {
                console.log('Account created successfully:', data);
                props.onFormSwitch();
            } else {
                setErrorMessage(data.message || 'Registration failed');
                console.log('Error:', data.message);
            }
        } catch (error) {
            console.error('Error during registration:', error);
            setErrorMessage('An error occurred. Please try again later.');
        }
    };

    return (
        <div className="RegisterComp">
            <h2>Create Account</h2>
            <form onSubmit={handleSubmit}>
                <div id="name">
                    <label htmlFor = "name">Name: </label>
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        name="name"
                        placeholder="Enter your name"
                        required
                    />
                </div>
                <div id="email">
                    <label htmlFor = "email">Email: </label>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        name="email"
                        placeholder="Enter your email"
                        required
                    />
                </div>
                <div id="password">
                    <label htmlFor = "password">Password: </label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        name="password"
                        placeholder="Enter your password"
                        required
                    />
                </div>
                {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
                <button type="submit" id="create-account">Create Account</button>
            </form>
            <button
                type="button" id="create-account-account-already-exists"
                onClick={props.onFormSwitch}>
                Login, if you already have an account
            </button>
        </div>
    );
}

export default Register;
