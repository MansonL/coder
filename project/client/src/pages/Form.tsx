import axios from 'axios';
import moment from 'moment';
import { INew_Product } from '../../../server/src/interfaces/interfaces';
import './form.css';
export function Form() {
  /*
  const titleInput = $('#title')[0];
  const descrInput = $('#description')[0];
  const imgInput = $('#image')[0];
  const codeInput = $('#code')[0];
  const stockInput = $('#stock')[0];
  const priceInput = $('#price')[0]; Need to change this with useRef*/
  const handleSubmit = async (e: React.FormEvent<HTMLButtonElement>) => { 
    const product : INew_Product = {
      timestamp: moment().format('YYYY-MM-DD HH:mm:ss'),
      title: titleInput.innerHTML,
      description: descrInput.innerHTML,
      img: imgInput.innerHTML,
      code: codeInput.innerHTML,
      stock: Number(stockInput.innerHTML),
      price: Number(priceInput.innerHTML)
    }
    await axios.post('http://localhost:8080/products/save', product)
  }

  return (
        <>
        <header>
    <div className="title">
      <h4>Products Form</h4>
    </div>
  </header>
  <form className="form">
    <div className="row-form">
      <input type="text" id="title" />
      <label htmlFor="title">Title</label>
      <span className="form-border"/>
    </div>
    <div className="row-form">
      <input type="text" id="description"/>
      <label htmlFor="description">Description</label>
      <span className="form-border"/>
    </div>
    <div className="row-form"><input type="text" id="image"/>
      <label htmlFor="img">Image link</label>
      <span className="form-border"/>
    </div>
    <div className="row-form"><input type="text" id="code"/>
      <label htmlFor="code">Code</label>
      <span className="form-border"/>
    </div>
    <div className="row-form">
      <input type="number" id="stock"/>
      <label htmlFor="stock">Stock</label>
      <span className="form-border"/>
    </div>
    <div className="row-form"><input type="number" id="price"/>
      <label htmlFor="price">Price</label>
      <span className="form-border"/>
    </div>
    <div className="row-form" id="submit">
      <button className="submit-form" type="submit" onSubmit={handleSubmit}>Save</button>
    </div>
  </form>
</>
    )
}