import axios from "axios";
import React, { useState } from "react";
import { validation } from "../utils/joiSchemas";
import './LogIn.css'



type LogInProps = {
  credentials: {
    username: string;
    password: string;
  }
  onChange : (ev: React.ChangeEvent<HTMLInputElement>) => void;
  logInSubmit : (ev: React.FormEvent<HTMLFormElement>) => void;
}

export function LogIn (props: LogInProps){
    
    

    const [showHide, setShowHide] = useState(false);

    /**
     * Simple function for changing the Hide/Show button at password input.
     */
    const showHideClick = () => {
      setShowHide(!showHide);
    }

    

    
    
    

    return (
        
    
    <section>
      <form onSubmit={props.logInSubmit}>
      <div className="user-login">
        
          <div className="row-form">
            
            <div className="effect-input"><input type="text" className="label-styled-input" value={props.credentials.username} onChange={props.onChange} name="username"/>
            <label className={`${props.credentials.username !== '' ? "hasContent" : "label-styled"}`}>Email</label>
              <span className="form-border"/>
            </div>
          </div>
        <div className="pswd-form">
          <div className="effect-input"><input type={showHide ? "text" : "password"} className="label-styled-input" value={props.credentials.password} onChange={props.onChange} name="password"/>
            <label className={`${props.credentials.password !== '' ? "hasContent" : "label-styled"}`}>Password</label>
              <span className="form-border"/></div>
          <span className="show-pswd" onClick={showHideClick}>{showHide ? "Hide": "Show"}</span>
        </div>
        <div className="submit-row">
          <button type="submit" className="submit-form">Log in</button>
        </div>
         </div>
        </form>
     
    </section>
    
    )
}
