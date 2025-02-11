import '../signup/Signup.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEyeSlash} from '@fortawesome/free-solid-svg-icons'

import Button from '../../components/button/Button';
import Image from '../../components/image/Image';
import quizzImage from "../../images/quizz.png";
console.log(quizzImage);

function Signup() {
    return (
        <>
            <div className='signup-container'>
                <div className='quizz-image'>
                    <img src="src/images/quizz.png" alt="" />
                    <Image imageSrc={quizzImage} />
                </div>

                <div className='signup-form'>
                    <h1>Signup</h1>
                    <p>Please enter your details below.</p>

                    <div>
                        <label htmlFor="">
                            Full Name <span className='required'>*</span>
                        </label> <br />
                        <input type="text" placeholder='Enter your name'id='user-name' />
                    </div>
                    <div className="sigunp-user-error"></div>
                    <div>
                        <label htmlFor="">
                            Enter Email <span className='required'>*</span>
                        </label> <br />
                        <input type="email" placeholder='Enter your email' id='user-email' />
                    </div>
                    <div className="sigunp-user-error"></div>
                    
                        <div>
                            <label htmlFor="">
                                password <span className='required'>*</span>
                            </label>
                            <div className='user-password'>
                              <input type="password" placeholder='Enter password' />
                              <FontAwesomeIcon icon={faEyeSlash} className='hide-password-icon' />
                            </div>
                        </div>

                        <div className="sigunp-user-error"></div>

                        <label htmlFor="" className='check-terms'>
                            <input type="checkbox" />
                            I accept <span>terms & condition</span>
                        </label> <br />
                        <Button title="Signup" textName="signup-button" />
                        <div className='google-icon'>
                        <img src="src/images/google.png" alt="" />
                            <p>signup with google</p>
                        </div>
                        <p className='switch-login'>Dont have an account? <a href="">Login ?</a></p>
                    </div>
                </div>
            </>
            );
}

            export default Signup;
