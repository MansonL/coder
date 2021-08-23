import React from "react";
import { useEffect, useState } from "react";

export default function Table({ socket }) {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    socket.emit("");
  });
  return (
    <React.Fragment>
      <div className="row">
        <h2 className="text-center text-color fs-5 mt-3">Products List:</h2>
      </div>
      <div className="row mx-auto" id="table-container">
        {products.length > 0 && (
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
                  <tr>
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
        )}{
            products.length === 0 && <div className="alert alert-danger alert-dismissible fade show mt-2" role="alert">
            <span>No pro
              <br />Add products at:
              <a
                href="http://localhost:8080/api/products/save"
              >http://localhost:8080/api/products/save</a></span>
          </div>
        }
      </div>
    </React.Fragment>
  );
}
