import React, { useState, useEffect } from "react";
import Message from "../fragments/Message";
import Inputs from "../fragments/Inputs";

export default function Form( { handleData }) {
  
  const handleSubmit = (e) => {
    e.preventDefault();
    const inputs = [
      e.target[0].value,
      Number(e.target[1].value),
      e.target[2].value,
    ];
    clearFields(e.target)
    handleData(inputs,'product');
  }

  
  const clearFields = (inputs) => {
    inputs[0].value = "";
    inputs[1].value = "";
    inputs[2].value = "";
  };

  return (
    <React.Fragment>
      
      <div className="row">
        <h2 id="display" className="text-center mt-2 text-color fs-4">
          Input the product to be saved:
        </h2>
      </div>
      <form className="row justify-content-center" onSubmit={handleSubmit}>
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
