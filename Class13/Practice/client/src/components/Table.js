import React from "react";
export default function Table({ products }) {
  return (
    <React.Fragment>
      <div className="row">
        <h2 className="text-center text-color fs-5 mt-3">Products List:</h2>
      </div>
      {products.length > 0 && (<div className="row mx-auto" id="table-container">
        
          <table className="table table-stripped table-hover">
            <thead>
              <th scope="col">Image</th>
              <th scope="col">#</th>
              <th scope="col">Name</th>
              <th scope="col">Price</th>
            </thead>
            <tbody>
              {products.map((product) => {
                return (
                  <tr key={product.id}>
                    <th scope="row">
                      <img src={product.thumbnail} className="w-100" />
                    </th>
                    <td>{product.id}</td>
                    <td>{product.title}</td>
                    <td>{product.price}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        
          </div>)}
          {
            products.length === 0 && <div className="alert alert-danger alert-dismissible fade show mt-2" role="alert">
            <span>No products added.</span>
      </div>}
    </React.Fragment>
  );
}
