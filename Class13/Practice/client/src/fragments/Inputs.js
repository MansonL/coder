import React from "react"

export default function Inputs () {

  return (
    <React.Fragment>
    <div className="col-12 mb-3">
    <label htmlFor="title" className="form-label">Title:</label>
    <input type="text" className="form-control" placeholder="Insert your product title..." />
</div>
<div className="col-12 mb-3">
    <label htmlFor="price" className="form-label">Price:</label>
    <input type="number" min="0.01" step="0.01" className="form-control"
        placeholder="Insert your product price..." />
</div>
<div className="col-12 mb-3">
    <label htmlFor="thumbnail" className="form-label">Link to the image:</label>
    <input type="text" className="form-control"
        placeholder="Insert your product image link..."/>
</div>
</React.Fragment>
  )


}