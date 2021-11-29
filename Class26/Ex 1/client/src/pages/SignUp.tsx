import axios from "axios";
import Joi from "joi";
import moment from "moment";
import React, { LegacyRef, useEffect, useRef, useState } from "react";
import { INew_User } from "../../../server/src/store/store";
import { validation } from "../utils/joiSchemas";
import { loginResponse } from "./Redirect";
import './SignUp.css'

type SignUpProps = {
    
    signUpValidationError : (error: Joi.ValidationError) => void;
    signUpError : () => void;
    signUpSuccessful : () => void;
    
} 

export function SignUp (props: SignUpProps) {
    
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
    /*
    const passReq1 = useRef<HTMLImageElement>(null);
    const passReq2 = useRef<HTMLImageElement>(null);
    const passReq3 = useRef<HTMLSpanElement>(null);
*/
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

    const signupSubmit = async (ev: React.FormEvent<HTMLFormElement>) => {
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
          const response = await (await axios.post<loginResponse>(`http://localhost:8080/api/signup`, user)).data;
          console.log(response)
          if(response.response.match(/Error/g)){
            props.signUpError();
          }else{
            props.signUpSuccessful();
          }
        }
    }
    /*
    useEffect(() => {
        document.addEventListener('click', (ev: MouseEvent) => {
          if(passReq1 && passReq2 && ev.target){
            if(ev.target !== passReq1.current && ev.target !== passReq2.current && ev.target !== passReq3.current){
                if(showPassRequirements[0] || showPassRequirements[1]) setShowPassRequirements([false,false])
              }
            }
        })
      }, [])
*/
      console.log(showPassRequirements)
    return (
        <>
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
                onClick={() => setShowPassRequirements([true, showPassRequirements[1]])}
                
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
                onClick={() =>{
                    console.log(showPassRequirements)
                     setShowPassRequirements([showPassRequirements[0], true])}}
                
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
    </>
    ) 
}