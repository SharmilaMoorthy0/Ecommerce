import React, { useContext, useEffect, useState } from "react";
import "./checkout.css";
import toast from "react-hot-toast";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Usercontext from "../../Context/Context";
import { Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap";
import { addDays, format } from "date-fns";

function CheckOut({}) {
  const [deliveryDate, setDeliveryDate] = useState(null);
  const [buynow, setbuynow] = useState(JSON.parse(localStorage.getItem('buynow')))
  
  const navigate = useNavigate()
  const cartList = useContext(Usercontext)|| []; // Fallback to empty array if context doesn't provide data;
  console.log(cartList)
  const totalAmount = cartList?.reduce(
    (prev, curr) => prev + Number(curr.Offerprice),
    0
  );
  useEffect(() => {
    if (buynow) {
      // If buy now item exists, calculate delivery date for that item
      const deliveryDateForBuyNow = addDaysToDate(new Date(), 5); // Add 5 days to current date
      setDeliveryDate(formatDate(deliveryDateForBuyNow)); // Format and set delivery date
    } else {
      // Otherwise, calculate delivery date based on cart items
      const deliveryDateForCart = addDaysToDate(new Date(), 5); // Add 5 days to current date
      setDeliveryDate(formatDate(deliveryDateForCart)); // Format and set delivery date
    }
  }, [buynow, cartList]);
 
  const addDaysToDate = (date,days) => {
    return addDays(new Date(date), days); // Add 5 days to the provided date
  };

  // Function to format date in a desired format (e.g., "yyyy-MM-dd")
  const formatDate = (date) => {
    return format(new Date(date), 'yyyy-MM-dd'); // Format date as needed
  };


  const placeOrder = () => {
    if (localStorage.getItem("myapptoken")) {
      navigate('/address')
     

    }

    else {
      toast.error("please login to Buy Product")
    }
  }


 
  return (
    <div className="container ">
      <div className="row mt-4">
        <div className="col-lg-6 address col-md-6 col-sm-12 left-cart">
          <div className="container w-75 mx-auto">
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
              <div className="col-lg-6 col-sm-12 col-md-6">
                <div class="mb-3">
                  <label class="form-label">Expiry Date</label>
                  <input type="date" class="form-control" placeholder="MM/YY" />
                </div>
              </div>
              <div className="col-lg-6 col-sm-12 col-md-6">
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
              <p>Free $40</p>
            </div>
            <div className='d-flex justify-content-between'>
              <h6>Delivery Date</h6>
              <p>{deliveryDate}</p>
            </div>

            <hr />
            <div className='d-flex justify-content-between'>
              <h6>Total</h6>
              <p>${buynow ? buynow.Offerprice : totalAmount}</p>
            </div>

          </div>

        </div>

      </div>


     
    </div >
  );
}

export default CheckOut;