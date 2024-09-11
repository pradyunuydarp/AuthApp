/* eslint-disable react/prop-types */
// import "./LoginComp.css";
// import {useState} from "react";
// function LoginComp(props){
//     const [email, setemail] = useState('');
//     const [password, setpassword]  = useState(''); 
//     const handleSubmit = (e) =>{
//         e.preventDefault();
//         console.log(email);
//     }
//     return(
//         <div className = "LoginComp" onSubmit={handleSubmit}>
//             <h2> Login </h2>
//             <form>
//             <div id = "username">
//                 {/* <label htmlFor = "email">Email: </label> */}
//                 <input type = "email" value = {email} onChange={(e)=>setemail(e.target.value)} name = "email" placeholder = "Enter your username"></input>
//             </div>
//             {/* <br/> */}
//             <div id = "password">
//                 {/* <label htmlFor = "password">Password: </label> */}
//                 <input type = "password" value = {password} onChange={(e)=>setpassword(e.target.value)} name = "password" placeholder = "Enter your password"></input>
//             </div>
//             <button id = "log-in" type = "submit" >Login</button>
//             <div id = "create-account">
//                 <label htmlFor = "create-account">Don't have an account? </label>
//                 {/* <a href = "create-account" name = "create-account">Create Account</a> */}
//                 <button type = "submit" id = "create-account-button" onClick={props.onFormSwitch}>Create Account</button>
//             </div>
//             <div id = "forgot-password">
//                 <label htmlFor = "forgot-password">Don't remember your password? </label>
//                 {/* <a href = "forgot-password" name = "forgot-password">Forgot Password</a> */}
//                 <button type = "submit" id = "forgot-password-button" onClick={props.onFormSwitch}>Forgot Password</button>

//             </div>
//             </form>
//         </div>
//     );

// }
// export default LoginComp
import "../CSS/LoginComp.css";
import { useState } from "react";
import { useNavigate } from 'react-router-dom';
// import PropTypes from 'prop-types';
function LoginComp(props) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const navigate = useNavigate();
    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(email);
        try {
            const response = await fetch('http://localhost:5001/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username: email, password: password }),
            });

            const data = await response.json();

            if (response.ok) {
                console.log('Login successful:', data);
                props.onLoginSuccess;
                navigate('/profile', { state: { name: data.name } });
            } else {
                setErrorMessage(data.message || 'Login failed');
                console.log('Error:', data.message);
            }
        } catch (error) {
            console.error('Error during login:', error);
            setErrorMessage('An error occurred. Please try again later.');
        }
    };

    return (
        <div className="LoginComp">
            <h2>Login</h2>
            <form onSubmit={handleSubmit}>
                <div id="username">
                    <label htmlFor = "email">Email: </label>
                    <input
                        type="email" value={email}
                        onChange={(e) => setEmail(e.target.value)} name="email"
                        placeholder="Enter your username" required
                    />
                </div>
                <div id="password">
                    <label htmlFor = "password">Password: </label>
                    <input type="password" value={password} 
                    onChange={(e) => setPassword(e.target.value)} name="password" 
                    placeholder="Enter your password" required/>
                </div>
                {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
                <button id="log-in" type="submit">Login</button>
                <div id="create-account">
                    <label htmlFor="create-account">Don&apos;t have an account? </label>
                    <button type="button" id="create-account-button" onClick={props.onFormSwitch}>
                        Create Account
                    </button>
                </div>
                <div id="forgot-password">
                    <label htmlFor="forgot-password">Don&apos;t remember your password? </label>
                    <button type="button" id="forgot-password-button" onClick={props.onFormSwitch}>
                        Forgot Password
                    </button>
                </div>
            </form>
        </div>
    );
}

export default LoginComp;
