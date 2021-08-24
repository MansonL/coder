 import React, {useState,useEffect} from 'react'
 import {inputVal} from '../lib/validations'
 import Message from '../fragments/Message'
 import Inputs from '../fragments/Inputs';
 
 export default function Form ({ socket }){
   let [errorExist, setError] = useState(false);
   let [success, setSucccess] = useState(false); 
   let [message, setMessage] = useState('')
   const sendData = (e) => {
    e.preventDefault(); 
    const inputs = [e.target[0].value,e.target[1].value,e.target[2].value];
    const result = inputVal(inputs);
    if(/success\w/.test(result)){
        socket.emit('save', inputs);
        message = result;
        setSucccess(true);
        setMessage(result);
        clearFields(e.target) 
    }else{
        message = result;
        setError(true);
        setMessage(result)
    }
   }
    
   const clearFields = (inputs) => {
       inputs[0].value = '';
       inputs[1].value = '';
       inputs[2].value = ''
   }

   return (
    <React.Fragment>
    <Message errorExist={errorExist} success={success} message={message}/>
    <div className="row">
    <h2 id="display" className="text-center mt-2 text-color fs-4">Input the product to be saved:</h2>
    </div>
    <form className="row justify-content-center" onSubmit={sendData}>
        <Inputs />
        <div className="col-4">
            <button type="submit" id="button" className="btn btn-light btn-lg mb-3">Save</button>
        </div>
    </form>
    </React.Fragment>
   )

 }