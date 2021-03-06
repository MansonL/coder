import axios from "axios";
import Joi from "joi";
import { useEffect, useState } from "react";
import { validation } from "../utils/joiSchemas";
import { LogIn } from "./LogIn";
import { SignUp } from "./SignUp";

export interface loginResponse {
    msg: string;
    data: Express.User | {}
  }
interface loginData {
  username: string;
  password: string;
}

export function Redirect () {
    const [showResult, setShowResult] = useState(false);
    const [loginSignResult, setLoginSignResult] = useState(false);
    const [msgResult, setMsgResult] = useState('');

    const [loggedIn, setLoggedIn] = useState(false);
    const [loggingOut, setLoggingOut] = useState(false);

    const [logOrSign, setLogOrSign] = useState('login');

    const [credentials, setCredentials] = useState({
        username: '',
        password: '',
    })

    /**
     * 
     * Simple function that modifies logOrSign state variable for changing between Login or Signup component. 
     * 
     */
    const logOrSignHandler = () => {
      setShowResult(false);  
      logOrSign === 'login' ? setLogOrSign('signup') : setLogOrSign('login');
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
     * Simple function for deleting the result message of the form submission attempt.
     */
     const deleteLogInMsg = () => {
        setShowResult(false);
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
          console.log(credentials)
          axios.post<loginResponse>('http://localhost:8080/api/login', credentials).then(
              response => {
                  const data = response.data;
                  setShowResult(true);
                  setLoginSignResult(true);
                  setMsgResult(data.msg);
                  setTimeout(() => {
                    setLoggedIn(true);
                    setLoggingOut(false);
                  },2000)
              }, (error) => {
                if(error.response){
                console.log(error.response)
                setShowResult(true);
                setLoginSignResult(false);
                setMsgResult(error.response.data.msg)
                }else if(error.request){
                  setShowResult(true);
                  setLoginSignResult(false);
                  setMsgResult("No response from server...")
                }
              })
          }
        }
      
      
      /**
       * Click handler for logging out. We show a goodbye message and after 2 seconds come back to the login form.
       */
      const logOutClick = () => {
        axios.get('http://localhost:8080/api/logout').then(response => { 
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
            }, () => {
              setShowResult(true);
              setMsgResult("Response code: 500. Internal error");
            })
              
      }

      const isUser = (user: any): user is Express.User => {
          return '_id' in user
      }


      useEffect(() => {
        if(logOrSign === 'login'){
            axios.get<loginResponse>('http://localhost:8080/api/login').then(response => {
            const data = response.data;
            console.log(data)
            if(data.msg.match(/already logged/g) && isUser(data.data)){
                setLoggedIn(true);
                setLoggingOut(false);
                setCredentials({
                    username: data.data.username,
                    password: data.data.password
                })
            }else{
                setLoggedIn(false);
                setShowResult(false);
            }
            }).catch(() => {
              setLoggedIn(false);
              setShowResult(false);
            })
         }
      }, [logOrSign])

      const signUpValidationError = (error: Joi.ValidationError) => {
          setShowResult(true); 
          setLoginSignResult(false);
          setMsgResult(error.message);
      };
      const signUpError = (msg: string) => {
        setShowResult(true);
        setLoginSignResult(false);
        setMsgResult(msg)
      }
      const signUpSuccessful = () => {
        setShowResult(true);
        setLoginSignResult(true);
        setMsgResult("Successfully signed up");
      }

    return(
        <> 
        <header>
      <div className="title">
        <h4>{`${logOrSign === 'login' ? "Log in" : "Sign up"}`}</h4>
        <div>
        <span>{`${logOrSign === 'login' ? 
        `Don't you have an account? Please, sign up in ` : 
        `Do you already have an account? Please, log in `}`}<a onClick={logOrSignHandler}>here</a></span>
          </div>
      </div>
    </header>
    {showResult && <div className="login-msg" style={{border: `2px solid ${loginSignResult ? "#83944C" : "#ff5d8f"}` }}>
      <header className="login-msg-header" style={{backgroundColor: `${loginSignResult ? "#99AC5D" : "#ff87ab"} `}}>
        <span className="login-header-msg">{`${loginSignResult ? "Succesfully logged in!" : "Failed to log in!"}`}</span>
        <img className="login-header-icon" src="../../grey-cross.png" onClick={deleteLogInMsg}></img>
        </header>
    <div className="login-msg-description" style={{backgroundColor: `${loginSignResult ? "#E9EDC9" : "#fadde1"}`}}>
      {msgResult}
    </div>
    </div>
}
    {loggedIn ? <>  
        <div className="logged-in-container-msg">
          <div className="logged-in-msg">
            { loggingOut ? `Goodbye ${credentials.username}` : `You're already logged in ${credentials.username}.` /* Here this line will be modified when whe store the users at DB*/} 
          </div>
          { !loggingOut && <button className="submit-form" onClick={logOutClick}>Log out</button>}
        </div>
        </> :
        logOrSign === 'login' ?
        
        <LogIn onChange={onChange} logInSubmit={logInSubmit} credentials={credentials}/> 
        : 
        
        <SignUp signUpError={signUpError} signUpValidationError={signUpValidationError} signUpSuccessful={signUpSuccessful}/>}
        
    </>
    )
}