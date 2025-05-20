function Footer() {
    return (
        <footer id='footer'>
            <a href='/home' onClick={() => console.log('clicked')}>Home</a>
            <a href='/event' onClick={() => console.log('clicked')}>Event</a>
            <a href='/logout' onClick={() => console.log('clicked')}>Logout</a>
        </footer>
    );
}

export default Footer;