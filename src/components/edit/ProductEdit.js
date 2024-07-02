import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import './productedit.css'
import axios from 'axios'
import toast from 'react-hot-toast'

function ProductAdd() {
    const [edits, setedits] = useState(JSON.parse(localStorage.getItem('edit')))
    const [Image, setImage] = useState('')
   
    const user = JSON.parse(localStorage.getItem('userData'))
    const navigate = useNavigate()
    const [products, setProducts] = useState([]);
    const [productName, setproductName] = useState('')
    const [Price, setPrice] = useState()
    const [Offerprice, setOfferprice] = useState()
    const [Rating, setRating] = useState()
    const [Description, setDescription] = useState('')
  

   
   
    const handlechange = (event, name) => {
        setedits({ ...edits, [name]: event.target.value })
      }
      const handleUpdateProduct = () => {
        axios.post(`https://backend-t6li.onrender.com/edit/product/${edits._id}`, edits, {
          headers: {
            Authorization: localStorage.getItem("myapptoken")
          }
        })
          .then((res) => {
            if (res.data.status === 1) {
              toast.success(res.data.message)
             setProducts({...products,  productName, Description, Price, Offerprice, Rating, Image })
             localStorage.removeItem("edit")
             navigate('/product')
    
            }
            if (res.data.status === 0) {
              toast.success(res.data.message)
            }
    
          }).catch((err) => { console.log(err) })
      }
    
    
    
    return (
        <div className='container-fluid'>

            <div className='card shadow address mt-3'>

                <div className='card-body '>
                    <div class="form-container w-100  ">

                        <div>
                            <labe>ProductName</labe>
                            <input type="text" class="input-text"
                                value={edits?.productName}
                                onChange={(e) => handlechange(e,"productName")} />
                        </div>



                        <div>
                            <labe>Description</labe>
                            <input type="text" class="input-text"
                                value={edits?.Description}
                                onChange={(e) => handlechange(e,"Description")} />
                        </div>
                        <div>
                            <labe>Price</labe>
                            <input type="number" class="input-text"
                                value={edits?.Price}
                                onChange={(e) => handlechange(e,"Price")}
                            />
                        </div>
                        <div>
                            <labe>Offerprice</labe>
                            <input type="number" class="input-text"
                                value={edits?.Offerprice}
                                onChange={(e) => handlechange(e,"Offerprice")} />
                        </div>
                        <div>
                            <labe>Rating</labe>
                            <input type="number" class="input-text"
                                value={edits?.Rating}
                                onChange={(e) => handlechange(e,"Rating")} />
                        </div>
                        <input type="submit" onClick={() => handleUpdateProduct()} class="input-submit" />
                </div>
                       
                </div>
            </div>
        </div>


    )

}

export default ProductAdd