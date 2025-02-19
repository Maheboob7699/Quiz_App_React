import '../assets/styles/Signup.css';
import { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEyeSlash, faEye } from '@fortawesome/free-solid-svg-icons'
import Button from '../components/common/Button';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';



function Signup() {

    let signupInitialInput = {
        name: "",
        email: "",
        password: "",
        checked: false,
    };

    const [signupData, setSignupData] = useState([]);
    const [hideShow, setHideShow] = useState(false);
    const [signupInput, setSignupInput] = useState(signupInitialInput);
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
        const { name, value,type,checked } = e.target;
        setSignupInput({
            ...signupInput,
            [name]:type === "checkbox" ? checked: value,
        });
        console.log(signupInput);
        setError({ email: '', password: '' })
    }

    // login page
    useEffect(() => {
        if (loginPage) {
            navigate("./login")
        }
    }, [loginPage])

    // signup button
    function signupButton() {
        const { name, email, password,checked } = signupInput;
        if (name === "" && email === "" && password === "") {
             toast.error("all fields are required",{
                autoClose :2000,
            });
            return;
        };

        if (!email.includes("@")) {
            setError({ email: "@ is missing" });
            return
        }

        if (!email.includes(".com")) {
            setError({ email: ".com is missing" });
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
        if(!checked){
            alert("please accept terms and condition");
            return;
        }

        let duplicateData = signupData.find((item) => (item.name === name && item.email === email && item.password)
        )
        console.log("duplicateData", duplicateData);


        if (!duplicateData) {
            let updatedData = [...signupData, signupInput];
            setSignupData(updatedData);
            localStorage.setItem("users",JSON.stringify(updatedData));
            toast.success("signup succesfully")
            setLoginPage(true);
        }

        else {
            alert("user already exist");
            return
        }

    }

    function handleHideshow() {
        setHideShow(!hideShow);
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
                            <input type={hideShow ? "text" : "password"} placeholder='Enter password' name='password' value={signupInput.password} onChange={handleSignupInput} />
                            <FontAwesomeIcon icon={hideShow ? faEye : faEyeSlash} className='hide-password-icon' onClick={handleHideshow} />
                        </div>
                    </div>

                    <div className="sigunp-user-error"></div>

                    <label htmlFor="" className='check-terms' onChange={handleSignupInput}>
                        <input type="checkbox" required />
                        I accept <span>terms & condition</span>
                    </label> <br />
                    <Button title="Signup" textName="signup-button" onClick={signupButton} />
                    <div className='google-icon'>
                        <img src="src/assets/images/google.png" alt="" />
                        <p>signup with google</p>
                    </div>
                    <p className='switch-login'>Dont have an account? <Link to={"/login"}>Login ?</Link></p>
                </div>
            </div>
        </>
    );
}

export default Signup;
