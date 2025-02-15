import '../assets/styles/Login.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import Button from '../components/common/Button';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

let initialState = {
    email: "",
    password: "",
};

function Login() {
    const [loginInput, setLoginInput] = useState(initialState);
    const [signupData, setSignupData] = useState([]);
    const [loginData, setLoginData]= useState([]);
    const [quizzPage, setQuizzPage]= useState(false);

    const navigate = useNavigate();
  
    // input for loginInput
    useEffect(()=>{
    },[loginInput])
    console.log(loginInput);
    

    // Load signup data from local storage when the component mounts
    useEffect(() => {
        const loadSignupData = JSON.parse(localStorage.getItem("users")) || [];
        setSignupData(loadSignupData);
    }, []);


    //store data of login form in lcoal Storage
    useEffect(()=>{
        let existingUsers = JSON.parse(localStorage.getItem("userDetails")) || [];
        setLoginData(existingUsers);
    },[])
    console.log(signupData);


    // navigate to quizz page

    useEffect(()=>{
        if(quizzPage){
            navigate("/quizz");
        }
    },[quizzPage])
    
    function handleLoginInput(e) {
        const { name, value } = e.target;
        setLoginInput({
            ...loginInput,
            [name]: value,
        });
    }


    function loginButton() {
        const { email, password } = loginInput;
           
        let duplicateData = signupData.find((item)=>
             item.email === email && item.password === password
        )
        if(duplicateData){

            let loginDuplicate = loginData.find((item)=>
                item.email === email
            )
            if(!loginDuplicate){
                let userData = { 
                    name: duplicateData.name,
                    email: duplicateData.email,
                    score:0,  
                    user:[],
                };
                let updateData = [...loginData, userData];
                setLoginData(updateData);
                localStorage.setItem("userDetails",JSON.stringify(updateData));
                alert("login succesfully");
            }
            else{
                alert("user is already exist")
            } 
            setQuizzPage(true);
        }
        else{
            alert("invalid User");
            setLoginInput(initialState)
            return;
        }
   
    }
    // function loginButton() {
    //     const { email, password } = loginInput;
    
    //     // Find user in signup data
    //     let duplicateData = signupData.find(
    //         (item) => item.email === email
    //     );
    
    //     if (duplicateData) {
    //         let loginDuplicate = loginData.find(user => user.email === email);
    
    //         if (!loginDuplicate) {
    //             let userData = { 
    //                 name: duplicateData.name,
    //                 email: duplicateData.email,
    //                 score: 0,  
    //                 user: [],
    //             };
    //             let updatedUsers = [...loginData, userData];
    //             setLoginData(updatedUsers);
    //             localStorage.setItem("userDetails", JSON.stringify(updatedUsers));
    //             alert("Login successful!");
    //         } else {
    //             alert("User is already logged in!");
    //         }
    //     } else {
    //         alert("Invalid User");
    //         setLoginInput(initialState);
    //     }
    // }
    

    return (
        <>
            <div className='login-container'>
                <div className='quizz-image'>
                    <img src="src/assets/images/quizz.png" alt="Quiz logo" />
                </div>

                <div className='login-form'>
                    <h1>Login</h1>
                    <p>Please enter your details below.</p>

                    <div>
                        <label htmlFor="email">
                            Email <span className='required'>*</span>
                        </label>
                        <br />
                        <input
                            type="email"
                            placeholder='Enter your email'
                            id='user-email'
                            name='email'
                            value={loginInput.email}
                            onChange={handleLoginInput}
                        />
                        {/* {error.email && <div className="login-user-error">{error.email}</div>} */}
                    </div>

                    <div>
                        <label htmlFor="password">
                            Password <span className='required'>*</span>
                        </label>
                        <div className='user-password'>
                            <input
                                type="password"
                                placeholder='Enter password'
                                name='password'
                                value={loginInput.password}
                                onChange={handleLoginInput}
                            />
                            <FontAwesomeIcon icon={faEyeSlash} className='hide-password-icon' />
                        </div>
                        {/* {error.password && <div className="login-user-error">{error.password}</div>} */}
                    </div>

                    <Button title="Login" textName="login-button" onClick={loginButton} />
                    
                    <div className='google-icon'>
                        <img src="src/assets/images/google.png" alt="Google login" />
                        <p>Login with Google</p>
                    </div>
                    
                    <p className='switch-login'>Don't have an account? <a href="/signup">Signup</a></p>
                </div>
            </div>
        </>
    );
}

export default Login;
