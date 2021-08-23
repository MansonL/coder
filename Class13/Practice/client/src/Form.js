 import {useState,useEffect} from 'react'
 import {inputVal} from './lib/validations'
 import Message from './fragments/Message'
 import Inputs from './fragments/Inputs';
 
 export default function Form ({ socket }){
   const [errorExist, setError] = useState(false);
   const [success, setSucccess] = useState(false); 
   const [message, setMessage] = useState('')
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
    <div className="container">
    <Message errorExist={errorExist} success={success} message={message}/>
    <div className="row">
        <h2 id="display" className="text-center mt-2">Input the product to be saved:</h2>
    </div>
    <form className="row d-flex align-items-center" onSubmit={sendData}>
        <Inputs />
        <div className="col-4">
            <button type="submit" className="btn btn-outline-dark btn-lg mb-3">Save</button>
        </div>
    </form>
    </div>
   )

 }