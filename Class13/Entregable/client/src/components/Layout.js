import Table from './Table'
import Chat from './Chat';
import Form from './Form';
import React, { useState } from "react";
import {socket} from '../lib/socket';
import axios from 'axios';
import Message from '../fragments/Message';

export default function Layout() {
   let [products, setProducts] = useState([])
   let [errorExist, setError] = useState(false);
   let [success, setSuccess] = useState(false);
   let [message, setMessage] = useState("");
   let  [emailAlert, setEmailAlert] = useState(false);
   let [productAlert, setProductAlert] = useState(false);
   
   socket.on('updateProducts', async () => {
    const data = await (await axios.get('http://localhost:8080/products/list')).data;
    setProducts(data);
  });

  socket.on('renderTable', async () => {
    const result = await (await axios.get('http://localhost:8080/products/list')).data;
    if(typeof result !== 'string'){
      setProducts(result);
    }
  });
  
  const failed = (msg) => {
    setError(true);
    setSuccess(false);
    setMessage(msg);
  }
  
  const passed = (msg) => {
    setSuccess(true);
    setError(false);
    setMessage(msg);
  }

  const handleData = async (inputs,type) => {
    if(type === 'product'){
    let result = await (await axios.post("http://localhost:8080/products/save", inputs)).data
    setEmailAlert(false);
    setProductAlert(true)
    if(/success\w/.test(result)){
      socket.emit('saveProduct');
      passed(result);
    }else{
      failed(result);
    }
    }else{
      setProductAlert(false);
      setEmailAlert(true);
      if(type){
       passed('Correct email!');
       return true
      }else{
        failed('Incorrect email!')
      }
    }
  };

  return (
    <React.Fragment>
      <div className="col-12 col-sm-4">
        <div className="container card">
            {productAlert && <Message errorExist={errorExist} success={success} message={message}/>}
            <Form handleData={handleData}/>
        </div>
      </div>
      <div className="col-12 col-sm-4">
        <div className="container card p-3">
            <Table products={products}/>
        </div>
      </div>
      <div className="col-12 col-sm-4">
        <div className="container card py-2">
            {emailAlert && <Message errorExist={errorExist} success={success} message={message}/>}
            <Chat handleData={handleData}/>
        </div>
      </div>
    </React.Fragment>
  );
}
