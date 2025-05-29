import { Button, Input, MessageBar, MessageBarBody, Text } from '@fluentui/react-components';
import './Login.css';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { setToken, setUser } from './slice';
import { useNavigate } from 'react-router';
import http from './http';

function Login() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [phoneNumber, setPhoneNumber] = useState("");
    const [passcode, setPasscode] = useState("");
    const [message, setMessage] = useState(null);

    const login = async (event) => {
        setMessage(null);
        http.post('login', {phoneNumber: "+1" + phoneNumber, passcode})
            .then(async (data) => {
                dispatch(setToken(data.token));
                dispatch(setUser(structuredClone(data.user)));
                navigate("/home");
            }).catch((error) => {
                setMessage("Login failed. [" + error + "]");
                console.log(error);
            });
    };

    const onChangePhoneNumberHandler = (event, data) => {
        if((!/\D/.test(data.value))) {
            setPhoneNumber(data.value);
        }
    };

    const onChangePasscodeHandler = (event, data) => {
        if((!/\D/.test(data.value))) {
            setPasscode(data.value);
        }
    };

    return (
        <div id='login'>
            <h1>Login</h1>
            <div id='login-form'>
                {message && <div className='login-form-row'>
                    <MessageBar key={"message"} intent={"error"}>
                        <MessageBarBody>
                            {message}
                        </MessageBarBody>
                    </MessageBar>
                </div>}
                <div className='login-form-row'>
                    <Input id='phoneNumber' type='tel' placeholder='10 digit phone number' minLength={10} maxLength={10} value={phoneNumber} onChange={onChangePhoneNumberHandler} contentBefore={<Text id='phoneNumberPrefix'>+1</Text>} />
                </div>
                <div className='login-form-row'>
                    <Input id='passcode' type='password' placeholder='6 digit passcode' minLength={6} maxLength={6} value={passcode} onChange={onChangePasscodeHandler} />
                </div>
                <div className='login-form-row'>
                    <Button id='loginButton' onClick={login}>Login</Button>
                </div>
            </div>
        </div>
    );
}

export default Login;