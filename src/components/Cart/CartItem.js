import React, { useState, useContext, useEffect } from 'react'
import './cart.css'
// import { addDays, format } from "date-fns";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import Usercontext from '../../Context/Context';
import { Button } from 'reactstrap';

import { Modal, ModalBody } from "reactstrap";
import Login from '../login/Login';
import SignUp from '../Signup/Signup';

function CartItem({ fetchCartData }) {
    let token = localStorage.getItem("myapptoken")
    const navigate = useNavigate()
    const cartList = useContext(Usercontext)
    console.log(cartList)

    const [islogin, setIsLogin] = useState(false)
    const [isSignup, setIsSignup] = useState(false)

    const closeLogin = () => setIsLogin(!islogin)
    const toggleSignUp = () => {
        setIsLogin(false)
        setIsSignup(true)
    }

    const toggleLogin = () => {
        setIsSignup(false)
        setIsLogin(true)
    }


    useEffect(() => {
     fetchCartData()
        }, [])

    const openLogin = () => {
        toggleLogin()
    }
    const openCheckout = () => {
        navigate('/checkout')
        localStorage.removeItem('buynow')
        localStorage.removeItem('cart')
    }
    const totalAmount = cartList?.reduce((prev, curr) => prev + Number(curr?.Offerprice), 0).toFixed(2)
    const RemoveCart = (id, i) => {
       
            axios.post('https://backend-t6li.onrender.com/remove/cart', { id: id }).then((res) => {
                if (res.data.status === 1) {
                    toast.success(res.data.message)
                    fetchCartData()
                }
                if (res.data.status === 0) {
                    toast.success(res.data.message)
                }

            })
        

    }
    return (
        <div id='cart' className='container my-5'>
            <table className='w-100 '>
                <thead>
                    <tr>
                        <td>Remove</td>
                        <td>Image</td>
                        <td>Product Name</td>
                        <td>Price</td>
                        <td>Total</td>
                    </tr>
                </thead>
                <tbody>
                    {cartList && cartList?.map((list) => {
                        return <tr>
                            <td onClick={() => RemoveCart(list?._id)}><i class="fa fa-times" aria-hidden="true"></i></td>
                            <td><img className='' height={"62px"} src={list?.Image} /></td>
                            <td>{list?.productName}</td>
                            <td>${list?.Offerprice}</td>
                            
                            <td>${list?.Offerprice?.toFixed(2)}</td>
                        </tr>
                    })}
                </tbody>
            </table>
            <div className='d-flex justify-content-end'>
            <button className="pay-btn" onClick={()=>{token?openCheckout():openLogin()}}>{token?"Pay Now":"Login to Pay"}</button>
            </div>
            <Modal isOpen={islogin} toggle={() => setIsLogin(!islogin)} centered size='md'>
        <ModalBody>
          <Login toggleSignUp={toggleSignUp} closeLogin={closeLogin} />
        </ModalBody>
      </Modal>
      <Modal isOpen={isSignup} toggle={() => setIsSignup(!isSignup)} centered size='md'>
        <ModalBody>
          <SignUp toggleLogin={toggleLogin} />
        </ModalBody>
      </Modal>
        </div>
       
    )


}
export default CartItem