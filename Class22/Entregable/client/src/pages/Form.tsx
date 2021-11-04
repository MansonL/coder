import axios from 'axios';
import moment from 'moment';
import React, { useState } from 'react';
import { CUDResponse, INew_Product } from '../../../server/src/interfaces/interfaces';
import { validation } from '../joi/schemas';
import './form.css';
export function Form() {
  
  /**
   * 
   * State of the future new products & error at submitting the form with an invalid value.
   * 
   */
  const [errorForm, setErrorForm] = useState(false);
  const [successForm, setSuccessForm] = useState(false);
  const [resultMessage, setResultMessage] = useState('');
  const [newProduct, setNewProduct] = useState<INew_Product>({
    timestamp: '',
    title: '',
    description: '',
    code: '',
    img: '',
    price: 0,
    stock: 0,
  });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => { 
    setNewProduct({
      ...newProduct,
      timestamp: moment().format('YYYY-MM-DD HH:mm:ss')
    })
    const { error } = validation.newProduct.validate(newProduct);
    if(error){
      if(!errorForm){
        setErrorForm(true);
        setSuccessForm(false);
        setResultMessage(error.message)
      }
    }else{
      const result = await (await axios.post<CUDResponse>('http://localhost:8080/products/save', newProduct)).data;
      if(result.data){ // Here need to check if there's an instance of MongoProduct or an empty array (error);
        setErrorForm(true);
        setSuccessForm(false);
        setResultMessage(result.message)
      }else{
        setErrorForm(false);
        setSuccessForm(true)
        setResultMessage(result.message)
      }
    }
    
  }

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    const value : string | number = e.target.value
    setNewProduct({
      ...newProduct,
      [e.target.name]: value
    })
  }

  return (
        <>
        <header>
    <div className="title">
      <h4>Products Form</h4>
    </div>
  </header>
  <form className="form" onSubmit={handleSubmit}>
    <div className="row-form">
      <input type="text" name='title' className="label-styled-input" onChange={handleFormChange} id="title" />
      <label className='label-styled' htmlFor="title">Title</label>
      <span className="form-border"/>
    </div>
    <div className="row-form">
      <input type="text" name='description' className="label-styled-input" onChange={handleFormChange} id="description"/>
      <label className='label-styled' htmlFor="description">Description</label>
      <span className="form-border"/>
    </div>
    <div className="row-form"><input type="text" name='img' className="label-styled-input" onChange={handleFormChange} id="image"/>
      <label className='label-styled' htmlFor="img">Image link</label>
      <span className="form-border"/>
    </div>
    <div className="row-form"><input type="text" name='code' className="label-styled-input" onChange={handleFormChange}  id="code"/>
      <label className='label-styled' htmlFor="code">Code</label>
      <span className="form-border"/>
    </div>
    <div className="row-form">
      <input type="number" name='stock' className="label-styled-input" onChange={handleFormChange} id="stock"/>
      <label className='label-styled' htmlFor="stock">Stock</label>
      <span className="form-border"/>
    </div>
    <div className="row-form"><input type="number"  name='price' className="label-styled-input" onChange={handleFormChange} id="price"/>
      <label className='label-styled' htmlFor="price">Price</label>
      <span className="form-border"/>
    </div>
    <div className="row-form submit-row">
      <button className="submit-form" type="submit">Save</button>
    </div>
  </form>
  {successForm && <div className="form-success">
      <div className="result-top">
        <span className="result-header">Successful!</span>
        <button className="result-btn"><i className="fas fa-times"></i></button>
      </div>
      <div className="result-message">
        <span>{resultMessage}</span>
      </div>
    </div>}
  {errorForm && <div className="form-error">
      <div className="result-top">
        <span className="result-header">Oops!</span>
        <button className="result-btn"><i className="fas fa-times"></i></button>
      </div>
      <div className="result-message">
        <span>{resultMessage}</span>
      </div>
    </div>}
</>
    )
}