import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import './productadd.css'
import axios from 'axios'
import toast from 'react-hot-toast'

function ProductAdd() {
    const [Image, setImage] = useState('')

    const user = JSON.parse(localStorage.getItem('userData'))
    const navigate = useNavigate()
    const [products, setProducts] = useState([]);
    const [productName, setproductName] = useState('')
    const [Price, setPrice] = useState()
    const [Offerprice, setOfferprice] = useState()
    const [Rating, setRating] = useState()
    const [Description, setDescription] = useState('')
    const [editproduct, seteditproduct] = useState({})

    const handlesubmit = () => {


        axios.post("http://localhost:8000/new/product", { productName, Description, Price, Offerprice, Rating, Image }, {
            headers: {
                Authorization: localStorage.getItem("myapptoken")
            }
        })
            .then((res) => {
                if (res.data.status === 1) {
                    toast.success(res.data.message)
                    setProducts({ ...products, productName, Description, Price, Offerprice, Rating, Image })
                    setImage('')
                    setproductName('')
                    setDescription('')
                    setPrice()
                    setOfferprice()
                    setRating()
                    navigate('/product')


                }
                if (res.data.status === 0) {
                    toast.success(res.data.message)

                }
            }).catch((error) => { console.log(error) })


    }
    const uploadImage = (e) => {
        console.log(e)

        var reader = new FileReader()
        reader.readAsDataURL(e.target.files[0])
        reader.onload = () => {
            console.log(reader.result)
            setImage(reader.result)
        }
        reader.onerror = error => {
            console.log("error:", error)
        }}
        return (
            <div className='container-fluid'>

                <div className='card shadow address mt-3'>

                    <div className='card-body '>
                        <div class="form-container w-100  ">

                            <div>
                                <labe>ProductName</labe>
                                <input type="text" class="input-text"
                                    value={productName}
                                    onChange={(e) => setproductName(e.target.value)} />
                            </div>
                            <div>
                                <labe>Description</labe>
                                <input type="text" class="input-text"
                                    value={Description}
                                    onChange={(e) => setDescription(e.target.value)} />
                            </div>
                            <div>
                                <labe>Price</labe>
                                <input type="number" class="input-text"
                                    value={Price}
                                    onChange={(e) => setPrice(e.target.value)}
                                />
                            </div>
                            <div>
                                <labe>Offerprice</labe>
                                <input type="number" class="input-text"
                                    value={Offerprice}
                                    onChange={(e) => setOfferprice(e.target.value)} />
                            </div>
                            <div>
                                <labe>Rating</labe>
                                <input type="number" class="input-text" 
                                    value={Rating}
                                    onChange={(e) => setRating(e.target.value)} />
                            </div>
                            <div>
                                <labe>Image</labe>
                                <input type="file" onChange={(e) => uploadImage(e)}

                                    class="input-text" />
                                {Image == "" || Image == null ? "" : <img width={"100"} height={"100"} src={Image} />}

                            </div>

                            <input type="submit" onClick={() => handlesubmit()} class="input-submit" />

                        </div>
                    </div>
                </div>
            </div>


        )

    }

    export default ProductAdd