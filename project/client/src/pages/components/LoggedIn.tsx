import { INew_User } from "../../../../server/src/interfaces/interfaces";

interface LoggedInProps {
    loggingOut: boolean;
    credentials: {
        username: string;
        password: string;
    },
    logOutClick: () => void;
}

export function LoggedIn (props: LoggedInProps){
    return (
        <>
    <div className="logged-in-container-msg">
      <div className="logged-in-msg">
        { props.loggingOut ? `Goodbye ${props.credentials.username}` : `You're already logged in ${props.credentials.username}.` /* Here this line will be modified when whe store the users at DB*/} 
      </div>
      { !props.loggingOut && <button className="submit-form" onClick={props.logOutClick}>Log out</button>}
    </div>
    </>
        )
}