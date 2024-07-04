import React, { useContext, useState } from 'react'
import './login.css'
// import LoginPng from '../images/login.png'
import { useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'
import axios from 'axios'
import Usercontext from '../../Context/Context'

function Login({ toggleSignUp, closeLogin }) {
    const navigate = useNavigate()
    const cartList = useContext(Usercontext)
    console.log(cartList)
    const [login, setLogin] = useState({
        Email: "",
        password: ""
    })
    const handleChange = (e) => {
        setLogin({ ...login, [e.target.name]: e.target.value })
    }

    const createLoginCart = () => {
        if (cartList?.length > 0) {
            cartList.forEach(async (list) => {
                let newcart = {
                    ...list,
                    client: JSON.parse(localStorage.getItem('userData'))._id
                }
                console.log(newcart)
                axios.post("http://localhost:8000/new/cart", newcart).then((res) => {
                    if (res.data.status === 1) {
                        toast.success(res.data.message)

                    }
                    if (res.data.status === 0) {
                        toast.success(res.data.message)
                    }
                }).catch((err) => { console.log(err) })
            });
            localStorage.removeItem('cartData')
        }
    }

    const OnLogin = () => {
        if (login.Email === "") {
            return toast.error("Email Required")
        }
        if (login.password === "") {
            return toast.error("Password Required")
        }

        axios.post('https://backend-t6li.onrender.com/login/user', login).then((res) => {
            if (res.data.status === 1) {
                toast.success(res.data.message)
                console.log(res.data.token)
                localStorage.setItem("myapptoken", res.data.token)
                localStorage.setItem("userData", JSON.stringify(res.data.user))
                createLoginCart()
                closeLogin()
                
            }
            if (res.data.status === 0) {
                toast.error(res.data.message)
            }
        })
    }
    return (

        <div className='container-fluid'>
            <div className='row'>
                
             <div className='col-12 right-login'>
                    <div className='container login-page  mt-5'>
                        <div>
                            <input className='login-input' type="email" name="Email" placeholder='Enter Email' onChange={(e) => handleChange(e)} />
                        </div>
                        <div>
                            <input className='login-input' type="password" name='password' placeholder='Enter Password' onChange={(e) => handleChange(e)} />
                        </div>
                       
                        <button className='req-btn' onClick={() => OnLogin()}>Login</button>
                        <div className='text-center new-login'>
                            <p onClick={() => toggleSignUp()}>New to Lifestyle? Create an account</p>
                        </div>
                    </div>

                </div>
            </div>
        </div>

    )
}

export default Login