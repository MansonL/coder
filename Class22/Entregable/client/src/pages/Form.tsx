import './form.css'
export function Form() {
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
      <input type="text"/>
      <label htmlFor="description">Description</label>
      <span className="form-border"/>
    </div>
    <div className="row-form"><input type="text"/>
      <label htmlFor="img">Image link</label>
      <span className="form-border"/>
    </div>
    <div className="row-form"><input type="text"/>
      <label htmlFor="code">Code</label>
      <span className="form-border"/>
    </div>
    <div className="row-form">
      <input type="number"/>
      <label htmlFor="stock">Stock</label>
      <span className="form-border"/>
    </div>
    <div className="row-form"><input type="number"/>
      <label htmlFor="price">Price</label>
      <span className="form-border"/>
    </div>
    <div className="row-form" id="submit">
      <button className="submit-form" type="submit">Save</button>
    </div>
  </form>
</>
    )
}