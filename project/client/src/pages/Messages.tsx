import React, {  useEffect, useState } from 'react';
import { MessagesForm } from './MessagesForm';
import { IMongoUser, IMongoMessage, INew_Message, INew_User, CUDResponse } from '../../../server/src/interfaces/interfaces';
import { NormalizedSchema } from 'normalizr'
import { validation } from '../utils/joiSchemas';
import { socket } from '../lib/socket';
import axios from 'axios';
import moment from 'moment'
import './messages.css';
import { denormalizeData, MessagesEntities } from '../utils/compression';
import { authResponse } from './Main';

export function Messages(){
  
  const [inputDisabled, setInputDisabled] = useState(true);
  
  const [user, setUser] = useState<IMongoUser>()
  const [users, setUsers] = useState<IMongoUser[]>([]);
  const [userID, setUserID] = useState('');
  const [messages, setMessages] = useState<IMongoMessage[]>([])
  const [message, setMessage] = useState('');
  
  /**
   * Set the width according the compression of the data normalized vs the denormalized data.
   */
  const [barWidth, setBarWidth] = useState(0);


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
      const msg : INew_Message = {
        timestamp: moment().format('YYYY-MM-DD HH:mm:ss'),
        author: {
          ...user,
          _id: userID
        },
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
    const newMessages  = await (await axios.get<NormalizedSchema<MessagesEntities, string[]>
  >('http://localhost:8080/messages/list')).data;
    console.log(`Messages received`);
    const {denormalizedMsg, percentage} = denormalizeData(newMessages);
    setMessages(denormalizedMsg);
    setBarWidth(percentage)
  }

  const usersUpdateListener = async () => {
    const newUsers: IMongoUser[] = await (await (await axios.get<IMongoUser[]>('http://localhost:8080/users/list')).data);
    console.log(`Users received`);
    setUsers(newUsers)
  }

  useEffect(() => {
    socket.emit('message');
    socket.emit('users');
    socket.on('messagesUpdate', messagesUpdateListener);
    socket.on('usersUpdate', usersUpdateListener);
    axios.get<authResponse>('http://localhost:8080/api/auth/login').then(response => {

    })
    return () => {
      socket.off('messagesUpdate', messagesUpdateListener);
      socket.off('usersUpdate', usersUpdateListener)
    }
  })
  

  return (
        <React.Fragment>
        <header>
    <div className="title">
      <h4>Messages</h4>

    </div>
  </header>
    <div className="bar-container">
      <span className="progress-bar">
      <span className="inside-bar" style={{backgroundColor: `${barWidth < 0 ? "red" : "green"}`,width: `${barWidth < 0 ? -barWidth : barWidth}%`}}></span>
      </span>
      <span style={{color: "white", textAlign: 'center'}}>Data compression</span><span className="percent" style={{color: `${barWidth < 0 ? "red": "green"}`}}>{barWidth}%</span>
    </div>
  <section className="msg-card">
    <div className="msg-body">
      {messages.map((message: IMongoMessage, idx: number): JSX.Element => {
        
        // Setting if it's a message from the current session user or not...
        
        const sentOrReceived = message.author.user === user.user ? ["sent-msg", "sent-content-msg"] : ["received-msg", "received-content-msg"];
        return (
          <div key={idx} className={sentOrReceived[0]}>
          {sentOrReceived[0] === "received-msg" && <div className="avatar-img"><img src={message.author.avatar}/></div>}
          <div className={sentOrReceived[1]}>
          <span className="date">{message.timestamp}</span><span className="username">{message.author.alias ? message.author.alias : message.author.name && message.author.surname ? `${message.author.name} ${message.author.surname}` : message.author.user}</span><br/>{message.message}
          </div>
          {sentOrReceived[0] === "sent-msg" && <div className="avatar-img"><img src={message.author.avatar}/></div>}
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
</React.Fragment>
    )
}