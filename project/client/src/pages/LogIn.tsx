import axios from "axios";
import React, { useEffect, useState } from "react";
import { validation } from "../utils/joiSchemas";
import './LogIn.css'

interface loginResponse {
  process: string;
  message: string;
}


export function LogIn (){
    
    const [showResultLogin, setShowResultLogin] = useState(false);
    const [loginResult, setLoginResult] = useState(false);
    const [loginMsgResult, setLoginMsgResult] = useState('');

    const [loggedIn, setLoggedIn] = useState(false);
    const [loggingOut, setLoggingOut] = useState(false);

    const [showHide, setShowHide] = useState(false);

    const [credentials, setCredentials] = useState({
        user: '',
        password: '',
    });

    /**
     * Simple function for deleting the result message of the form submission attempt.
     */
    const deleteLogInMsg = () => {
      setShowResultLogin(false);
    }

    /**
     * Simple function for changing the Hide/Show button at password input.
     */
    const showHideClick = () => {
      setShowHide(!showHide);
    }

    /**
     * At every change event in the inputs field, we are setting the state with those values.
     * @param ev event param, just for taking the target name & value.
     */
    const onChange = (ev: React.ChangeEvent<HTMLInputElement>) => {
      const property = ev.target.name;
      const value = ev.target.value;
      setCredentials({
        ...credentials,
        [property]: value,
      })
    }

    /**
     * Function that receives the form submit event. Validate the current inputs value and then make the axios get (just for Class24 Assignment)
     */
    const logInSubmit = async (ev: React.FormEvent<HTMLFormElement>) => {
      ev.preventDefault();
      const { error } = validation.login.validate(credentials);
      if(error){
        setShowResultLogin(true);
        setLoginResult(false);
        setLoginMsgResult(error.message);
      }else{
        const response = await (await axios.get<loginResponse>(`http://localhost:8080/users/login?user=${credentials.user}&password=${credentials.password}`, {withCredentials: true})).data;
        if(response.process.match(/Error/g)){
          setShowResultLogin(true);
          setLoginResult(false);
          setLoginMsgResult(response.message)
        }else{
          setShowResultLogin(true);
          setLoginResult(true);
          setLoginMsgResult(response.message);
          setTimeout(() => {
            setLoggedIn(true);
            setLoggingOut(false);
          },2000)
        }
      }
    }
    
    /**
     * Click handler for logging out. We show a goodbye message and after 2 seconds come back to the login form.
     */
    const logOutClick = async () => {
      setLoggingOut(true);
      setTimeout(() => {
        setLoggingOut(false);
        setLoggedIn(false);
        setShowResultLogin(false);
        setCredentials({
          user: '',
          password: '',
        })
      }, 2000)
    }
    
    useEffect(() => {
      axios.get<loginResponse>('http://localhost:8080/users/login', {withCredentials: true}).then(response => {
        const data = response.data;
        console.log(data.message)
        if(data.message.match(/already logged/g)){
          setLoggedIn(true);
          setLoggingOut(false);
        }else{
          setLoggedIn(false);
          setShowResultLogin(false);
        }
      })
    }, [])

    return (
        <>
        {!loggedIn ?  <>
        <header>
      <div className="title">
        <h4>Sign in</h4>
      </div>
    </header>
    {showResultLogin && <div className="login-msg" style={{border: `2px solid ${loginResult ? "#83944C" : "#ff5d8f"}` }}>
      <header className="login-msg-header" style={{backgroundColor: `${loginResult ? "#99AC5D" : "#ff87ab"} `}}>
        <span className="login-header-msg">{`${loginResult ? "Succesfully logged in!" : "Failed to log in!"}`}</span>
        <img className="login-header-icon" src="../../grey-cross.png" onClick={deleteLogInMsg}></img>
        </header>
    <div className="login-msg-description" style={{backgroundColor: `${loginResult ? "#E9EDC9" : "#fadde1"}`}}>
      {loginMsgResult}
    </div>
    </div>
}
    <section>
      <form onSubmit={logInSubmit}>
      <div className="user-login">
        
          <div className="row-form">
            
            <div className="effect-input"><input type="text" className="label-styled-input" value={credentials.user} onChange={onChange} name="user"/>
            <label className={`${credentials.user != '' ? "hasContent" : "label-styled"}`}>Email or username</label>
              <span className="form-border"/>
            </div>
          </div>
        <div className="pswd-form">
          <div className="effect-input"><input type={showHide ? "text" : "password"} className="label-styled-input" value={credentials.password} onChange={onChange} name="password"/>
            <label className={`${credentials.password != '' ? "hasContent" : "label-styled"}`}>Password</label>
              <span className="form-border"/></div>
          <span className="show-pswd" onClick={showHideClick}>{showHide ? "Hide": "Show"}</span>
        </div>
        <div className="submit-row">
          <button type="submit" className="submit-form">Log in</button>
        </div>
         </div>
        </form>
     
    </section>
    </> : 
    <>
    <div className="logged-in-container-msg">
      <div className="logged-in-msg">
        { loggingOut ? `Goodbye ${credentials.user}` : `You're already logged in ${credentials.user}.` /* Here this line will be modified when whe store the users at DB*/} 
      </div>
      { !loggingOut && <button className="submit-form" onClick={logOutClick}>Log out</button>}
    </div>
    </>}
    </>
    )
}
