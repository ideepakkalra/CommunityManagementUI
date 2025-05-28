import { Button, Field, Input, MessageBar, MessageBarBody, Text, Textarea } from "@fluentui/react-components";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import "./Register.css";

function Register() {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [email, setEmail] = useState('');
  const [passcode, setPasscode] = useState('');
  const [message, setMessage] = useState(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const register = async (event) => {
        console.log("Registering with phone number: " + phoneNumber + " and passcode: " + passcode);
    };

  const onChangePhoneNumberHandler = (event, data) => {
        if((!/\D/.test(data.value))) {
            setPhoneNumber(data.value);
        }
    };

    const onChangeEmailHandler = (event, data) => {
      setEmail(data.value);
    }

    const onChangePasscodeHandler = (event, data) => {
        if((!/\D/.test(data.value))) {
            setPasscode(data.value);
        }
    };

  return (
    <div id='register'>
        <h1>Registration</h1>
        {message && <div className='register-form-row'>
            <MessageBar key={"message"} intent={"error"}>
                <MessageBarBody>
                    {message}
                </MessageBarBody>
            </MessageBar>
        </div>}
        <div id='register-form'>
            <div className='register-form-row'>
                <Input id='email' type='email' placeholder='enter your email address' maxLength={100} value={passcode} onChange={onChangeEmailHandler} style={{width: "100%"}}/>
            </div>
            <div className='register-form-row'>
                <Input id='firstName' type='text' placeholder='enter your first name' minLength={1} maxLength={100} value={passcode} onChange={onChangeEmailHandler} style={{width: "100%"}} />
            </div>
            <div className='register-form-row'>
                <Input id='lastName' type='text' placeholder='enter your last name' maxLength={100} value={passcode} onChange={onChangeEmailHandler} style={{width: "100%"}} />
            </div>
            <div className='register-form-row'>
                <Textarea id='description' placeholder='tell us something about you' maxLength={250} value={passcode} onChange={onChangeEmailHandler} style={{width: "100%"}} />
            </div>
            <div className='register-form-row'>
                <Input id='passcode' type='password' placeholder='enter 6 digit passcode' minLength={6} maxLength={6} value={passcode} onChange={onChangePasscodeHandler} style={{width: "100%"}} />
            </div>
            <div className='register-form-row'>
                <Button id='registerButton' onClick={register}>register</Button>
            </div>
        </div>
    </div>
  );
}

export default Register;