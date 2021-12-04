import React from "react";

interface FormMessagesProps {
    handleUserData: (e: React.FormEvent<HTMLFormElement>) => Promise<void>;
    updateValues: (e: React.ChangeEvent<HTMLInputElement>) => void;
    user: {
      user: string;
    name: string;
    surname: string;
    alias: string;
    age: number;
    avatar: string;
    }
}

export function MessagesForm (props: FormMessagesProps){
    return (
        <form onSubmit={props.handleUserData}>
    <div className="effect-input">
      
      <input onChange={props.updateValues} type="email" className="label-styled-input" name="user" value={props.user.user} />
      <label className={props.user.user != '' ? "hasContent" : "label-styled"} >Email</label>
      <span className="form-border"></span>
    </div>
    <div className="effect-input"><input onChange={props.updateValues} type="text" className="label-styled-input" name="name" value={props.user.name} /><label className={props.user.name != '' ? "hasContent" : "label-styled"}>Name</label><span className="form-border"></span></div>
        <div className="effect-input"><input onChange={props.updateValues} type="text" className="label-styled-input" name="surname" value={props.user.surname}/><label className={props.user.surname != '' ? "hasContent" : "label-styled"}>Surname</label><span className="form-border"></span></div>
        <div className="effect-input"><input onChange={props.updateValues} type="text" className="label-styled-input" name="alias" value={props.user.alias}/><label className={props.user.alias != '' ? "hasContent" : "label-styled"}>Alias (optional)</label><span className="form-border"></span></div>
        <div className="effect-input"><input type="date" min="1922-11-28" max="2011-11-28" className="label-styled-input" name="age" onChange={props.updateValues} value={props.user.age}/><label className={props.user.age ? "hasContent" : "label-styled"}>Age</label><span className="form-border"></span></div>
        <div className="effect-input"><input onChange={props.updateValues} type="text" className="label-styled-input" name="avatar" value={props.user.avatar}/><label className={props.user.avatar != '' ? "hasContent" : "label-styled"}>Avatar (URL image)</label><span className="form-border"></span></div>
        
    <div className="submit-btn">
      <button name="submit" type="submit" id="submit">Submit</button>
    </div>
    </form>
    )
}