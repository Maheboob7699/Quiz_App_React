import '../assets/styles/Signup.css';
import { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEyeSlash } from '@fortawesome/free-solid-svg-icons'
import Button from '../components/common/Button';
import { useNavigate } from 'react-router-dom';


function Signup() {

    let initialData = {
        name: "",
        email: "",
        password: "",
    };
    const [signupData, setSignupData] = useState([]);
    const [signupInput, setSignupInput] = useState(initialData);
    const [error, setError] = useState({
        email: '',
        password: '',
    });
    const [loginPage, setLoginPage] = useState(false);
    const navigate = useNavigate();


    useEffect(() => {
        const localSignupData = JSON.parse(localStorage.getItem("users")) || [];
        setSignupData(localSignupData);
    }, [])

    // localStorage
    console.log(signupData);

    useEffect(() => {
    }, [signupInput])
    

    //   input
    function handleSignupInput(e) {
        const { name, value } = e.target;
        setSignupInput({
            ...signupInput,
            [name]: value,
        });
        console.log(signupInput);

        setError({ email: '', password: '' })
    }

    // login page
    useEffect(()=>{
        if(loginPage){
            navigate("./login")
        }
    },[loginPage])

    // signup button
    function signupButton() {
        const { name, email, password } = signupInput;
        if (name === "" && email === "" && password === "") {
            alert("all fields are required")
            return;
        };

        if (!email.includes("@")) {
            setError({ email: "@ is missing" });
            return
        }

        if (!email.includes(".com")) {
            setError({ email:".com is missing"});
            return
        }

        if (password.length < 6) {
            setError({ password: "password must be at least 6 character long" });
            return;
        }

        if (!/[a-z]/.test(password)) {
            setError({ password: "Password must contain at least one lowercase letter" });
            return;
        }

        if (!/[0-9]/.test(password)) {
            setError({ password: "Password must contain at least one number" });
            return;
        }

        if (!/[@$!%*?&]/.test(password)) {
            setError({ password: "Password must contain at least one special character (@, $, !, %, *, ?, &)" });
            return;
        }

        let duplicateData = signupData.find((item)=> (item.name === name && item.email === email && item.password)
        )
        console.log("duplicateData",duplicateData);
        

        if(!duplicateData){
            let updatedData =[...signupData,signupInput];
            setSignupData(updatedData);
            localStorage.setItem("users",JSON.stringify(updatedData));
            alert("signup succesfully")
            setLoginPage(true);
        }

        else{
            alert("user already exist");
            return
        }
        
    }

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
                        <input type="text" placeholder='Enter your name' id='user-name' name='name' value={signupInput.name} onChange={handleSignupInput} />
                    </div>

                    <div>
                        <label htmlFor="">
                            Enter Email <span className='required'>*</span>
                        </label> <br />
                        <input type="email" placeholder='Enter your email' id='user-email' name='email' value={signupInput.email} onChange={handleSignupInput} />
                    </div>
                    {error.email ? <div className="sigunp-user-error">{error.email}</div> : null}

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
                    <Button title="Signup" textName="signup-button" onClick={signupButton} />
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
