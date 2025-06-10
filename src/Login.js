import { Button, Input, Text } from '@fluentui/react-components';
import './Login.css';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { setToken, setUser, showErrorMessage, showSuccessMessage, showWarnMessage } from './slice';
import { useNavigate } from 'react-router';
import API from './API';

function Login() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [phoneNumber, setPhoneNumber] = useState("");
    const [passcode, setPasscode] = useState("");

    const onClickLoginHandler = async (event) => {
        API.post('login', {phoneNumber: "+1" + phoneNumber, passcode})
            .then(async (data) => {
                if (data.user.state === "ACTIVE") {
                    dispatch(setToken(data.token));
                    dispatch(setUser(structuredClone(data.user)));
                    navigate("/home");
                    dispatch(showSuccessMessage("Login successful."));
                } else if (data.user.state === "PENDING_APPROVAL") {
                    dispatch(showWarnMessage("Account is pending for approval."));
                } else {
                    dispatch(showErrorMessage("Account is not active, please contact administrator."));
                }
            }).catch((error) => {
                dispatch(showErrorMessage("Login failed. [" + error + "]"));
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
                <div className='login-form-row'>
                    <Input id='phoneNumber' type='tel' placeholder='10 digit phone number' minLength={10} maxLength={10} value={phoneNumber} onChange={onChangePhoneNumberHandler} contentBefore={<Text id='phoneNumberPrefix'>+1</Text>} style={{width: "100%"}} />
                </div>
                <div className='login-form-row'>
                    <Input id='passcode' type='password' placeholder='6 digit passcode' minLength={6} maxLength={6} value={passcode} onChange={onChangePasscodeHandler} style={{width: "100%"}} />
                </div>
                <div className='login-form-row'>
                    <Button id='loginButton' onClick={onClickLoginHandler}>Login</Button>
                </div>
            </div>
        </div>
    );
}

export default Login;