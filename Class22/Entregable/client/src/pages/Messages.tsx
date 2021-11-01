import React, {  useEffect, useState } from 'react';
import { IMongoUser, IMongoMessage, INew_Message, INew_User } from '../../../server/src/interfaces/interfaces';
import { validation } from '../joi/schemas';
import { socket } from '../lib/socket';
import axios from 'axios';
import moment from 'moment'
import './messages.css';
export function Messages(){
  
  /**
   * For showing error at email input.
   * For enabling input message once the user has typed a valid email.  
   */
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState(false);
  const [inputDisabled, setInputDisabled] = useState(true);

  /**
   * Email submit handler
   * @param e just for preventing default submit action
   * 
   */
  
  const handleEmail = async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      const { error } = validation.email.validate(email);
      
      if(error){
        setEmailError(true);
      }else{
        if(emailError === true) setEmailError(false);
        setInputDisabled(false);
        const user: INew_User = {
          user: email,
          timestamp: moment().format('YYYY-MM-DD HH:mm:ss'),
      };
        await axios.post('http://localhost:8080/users/save', user)
        socket.emit('users');
      }
  }
  
  const errorExit = (ev: React.MouseEvent<HTMLButtonElement>) => {
      setEmailError(false)
  }

  /**
   * 
   * For CSS changes at email label.
   * 
   */
  const [hasContent, setHasContent] = useState(false);
  const inputeLabelClass = `${hasContent ? 'hasContent' : ''}`;
  /**
   * 
   * Email input FocusOut event listener.
   * 
   */
  const focusOut = (e: React.FocusEvent<HTMLInputElement>) => {
    if(email != ''){
      setHasContent(true)
    }else{
      setHasContent(false);
    }
  }


  
  const [users, setUsers] = useState<IMongoUser[]>([]);
  const [messages, setMessages] = useState<IMongoMessage[]>([])
  /**
   * 
   * Message submit handler
   * Previous defined html element textarea for easy value accessing
   * 
   */

  //const textarea = $('textarea') Need to change this with useRef
  /*
  const handleMessage = async (e: React.FormEvent<HTMLButtonElement>) => {
    e.preventDefault(); 
    const { error } = validation.message.validate(textarea.val()); // Need to change this with a useRef method
    if(!error){
      const message : INew_Message= {
        timestamp: moment().format('YYYY-MM-DD HH:mm:ss'),
        user: email,
        message: textarea.val() as string // Need to change this with a useRef method
      }
      await axios.post('http://localhost:8080/messages/save', message);
      socket.emit('message');
    }
  }
  */


  /**
   * 
   * Sockets
   * 
   */

  socket.on('messages', async () => {
    const messages : IMongoMessage[] = await (await axios.get<IMongoMessage[]>('http://localhost:8080/messages/list')).data;
    console.log(`Messages received`);
    setMessages(messages);
  });

  socket.on('users', async () => {
    const users: IMongoUser[] = await (await (await axios.get<IMongoUser[]>('http://localhost:8080/users/list')).data);
    console.log(`Users received`);
    setUsers(users)
  });

  return (
        <>
        <header>
    <div className="title">
      <h4>Messages</h4>
    </div>
  </header>
  <div className="email-form">
    <h6>Input your email for sending messages:</h6>
    <form onSubmit={handleEmail}>
    <div className="effect-input">
      
      <input type="email" className="label-styled-input" onBlur={focusOut} id="email" value={email} onChange={(e) => setEmail(e.target.value)}/>
      <label className={inputeLabelClass}>Email</label>
      <span className="form-border"></span>
    </div>
    <div className="submit-btn">
      <button id="submit" type="submit">Submit</button>
    </div>
    </form>
  </div>
  {emailError && <div className="error-alert">
      <div className="error-top">
        <span className="error-header">Oops!</span> 
        <button className="error-btn" onClick={errorExit}><i className="fas fa-times"></i></button>
      </div>
      <div className="error-msg">
        Email incorrect.
      </div>
    </div>}
  <section className="msg-card">
    <div className="msg-body">
      {messages.map((message, idx) => {
        
        // Setting if it's a message from the current session user or not...
        
        const sentOrReceived : string = message.user === email ? "sent-msg" : "received-msg";
        return (
          <div key={idx}>
          <div className={sentOrReceived}>
          <span><span className="date">{message.timestamp}</span><span className="username">{message.user}</span>{message.message}</span>
          </div> <br/>
          </div>
        )
        
      })}
    </div>
    <form className="msg-bottom">
      <textarea name="" id="" cols={90} rows={1} disabled={inputDisabled}></textarea>
      <button type="submit"  className="msg-btn">Send</button>
    </form>
  </section>
</>
    )
}