import React from "react"

export default function Inputs () {

  return (
    <React.Fragment>
    <div className="col-12 mb-2">
            <label htmlFor="title" className="form-label text-color">Title:</label>
            <input type="text" className="form-control" id="title" name="title" placeholder="Insert your product title..."/>
        </div>
        <div className="col-12 mb-3">
            <label htmlFor="description" className="form-label text-color">Link to the image:</label>
            <input type="text" className="form-control" id="description" name="description"
                placeholder="Insert your product description..."/>
        </div>
        <div className="col-12 mb-3">
            <label htmlFor="thumbnail" className="form-label text-color">Link to the image:</label>
            <input type="text" className="form-control" id="thumbnail" name="thumbnail"
                placeholder="Insert your product image link..."/>
        </div>
        <div className="col-12 mb-2">
            <label htmlFor="price" className="form-label text-color">Price:</label>
            <input type="number" min="0.01" step="0.01" className="form-control" id="price" name="price"
                placeholder="Insert your product price..."/>
        </div>
        <div className="col-12 mb-3">
            <label htmlFor="stock " className="form-label text-color">Link to the image:</label>
            <input type="number" min="0" step="1" className="form-control" id="stock" name="stock"
                placeholder="Insert your product stock..."/>
        </div>
</React.Fragment>
  )


}