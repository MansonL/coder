import Table from './Table'
import Chat from './Chat';
import Form from './Form';
import React, { useState } from "react";
import {socket} from '../lib/socket';
export default function Layout() {
  const [products, setProducts] = useState([])
  const handleProducts = (products) => {
     setProducts(products);
  };
  socket.on('update', data => {
    handleProducts(data);
  })
  socket.on('renderTable', data => {
       setProducts(data);
  })
  return (
    <React.Fragment>
      <div className="col-12 col-sm-4">
        <div className="container card">
            <Form/>
        </div>
      </div>
      <div className="col-12 col-sm-4">
        <div className="container card">
            <Table products={products}/>
        </div>
      </div>
      <div className="col-12 col-sm-4">
        <div className="container card py-2">
            <Chat socket={socket}/>
        </div>
      </div>
    </React.Fragment>
  );
}
