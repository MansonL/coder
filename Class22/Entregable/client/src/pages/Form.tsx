import moment from 'moment'
import { INew_Product } from '../../../server/src/interfaces/interfaces'
import './form.css'
export function Form() {
    
  const handleSubmit = (e: React.FormEvent<HTMLButtonElement>) => { 
    const values : INew_Product = {
      timestamp: moment().format('YYYY-MM-DD HH:mm:ss'),
      title: '',
      description: '',
      img: '',
      code: '',
      stock: 0,
      price: 0
    }
    $('input').each(function(){
      const name = $(this).attr('name') as string;
      
    })
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