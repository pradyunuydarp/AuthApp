/* eslint-disable react/prop-types */
import "../CSS/Header.css";
import { Link } from 'react-router-dom';

function Header({ onLogIn }) {
    return (
        <header className="Header">
            <h1>AuthApp</h1>
            <nav>
                <Link to="/">Home</Link> | 
                <Link to="/"> About Us</Link> | 
                <Link to="/profile"> Profile</Link> | 
                <Link to="/login" onClick={onLogIn}> Login</Link>
            </nav>
            <hr />
        </header>
    );
}

export default Header;
