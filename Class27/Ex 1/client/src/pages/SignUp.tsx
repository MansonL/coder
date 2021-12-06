import axios from "axios";
import moment from "moment";
import React from "react";
import { useContext, useState } from "react";
import { INew_User } from "../../../server/src/interfaces/interfaces";
import { validation } from "../lib/joiSchemas";
import { LoggedIn } from "./components/LoggedIn";
import { LogSignHeader } from "./components/LogSignHeader";
import { SignUpForm } from "./components/SignUpForm";
import { authResponse } from "./Main";
import { UserContext } from './components/UserProvider'
import './SignUp.css'

export function SignUp () {
    
    const [showResult, setShowResult] = useState(false);
    const [loginSignResult, setLoginSignResult] = useState(false);
    const [msgResult, setMsgResult] = useState('');
    const [loggingOut, setLoggingOut] = useState(false);

    const { loggedIn, updateLoginStatus } = useContext(UserContext)

    /**
     * Simple function for deleting the result message of the form submission attempt.
     */
    const deleteResultMsg = () => {
      setShowResult(false);
    }

    const [newUser, setNewUser] = useState<INew_User>({
        timestamp: '',
        username: '',
        password: '',
        name: '',
        surname: '',
        age: '',
        alias: '',
        avatar: '',
    })
    const [repeatedPassword, setRepeatedPassword] = useState('')
    //const [showPassRequirements, setShowPassRequirements] = useState([false, false]);
    
    /**
     * 
     * @param ev with this param we are getting the value of the target fields "name" & "value"
     * With them we are going to make a dinamic change of the user data state, accessing to the user data
     * properties via [key : string]. 
     * 
     */
    const onChange = (ev: React.ChangeEvent<HTMLInputElement>) => {
        const property = ev.target.name;
        const value = ev.target.value;
        setNewUser({
            ...newUser,
            [property]: value
        })
    }
    

    /**
     * 
     * @param ev just for preventing default submit action.
     * 
     * Description:
     * First complete the user object timestamp for requesting the signing up to the backend. 
     * Check if there's an error or not with the user data validation. Then make the POST request & show if
     * it was successful or there was an error.
     * 
     */
    const signupSubmit = (ev: React.FormEvent<HTMLFormElement>) => {
        ev.preventDefault();
        const user : INew_User= {
            ...newUser,
            timestamp: moment().format('YYYY-MM-DD HH:mm:ss')
        }
        const { error } = validation.user.validate(user);
        if(error){
          setShowResult(true);
          setLoginSignResult(false);
          setMsgResult(error.message);
        }else{
          axios.post<authResponse>('http://localhost:8080/api/auth/signup', user, { withCredentials: true }).then(response => {
            const data = response.data;
            if(data.data){
              setShowResult(true);
              setLoginSignResult(true);
              setMsgResult(data.message);  
            }else{
              setShowResult(true);
              setLoginSignResult(false);
              setMsgResult(data.message)
            }
          }).catch(error => {
            setShowResult(true);
            setLoginSignResult(false);
            setMsgResult(error.response.data.message)
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
            }
      })
      }

    return (
        <>
        {!loggedIn ?  <>
        <LogSignHeader showResult={showResult} msgResult={msgResult} type="signup" deleteResultMsg={deleteResultMsg} logSignResult={loginSignResult}/>
    <section>
      <SignUpForm signupSubmit={signupSubmit} onChange={onChange} newUser={newUser} repeatedPassword={repeatedPassword} setRepeatedPassword={setRepeatedPassword}/>

    </section>
    </> : <LoggedIn loggingOut={loggingOut} logOutClick={logOutClick}/>}
    </>
    ) 
}