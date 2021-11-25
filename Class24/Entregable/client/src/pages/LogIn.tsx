import React, { useState } from "react";

export function LogIn (){
    const [showResultLogin, setShowResultLogin] = useState(false);
    const [loginResult, setLoginResult] = useState(false);
    
    const [showHide, setShowHide] = useState(false);

    const [credentials, setCredentials] = useState({
        user: '',
        password: '',
    });

    const deleteLogInMsg = () => {

    }

    const onChange = (ev: React.ChangeEvent<HTMLInputElement>) => {

    }
    
    return (
        <>
        <header>
      <div className="title">
        <h4>Sign in</h4>
      </div>
    </header>
    {showResultLogin && <div className="login-msg">
      <header className="login-msg-header" style={{backgroundColor: `${loginResult ? "" : "#ff87ab"} `}}>
        <span className="login-header-msg">Failed to log in!</span>
        <img className="login-header-icon" src="https://image.pngaaa.com/834/4720834-middle.png" onClick={deleteLogInMsg}></img>
        </header>
    <div className="login-msg-description">
      Lorem ipsum dolor sit, amet consectetur adipisicing elit. Eligendi quibusdam nam vero delectus porro dolores autem veritatis, vitae accusamus, cupiditate consequatur itaque labore nihil repellendus ipsam veniam. Quisquam, vitae iusto.
    </div>
    </div>
    }
    <section>
      <form>
      <div className="user-login">
        
          <div className="row-form">
            
            <div className="effect-input"><input type="text" className="label-styled-input" value={credentials.user} onChange={}/>
            <label className="label-styled">Email or username</label>
              <span className="form-border"/>
            </div>
          </div>
        <div className="pswd-form">
          <div className="effect-input"><input type={showHide ? "text" : "password"} className="label-styled-input" value={credentials.password} onChange={}/>
            <label className="label-styled">Password</label>
              <span className="form-border"/></div>
          <span className="show-pswd">{showHide ? "Hide": "Show"}</span>
        </div>
        <div className="submit-row">
          <button type="submit" className="submit-form">Log in</button>
        </div>
         </div>
        </form>
     
    </section
    </>
    )
}