import axios from 'axios';
import React, { useState } from 'react'
import toast from 'react-hot-toast';
import './editAddress.css'
import { useNavigate } from 'react-router-dom';

function EditAddressEdit() {
    const navigate=useNavigate()
    const [AddressEdit, setAddressEdit] = useState(JSON.parse(localStorage.getItem('address')))
    const [orderlist, setorderlist] = useState([])
    const handleChangeAdmins = (event, name) => {
        setAddressEdit({
          ...AddressEdit,
          address: {
            ...AddressEdit.address,
            [name]: event.target.value
          }
        });
      }
      const handleUpdateOrder = () => {


        axios.post(`https://backend-t6li.onrender.com/edit/order/address/${AddressEdit._id}`, { address: AddressEdit.address }, {
          headers: {
            Authorization: localStorage.getItem("myapptoken")
          }
        }
    
        )
          .then((res) => {
            if (res.data.status === 1) {
              toast.success(res.data.message)
              setorderlist({...orderlist,AddressEdit})
              localStorage.removeItem('address')
              navigate('/order')

              
              
    
            }
            if (res.data.status === 0) {
              toast.success(res.data.message)
            }
    
          }).catch((err) => { console.log(err) })
    
      }
  return (
    <div className='container-fluid'>

    <div className='card shadow AddressEdit  mt-3'>

        <div className='card-body '>
            <div class="form-container w-100 m-auto">
                <div className='row'>
                    <div className='col-sm-12 col-md-6 col-lg-6 my-3'>
                        <div>
                            <labe>Name</labe>
                            <input type="text" class="input-text"
                            value={AddressEdit?.address?.Name}
                            onChange={(e) => handleChangeAdmins(e,"Name")} 
                            />
                        </div>
                        <div>
                            <labe>Line 1</labe>
                            <input type="text" class="input-text"
                            value={AddressEdit?.address?.Line1}
                            onChange={(e) => handleChangeAdmins(e,"Line1")} 
                            />
                        </div>
                        <div>
                            <labe>Line 2</labe>
                            <input type="text" class="input-text"
                            value={AddressEdit?.Line2}
                            onChange={(e) => handleChangeAdmins(e,"Line2")}
                            />
                        </div>
                        <div>
                            <labe>LandMark</labe>
                            <input type="text" class="input-text"
                            value={AddressEdit?.address?.LandMark}
                            onChange={(e) => handleChangeAdmins(e,"LandMark")}
                            />
                        </div>
                    </div>


                    <div className='col-sm-12 col-md-6 col-lg-6'>

                        <div>
                            <labe>City</labe>
                            <input type="text" class="input-text"
                            value={AddressEdit?.address?.City}
                            onChange={(e) => handleChangeAdmins(e,"City")} 

                            />
                        </div>
                        <div>
                            <labe>State</labe>
                            <input type="text" class="input-text"
                            value={AddressEdit?.address?.State}
                            onChange={(e) => handleChangeAdmins(e,"State")} 

                            />
                        </div>
                        <div>
                            <labe>Country</labe>
                            <input type="text" class="input-text"
                            value={AddressEdit?.address?.Country}
                            onChange={(e) => handleChangeAdmins(e,"Country")} 

                            />
                        </div>
                        <div>
                            <labe>Pincode</labe>
                            <input type="number" class="input-text"
                                value={AddressEdit?.address?.Pincode}
                                onChange={(event) => handleChangeAdmins(event, "Pincode")}
                            />
                        </div>
                    </div>
                </div>
            </div>

            <input type="submit" class="input-submit" onClick={()=>handleUpdateOrder()}/>
        </div>

    </div>
</div>
  )
}

export default EditAddressEdit