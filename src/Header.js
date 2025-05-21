import { Link } from 'react-router';
import './Header.css';
import { useSelector } from 'react-redux';

function Header() {
    const user = useSelector((state) => state.app.user);
    return (
        <header id='header'>
            <h1>Community App</h1>
            <Link to={'/home'}>Home</Link>
            <Link to={'/event'}>Event</Link>
            <Link to={'/logout'}>Logout</Link>
        </header>
    );
}

export default Header;