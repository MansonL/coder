import { useState } from 'react'
import './messages.css'

export function Messages(){
  const [email, setEmail] = useState('');
  return (
        <>
        <header>
    <div className="title">
      <h4>Messages</h4>
    </div>
  </header>
  <div className="email-form">
    <h6>Input your email for sending messages:</h6>
    <div className="effect-input">
      <input type="text" className="label-styled-input"id="email" />
      <label>Email</label>
      <span className="form-border"></span>
    </div>
    <div className="submit-btn">
      <button id="submit">Submit</button>
    </div>
  </div>
  <section className="msg-card">
    <div className="msg-body">
      <div className="received-msg">
        <span>Lorem ipsum dolor sit amet consectetur adipisicing elit. Sit, animi. Repellendus dignissimos labore sint quod consequatur reprehenderit iste? Fugit quidem sed id quas dicta quis nulla nemo tenetur. Quidem, sed?</span>
      </div> <br/>
      <div className="sent-msg">
        <span><span className="date"></span><span className="username">Lautaro Manson: </span>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Maxime sed, officiis illo, porro ipsa perferendis reprehenderit nihil molestias quae quis doloribus laudantium, facilis veniam. Minima dolore totam eos iure iste?</span>
      </div>
      <div className="received-msg">
        <span>Lorem ipsum dolor sit amet consectetur adipisicing elit. Sit, animi. Repellendus dignissimos labore sint quod consequatur reprehenderit iste? Fugit quidem sed id quas dicta quis nulla nemo tenetur. Quidem, sed?</span>
      </div> <br/>
      <div className="sent-msg">
        <span className="date">2021-10-12 14:11:00</span><span className="username">Lautaro Manson: </span><p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Maxime sed, officiis illo, porro ipsa perferendis reprehenderit nihil molestias quae quis doloribus laudantium, facilis veniam. Minima dolore totam eos iure iste?</p>
      </div>
    </div>
    <div className="msg-bottom">
      <textarea name="" id="" cols={90} rows={1}></textarea>
      <button type="submit" className="msg-btn">Send</button>
    </div>
  </section>
</>
    )
}