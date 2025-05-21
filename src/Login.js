import { Button, Field, Input, Text } from '@fluentui/react-components';
import './Login.css';

function Login() {
    const login = async (event) => {
        console.log(event);
        const response = await fetch("http://localhost:8080/login", {method: "POST"});
        console.log(response);
    };
    return (
        <div id='login'>
            <h1>Login</h1>
            <div id='login-form'>
                <div className='login-form-row'>
                    <Field>
                        <Input id="phoneNumber" placeholder="Enter your phone number" size='large' type='tel' contentBefore={<Text id='phoneNumberPrefix'>+1</Text>} minLength={10} maxLength={10}/>
                    </Field>
                </div>
                <div className='login-form-row'>
                    <Field>
                        <Input id="passcode" type="password" placeholder="Enter your passcode" size='large'/>
                    </Field>
                </div>
                <div className='login-form-row'>
                    <Button id='loginButton' onClick={login}>Login</Button>
                </div>
            </div>
        </div>
    );
}

export default Login;