import '../assets/styles/Login.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEyeSlash } from '@fortawesome/free-solid-svg-icons'
import Button from '../components/common/Button';
import { useState,useEffect } from 'react';
import { loginButton,checkError } from '../reduxToolKit/loginReducer';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

let initialState = {
    email: "",
    password: "",
}
function Login() {
    const [loginInput, setLoginInput] = useState(initialState);
    console.log(loginInput);
    
    const {singnupData,loginStore,error,result} = useSelector((state) => state.loginData);
    console.log(singnupData);
    console.log(loginStore);
    console.log(result);
    
    const dispatch = useDispatch();
    const navigate = useNavigate();

    function handleLogin() {
        dispatch(loginButton(loginInput))
    }

    function handleLoginInput(e) {
        const { name, value } = e.target
        setLoginInput({
            ...loginInput,
            [name]: value,
        })
        console.log(loginInput);
         dispatch(checkError(name))
    }

       useEffect(() => {
            console.log("Result state changed:", result);
            if (result) {
                navigate('/quizz');
            }
        }, [result, navigate]);

    
    return (
        <>
            <div className='login-container'>
                <div className='quizz-image'>
                    <img src="src/assets/images/quizz.png" alt="" />
                </div>

                <div className='login-form'>
                    <h1>Login</h1>
                    <p>Please enter your details below.</p>

                    <div>
                        <label htmlFor="">
                            Full Name <span className='required'>*</span>
                        </label> <br />
                        <input type="text" placeholder='Enter your name' id='user-name' name='email' value={loginInput.email} onChange={handleLoginInput} />
                    </div>
                    {error ? <div className="login-user-error">{error.email}</div>:null}
                    <div>
                        <label htmlFor="">
                            password <span className='required'>*</span>
                        </label>
                        <div className='user-password'>
                            <input type="password" placeholder='Enter password' name='password' value={loginInput.password} onChange={handleLoginInput} />
                            <FontAwesomeIcon icon={faEyeSlash} className='hide-password-icon' />
                        </div>
                    </div>
                    {error ? <div className="login-user-error">{error.password}</div>:null}

                    <div className="login-user-error"></div>
                    <Button title="login" textName="login-button" onClick={handleLogin} />
                    <div className='google-icon'>
                        <img src="src/assets/images/google.png" alt="" />
                        <p>login with google</p>
                    </div>
                    <p className='switch-login'>Dont have an account? <a href="">Signup ?</a></p>
                </div>
            </div>
        </>
    )
}

export default Login