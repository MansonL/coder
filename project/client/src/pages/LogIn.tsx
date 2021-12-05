import axios from "axios";
import React, { useContext, useState } from "react";
import { validation } from "../utils/joiSchemas";
import { LoggedIn } from "./components/LoggedIn";
import { LogSignHeader } from "./components/LogSignHeader";
import { UserContext } from "./components/UserProvider";
import './LogIn.css'
import { authResponse } from "./Main";


export function LogIn (){
    
    const [showResult, setShowResult] = useState(false);
    const [loginSignResult, setLoginSignResult] = useState(false);
    const [msgResult, setMsgResult] = useState('');
    const [loggingOut, setLoggingOut] = useState(false);

    const { loggedIn, updateLoginStatus, updateUser } = useContext(UserContext);

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

    /**
     * Function that receives the form submit event. Validate the current inputs value and then make the axios get (just for Class24 Assignment)
     */

    const logInSubmit = (ev: React.FormEvent<HTMLFormElement>) => {
      ev.preventDefault();
      const { error } = validation.login.validate(credentials);
      if(error){
        setShowResult(true);
        setLoginSignResult(false);
        setMsgResult(error.message);
      }else{
        axios.post<authResponse>(`http://localhost:8080/api/auth/login`, credentials,{withCredentials: true}).then(response => {
          const data = response.data;
          setShowResult(true);
          setLoginSignResult(true);
          setMsgResult(data.message);
          setTimeout(() => {
            updateUser(data.data)
            updateLoginStatus();
            setLoggingOut(false);
          },2000)
        }).catch(error => {
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
    </> : <LoggedIn logOutClick={logOutClick} loggingOut={loggingOut}/>
    }
    </>
    )
}
