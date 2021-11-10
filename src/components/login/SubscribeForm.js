import React, { useContext, useState } from 'react';
import { useHistory } from 'react-router-dom';
import validator from 'validator';
// import { loginAction } from '../../actions/loginActions';
import { LoginContext } from '../../context/LoginContext';
import { saveUserOnCookie } from '../../cookies/cookies';
import { subscribeToSite } from '../../server/auth';

const SubscribeForm = (props) => {
    const { dispatchUserData } = useContext(LoginContext);

    const [inputClasses, setInputClasses] = useState(["", "", "", "", ""]);
    const [invalidMessages, setInvalidMessages] = useState(["", "", "", "", ""]);
    const [validInputs, setValidInputs] = useState([false, false, false, false, false]);
    const [email, setEmail] = useState("");
    const [age, setage] = useState("");
    const [password, setPassword] = useState("");
    const [username, setUsername] = useState("");

    const history = useHistory();

    const isFormInvalid = () => {
        // return validInputs.includes(false);
        return false

    };

    const validateInput = (
        value,
        inputindex,
        isValueValidFunc,
        setValue,
        missingValueMessage,
        invalidValueMessage
    ) => {
        const setStateOfInputs = (message, inputClass, isvalidInput) => {
            const newInavlidMessages = [...invalidMessages];
            const newInputClasses = [...inputClasses];
            const newValidInputs = [...validInputs];
            newInavlidMessages[inputindex] = message;
            setInvalidMessages(newInavlidMessages);
            newInputClasses[inputindex] = inputClass;
            setInputClasses(newInputClasses);
            newValidInputs[inputindex] = isvalidInput;
            setValidInputs(newValidInputs);
        };

        if (value.length > 0) {
            if (isValueValidFunc(value)) {
                setStateOfInputs("", "", true);
                setValue(value);
            } else {
                setStateOfInputs(invalidValueMessage, "input-invalid", false);
            }
        } else {
            setStateOfInputs(missingValueMessage, "input-invalid", false);
        }
    };

    const onBlurUsername = (event) => {
        const newUsername = event.target.value.trim();
        const isUsenamevalid = (value) => {
            return value.toLowerCase() !== "moshe";
        };
        validateInput(
            newUsername,
            0,
            isUsenamevalid,
            setUsername,
            "You must enter username",
            "Username could not be MOSHE!!!"
        );
    };

    const onBlurAge = (event) => {
        const newAge = event.target.value.trim();
        const isAgeValid = (value) => {
            return value > 11;
        };
        validateInput(
            newAge,
            1,
            isAgeValid,
            setage,
            "You must enter your age",
            "you are too young"
        );
    };

    const onBlurEmail = (event) => {
        const newEmail = event.target.value.trim();

        validateInput(
            newEmail,
            2,
            validator.isEmail,
            setEmail,
            "You must enter your email",
            "Email invalid"
        );
    };

    const onBlurPassword = (event) => {
        const newPassword = event.target.value.trim();
        const isPasswordValid = (value) => {
            //const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{6,}$/;
            // return passwordRegex.test(value);
            return true
        };
        validateInput(
            newPassword,
            3,
            isPasswordValid,
            setPassword,
            "You must enter password",
            "Password must contain capital and regular characters, numbers and must have at least 6 characters"
        );
    };

    const onBlurPasswordRepeated = (event) => {
        const passwordRepeated = event.target.value.trim();
        const isPasswordRepeatedValid = (value) => {
            return password === passwordRepeated;
        };
        validateInput(
            passwordRepeated,
            4,
            isPasswordRepeatedValid,
            () => { },
            "You must enter again your password",
            "The two passwords not identical"
        );
    };

    const onSubmitform = (event) => {
        event.preventDefault();
        subscribeToSite(email, password).then(
            (userData) => {
				dispatchUserData({
					token: userData.token,
					user:userData.user
				});
                saveUserOnCookie(userData);
                history.push("/home");
            },
            (err) => {
                if (err.message === "EMAIL_EXISTS") {
                    setInputClasses(["", "", "input-invalid", "", ""]);
                    setInvalidMessages(["", "", "This email is already in use!", "", ""]);
                    setValidInputs([true, true, false, true, true]);
                }
            }
        );
        
    };

    const onClickLogin = () => {
        props.setIsLoginMode(true);
    };

    return (
        <div className="login-form">
            <h3>Subscribe</h3>
            <form onSubmit={ onSubmitform }>
                <input placeholder="Username" className={ inputClasses[0] } onBlur={ onBlurUsername } />
                { invalidMessages[0] !== "" && <div className="invalid-message">{ invalidMessages[0] }</div> }
                <input placeholder="Age" type="number" className={ inputClasses[1] } onBlur={ onBlurAge } />
                { invalidMessages[1] !== "" && <div className="invalid-message">{ invalidMessages[1] }</div> }
                <input placeholder="Email" className={ inputClasses[2] } onBlur={ onBlurEmail } />
                { invalidMessages[2] !== "" && <div className="invalid-message">{ invalidMessages[2] }</div> }
                <input type="password" placeholder="Password" className={ inputClasses[3] } onBlur={ onBlurPassword } />
                { invalidMessages[3] !== "" && <div className="invalid-message">{ invalidMessages[3] }</div> }
                <input type="password" placeholder="Repeat on password" className={ inputClasses[4] } onBlur={ onBlurPasswordRepeated } />
                { invalidMessages[4] !== "" && <div className="invalid-message">{ invalidMessages[4] }</div> }

                <div className="login-form__nav">
                    <button type="submit" disabled={ isFormInvalid() }>Submit</button>
                    <div onClick={ onClickLogin }>Login</div>
                </div>
            </form>
        </div>
    );
};

export default SubscribeForm;