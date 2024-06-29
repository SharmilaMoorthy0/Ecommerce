import React, { useContext, useEffect, useState } from "react";
import "./checkout.css";
import toast from "react-hot-toast";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Usercontext from "../../Context/Context";
import { Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap";

function CheckOut({ fetchCartData }) {
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


  const Order = (data) => {
    cartList.forEach((product) => {

      let orderDetails = { ...product, address, buynow: false, ...data }
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

    navigate('/order')
    fetchCartData()
  }

  const OrderBuyNow = () => {
    let client = JSON.parse(localStorage.getItem("userData"))._id
    let orderDetails = { ...buynow, address, buynow: true, client: client }
    axios.post("http://localhost:8000/new/order", orderDetails, {
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
    <div className="container">
      <div className="row mt-4">
        <div className="col-lg-6  col-md-6 col-sm-12 left-cart">
          <div className="container w-50 m-auto">
            <div className="row">
              <div className="col-12">
                <div class="mb-3">
                  <label class="form-label">Name</label>
                  <input
                    type="text"
                    class="form-control"
                    placeholder="Enter Name"
                  />
                </div>
              </div>
              <div className="col-12">
                <div class="mb-3">
                  <label class="form-label">Card Number</label>
                  <input
                    type="number"
                    class="form-control"
                    maxLength={16}
                    placeholder="1234 5678 9012 3456"
                  />
                </div>
              </div>
              <div className="col-6">
                <div class="mb-3">
                  <label class="form-label">Expiry Date</label>
                  <input type="date" class="form-control" placeholder="MM/YY" />
                </div>
              </div>
              <div className="col-6">
                <div class="mb-3">
                  <label class="form-label">CCV</label>
                  <input
                    type="number"
                    class="form-control"
                    maxLength={3}
                    placeholder="123"
                  />
                </div>
              </div>
            </div>
            <div className="text-center">
              <button className="pay-btn" onClick={() => placeOrder()}>
                Pay ${buynow ? buynow.Offerprice : totalAmount}
              </button>
            </div>
          </div>
        </div>


        <div className=' total  border col-sm-12 col-md-6 col-lg-6'>
          <div className=''>
            <h5 className='cartTotal'>Cart Total</h5>
            <div className='d-flex justify-content-between'>
              <h6>Item</h6>
              <p>{buynow ? "1" : cartList.length}</p>
            </div>

            <div className='d-flex justify-content-between'>
              <h6>Price</h6>
              <p>${buynow ? buynow.Offerprice : totalAmount}</p>
            </div>
            <div className='d-flex justify-content-between'>
              <h6>Shipping</h6>
              <p>Free</p>
            </div>

            <hr />
            <div className='d-flex justify-content-between'>
              <h6>Total</h6>
              <p>${buynow ? buynow.Offerprice : totalAmount}</p>
            </div>

          </div>

        </div>

      </div>


      <Modal isOpen={addressmodal} toggle={() => setaddressmodal(!addressmodal)} size="lg">
        <ModalHeader> Enter your Address </ModalHeader>
        <ModalBody>
          <div className='container w-75 '>
            {/* <h1 className='text-center text-primary'>shop Name</h1> */}

            <div className='row mt-5'>
              <div className='col-sm-12 col-md-6 col-lg-6'>

                <label class="form-label  text-primary">Name
                  <span className='mx-2' style={{ color: "red" }}>{ }</span>
                </label>
                <input type="text" class="form-control" name="Name"
                  value={address.Name}
                  onChange={(event) => handlechange(event, "Name")}
                />

              </div>
            </div>

            <div className='col-sm-12 col-md-6 col-lg-6'>
              <div class="mb-3">
                <label class="form-label  text-primary">line 1
                  <span className='mx-2' style={{ color: "red" }}>{ }</span>
                </label>
                <input type="text" class="form-control"
                  value={address.Line1}
                  onChange={(event) => handlechange(event, "Line1")}
                />
              </div>
            </div>
            <div className='col-sm-12 col-md-6 col-lg-6'>
              <div class="mb-3">
                <label class="form-label  text-primary">line 2
                  <span className='mx-2' style={{ color: "red" }}></span>
                </label>
                <input type="text" class="form-control"
                  value={address.Line2}
                  onChange={(event) => handlechange(event, "Line2")}
                />
              </div>

            </div>
            <div className='col-sm-12 col-md-6 col-lg-6'>
              <div class="mb-3">
                <label class="form-label  text-primary">City
                  <span className='mx-2' style={{ color: "red" }}></span>
                </label>
                <input type="text" class="form-control"
                  value={address.City}
                  onChange={(event) => handlechange(event, "City")}
                />
              </div>

            </div>
            <div className='col-sm-12 col-md-6 col-lg-6'>
              <div class="mb-3">
                <label class="form-label  text-primary">State
                  <span className='mx-2' style={{ color: "red" }}></span>
                </label>
                <input type="text" class="form-control"
                  value={address.State}
                  onChange={(event) => handlechange(event, "State")}
                />
              </div>

            </div>
            <div className='col-sm-12 col-md-6 col-lg-6'>
              <div class="mb-3">
                <label class="form-label  text-primary">Country
                  <span className='mx-2' style={{ color: "red" }}></span>
                </label>
                <input type="text" class="form-control"
                  value={address.Country}
                  onChange={(event) => handlechange(event, "Country")}
                />
              </div>

            </div>
            <div className='col-sm-12 col-md-6 col-lg-6'>
              <div class="mb-3">
                <label class="form-label  text-primary">Pincode
                  <span className='mx-2' style={{ color: "red" }}></span>
                </label>
                <input type="number" class="form-control"
                  value={address.Pincode}
                  onChange={(event) => handlechange(event, "Pincode")}
                />
              </div>

            </div>
          </div>






        </ModalBody>
        <ModalFooter>
          <button className="btn btn-success" onClick={() => { buynow ? OrderBuyNow() : Order() }}>Place Order</button>
        </ModalFooter>
      </Modal>
    </div >
  );
}

export default CheckOut;