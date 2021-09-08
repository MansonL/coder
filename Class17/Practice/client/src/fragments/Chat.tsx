import React, { FormEvent, FormEventHandler, useState } from 'react';
import { IMessage, IUser } from '../utils/Types';
import socket from '../lib/socket';
import axios from 'axios';
import moment from 'moment';

const Chat: React.FunctionComponent = (): JSX.Element => {
    const [inputDisabled, setInputDisabled] = useState(true);
    const [messages, setMessages] = useState<IMessage[]>([]);
    const [email, setEmail] = useState('');
    const [msg, setMsg] = useState('');

    const handleSubmit = async (e: FormEvent<Element>) => {
        e.preventDefault();
        const regex = /[^.;,/"#!¡$%&()=?¿]\w+@/g;
        if (regex.test(email)) {
            setInputDisabled(false);
            await axios.post('http://localhost:8080/users', email);
            socket.emit('saveUser');
        }
    };

    const handleMessage: FormEventHandler = async (e: FormEvent<Element>) => {
        e.preventDefault();
        if (msg !== '') {
            const time = moment().format('MM D YYYY HH mm ss');
            const message: IMessage = {
                time: time,
                user: email,
                message: msg,
            };
            console.log(message);
            await axios.post('http://localhost:8080/messages', message);
            socket.emit('saveMessage');
        }
    };

    const renderMessages = async () => {
        const data = await (await axios.get<IMessage[]>('http://localhost:8080/messages')).data;
        console.log(data);
        setMessages(data);
    };

    socket.on('updateMessages', renderMessages);

    return (
        <React.Fragment>
            <form className="input-group my-2" onSubmit={handleSubmit}>
                <input
                    type="email"
                    placeholder="Set your email"
                    className="form-control"
                    id="email"
                    disabled={!inputDisabled}
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
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
                                messageType = 'msg-sent';
                            } else {
                                messageType = 'msg-received';
                            }
                            return (
                                <div id={messageType} key={idx} className="mt-1">
                                    <span>{message.time} </span>
                                    <b> {message.user}:</b>
                                    <br />
                                    <i>{message.message}</i>
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
                            value={msg}
                            onChange={(e) => setMsg(e.target.value)}
                        />
                        <button className="btn btn-outline-light" type="submit">
                            Send
                        </button>
                    </form>
                </div>
            </div>
        </React.Fragment>
    );
};

export default Chat;
