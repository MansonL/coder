import React from "react"

export default function Inputs () {

  return (
    <React.Fragment>
    <div className="col-12 mb-2">
            <label for="title" className="form-label text-color">Title:</label>
            <input type="text" className="form-control" id="title" name="title" placeholder="Insert your product title..."/>
        </div>
        <div className="col-12 mb-2">
            <label for="price" className="form-label text-color">Price:</label>
            <input type="number" min="0.01" step="0.01" className="form-control" id="price" name="price"
                placeholder="Insert your product price..."/>
        </div>
        <div className="col-12 mb-3">
            <label for="thumbnail" className="form-label text-color">Link to the image:</label>
            <input type="text" className="form-control" id="thumbnail" name="thumbnail"
                placeholder="Insert your product image link..."/>
        </div>
</React.Fragment>
  )


}