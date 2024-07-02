import axios from 'axios'
import { addDays, format } from 'date-fns'
import './order.css'
import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import { useNavigate, useParams } from 'react-router-dom'
import { Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap'

import Select from 'react-select'
export const statusoption = [
  { value: "Shipped", label: "Shipped" },
  { value: "Canceled", label: "Canceled" },
  { value: "Delivered", label: "Delivered" },

]
function Order() {

  const [Status, setStatus] = useState("")
  const navigate = useNavigate()
  const [orderlist, setorderlist] = useState([])
  const [Deletemodal, setDeletemodal] = useState(false)
  const [Deleteid, setDeleteid] = useState(null)
  const [EditAddressChange, setEditAddressChange] = useState(false)
  const [EditAddress, setEditAddress] = useState()
  const [EditAdmin, setEditAdmin] = useState({})
  const [EditAdminModal, setEditAdminModal] = useState(false)
  const [EditId, setEditId] = useState(null)
  const user = JSON.parse(localStorage.getItem("userData"))



  const getOrderlist = () => {

    let url = ""
    if (user?.role === "admin") {
      url = "https://backend-t6li.onrender.com/admin/all/order"
    }
    else {
      url = "https://backend-t6li.onrender.com/all/order"
    }
    axios.post(url, {},
      {
        headers: {
          Authorization: localStorage.getItem("myapptoken")
        }
      }
    ).then((res) => {
      if (res.data.status === 1) {
        setorderlist(res.data.response)
      }
      if (res.data.status === 0) {
        toast.error(res.data.message)
      }

    }).catch((err) => { console.log(err) })
  }
  useEffect(() => {
    getOrderlist()
  }, [])


  const handlechange = (event, name) => {
    setEditAdmin({ ...EditAdmin, [name]: event.target.value })
  }


  const ondelete = (id) => {
    setDeletemodal(!Deletemodal)
    setDeleteid(id)
  }
  const cancelDelete = () => {
    setDeletemodal(false)
    setDeleteid(null)
  }

  const Onedit = (id, data) => {
    setEditAdminModal(!EditAdminModal)
    setEditId(id)
    setEditAdmin(data)

  }
  const Deleteorder = (id) => {
    axios.post("https://backend-t6li.onrender.com/remove/order", { id: Deleteid }, {
      headers: {
        Authorization: localStorage.getItem("myapptoken")
      }
    }
    ).then((res) => {
      if (res.data.status === 1) {
        toast.success(res.data.message)
        setDeletemodal(false)
        setDeleteid(null)
        getOrderlist()
      }
      if (res.data.status === 0) {
        toast.success(res.data.message)
      }
    }).catch((err) => { console.log(err) })
  }
  const Edittoggle = (data) => {
    localStorage.setItem('address', JSON.stringify(data))
    navigate('/edit/address')

  }

  const edittoggle = (data) => {
    setEditAdmin(data)
    setEditAddressChange(!EditAddressChange)
  }
  const addDaysToDate = (date) => {
    return addDays(new Date(date), 5); // Add 5 days to the provided date
  };

  // Function to format date in a desired format (e.g., "yyyy-MM-dd")
  const formatDate = (date) => {
    return format(new Date(date), 'yyyy-MM-dd'); // Format date as needed
  };





  const handleUpdateOrder = () => {


    axios.post(`http://localhost:8000/edit/order/address/${EditAdmin._id}`, { address: EditAdmin.address }, {
      headers: {
        Authorization: localStorage.getItem("myapptoken")
      }
    }

    )
      .then((res) => {
        if (res.data.status === 1) {
          toast.success(res.data.message)
          setEditAddressChange(!EditAddressChange)
          setEditAdmin({})
          getOrderlist()

        }
        if (res.data.status === 0) {
          toast.success(res.data.message)
        }

      }).catch((err) => { console.log(err) })

  }
  const EditToggle = (data) => {
    setEditAdmin(data)
    setEditAdminModal(!EditAdminModal)
  }
  const handleChangeAdmins = (event, name) => {
    setEditAdmin({
      ...EditAdmin,
      address: {
        ...EditAdmin.address,
        [name]: event.target.value
      }
    });
  }


  const handleChangeAdmin = (event, name) => {
    setEditAdmin({ ...EditAdmin, [name]: event.target.value })
  }

  const UpdateOrderAdmin = () => {


    axios.post(`https://backend-t6li.onrender.com/edit/order/admin/${EditAdmin._id}`, EditAdmin, {
      headers: {
        Authorization: localStorage.getItem("myapptoken")
      }
    })
      .then((res) => {

        if (res.data.status === 1) {
          toast.success(res.data.message)
          setEditAdminModal(!EditAdminModal)
          setEditAdmin({})
          getOrderlist()

        }
        if (res.data.status === 0) {
          toast.success(res.data.message)
        }

      }).catch((err) => { console.log(err) })
  }



  return (


    <div id="table" className='table-responsive my-5'>
      <table class='w-100'>
        <thead className=' text-uppercase '>
          <tr>
            <th scope="col">S.no</th>
            <th scope="col">Name</th>
            <th scope="col">ProductName</th>
            <th scope="col">Price</th>
            <th scope='col'>City</th>
            <th scope='col'>Pincode</th>
            <th scope='col'>Delivery Date</th>
            <th scope='col'>Status</th>
            <th scope="col">Action</th>
          </tr>
        </thead>
        <tbody>
          {orderlist.map((list, index) => {
            return <tr>
              <td scope="row">{index + 1}</td>
              <td scope='row'>{list.address?.Name}</td>
              <td>{list.productName}</td>
              <td>{list.Offerprice}</td>
              <td scope='row'>{list.address?.City}</td>
              <td scope='row'>{list.address?.Pincode}</td>
              <td>{formatDate(addDaysToDate(list.createdAt))}</td>
              <td scope='col'>{list.Status}</td>



              <td>

                {user?.role === "admin" ? <button className='btn btn-sm  text-secondary mx-2' onClick={() => EditToggle(list)}> <i class="fa fa-pencil-square-o" aria-hidden="true"></i></button>
                :<a className='btn btn-sm text-success' onClick={() => Edittoggle(list)}>change address</a>}

                <button className="btn btn-sm text-danger mx-2" onClick={() => ondelete(list._id)}><i class="fa fa-trash-o" aria-hidden="true"></i></button>



              </td>
            </tr>
          })}
        </tbody>
      </table>


      <Modal isOpen={Deletemodal} toggle={() => setDeletemodal(!Deletemodal)}>
        <ModalHeader> Delete Confirmation</ModalHeader>
        <ModalBody>
          <div className="container">
            <p>
              Are you sure want to Delete this Order?
            </p>
            <div>
              <button className="btn btn-success mx-2" onClick={() => Deleteorder()}>Yes</button>

              <button className="btn btn-danger" onClick={() => cancelDelete()}>No</button>
            </div>
          </div>
        </ModalBody>
      </Modal>
      <Modal isOpen={EditAddressChange} toggle={() => setEditAddressChange(!EditAddressChange)} size='lg' centered>
        <ModalHeader toggle={() => setEditAddressChange(!EditAddressChange)}>Change your editaddress</ModalHeader>
        <ModalBody>
          <div className='container w-75 '>
            {/* <h1 className='text-center text-primary'>shop Name</h1> */}

            <div className='row mt-5'>


              <div className='col-sm-12 col-md-6 col-sm-6'>
                <div class="mb-3 needs-validation" novalidate>
                  <label class="form-label text-primary mx-2">Name

                    <span className='mx-2' style={{ color: "red" }}></span></label>
                  <input type="text" class="form-control"
                    value={EditAdmin.address?.Name}
                    onChange={(event) => handleChangeAdmins(event, "Name")}
                  />
                </div>
              </div>

              <div className='col-sm-12 col-md-6 col-sm-6'>
                <div class="mb-3">
                  <label class="form-label  text-primary">line 1
                    <span className='mx-2' style={{ color: "red" }}>{ }</span>
                  </label>
                  <input type="text" class="form-control"
                    value={EditAdmin.address?.Line1}
                    onChange={(event) => handleChangeAdmins(event, "Line1")}
                  />
                </div>
              </div>
              <div className='col-sm-12 col-md-6 col-sm-6'>
                <div class="mb-3">
                  <label class="form-label  text-primary">line 2
                    <span className='mx-2' style={{ color: "red" }}></span>
                  </label>
                  <input type="text" class="form-control"
                    value={EditAdmin.address?.Line2}
                    onChange={(event) => handleChangeAdmins(event, "Line2")}
                  />
                </div>

              </div>
              <div className='col-sm-12 col-md-6 col-sm-6'>
                <div class="mb-3">
                  <label class="form-label  text-primary">City
                    <span className='mx-2' style={{ color: "red" }}></span>
                  </label>
                  <input type="text" class="form-control"
                    value={EditAdmin.address?.City}
                    onChange={(event) => handleChangeAdmins(event, "City")}
                  />
                </div>

              </div>
              <div className='col-sm-12 col-md-6 col-sm-6'>
                <div class="mb-3">
                  <label class="form-label  text-primary">State
                    <span className='mx-2' style={{ color: "red" }}></span>
                  </label>
                  <input type="text" class="form-control"
                    value={EditAdmin.address?.State}
                    onChange={(event) => handleChangeAdmins(event, "State")}
                  />
                </div>

              </div>
              <div className='col-sm-12 col-md-6 col-sm-6'>
                <div class="mb-3">
                  <label class="form-label  text-primary">Country
                    <span className='mx-2' style={{ color: "red" }}></span>
                  </label>
                  <input type="text" class="form-control"
                    value={EditAdmin.address?.Country}
                    onChange={(event) => handleChangeAdmins(event, "Country")}
                  />
                </div>

              </div>
              <div className='col-sm-12 col-md-6 col-sm-6'>
                <div class="mb-3">
                  <label class="form-label  text-primary">Pincode
                    <span className='mx-2' style={{ color: "red" }}></span>
                  </label>
                  <input type="number" class="form-control"
                    value={EditAdmin.address?.Pincode}
                    onChange={(event) => handleChangeAdmins(event, "Pincode")}
                  />
                </div>

              </div>



            </div>

          </div>
        </ModalBody>
        <ModalFooter>
          <button className='btn btn-success' onClick={() => handleUpdateOrder()}>Update Address</button>
        </ModalFooter>
      </Modal>
      <Modal isOpen={EditAdminModal} toggle={() => setEditAdminModal(!EditAdminModal)} size='lg' centered>
        <ModalHeader toggle={() => setEditAdminModal(!EditAdminModal)}>Edit details</ModalHeader>
        <ModalBody>
          <div className='container w-75 '>
            <div className='row mt-5'>
              <div className='col-sm-12 col-md-4 col-lg-4'>
                <div class="mb-3">
                  <label class="form-label text-primary mx-2">productName

                  </label>
                  <input type="text" class="form-control" name='productName'
                    value={EditAdmin.productName}
                    onChange={(event) => handleChangeAdmin(event, "productName")}
                  />
                </div>
              </div>

              <div className='col-sm-12 col-md-4 col-lg-4'>
                <div class="mb-3">
                  <label class="form-label  text-primary">Description

                  </label>
                  <input type="text" class="form-control"
                    value={EditAdmin.Description}
                    onChange={(event) => handleChangeAdmin(event, "Description")}
                  />
                </div>
              </div>
              <div className='col-md-4 col-lg-4 col-sm-12'>
                <div class="mb-3">
                  <label class="form-label  text-primary">Rating

                  </label>
                  <input type="number" class="form-control"
                    value={EditAdmin.Rating}
                    onChange={(event) => handleChangeAdmin(event, "Rating")}
                  />
                </div>

              </div>
              <div className='col-md-4 col-lg-4 col-sm-12'>
                <div class="mb-3">
                  <label class="form-label  text-primary">Price
                    <span className='mx-2' style={{ color: "red" }}></span>
                  </label>
                  <input type="number" class="form-control"
                    value={EditAdmin.Price}
                    onChange={(event) => handleChangeAdmin(event, "Price")}
                  />
                </div>

              </div>
              <div className='col-md-4 col-lg-4 col-sm-12'>
                <div class="mb-3">
                  <label class="form-label  text-primary">OfferPrice

                  </label>
                  <input type="number" class="form-control"
                    value={EditAdmin.Offerprice}
                    onChange={(event) => handleChangeAdmin(event, "Offerprice")}
                  />
                </div>

              </div>
              <div className='col-md-4 col-lg-4 col-sm-12'>
                <div class="mb-3 needs-validation" novalidate>
                  <label class="form-label text-primary mx-2">Name

                  </label>
                  <input type="text" class="form-control"
                    value={EditAdmin.address?.Name}
                    onChange={(event) => handleChangeAdmins(event, "Name")}
                  />
                </div>
              </div>

              <div className='col-md-4 col-lg-4 col-sm-12'>
                <div class="mb-3">
                  <label class="form-label  text-primary">line 1

                  </label>
                  <input type="text" class="form-control"
                    value={EditAdmin.address?.Line1}
                    onChange={(event) => handleChangeAdmins(event, "Line1")}
                  />
                </div>
              </div>
              <div className='col-md-4 col-lg-4 col-sm-12'>
                <div class="mb-3">
                  <label class="form-label  text-primary">line 2

                  </label>
                  <input type="text" class="form-control"
                    value={EditAdmin.address?.Line2}
                    onChange={(event) => handleChangeAdmins(event, "Line2")}
                  />
                </div>

              </div>
              <div className='col-md-4 col-lg-4 col-sm-12'>
                <div class="mb-3">
                  <label class="form-label  text-primary">City

                  </label>
                  <input type="text" class="form-control"
                    value={EditAdmin.address?.City}
                    onChange={(event) => handleChangeAdmins(event, "City")}
                  />
                </div>

              </div>
              <div className='col-md-4 col-lg-4 col-sm-12'>
                <div class="mb-3">
                  <label class="form-label  text-primary">State

                  </label>
                  <input type="text" class="form-control"
                    value={EditAdmin.address?.State}
                    onChange={(event) => handleChangeAdmins(event, "State")}
                  />
                </div>

              </div>

              <div className='col-md-4 col-lg-4 col-sm-12'>
                <div class="mb-3">
                  <label class="form-label  text-primary">Country
                    <span className='mx-2' style={{ color: "red" }}></span>
                  </label>
                  <input type="text" class="form-control"
                    value={EditAdmin.address?.Country}
                    onChange={(event) => handleChangeAdmins(event, "Country")}
                  />
                </div>

              </div>
              <div className='col-md-4 col-lg-4 col-sm-12'>
                <div class="mb-3">
                  <label class="form-label  text-primary">Pincode
                    <span className='mx-2' style={{ color: "red" }}></span>
                  </label>
                  <input type="number" class="form-control"
                    value={EditAdmin.address?.Pincode}
                    onChange={(event) => handleChangeAdmins(event, "Pincode")}
                  />
                </div>

              </div>
              <div className='col-sm-12 col-md-6 col-lg-6'>
                <div class="mb-3">
                  <label class="form-label  text-primary">Status

                  </label>
                  <Select options={statusoption}
                    value={statusoption.filter((list) => list.value === EditAdmin.Status)}
                    onChange={(op) => setEditAdmin({ ...EditAdmin, Status: op.value })}

                  />
                </div>

              </div>




            </div>

          </div>

        </ModalBody>

        <ModalFooter><button className='btn btn-warning ' onClick={() => UpdateOrderAdmin()}>Update</button></ModalFooter>
      </Modal>

    </div>

  )
}

export default Order