import { Button, Input, Radio, RadioGroup, Spinner, Textarea } from "@fluentui/react-components";
import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router";
import "./Register.css";
import API from "./API";
import { DatePicker } from "@fluentui/react-datepicker-compat";
import { useDispatch } from "react-redux";
import { showErrorMessage } from "./slice";

function Register() {
    // eslint-disable-next-line 
    const [maxDate, setMaxDate] = useState(() => {
        const currDate = new Date();
        currDate.setFullYear(currDate.getFullYear() - 18);
        return currDate;
    });
    const [phoneNumber, setPhoneNumber] = useState(null);
    const [email, setEmail] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [description, setDescription] = useState('');
    const [gender, setGender] = useState('');
    const [dateOfBirth, setDateOfBirth] = useState(maxDate);
    const [referredBy, setReferredBy] = useState(null);
    const [referralId, setReferralId] = useState('');
    const [referralCode, setReferralCode] = useState('');
    const [passcode, setPasscode] = useState('');
    // eslint-disable-next-line 
    const [searchParams, setSearchParams] = useSearchParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const register = async (event) => {
        API.post("user", { phoneNumber, email, firstName, lastName, description, gender, dateOfBirth, referredBy, passcode, referralId, referralCode })
            .then((data) => {
                navigate("/login");
            })
            .catch((error) => {
                dispatch(showErrorMessage("Registration failed. [" + error + "]"));
            });
    };

    const onChangeEmailHandler = (event, data) => {
        setEmail(data.value);
    }

    const onChangeFirstNameHandler = (event, data) => {
        setFirstName(data.value);
    }

    const onChangeLastNameHandler = (event, data) => {
        setLastName(data.value);
    }

    const onChangeDescriptionHandler = (event, data) => {
        setDescription(data.value);
    }

    const onChangeGenderHandler = (event, data) => {
        setGender(data.value);
    }

    const onChangeDateOfBirthHandler = (data) => {
        setDateOfBirth(data);
    }

    const onChangePasscodeHandler = (event, data) => {
        if((!/\D/.test(data.value))) {
            setPasscode(data.value);
        }
    };

    useEffect(() => {
        if (!phoneNumber) {
            const ri = searchParams.get("ri");
            const rc = searchParams.get("rc");
            if (ri && rc) {
                API.get("referral/" + ri + "/" + rc).then((data) => {
                    if (data.state === "OPEN") {
                        setReferralId(ri);
                        setReferralCode(rc);
                        setPhoneNumber(data.phoneNumber);
                        setReferredBy(data.referrer);
                    } else {
                        dispatch(showErrorMessage("Invalid referral request."));
                    }
                });
            } else {
                dispatch(showErrorMessage("Invalid referral request."));
            }
        }
        // eslint-disable-next-line 
    }, [phoneNumber, searchParams])

  return (
    <div id='register'>
        <h1>Registration</h1>
        {phoneNumber == null ? <Spinner /> : <div id='register-form'>
            <div className='register-form-row'>
                    <Input id='phoneNumber' type='tel' disabled={true} placeholder='10 digit phone number' value={phoneNumber} />
                </div>
            <div className='register-form-row'>
                <Input id='email' type='email' placeholder='enter your email address' maxLength={100} value={email} onChange={onChangeEmailHandler} style={{width: "100%"}}/>
            </div>
            <div className='register-form-row'>
                <Input id='firstName' type='text' placeholder='enter your first name' minLength={1} maxLength={100} value={firstName} onChange={onChangeFirstNameHandler} style={{width: "100%"}} />
            </div>
            <div className='register-form-row'>
                <Input id='lastName' type='text' placeholder='enter your last name' maxLength={100} value={lastName} onChange={onChangeLastNameHandler} style={{width: "100%"}} />
            </div>
            <div className='register-form-row'>
                <Textarea id='description' placeholder='tell us something about you' maxLength={250} value={description} onChange={onChangeDescriptionHandler} style={{width: "100%"}} />
            </div>
            <div className='register-form-row'>
                <RadioGroup layout="horizontal" value={gender} onChange={onChangeGenderHandler}>
                    <Radio value="MALE" label="Male" />
                    <Radio value="FEMALE" label="Female" />
                </RadioGroup>
            </div>
            <div className='register-form-row'>
                <DatePicker id="dateOfBirth" placeholder="enter your date of birth (must be 18+)" maxDate={maxDate} onSelectDate={onChangeDateOfBirthHandler} style={{width: "100%"}}/>
            </div>
            <div className='register-form-row'>
                <Input id='passcode' type='password' placeholder='enter 6 digit passcode' minLength={6} maxLength={6} value={passcode} onChange={onChangePasscodeHandler} style={{width: "100%"}} />
            </div>
            <div className='register-form-row'>
                <Button id='registerButton' onClick={register}>register</Button>
            </div>
        </div> }
    </div>
  );
}

export default Register;