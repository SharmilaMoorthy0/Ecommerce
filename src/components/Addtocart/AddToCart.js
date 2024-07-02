import axios from 'axios'
import React from 'react'
import { useState } from 'react'
import toast from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'
import './addtocart.css'


function AddToCart(cartData, setCartData) {
    const navigate = useNavigate()
    const carts = (JSON.parse(localStorage.getItem('cart')))
    const [buynow, setbuynow] = useState(JSON.parse(localStorage.getItem('buynow')))
   
    const handleAddtoCart = (data) => {
        if (localStorage.getItem("myapptoken")) {
            let newcart = {
                ...data,
                client: JSON.parse(localStorage.getItem('userData'))._id
            }
            console.log(newcart)


            axios.post("http://localhost:8000/new/cart", newcart).then((res) => {
                if (res.data.status === 1) {
                    toast.success(res.data.message)
                    navigate('/cartItem')
                    setCartData([...cartData, newcart])
                    localStorage.removeItem('cart')
                  

                }
                if (res.data.status === 0) {
                    toast.success(res.data.message)
                }
            }).catch((err) => { console.log(err) })
        }
        else {
            toast.error("please login  to Add Cart")
        }

    }

    return (
        <div className="container mt-3 single-product">

            <div className="row ">
                <div className="col-sm-12 col-md-6 col-lg-6 my-3">
                    <img src={carts?.Image} className="img-fluid "width={"600"} height={"100"} />
                </div>
                <div className="col-sm-12 col-md-6 col-lg-6 my-3 align-items-center">
                <h3 className="">{carts?.productName}</h3>
                    <div className='d-flex justify-content-between'>
                        <div>
                        <div><span class={Number(carts?.Rating) >= 3 ? "badge text-bg-success" : "badge text-bg-danger"}>{carts?.Rating} <i class="fa fa-star-o" aria-hidden="true"></i></span></div>
                        <p className='para'>Price:<h5>${carts?.Offerprice} <span className="text-decoration-line-through text-muted fs-6">${carts?.Price}</span></h5></p>
                           
                           
                        </div>

                    </div>
                    <p className=''>{carts?.Description}</p>
                    <button className="add-btn" onClick={() => handleAddtoCart(carts)}><i class="fa fa-cart-plus" aria-hidden="true"></i> Add to Cart</button>
                </div>

               
            </div>

        </div>
    )
}

export default AddToCart