import '../assets/styles/Signup.css';
import { useState,useEffect} from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEyeSlash} from '@fortawesome/free-solid-svg-icons'
import Button from '../components/common/Button';
import { signupButton,clearError } from '../reduxToolKit/signupReducer';
import { useSelector,useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

function Signup() {
    let initialData = {
        name:"",
        email:"",
        password:"",
    } ;
    const [signupInput, setSignupInput] = useState(initialData);
    const {userData,error,result} = useSelector((state)=>state.signupData);
    console.log(userData);
    console.log(error);
    console.log(result);
    
    
    const dispatch=useDispatch();
    const navigate = useNavigate();

    function handleSignupInput(e){
         const {name, value}= e.target;
         setSignupInput({
            ...signupInput,
            [name]:value,
         });
         console.log(signupInput); 
         if (error[name]) {
            dispatch(clearError(name));
        }
         }

    function handleAdd(){
        dispatch(signupButton(signupInput));
        setSignupInput(initialData);
    }

    useEffect(() => {
        console.log("Result state changed:", result);
        if (result) {
            navigate('/login');
        }
    }, [result, navigate]);

    return (
        <>
            <div className='signup-container'>
                <div className='quizz-image'>
                    <img src="src/assets/images/quizz.png" alt="" />

                </div>

                <div className='signup-form'>
                    <h1>Signup</h1>
                    <p>Please enter your details below.</p>

                    <div>
                        <label htmlFor="">
                            Full Name <span className='required'>*</span>
                        </label> <br />
                        <input type="text" placeholder='Enter your name'id='user-name' name='name' value={signupInput.name}  onChange={handleSignupInput}/>
                    </div>

                    <div>
                        <label htmlFor="">
                            Enter Email <span className='required'>*</span>
                        </label> <br />
                        <input type="email" placeholder='Enter your email' id='user-email' name='email' value={signupInput.email} onChange={handleSignupInput} />
                    </div>
                    {error ? <div className="sigunp-user-error">{error.email}</div>:null}
                    
                        <div>
                            <label htmlFor="">
                                password <span className='required'>*</span>
                            </label>
                            <div className='user-password'>
                              <input type="password" placeholder='Enter password' name='password' value={signupInput.password} onChange={handleSignupInput} />
                              <FontAwesomeIcon icon={faEyeSlash} className='hide-password-icon' />
                            </div>
                        </div>

                        <div className="sigunp-user-error"></div>

                        <label htmlFor="" className='check-terms'>
                            <input type="checkbox" />
                            I accept <span>terms & condition</span>
                        </label> <br />
                        <Button title="Signup" textName="signup-button" onClick={handleAdd} />
                        <div className='google-icon'>
                        <img src="src/assets/images/google.png" alt="" />
                            <p>signup with google</p>
                        </div>
                        <p className='switch-login'>Dont have an account? <a href="">Login ?</a></p>
                    </div>
                </div>
            </>
            );
}

            export default Signup;
