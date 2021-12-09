import React, { useContext } from "react";
import { UserContext } from "./UserProvider";
import './LoggedIn.css'

interface LoggedInProps {
    loggingOut: boolean;
    logOutClick: () => void;
}

export function LoggedIn (props: LoggedInProps){
    
  const { DBuser, FBUser } = useContext(UserContext)

  return (
        <>
    <header>
      <div className="title">
        <div className="title-header">
          <h4>Profile</h4>
          <button className="submit-form header-logout-btn">Log Out</button>
        </div>

        <div className="sub-header">
          <p>We're glad to have you back here.</p>
          <p>Here you can change your personal and account information.</p>
        </div>
      </div>
    </header>
    <section>
      <div className="avatar-info">
        <img className="profile-avatar" src={DBuser.avatar !== '' ? DBuser.avatar : FBUser.facebookPhotos[0]} alt="User profile avatar."/>
        <p>Change your avatar image</p>
      </div>
      <div className="personal-information">
        
        <div className="info-row">
          <div className="row-form">
            <input type="text" className="label-styled-input" disabled={true} value={DBuser.name !== '' ? DBuser.name : FBUser.name}/><label className="label-styled">Name</label><span className="form-border"/>
          </div> <div className="change-container">
          <span className="info-change">Change</span>
          </div>
        </div>
        <div className="info-row">
          <div className="row-form">
            <input type="text" className="label-styled-input" disabled={true} value={DBuser.surname !== '' ? DBuser.surname : FBUser.surname}/><label className="label-styled">Surname</label><span className="form-border"/>
          </div>
          <div className="change-container">
          <span className="info-change">Change</span>
            </div>
        </div>
        { DBuser.alias !== '' &&
        <div className="info-row">
          <div className="row-form"><input type="text" className="label-styled-input" disabled={true} value={DBuser.alias}/><label className="label-styled">Alias</label>
            <span className="form-border"></span>
          </div>
         <div className="change-container">
          <span className="info-change">Change</span>
        </div>
          </div>
        }
        <div className="info-row">
          <div className="row-form"><input type="email" className="label-styled-input" disabled={true} value={DBuser.username !== '' ? DBuser.username : FBUser.email}/><label className="label-styled">Email</label>
            <span className="form-border"></span>
          </div>
           <div className="change-container">
          <span className="info-change">Change</span>
            </div>
        </div>
        { DBuser.password !== '' &&
        <div className="info-row">
          <div className="row-form"><input type="password" className="label-styled-input" disabled={true} value={DBuser.password}/><label className="label-styled">Password</label>
            <span className="form-border"></span>
          </div>
          <div className="change-container">
  <span className="info-change">Change</span> </div>
       
          </div>
        }
      </div>

    </section>

    </>
        )
}