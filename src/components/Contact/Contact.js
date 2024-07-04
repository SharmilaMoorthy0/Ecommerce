import React, { useState } from 'react'
import img from '../Images/contact.jpg'
import './contact.css'
import axios from 'axios'
import toast from 'react-hot-toast'

function Contact() {
  const [message, setmessage] = useState({
    name: "",
    Email: "",
    message: ""
  })
  const handlechange = (event, name) => {
    setmessage({ ...message, [name]: event.target.value })
  }
  const messageProcess = () => {

    axios.post("https://backend-t6li.onrender.com/send/message", message, {
      headers: {
        Authorization: localStorage.getItem("myapptoken")
      }
    }).then((res) => {
      if (res.data.status === 1) {
        toast.success(res.data.message)
        setmessage({
          name: "",
          Email: "",
          message: ""
        })
      }
      if (res.data.status === 0) {
        toast.success(res.data.message)
      }
    }).catch((err) => { console.log(err) })
  }

  return (
    <div id='contact'>
      <div className='container box'>
        <div className='row align-items-center'>
          <div className='col-sm-12 col-md-12 col-lg-6' >
            <img src={img} width={"450px"} className='img-fluid' />
          </div>
          <div className='col-sm-12 col-md-12 col-lg-6'>
            <h1>CONTACT US</h1>
            <div className='form mb-3'>
              <input type='text' className='form-control' name='name' placeholder='Enter  your name'
                value={message.name}
                onChange={(event) => handlechange(event,"name")} />
              <input type='email' className='form-control' name='Email' placeholder='Enter your Email'
                value={message.Email}
                onChange={(event) => handlechange(event,"Email")} />
              <textarea className='form-control' name='message' placeholder='Enter your message'
                value={message.message}

                onChange={(event) => handlechange(event,"message")}
              >

              </textarea>
              <button className='button' onClick={() => messageProcess()}>Send message</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Contact