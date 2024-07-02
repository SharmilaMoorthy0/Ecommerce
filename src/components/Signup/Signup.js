import React, { useState } from 'react'
// import LoginPng from '../images/login.png'
import './signup.css'
import { useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'
import axios from 'axios'

function SignUp({ toggleLogin }) {
    const navigate = useNavigate()
    const [user, setuser] = useState({
        username: "",
        Email: "",
        password: "",
        mobile: 0,
        
    }
    )
    const handleChange = (e) => {
        setuser({ ...user, [e.target.name]: e.target.value })
    }
    const onSubmit = () => {
        if (user.username === "") {
            return toast.error("username requried")
        }
        if (user.Email === "") {
            return toast.error("Email requried")
        }
        if (user.password === "") {
            return toast.error(" password requried")
        }
        if (user.mobile === "") {
            return toast.error("mobile requried")
        }
        

        axios.post("http://localhost:8000/user/signup", user).then((res) => {
            if (res.data.status === 1) {
                toast.success(res.data.message)
                toggleLogin()
            }

            if (res.data.status === 0) {
                toast.error(res.data.message)
            }

        }).catch((err) => { console.log(err) })

    }

    return (
        <div className='container-fluid'>
        <div className='row'>
            
            <div className='col-12 right-login'>
                <div className='container login-page mt-5'>
                    <div>
                        <input className='login-input' name="username" type='text' placeholder='Enter User Name' onChange={(e)=>handleChange(e)}/>
                    </div>
                    <div>
                        <input className='login-input' name="Email" type='email' placeholder='Enter Email' onChange={(e)=>handleChange(e)}/>
                    </div>
                    <div>
                        <input className='login-input' name="mobile" type='number' placeholder='Enter Mobile Number' onChange={(e)=>handleChange(e)}/>
                    </div>
                    <div>
                        <input className='login-input' name="password" type='password' placeholder='Enter Password' onChange={(e)=>handleChange(e)}/>
                    </div>
                  
                   
                    <button className='req-btn' onClick={onSubmit}>Continue</button>
                    <button className='req-exist-btn' onClick={()=>toggleLogin()}>Existing User? Login</button>
                </div>
                
            </div>
        </div>
    </div>




    )
}

export default SignUp