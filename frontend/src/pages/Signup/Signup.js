import "./signup.css"
import React from "react"
import { useState, useEffect } from "react"
import {  createUserWithEmailAndPassword, setPersistence, signInWithEmailAndPassword ,browserLocalPersistence } from 'firebase/auth';
import { auth,database } from "../../firebase_setup/firebase";
import { ref, set } from 'firebase/database';
import { NavLink, useNavigate } from 'react-router-dom';
import { faUser, faEnvelope, faLock } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import BoxBreathing from "../../components/BoxBreathing/BoxBreathing";
import { counter } from "@fortawesome/fontawesome-svg-core";

const Signup = () => {
    const navigate = useNavigate();
    const [username,setUsername]=useState('');
    const [email,setEmail]=useState('');
    const [password, setPassword] = useState('');
    const [cPassword, setCPassword] = useState('');
    const [checkPassConstraint, setPassConstraint] = useState(false);
    const [showPassError, setShowPassError] = useState(false);
    const [showErrorMessage, setShowErrorMessage] = useState(false);
    const [isCPasswordDirty, setIsCPasswordDirty] = useState(false);
    const [displayLoginError,setDisplayLoginError] =useState("");
    const [emaillogin, setEmaillogin] = useState('');
    const [passwordlogin, setPasswordlogin] = useState('');
    const [isActive, setIsActive] = useState(true);
    

    const onLogin = (e) => {
        e.preventDefault();
        setPersistence(auth, browserLocalPersistence)
            .then(() => {
                signInWithEmailAndPassword(auth, emaillogin, passwordlogin).then(async (userCredential) => {
                    const userToken = await userCredential.user.getIdToken();
                    localStorage.setItem('userToken', userToken);
                    localStorage.setItem('uid',auth.currentUser.uid)
                    navigate("/")
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                console.log(errorCode, errorMessage)
                setDisplayLoginError(errorMessage)
            });
    })
    .catch((error) => {
    // Handle Errors here.
    const errorCode = error.code;
    const errorMessage = error.message;
  });
    }

        
    //check whether the password length is greater than 6
    const handlePassword = (e)=>{
        setPassword(e.target.value);
        setPassConstraint(true);
    }

    useEffect(()=>{
        if(checkPassConstraint){
            if(password.length>6 == true){
                setShowPassError(false);
            } else{
                setShowPassError(true);
            }
        }
    },[password])

    //check whether the confirm password matches the original password    
    const handleCPassword = (e) => {
        setCPassword(e.target.value);
        setIsCPasswordDirty(true);
    }

    useEffect(() => {
        if (isCPasswordDirty) {
            if (password === cPassword) {
                setShowErrorMessage(false);
            } else {
                setShowErrorMessage(true);
            }
        }
    }, [cPassword])

    //submit the email and password values to firebase
    const onSubmit = async (e) => {
      e.preventDefault();

        try {
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;
            const currentDate=new Date().toISOString().split('T')[0];
            await set(ref(database, `users/${user.uid}`), {
            username: username,
            email: email,
            customMeditationBestTime:{
                0:{
                    date:currentDate,
                    count:0
                }
            },
            streaks:{
                boxBreathingstreak:{
                    0:{
                        date:currentDate,
                        count:0
                    }
                }
            },
            yogaBestTime:{
                goddess:{
                    [currentDate]:0
                },
                lunge:{
                    [currentDate]:0
                },
                mountain:{
                    [currentDate]:0
                },
                tree:{
                    [currentDate]:0
                },
                warrior:{
                    [currentDate]:0
                },
            }
            });
            console.log('User signed up successfully!');
            navigate("/signup");
            setIsActive(current => !current);

        } catch (error) {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.error(errorCode, errorMessage);
            alert(`${errorCode}: ${errorMessage}`);
        }
    }
    const handleClick=()=>{
        setIsActive(current=>!current);
    }
    
    return (
        <>
        
        <div className={`container ${isActive?'sign-up-mode':''}`}>
            <div className="forms-container">
                <div className="signin-signup">
                    <form className="signup-form">
                        <h1 className="title">SIGN UP</h1>
                        <div className="input-field">
                            <FontAwesomeIcon className="FontAwesomeIcon" icon={faUser} />
                            <input type="text" placeholder="username" vallue={username}
                            onChange={(e)=>{setUsername(e.target.value)}} required/> <br/>
                        </div>
                        <div className="input-field">
                            <FontAwesomeIcon className="FontAwesomeIcon" icon={faEnvelope} />
                            <input type="email" name="email" placeholder="email" value={email}
                            onChange={(e) => { setEmail(e.target.value) }} required/><br/>
                        </div>
                        
                        <div className="input-field">
                            <FontAwesomeIcon className="FontAwesomeIcon" icon={faLock} />
                            <input type="password" name="password" placeholder="password" value={password}
                            onChange={handlePassword} required/><br/>
                        </div>
                        
                        { showPassError && checkPassConstraint ? <div> Password must be of atleast 6 characters </div> :' '}
                        
                        <div className="input-field">
                            <FontAwesomeIcon className="FontAwesomeIcon" icon={faLock} />
                            <input type="password" name="cPassword" placeholder="confirm password" value={cPassword}
                            onChange={handleCPassword} required /><br/>
                        </div>
                        
                        
                        {showErrorMessage && isCPasswordDirty ? <div> Passwords did not match </div> : ''}
                        
                        <button  type="submit" className="btn solid" name="signup" onClick={onSubmit} >SIGNUP</button><br/>

                        {/* <p>Already have an account? <NavLink to="/login">Log in</NavLink></p> */}
                    </form> 

                    {/************* LOGIN **************/}
                
                    <form className="login-form">
                            <h1 className="title">LOG IN</h1>

                            <div className="input-field">
                                <FontAwesomeIcon className="FontAwesomeIcon" icon={faEnvelope} />
                                <input type="email" name="email" placeholder="email" required onChange={(e)=>setEmaillogin(e.target.value)} /><br/>
                            </div>

                            <div className="input-field">
                                <FontAwesomeIcon className="FontAwesomeIcon" icon={faLock} />
                                <input type="password" name="password" placeholder="password" required onChange={(e)=>setPasswordlogin(e.target.value)} /><br/>    
                            </div>
                            { displayLoginError ? <div> Enter correct email or password </div> : ''}
                            <button type="submit" className="btn" onClick={onLogin} >LOGIN</button><br/>

                    </form>
                </div> 
            </div>
            <div className="panels-container">
                    <div className="panel left-panel">
                        <div className="content">
                            <h3>Already have an account</h3>
                            <p>A fitness journey isn't just about achieving a certain body shape; it's about embracing a lifestyle</p>
                            <button className="btn transparent" id="login-button" onClick={handleClick}>LOGIN</button>
                        </div>
                        <img src="./media/signup/dream-world.svg" className="image"/>
                    </div>

                    <div className="panel right-panel">
                        <div className="content">
                            <h3>New Here</h3>
                            <p>Celebrate every milestone along your fitness journey, 
                            recognizing the progress you've made and the growth 
                             you've experienced.</p>
                            <button className="btn transparent" id="signup-button" onClick={handleClick}>SIGNUP</button>
                        </div>
                        <img src="./media/signup/stability-ball.svg" alt="" className="image"/>
                    </div>
            </div>
        </div>
               
        </>
    )
}

export default Signup

