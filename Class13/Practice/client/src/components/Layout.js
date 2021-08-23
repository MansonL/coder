import Table from './Table'
import Chat from './Chat';
import Form from './Form';
import React from "react";

export default function Layout({ socket }) {
  return (
    <React.Fragment>
      <div className="col-12 col-sm-4">
        <div className="container card">
            <Form socket={socket}/>
        </div>
      </div>
      <div className="col-12 col-sm-4">
        <div className="container card">
            <Table socket={socket}/>
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
