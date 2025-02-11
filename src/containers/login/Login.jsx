import '../login/Login.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEyeSlash} from '@fortawesome/free-solid-svg-icons'
import Button from '../../components/button/Button';
import Image from '../../components/image/Image';
import quizzImage from "../../images/quizz.png";
console.log(quizzImage);

function Login(){
    return(
        <>
          <div className='login-container'>
                <div className='quizz-image'>
                    <img src="src/images/quizz.png" alt="" />
                    <Image imageSrc={quizzImage} />
                </div>

                <div className='login-form'>
                    <h1>Login</h1>
                    <p>Please enter your details below.</p>

                    <div>
                        <label htmlFor="">
                            Full Name <span className='required'>*</span>
                        </label> <br />
                        <input type="text" placeholder='Enter your name'id='user-name' />
                    </div>
                    <div className="login-user-error"></div>
                        <div>
                            <label htmlFor="">
                                password <span className='required'>*</span>
                            </label>
                            <div className='user-password'>
                              <input type="password" placeholder='Enter password' />
                              <FontAwesomeIcon icon={faEyeSlash} className='hide-password-icon' />
                            </div>
                        </div>

                        <div className="login-user-error"></div>
                        <Button title="login" textName="login-button" />
                        <div className='google-icon'>
                           <img src="src/images/google.png" alt="" />
                            <p>login with google</p>
                        </div>
                        <p className='switch-login'>Dont have an account? <a href="">Signup ?</a></p>
                    </div>
                </div>
        </>
    )
}

export default Login