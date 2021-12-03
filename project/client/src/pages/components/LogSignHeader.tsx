interface LogSignHeaderProps {
    showResult: boolean;
    logSignResult: boolean;
    deleteResultMsg: () => void;
    msgResult: string;
    type: string;

}

export function LogSignHeader(props: LogSignHeaderProps){
    return (
        <>
         <header>
         <div className="title">
        <h4>{`${props.type === 'login' ? "Log in" : "Sign up"}`}</h4>
        <div>
        <span>{`${props.type === 'login' ? 
        `Don't you have an account? Please, sign up in ` : 
        `Do you already have an account? Please, log in `}`}<a href={props.type === 'login' ? "/signup" : "/login"}>here</a></span>
          </div>
      </div>
    </header>
    {props.showResult && <div className="login-msg" style={{border: `2px solid ${props.logSignResult ? "#83944C" : "#ff5d8f"}` }}>
      <header className="login-msg-header" style={{backgroundColor: `${props.logSignResult ? "#99AC5D" : "#ff87ab"} `}}>
        <span className="login-header-msg">{`${props.logSignResult ? "Succesfully logged in!" : "Failed to log in!"}`}</span>
        <img className="login-header-icon" src="../../grey-cross.png" onClick={props.deleteResultMsg}></img>
        </header>
    <div className="login-msg-description" style={{backgroundColor: `${props.logSignResult ? "#E9EDC9" : "#fadde1"}`}}>
      {props.msgResult}
    </div>
    </div>
}
    </>
    )
}