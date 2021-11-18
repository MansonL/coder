import React from "react";

interface FormMessagesProps {
    handleEmail: (e: React.FormEvent<HTMLFormElement>) => Promise<void>;
    updateValues: (e: React.ChangeEvent<HTMLInputElement>) => void;
    focusOut: () => void;
    email: string;
    name: string;
    surname: string;
    alias: string;
    age: number;
    avatar: string;
    inputLabelClass: string;
}

export function FormMessages (props: FormMessagesProps){
    return (
        <form onSubmit={props.handleEmail}>
    <div className="effect-input">
      
      <input type="email" className="label-styled-input" onBlur={props.focusOut} name="email" value={props.email} onChange={(e: React.ChangeEvent<HTMLInputElement>) => props.updateValues(e)}/>
      <label className={props.inputLabelClass} >Email</label>
      <span className="form-border"></span>
    </div>
    <div className="effect-input"><input type="text" className="label-styled-input" name="name" value={props.name} /><label className="hasContent ">Name</label><span className="form-border"></span></div>
        <div className="effect-input"><input type="text" className="label-styled-input" name="surname" value={props.surname}/><label className="hasContent ">Surname</label><span className="form-border"></span></div>
        <div className="effect-input"><input type="text" className="label-styled-input" name="alias" value={props.alias}/><label className="hasContent ">Alias (optional)</label><span className="form-border"></span></div>
        <div className="effect-input"><input type="number" min="10" max="100" step="1" className="label-styled-input" name="age" value={props.age}/><label className="hasContent ">Age</label><span className="form-border"></span></div>
        <div className="effect-input"><input type="text" className="label-styled-input" name="avatar" value={props.avatar}/><label className="label-styled">Avatar (URL image)</label><span className="form-border"></span></div>
        
    <div className="submit-btn">
      <button name="submit" type="submit">Submit</button>
    </div>
    </form>
    )
}