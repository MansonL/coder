import axios, { AxiosResponse } from "axios";
import React, { useContext, useState } from "react";
import { validation } from "../utils/joiSchemas";
import { LoggedIn } from "./components/LoggedIn";
import { LogSignHeader } from "./components/LogSignHeader";
import { UserContext } from "./components/UserProvider";
import './LogIn.css'
import { authResponse } from "./Main";
import { isFBUser, isUser } from '../../../server/src/interfaces/checkType'

export function LogIn (){
    
    const [showResult, setShowResult] = useState(false);
    const [loginSignResult, setLoginSignResult] = useState(false);
    const [msgResult, setMsgResult] = useState('');
    const [loggingOut, setLoggingOut] = useState(false);

    const { loggedIn, updateLoginStatus, updateDBUser, updateFBUser } = useContext(UserContext);

    const [showHide, setShowHide] = useState(false);
    
    const [credentials, setCredentials] = useState({
        username: '',
        password: '',
    });

    /**
     * Simple function for deleting the result message of the form submission attempt.
     */

    const deleteResultMsg = () => {
      setShowResult(false);
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

    const loginAxiosCallback = (response: AxiosResponse<authResponse, any>) => {
      const data = response.data;
        setShowResult(true);
        setLoginSignResult(true);
        setMsgResult(data.message);
        setTimeout(() => {
          if(isFBUser(data.data)){
            updateFBUser(data.data)  
          }else if(isUser(data.data)){
            updateDBUser(data.data)
          }
          updateLoginStatus();
          setLoggingOut(false);
        },2000)
    }

    /**
     * Function that receives the form submit event. Validate the current inputs value and then make the axios get 
     */

    const logInSubmit = (ev: React.FormEvent<HTMLFormElement>) => {
      ev.preventDefault();
      const { error } = validation.login.validate(credentials);
      if(error){
        setShowResult(true);
        setLoginSignResult(false);
        setMsgResult(error.message);
      }else{
        axios.post<authResponse>(`http://localhost:8080/api/auth/login`, credentials,{withCredentials: true}).then(loginAxiosCallback)
        .catch(error => {
          setShowResult(true);
          setLoginSignResult(false);
          if(error.response.status === 500){
            setMsgResult("Internal server error.")
          }else{
            setMsgResult("Wrong credentials.")
          }
        })
      }
    }

    /**
     * Facebook Login
     */
    const facebookLogin = () => {
      axios.get<authResponse>('http://localhost:8080/api/auth/facebook', { withCredentials: true })
      .then(loginAxiosCallback)
      .catch(error => {
        setShowResult(true);
          setLoginSignResult(false);
          console.log(error.response)
          if(error.response.status === 500){
            setMsgResult("Internal server error.")
          }else{
            setMsgResult("Wrong credentials.")
          }
      })
    }

    /**
     * Click handler for logging out. We show a goodbye message and after 2 seconds come back to the login form.
     */
    const logOutClick = async () => {
      setLoggingOut(true);
      axios.get<authResponse>('http://localhost:8080/api/auth/logout', { withCredentials: true }).then(response => {
        const data = response.data;
        if(data.message.match(/Logged out/g)){
          setLoggingOut(false);
          updateLoginStatus();
          setShowResult(false);
          setCredentials({
          username: '',
          password: '',
          })
        }         // Need to implement few modifications and UI for showing error in case of server
      })          // error at the attempt of logging out.
    }

    return (
        <>
        {!loggedIn ?  <>
        <LogSignHeader logSignResult={loginSignResult} type="login" deleteResultMsg={deleteResultMsg} showResult={showResult} msgResult={msgResult} />
    <section>
      <form onSubmit={logInSubmit}>
      <div className="user-login">
        
          <div className="row-form">
            
            <div className="effect-input"><input type="text" className="label-styled-input" value={credentials.username} onChange={onChange} name="username"/>
            <label className={`${credentials.username != '' ? "hasContent" : "label-styled"}`}>Email or username</label>
              <span className="form-border"/>
            </div>
          </div>
        <div className="pswd-form">
          <div className="effect-input"><input type={showHide ? "text" : "password"} className="label-styled-input" value={credentials.password} onChange={onChange} name="password"/>
            <label className={`${credentials.password !== '' ? "hasContent" : "label-styled"}`}>Password</label>
              <span className="form-border"/></div>
          <span className="show-pswd" onClick={showHideClick}>{showHide ? "Hide": "Show"}</span>
        </div>
        <div className="submit-row"><button type="submit" className="submit-form">Log in</button>
        <span>or</span>
            <div className="social-media-login-btns">
              <button className="btn btn-primary" onClick={facebookLogin}><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-facebook" viewBox="0 0 16 16">
  <path d="M16 8.049c0-4.446-3.582-8.05-8-8.05C3.58 0-.002 3.603-.002 8.05c0 4.017 2.926 7.347 6.75 7.951v-5.625h-2.03V8.05H6.75V6.275c0-2.017 1.195-3.131 3.022-3.131.876 0 1.791.157 1.791.157v1.98h-1.009c-.993 0-1.303.621-1.303 1.258v1.51h2.218l-.354 2.326H9.25V16c3.824-.604 6.75-3.934 6.75-7.951z"/>
</svg> </button>
              <button className="btn twitter-btn"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-twitter" viewBox="0 0 16 16">
  <path d="M5.026 15c6.038 0 9.341-5.003 9.341-9.334 0-.14 0-.282-.006-.422A6.685 6.685 0 0 0 16 3.542a6.658 6.658 0 0 1-1.889.518 3.301 3.301 0 0 0 1.447-1.817 6.533 6.533 0 0 1-2.087.793A3.286 3.286 0 0 0 7.875 6.03a9.325 9.325 0 0 1-6.767-3.429 3.289 3.289 0 0 0 1.018 4.382A3.323 3.323 0 0 1 .64 6.575v.045a3.288 3.288 0 0 0 2.632 3.218 3.203 3.203 0 0 1-.865.115 3.23 3.23 0 0 1-.614-.057 3.283 3.283 0 0 0 3.067 2.277A6.588 6.588 0 0 1 .78 13.58a6.32 6.32 0 0 1-.78-.045A9.344 9.344 0 0 0 5.026 15z"/>
</svg></button>
            </div>
          </div>
         </div>
        </form>
     
    </section>
    </> : <LoggedIn logOutClick={logOutClick} loggingOut={loggingOut}/>
    }
    </>
    )
}
