import axios from 'axios'
import React, { useEffect } from 'react'
import { useContext } from 'react';
import toast from 'react-hot-toast'
import Usercontext from '../../Context/Context';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './address.css'

function AddressPage({ fetchCartData }) {
    const navigate = useNavigate()
    const [buynow, setbuynow] = useState(JSON.parse(localStorage.getItem('buynow')))
    const cartList = useContext(Usercontext);
    const [address, setaddress] = useState({
        Name: "",
        Line1: "",
        Line2: "",
        LandMark: "",
        City: "",
        State: "",
        Country: "",
        Pincode: ""
    })
    useEffect(() => {
        fetchCartData()
    }, [])
    const handlechange = (event, name) => {
        setaddress({ ...address, [name]: event.target.value })
    }
    const Order = (data) => {
        if (address.Name === "") {
            return toast.error("Name requried")
        }
        if (address.Line1 === "") {
            return toast.error("Line1 requried")
        }
        if (address.Line2 === "") {
            return toast.error("Line2 requried")
        }
        if (address.LandMark === "") {
            return toast.error("LandMark requried")
        }
        if (address.City === "") {
            return toast.error("City requried")
        }
        if (address.State === "") {
            return toast.error("State requried")
        }
        if (address.Country === "") {
            return toast.error("Country requried")
        }
        if (address.Pincode === "") {
            return toast.error("Pincode requried")
        }
        cartList.forEach((product) => {

            let orderDetails = { ...product, address, buynow: false, ...data }

            axios.post("https://backend-t6li.onrender.com/new/order", orderDetails, {
                headers: {
                    Authorization: localStorage.getItem("myapptoken")
                }
            }).then((res) => {
                if (res.data.status === 1) {
                    toast.success("order placed successfully")

                    navigate('/order')
                    fetchCartData()
                }
                if (res.data.status === 0) {
                    toast.error(res.data.message)
                }
            })

        });


    }
    const OrderBuyNow = () => {
        if (address.Name === "") {
            return toast.error("Name requried")
        }
        if (address.Line1 === "") {
            return toast.error("Line1 requried")
        }
        if (address.Line2 === "") {
            return toast.error("Line2 requried")
        }
        if (address.LandMark === "") {
            return toast.error("LandMark requried")
        }
        if (address.City === "") {
            return toast.error("City requried")
        }
        if (address.State === "") {
            return toast.error("State requried")
        }
        if (address.Country === "") {
            return toast.error("Country requried")
        }
        if (address.Pincode === "") {
            return toast.error("Pincode requried")
        }
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
                navigate('/order')
            }
            if (res.data.status === 0) {
                toast.error(res.data.message)
            }
        })

    }
    return (
        <div className='container-fluid'>

            <div className='card shadow address  mt-3'>

                <div className='card-body '>
                    <div class="form-container w-100 m-auto">
                        <div className='row'>
                            <h5>Enter Your Address</h5>
                            <div className='col-sm-12 col-md-6 col-lg-6 my-3'>

                                <div>
                                    <labe>Name</labe>
                                    <input type="text" class="input-text"
                                        value={address.Name}
                                        onChange={(e) => handlechange(e, "Name")}
                                    />
                                </div>
                                <div>
                                    <labe>Line 1</labe>
                                    <input type="text" class="input-text"
                                        value={address.Line1}
                                        onChange={(e) => handlechange(e, "Line1")}
                                    />
                                </div>
                                <div>
                                    <labe>Line 2</labe>
                                    <input type="text" class="input-text"
                                        value={address.Line2}
                                        onChange={(e) => handlechange(e, "Line2")}
                                    />
                                </div>
                                <div>
                                    <labe>LandMark</labe>
                                    <input type="text" class="input-text"
                                        value={address.LandMark}
                                        onChange={(e) => handlechange(e, "LandMark")}
                                    />
                                </div>
                            </div>


                            <div className='col-sm-12 col-md-6 col-lg-6'>

                                <div>
                                    <labe>City</labe>
                                    <input type="text" class="input-text"
                                        value={address.City}
                                        onChange={(e) => handlechange(e, "City")}

                                    />
                                </div>
                                <div>
                                    <labe>State</labe>
                                    <input type="text" class="input-text"
                                        value={address.State}
                                        onChange={(e) => handlechange(e, "State")}

                                    />
                                </div>
                                <div>
                                    <labe>Country</labe>
                                    <input type="text" class="input-text"
                                        value={address.Country}
                                        onChange={(e) => handlechange(e, "Country")}

                                    />
                                </div>
                                <div>
                                    <labe>Pincode</labe>
                                    <input type="number" class="input-text"
                                        value={address.Pincode}
                                        onChange={(event) => handlechange(event, "Pincode")}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>

                    <input type="submit" class="input-submit" onClick={() => { buynow ? OrderBuyNow() : Order() }} />
                </div>

            </div>
        </div>


    )
}

export default AddressPage