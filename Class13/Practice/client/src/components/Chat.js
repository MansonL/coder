import axios from "axios";
import React from "react";
import { useState } from "react";
import { socket } from "../lib/socket";

export default function Chat( { handleData } ) {
  let [inputDisabled, setInputDisabled] = useState(true);
  let [messages, setMessages] = useState([]);
  let [email, setEmail] = useState("");
  
  const handleSubmit = (e) => {
    e.preventDefault();
    let email = e.target.elements.email.value;
    const regex = /[^.;,/"#!¡$%&()=?¿]\w+@/g;
    const passed = handleData(email, regex.test(email));
    if(passed){
      setEmail(email);
      e.target.elements.email.value = '';
       setInputDisabled(false);  
      socket.emit('test', e.target.elements.email.value)
    }
    
  };

  const handleMessage = async (e) => {
    e.preventDefault();
    const text = e.target.elements.text.value;
    if (text !== "") {
      const date = new Date();
      const time = `${date.getDate()}/${date.getMonth() + 1}/${
        date.getFullYear()
      } ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;
      const message = {
        user: email,
        time: time,
        text: text,
      };
        await axios.post("http://localhost:8080/message/save", message)
    
      socket.emit("saveMessage");
    }
  };

  const renderMessages = async () => {
    const messages = await (
      await axios.get("http://localhost:8080/message/show")
    ).data;
    setMessages(messages);
  };

  socket.on("updateMessages", renderMessages);

  socket.on("renderMessages", renderMessages);

  return (
    <React.Fragment>
      <form className="input-group my-2" onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Set your email"
          className="form-control"
          id="email"
          disabled={!inputDisabled}
        />
        <button className="btn btn-light mx-1" type="submit">
          Confirm email
        </button>
      </form>
      <div className="card">
        <div className="card-body bg-white rounded">
          {messages.length > 0 &&
            messages.map((message, idx) => {
              let messageType;
              if (message.user === email) {
                messageType = "msg-sent";
              } else {
                messageType = "msg-received";
              }
              return (
                <div id={messageType} key={idx} className="mt-1">
                  <span>{message.time}  </span>
                  <b> {message.user}:</b>
                  <br/>
                  <i>{message.text}</i>
                </div>
              );
            })}
        </div>
        <div className="card-footer">
          <form className="input-group" onSubmit={handleMessage}>
            <input
              type="text"
              className="form-control"
              placeholder="Set your message here..."
              id="text"
              disabled={inputDisabled}
            />
            <button className="btn btn-outline-light" type="submit" >
              Send
            </button>
          </form>
        </div>
      </div>
    </React.Fragment>
  );
}
