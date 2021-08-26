import axios from "axios";
import React from "react";
import { useState } from "react";
import { socket } from "../lib/socket";

export default function Chat( { handleData } ) {
  let [inputDisabled, setInputDisabled] = useState(true);
  let [messages, setMessages] = useState([]);
  let email = "";
  
  const handleSubmit = (e) => {
    //console.log(e.value)
    //const regex = /[^.;,/"#!¡$%&()=?¿]\w+@/g;
    //console.log(email);
    socket.emit('test', e.target.elements.email.value)
    //console.log(regex.test(email));
    //e.target.value = ''
    //handleData(email, regex.test(email));
  };

  const handleMessage = async (e) => {
    const text = e.target.value;
    if (text !== "") {
      const date = new Date();
      const time = `${date.getDate()}/${date.getMonth() + 1}/${
        date.getFullYear
      } ${date.getUTCHours}:${date.getUTCMinutes}:${date.getUTCSeconds}`;
      const message = {
        user: email,
        time: time,
        text: text,
      };
      const messages = await (
        await axios.post("http://localhost:8080/message/save", message)
      ).data;
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
                  <span>{message.time}</span>
                  <b>{message.user}</b>
                  <i>{message.text}</i>
                </div>
              );
            })}
        </div>
        <div className="card-footer">
          <form className="input-group">
            <input
              type="text"
              className="form-control"
              placeholder="Set your message here..."
              disabled={inputDisabled}
            />
            <button className="btn btn-outline-light" type="submit" onSubmit={handleMessage}>
              Send
            </button>
          </form>
        </div>
      </div>
    </React.Fragment>
  );
}
