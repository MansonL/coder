import React, { useState, useEffect } from "react";
import Message from "../fragments/Message";
import Inputs from "../fragments/Inputs";
import axios from "axios";
import {socket} from "../lib/socket";

export default function Form() {
  let [errorExist, setError] = useState(false);
  let [success, setSucccess] = useState(false);
  let [message, setMessage] = useState("");
  const sendData = async (e) => {
    e.preventDefault();
    console.log(`${e.target[0].value} ${e.target[1].value}`)
    const inputs = [
      e.target[0].value,
      Number(e.target[1].value),
      e.target[2].value,
    ];
    let result = await axios.post("http://localhost:8080/products/save", inputs);
    clearFields(e.target)
    if(/success\w/.test(result)){
      setSucccess(true);
      setError(false);
      setMessage(result.data);
      socket.emit('save');
    }else{
      setError(true);
      setSucccess(false);
      setMessage(result.data);
    }
  };

  const clearFields = (inputs) => {
    inputs[0].value = "";
    inputs[1].value = "";
    inputs[2].value = "";
  };

  return (
    <React.Fragment>
      <Message errorExist={errorExist} success={success} message={message} />
      <div className="row">
        <h2 id="display" className="text-center mt-2 text-color fs-4">
          Input the product to be saved:
        </h2>
      </div>
      <form className="row justify-content-center" onSubmit={sendData}>
        <Inputs />
        <div className="col-4">
          <button
            type="submit"
            id="button"
            className="btn btn-light btn-lg mb-3"
          >
            Save
          </button>
        </div>
      </form>
    </React.Fragment>
  );
}
