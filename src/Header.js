import { Link, useNavigate } from 'react-router';
import './Header.css';
import { useSelector } from 'react-redux';
import { Button, Menu, MenuItem, MenuList, MenuPopover, MenuTrigger } from '@fluentui/react-components';
import { CalendarDateFilled, HomeFilled, PeopleFilled, SignOutFilled } from '@fluentui/react-icons';

function Header() {
    const user = useSelector((state) => state.app.user);
    const navigate = useNavigate();

    return (
        <header id='header'>
            <h1>Community App</h1>
            {
                !user ? <Link to={'/login'}>Login</Link> : 
                    <div>
                        <Menu hasIcons>
                            <MenuTrigger>
                                <Button icon={<PeopleFilled />}> {user.firstName + " " + user.lastName}</Button>
                            </MenuTrigger>
                            <MenuPopover>
                                <MenuList>
                                    <MenuItem id="home" subText="Goto Home" icon={<HomeFilled />} onClick={(e) => navigate("/home")}>Home</MenuItem>
                                    <MenuItem subText="Your events" icon={<CalendarDateFilled />} onClick={(e) => navigate("/event")}>My Events</MenuItem>
                                    <MenuItem subText="Reffer your friend" icon={<CalendarDateFilled />} onClick={(e) => navigate("/referral")}>Referral</MenuItem>
                                    <MenuItem subText="Click to logout" icon={<SignOutFilled />} onClick={(e) => navigate("/logout")}>Logout</MenuItem>
                                </MenuList>
                            </MenuPopover>
                        </Menu>
                    </div>
                }
        </header>
    );
}

export default Header;