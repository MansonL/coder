import React, { useContext } from "react";
import { UserContext } from "./UserProvider";

interface LoggedInProps {
    loggingOut: boolean;
    logOutClick: () => void;
}

export function LoggedIn (props: LoggedInProps){
    
  const { user } = useContext(UserContext)
  console.log(user)
  return (
        <>
    <div className="logged-in-container-msg">
      <div className="logged-in-msg">
        { props.loggingOut ? `Goodbye ${user.username}` : `You're already logged in ${user.username}.` /* Here this line will be modified when whe store the users at DB*/} 
      </div>
      { !props.loggingOut && <button className="submit-form" onClick={props.logOutClick}>Log out</button>}
    </div>
    </>
        )
}