import React from "react";

export default function Chat ({socket}){

    return (
        <React.Fragment>
        <div className="input-group my-2">  
  <input type="email" placeholder="Set your email" className="form-control" />
    <button className="btn btn-light mx-1">Confirm email</button>
</div>
  <div className="card">
    <div className="card-body bg-white rounded">
     <div id="msg-received">
       <span> { 'DD/MM/YY hh:mm:ss'} </span><b>Random User: </b>
       <br/><i>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quibusdam saepe ut praesentium accusamus quam minus, id in temporibus velit voluptates. Cumque, hic. Consequatur nisi voluptatem enim laborum autem culpa excepturi! Lorem ipsum dolor sit amet consectetur adipisicing elit. Aut tempora fugiat corporis voluptas doloribus facilis suscipit distinctio cum harum, nihil iusto tempore delectus alias vitae, blanditiis porro. Placeat, asperiores praesentium! Lorem ipsum dolor, sit amet consectetur adipisicing elit. Placeat fuga voluptates dolores sapiente, cumque id distinctio eum dicta quam sint laudantium consequatur quidem ducimus temporibus molestiae quaerat. Deserunt, totam similique.  lorem.sads </i>
     </div>
      <div id="msg-sent" className="mt-1">
        <span>{ 'DD/MM/YY hh:mm:ss'}</span><b> Lautaro Manson:</b><br/>
        <i>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quibusdam saepe ut praesentium accusamus quam minus, id in temporibus velit voluptates. Cumque, hic. Consequatur nisi voluptatem enim laborum autem culpa excepturi! Lorem ipsum dolor sit amet consectetur adipisicing elit. Aut tempora fugiat corporis voluptas doloribus facilis suscipit distinctio cum harum, nihil iusto tempore delectus alias vitae, blanditiis porro. Placeat, asperiores praesentium! Lorem ipsum dolor, sit amet consectetur adipisicing elit. Placeat fuga voluptates dolores sapiente, cumque id distinctio eum dicta quam sint laudantium consequatur quidem ducimus temporibus molestiae quaerat. Deserunt, totam similique.  lorem.sads </i>
     </div>
    </div>
    <div className="card-footer">
      <div className="input-group">
        <input type="text" className="form-control" placeholder="Set your message here..." />
        <button className="btn btn-outline-light">Send</button>
      </div>
    </div>
  </div>
  </React.Fragment>
    )
}