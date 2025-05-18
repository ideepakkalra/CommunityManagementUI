function Header() {
    return (
        <header id="header">
            <h1>Community App</h1>
            <a href="/home" onClick={() => console.log("clicked")}>Home</a>
            <a href="/event" onClick={() => console.log("clicked")}>Event</a>
            <a href="/logout" onClick={() => console.log("clicked")}>Logout</a>
        </header>
    );
}

export default Header;