/* eslint-disable react/prop-types */
import "../CSS/HeaderLanding.css";
import { Link } from 'react-router-dom';

function HeaderLanding({ onLogOut }) {
    return (
        <header className="HeaderLanding">
            <h1>AuthApp</h1>
            <nav>
                <Link to="/">Home</Link> | 
                <Link to="/"> About Us</Link> | 
                <Link to="/profile"> Profile</Link> | 
                <Link to="/" onClick={onLogOut}> Logout</Link>
            </nav>
            <hr />
        </header>
    );
}

export default HeaderLanding;
