import React, { useState } from 'react'
import'./check.css'
import { useContext, useEffect} from "react";


import toast from "react-hot-toast";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Usercontext from "../../Context/Context";

function Check({fetchCartData}) {
    const [addressmodal, setaddressmodal] = useState(false)
  const [buynow, setbuynow] = useState(JSON.parse(localStorage.getItem('buynow')))
  const [address, setaddress] = useState({
    Name: "",
    Line1: "",
    Line2: "",
    City: "",
    State: "",
    Country: "",
    Pincode: ""
  })
  const navigate = useNavigate()
  const cartList = useContext(Usercontext);
  console.log(cartList)
  const totalAmount = cartList?.reduce(
    (prev, curr) => prev + Number(curr.Price),
    0
  );

  useEffect(() => {
    fetchCartData()
  }, [])

  const handlechange = (event, name) => {
    setaddress({ ...address, [name]: event.target.value })
  }

  const placeOrder = () => {
    if (localStorage.getItem("myapptoken")) {
      setaddressmodal(!addressmodal)
    }
    else {
      toast.error("please login to Buy Product")
    }
  }


  const Order = () => {
    cartList.forEach((product) => {
      let orderDetails = { ...product, address, buynow: false }
      axios.post("http://localhost:8000/new/order", orderDetails, {
        headers: {
          Authorization: localStorage.getItem("myapptoken")
        }
      }).then((res) => {
        if (res.data.status === 1) {

        }
        if (res.data.status === 0) {
          toast.error(res.data.message)
        }
      })

    });
    setaddressmodal(!addressmodal)
    toast.success("order placed successfully")
    navigate('/product')
    fetchCartData()
  }

  const OrderBuyNow = () => {
    let client = JSON.parse(localStorage.getItem("userData"))._id
    let orderDetails = { ...buynow, address, buynow: true, client: client }
    axios.post("https://backend-t6li.onrender.com/new/order", orderDetails, {
      headers: {
        Authorization: localStorage.getItem("myapptoken")
      }
    }).then((res) => {
      if (res.data.status === 1) {
        toast.success(res.data.message)
        localStorage.removeItem('buynow')
        navigate('/product')
      }
      if (res.data.status === 0) {
        toast.error(res.data.message)
      }
    })

  return (
    <div className='row my-5'>
                <div className=' total col-sm-12 col-md-4 col-lg-4'>
                    <div className='border'>
                        <h5 className='cartTotal'>Cart Total</h5>
                        <div className='d-flex justify-content-between'>
                            <h6>Sub Total</h6>
                            <p>${totalAmount}</p>
                        </div>
                        <div className='d-flex justify-content-between'>
                            <h6>Shipping</h6>
                            <p>Free</p>
                        </div>

                        <hr />
                        <div className='d-flex justify-content-between'>
                            <h6>Total</h6>
                            <p>${totalAmount}</p>
                        </div>
                        <div className="text-center">
                            <button className="paybtn" onClick={() => navigate('/checkout')}>Pay Now</button>
                        </div>
                    </div>
                </div>

            </div>
  )
}
}
export default Check