import axios from "axios";
import React, { useEffect, useState } from "react";
import { validation } from "../utils/joiSchemas";
import { LoggedIn } from "./components/LoggedIn";
import { LogSignHeader } from "./components/LogSignHeader";
import './LogIn.css'
import { authResponse } from "./Main";


export function LogIn (){
    
    const [showResult, setShowResult] = useState(false);
    const [loginSignResult, setLoginSignResult] = useState(false);
    const [msgResult, setMsgResult] = useState('');

    const [loggedIn, setLoggedIn] = useState(false);
    const [loggingOut, setLoggingOut] = useState(false);

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
    const logInSubmit = async (ev: React.FormEvent<HTMLFormElement>) => {
      ev.preventDefault();
      const { error } = validation.login.validate(credentials);
      if(error){
        setShowResult(true);
        setLoginSignResult(false);
        setMsgResult(error.message);
      }else{
        const response = await (await axios.post<authResponse>(`http://localhost:8080/api/auth/login}`, credentials,{withCredentials: true})).data;
        if(response.message.match(/Error/g)){
          setShowResult(true);
          setLoginSignResult(false);
          setMsgResult(response.message)
        }else{
          setShowResult(true);
          setLoginSignResult(true);
          setMsgResult(response.message);
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
        setShowResult(false);
        setCredentials({
          username: '',
          password: '',
        })
      }, 2000)
    }
    
    useEffect(() => {
      axios.get<authResponse>('http://localhost:8080/api/auth/login', {withCredentials: true}).then(response => {
        const data = response.data;
        console.log(data.message)
        if(data.message.match(/already logged/g)){
          setLoggedIn(true);
          setLoggingOut(false);
        }else{
          setLoggedIn(false);
          setShowResult(false);
        }
      })
    }, [])

    return (
        <>
        {!loggedIn ?  <>
        <LogSignHeader logSignResult={loginSignResult} type="login" deleteResultMsg={deleteResultMsg} showResult={showResult} msgResult={msgResult}/>
    <section>
      <form onSubmit={logInSubmit}>
      <div className="user-login">
        
          <div className="row-form">
            
            <div className="effect-input"><input type="text" className="label-styled-input" value={credentials.username} onChange={onChange} name="user"/>
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
    </> : <LoggedIn logOutClick={logOutClick} loggingOut={loggingOut} credentials={credentials}/>
    }
    </>
    )
}
