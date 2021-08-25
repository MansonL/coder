import Table from './Table'
import Chat from './Chat';
import Form from './Form';
import React, { useState } from "react";
import {socket} from '../lib/socket';
import axios from 'axios';

export default function Layout() {
   let [products, setProducts] = useState([])
   let [errorExist, setError] = useState(false);
   let [success, setSucccess] = useState(false);
   let [message, setMessage] = useState("");
  
   socket.on('update', async () => {
    const data = await (await axios.get('http://localhost:8080/products/list')).data;
    setProducts(data);
  })
  socket.on('renderTable', async () => {
    const result = await (await axios.get('http://localhost:8080/products/list')).data;
    if(typeof result !== 'string'){
      setProducts(result);
    }
  })

  const sendData = async (inputs) => {
    let result = await (await axios.post("http://localhost:8080/products/save", inputs)).data
    if(/success\w/.test(result)){
      socket.emit('save');
      setSucccess(true);
      setError(false);
      setMessage(result);
    }else{
      setError(true);
      setSucccess(false);
      setMessage(result);
    }
  };
  return (
    <React.Fragment>
      <div className="col-12 col-sm-4">
        <div className="container card">
            <Form message={message} errorExist={errorExist} success={success} handleData={sendData}/>
        </div>
      </div>
      <div className="col-12 col-sm-4">
        <div className="container card p-3">
            <Table products={products}/>
        </div>
      </div>
      <div className="col-12 col-sm-4">
        <div className="container card py-2">
            <Chat socket={socket}/>
        </div>
      </div>
    </React.Fragment>
  );
}
