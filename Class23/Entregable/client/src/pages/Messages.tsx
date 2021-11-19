import React, {  useEffect, useState } from 'react';
import { IMongoUser, IMongoMessage, INew_Message, INew_User } from '../../../server/src/interfaces/interfaces';
import { validation } from '../utils/joiSchemas';
import { socket } from '../lib/socket';
import axios from 'axios';
import moment from 'moment'
import './messages.css';

export function Messages(){
  
  /**
   * For showing error at email input.
   * For enabling input message once the user has typed a valid email.  
   */
  const [user, setUser] = useState<INew_User>({
      timestamp: '',
      user: '',
      name:'',
      surname: '',
      alias: '',
      age: 10,
      avatar: '',
  })
  const [dataError, setDataError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [dataSuccess, setDataSuccess] = useState(false);
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
        setEmailSuccess(false);
      }else{
        if(emailError === true) setEmailError(false);
        setEmailSuccess(true);
        setInputDisabled(false);
        const user: INew_User = {
          user: email,
          timestamp: moment().format('YYYY-MM-DD HH:mm:ss'),
      };
        await axios.post('http://localhost:8080/users/save', user)
        socket.emit('users');
      }
  }
  /**
   * 
   * Click on exit at error msg at email input.
   * 
   */
  const errorExit = () => {
      setEmailError(false);
      setEmailSuccess(false);
  }

  /**
   * 
   * For CSS changes at email label.
   * 
   */
  const [hasContent, setHasContent] = useState(false);
  const inputLabelClass = `${hasContent ? 'hasContent ' : 'label-styled'}`;

  /**
   * 
   * Email input FocusOut event listener.
   * 
   */
  const focusOut = () => {
    if(email != ''){
      setHasContent(true)
    }else{
      setHasContent(false);
    }
  }


  
  const [users, setUsers] = useState<IMongoUser[]>([]);
  const [messages, setMessages] = useState<IMongoMessage[]>([])
  const [message, setMessage] = useState('');
  /**
   * 
   * Message submit handler
   * @param e just for preventing default submit action
   * 
   */
  const handleMessage = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); 
    const { error } = validation.message.validate(message); 
    if(!error){
      const msg : INew_Message= {
        timestamp: moment().format('YYYY-MM-DD HH:mm:ss'),
        user: email,
        message: message
      }
      await axios.post('http://localhost:8080/messages/save', msg);
      setMessage('')
      socket.emit('message');
    }
  }
  

  /**
   * 
   * Sockets
   * 
   */

  const messagesUpdateListener = async () => {
    const newMessages : IMongoMessage[] = await (await axios.get<IMongoMessage[]>('http://localhost:8080/messages/list')).data;
    console.log(`Messages received`);
    setMessages(newMessages)
  }

  const usersUpdateListener = async () => {
    const newUsers: IMongoUser[] = await (await (await axios.get<IMongoUser[]>('http://localhost:8080/users/list')).data);
    console.log(`Users received`);
    setUsers(newUsers)
  }

  useEffect(() => {
    socket.on('messagesUpdate', messagesUpdateListener);
    socket.on('usersUpdate', usersUpdateListener);

    return () => {
      socket.off('messagesUpdate', messagesUpdateListener);
      socket.off('usersUpdate', usersUpdateListener)
    }
  })
  

  return (
        <>
        <header>
    <div className="title">
      <h4>Messages</h4>
    </div>
  </header>
  <div className="email-form">
    <h6>Input your email for sending messages:</h6>
    
  </div>
  {dataError && <div className="form-error">
      <div className="result-top">
        <span className="result-header">Oops!</span> 
        <button className="result-btn" onClick={errorExit}><i className="fas fa-times"></i></button>
      </div>
      <div className="result-msg">
        Email incorrect.
      </div>
    </div>}
    {dataSuccess && <div className="form-success">
      <div className="result-top">
        <span className="result-header">Successful!</span> 
        <button className="result-btn" onClick={errorExit}><i className="fas fa-times"></i></button>
      </div>
      <div className="result-msg">
        Email submitted. Now you can chat.
      </div>
    </div>}
  <section className="msg-card">
    <div className="msg-body">
      {messages.map((message: IMongoMessage, idx: number): JSX.Element => {
        
        // Setting if it's a message from the current session user or not...
        
        const sentOrReceived : string = message.user === email ? "sent-msg" : "received-msg";
        return (
          <div key={idx}>
          <div className={sentOrReceived}>
          <span className="date">{message.timestamp}</span><span className="username">{message.user}</span><br/>{message.message}
          </div> <br/>
          </div>
        )
        
      })}
    </div>
    <form className="msg-bottom" onSubmit={handleMessage}>
      <textarea name="" id="" cols={90} rows={1} disabled={inputDisabled} placeholder='Type your message...' onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setMessage(e.target.value)} value={message}></textarea>
      <button type="submit"  className="msg-btn">Send</button>
    </form>
  </section>
  <section className="users">
      <div className="users-header">
        <span>Users online <span className="online-users">{`(${users.length} active users).`}</span></span>
      </div>
      <div className="users-list">
         
         {users.map((user: IMongoUser, idx: number): JSX.Element => {
              return (
                <div key={idx}>
                <i className="online-icon"></i><span>{user.user}</span><br/>
              </div>
              )
         })}
      </div>
    </section>
</>
    )
}