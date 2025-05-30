import { Spinner } from '@fluentui/react-components';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setToken, setUser } from './slice';
import { useNavigate } from 'react-router';
import http from './http';

function Logout() {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        http.post('logout', null).finally(() => {
            dispatch(setToken(null));
            dispatch(setUser(null));
            navigate('/home');
        });
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <div id='logout'>
            <Spinner />
        </div>
    );
}

export default Logout;