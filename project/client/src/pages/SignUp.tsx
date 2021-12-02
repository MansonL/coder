import axios from "axios";
import moment from "moment";
import { useState } from "react";
import { INew_User } from "../../../server/src/interfaces/interfaces";
import { validation } from "../utils/joiSchemas";
import { LoggedIn } from "./components/LoggedIn";
import { LogSignHeader } from "./components/LogSignHeader";
import { authResponse } from "./Main";

export function SignUp (props: SignUpProps) {
    
    const [showResult, setShowResult] = useState(false);
    const [loginSignResult, setLoginSignResult] = useState(false);
    const [msgResult, setMsgResult] = useState('');

    const [loggedIn, setLoggedIn] = useState(false);
    const [loggingOut, setLoggingOut] = useState(false);

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
    const [showPassRequirements, setShowPassRequirements] = useState([false, false]);
    
    const onChange = (ev: React.ChangeEvent<HTMLInputElement>) => {
        const property = ev.target.name;
        const value = ev.target.value;
        setNewUser({
            ...newUser,
            [property]: value
        })
    }

    const [showHide, setShowHide] = useState(false);
    


    /**
     * Simple function for changing the Hide/Show button at password input.
     */
    const showHideClick = () => {
      setShowHide(!showHide);
    }

    const signupSubmit = (ev: React.FormEvent<HTMLFormElement>) => {
        ev.preventDefault();
        const user : INew_User= {
            ...newUser,
            timestamp: moment().format('YYYY-MM-DD HH:mm:ss')
        }
        console.log(user)
        const { error } = validation.user.validate(user);
        if(error){
          props.signUpValidationError(error)
        }else{
           axios.post<authResponse>(`http://localhost:8080/api/signup`, user).then(response => {
            props.signUpSuccessful();
           }).catch(error => {
            console.log(error.response);
            if(error.response) return props.signUpError(error.response.data.msg);
            props.signUpError("Code: 500. Internal error.")
           })
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
        }, 2000)
      }

    return (
        <>
        {!loggedIn ?  <>
        <LogSignHeader showResult={showResult} msgResult={msgResult} type="signup" deleteResultMsg={deleteResultMsg} logSignResult={loginSignResult}/>
    <section>
      <form onSubmit={signupSubmit}>
        <div className="user-login">

          <div className="row-form">

            <div className="effect-input"><input type="text" className="label-styled-input" value={newUser.name} onChange={onChange} name="name" />
              <label className={newUser.name !== '' ? "hasContent" : "label-styled"}>Name</label>
              <span className="form-border" />
            </div>
          </div>
          <div className="row-form">
            <div className="effect-input">
              <input type="text" className="label-styled-input" name="surname" onChange={onChange} value={newUser.surname}/>
              <label className={newUser.surname !== '' ? "hasContent" : "label-styled"}>Surname</label>
              <span className="form-border"/>
            </div>
          </div>
          <div className="row-form">
            <div className="effect-input">
              <input type="date" min="1922-11-28" max="2011-11-28" className="label-styled-input" name="age" onChange={onChange} value={newUser.age}/>
              <label className="hasContent">Born date</label>
              <span className="form-border"/>
            </div>
          </div>
          <div className="row-form">
            <div className="effect-input">
              <input type="text" className="label-styled-input" name="alias" onChange={onChange} value={newUser.alias}/>
              <label className={newUser.alias !== '' ? "hasContent" : "label-styled"}>Alias</label>
              <span className="form-border"/>
            </div>
          </div>
          <div className="row-form">
            <div className="effect-input">
              <input type="url" className="label-styled-input" name="avatar" onChange={onChange} value={newUser.avatar}/>
              <label className={newUser.avatar !== '' ? "hasContent" : "label-styled"}>Avatar (url image)</label>
              <span className="form-border"/>
            </div>
          </div>
          <div className="row-form">
            <div className="effect-input">
              <input type="email" className="label-styled-input" name="username" onChange={onChange} value={newUser.username}/>
              <label className={newUser.username !== '' ? "hasContent" : "label-styled"}>Email</label>
              <span className="form-border"/>
            </div>
          </div>
          <div className="pswd-form">
            
            <div className="effect-input"><input type={showHide ? "text" : "password" } className="label-styled-input" value={newUser.password} onChange={onChange} name="password" />
              <label className={newUser.password !== '' ? "hasContent" : "label-styled"}>Password</label>
              <span className="form-border"></span>
              
            </div>
            <img className="info-icon" src="https://img.icons8.com/ios/50/000000/info.png"
                
            />
            <span className={showPassRequirements[0] ? "pswd-requirement showMenu" : "pswd-requirement"}>Remember that your password should have at least <b>6 characters</b> with a maximum of <b>20</b>. At least <b>one uppercase </b>and <b>one number</b>.</span>
            <span className="show-pswd" onClick={showHideClick}>Show/Hide</span>
          </div>
          <div className="pswd-form">
            
              
            <div className="effect-input">
              <input type={showHide ? "text" : "password" } className="label-styled-input" value={repeatedPassword} onChange={(ev) => setRepeatedPassword(ev.target.value)} name="password" />
              <label className={repeatedPassword !== '' ? "hasContent" : "label-styled"}>Repeat your password</label>
              <span className="form-border"></span>
         
            </div>
            
            <img className="info-icon" src="https://img.icons8.com/ios/50/000000/info.png"
                alt=""
                
            />
            <span className={showPassRequirements[1] ? "pswd-requirement showMenu" : "pswd-requirement"} >Remember that your password should have at least <b>6 characters</b> with a maximum of <b>20</b>. At least <b>one uppercase </b>and <b>one number</b>.</span>
            <span className="show-pswd" onClick={showHideClick}>Show/Hide</span>
          </div>
          <div className="submit-row">
            <button type="submit" className="submit-form">Submit</button>
          </div>
        </div>
      </form>

    </section>
    </> : <LoggedIn credentials={
        {username: newUser.username,
        password: newUser.password,
}} loggingOut={loggingOut} logOutClick={logOutClick}/>}
    </>
    ) 
}