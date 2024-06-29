import axios from "axios";
import React, { useEffect, useState } from "react";
import moneyplant from '../Images/money plant.jpg'
import './product.css'
import toast from "react-hot-toast";
import { Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap";
import { useNavigate } from "react-router-dom";


function Products({ cartData, setCartData, fetchCartData }) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false)
  const [Deletemodal, setDeletemodal] = useState(false)
  const [createmodal, setcreatemodal] = useState(false)
  const [editproduct, seteditproduct] = useState({})
  const [isEdit, setisEdit] = useState(false)
  const [Deleteid, setDeleteid] = useState(null)
  const [Image, setImage] = useState('')

  const user = JSON.parse(localStorage.getItem('userData'))
  const navigate = useNavigate()
  const [productName, setproductName] = useState('')
  const [Price, setPrice] = useState('')
  const [Offerprice, setOfferprice] = useState('')
  const [Rating, setRating] = useState('')
  const [Description, setDescription] = useState('')

  // const Addhandlechange = (event, name) => {
  //   setnewProduct({ ...newProduct, [name]: event.target.value })
  // }

  const fetchAllProducts = () => {
    axios
      .post("http://localhost:8000/all/product", {
        headers: {
          Authorization: localStorage.getItem("myapptoken")
        }
      })
      .then((res) => {
        console.log(res)
        setLoading(false)
        setProducts(res.data.response);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    fetchAllProducts();
  }, []);

  const edittoggle = (data) => {
    seteditproduct(data)
    setisEdit(!isEdit)
  }
  const handlechange = (event, name) => {
    seteditproduct({ ...editproduct, [name]: event.target.value })
  }

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
          setCartData([...cartData, newcart])
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


  const handleUpdateProduct = () => {
    axios.post(`http://localhost:8000/edit/product/${editproduct._id}`, editproduct, {
      headers: {
        Authorization: localStorage.getItem("myapptoken")
      }
    })
      .then((res) => {
        if (res.data.status === 1) {
          toast.success(res.data.message)
          setisEdit(!isEdit)
          fetchAllProducts()

        }
        if (res.data.status === 0) {
          toast.success(res.data.message)
        }

      }).catch((err) => { console.log(err) })
  }

  const AddnewProduct = () => {
    setcreatemodal(!createmodal)
  }

  const handlesubmit = () => {


    axios.post("http://localhost:8000/new/product", { productName, Description, Price, Offerprice, Rating, Image }, {
      headers: {
        Authorization: localStorage.getItem("myapptoken")
      }
    })
      .then((res) => {
        if (res.data.status === 1) {
          toast.success(res.data.message)
          setcreatemodal(false)
          setImage('')
          setproductName('')
          setDescription('')
          setPrice('')
          setOfferprice('')
          setRating('')

          fetchAllProducts()
        }
        if (res.data.status === 0) {
          toast.success(res.data.message)

        }
      }).catch((error) => { console.log(error) })


  }



  const ondelete = (id) => {
    setDeletemodal(!Deletemodal)
    setDeleteid(id)
  }
  const cancelDelete = () => {
    setDeletemodal(false)
    setDeleteid(null)
  }
  const deleteproduct = (id) => {
    axios.post("http://localhost:8000/remove/product", { id: Deleteid }, {
      headers: {
        Authorization: localStorage.getItem("myapptoken")
      }
    }
    ).then((res) => {
      if (res.data.status === 1) {
        toast.success(res.data.message)
        setDeletemodal(false)
        setDeleteid(null)
        fetchAllProducts()
      }
      if (res.data.status === 0) {
        toast.success(res.data.message)
      }
    }).catch((err) => { console.log(err) })
  }

  const handleBuyNow = (data) => {
    localStorage.setItem('buynow', JSON.stringify(data))
    navigate('/checkout')
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
    }
  }
  return (
    <div className="container">
      <div className="d-flex justify-content-between align-items-center input-group ">

        <h1 className="mx-3">Products</h1>

        <input type='text' className='form-control ' placeholder='' />
        <button className='btn login'>Search</button>

        {
          user?.role === 'admin' && <div><button className="btn btn-primary mx-5" onClick={() => AddnewProduct()}>Add</button></div>
        }




      </div>




      <div className="container mt-5">
        <div className="row">
          {
            loading ? <div>Loading.....</div> : products.map((list) => {
              return <div className="col-sm-12 col-md-6 col-lg-4 my-2">
                <div class="card product-card mx-2" style={{ width: "22rem" }}>
                  <img src={list.Image} class="card-img-top" alt="..." />
                  <div class="card-body">
                    <h5 class="card-title">{list.productName}</h5>
                    <p class="card-text">
                      {list.Description}
                    </p>
                    <div><span class={Number(list.Rating) >= 3 ? "badge text-bg-success" : "badge text-bg-danger"}>{list.Rating} <i class="fa fa-star-o" aria-hidden="true"></i></span></div>
                    <p >Price:<h5>${list.Offerprice} <span className="text-decoration-line-through text-muted fs-6">${list.Price}</span></h5></p>
                    {
                      user?.role === 'admin' && <div className="my-2">
                        <button className="btn btn-sm btn-outline-primary mx-2" onClick={() => edittoggle(list)} >Edit</button>
                        <button className="btn btn-sm btn-outline-danger" onClick={() => ondelete(list._id)}>Delete</button>
                      </div>
                    }

                    <div>
                      <button className="add-btn" onClick={() => handleAddtoCart(list)}><i class="fa fa-cart-plus" aria-hidden="true"></i> Add to Cart</button>
                      <button className="buy" onClick={() => handleBuyNow(list)}><i class="fa fa-bolt" aria-hidden="true"></i> Buy Now</button>
                    </div>
                  </div>
                </div>
              </div>
            })
          }

        </div>
      </div>

      <Modal isOpen={createmodal} size="lg" toggle={() => setcreatemodal(!createmodal)}>
        <ModalHeader>Add Products</ModalHeader>
        <ModalBody>
          <div className='container w-75 '>
            {/* <h1 className='text-center text-primary'>shop Name</h1> */}
            <form class="g-3 needs-validation" novalidate>
              <div className='row mt-5'>
                <div className='col-sm-12 col-md-6 col-sm-6'>
                  <div class="mb-3 needs-validation" novalidate>
                    <label class="form-label text-primary mx-2">Image

                    </label>

                    <input type="file" accept="Image/*" className="hidden" id="productImage"

                      // value={Image}
                      onChange={(e) => uploadImage(e)}
                    />
                    {Image == "" || Image == null ? "" : <img width={"100"} height={"100"} src={Image} />}

                  </div>
                </div>
                <div className='col-sm-12 col-md-6 col-sm-6'>
                  <div class="mb-3 needs-validation" novalidate>
                    <label class="form-label text-primary mx-2">productName

                      <span className='mx-2' style={{ color: "red" }}>*</span></label>
                    <input type="text" class="form-control"
                      value={productName}
                      onChange={(e) => setproductName(e.target.value)}
                    />
                  </div>
                </div>

                <div className='col-sm-12 col-md-6 col-sm-6'>
                  <div class="mb-3">
                    <label class="form-label  text-primary">Description
                      <span className='mx-2' style={{ color: "red" }}>{ }</span>
                    </label>
                    <input type="text" class="form-control"
                      value={Description}
                      onChange={(e) => setDescription(e.target.value)}
                    // onChange={(event) => Addhandlechange(event, "Description")}
                    />
                  </div>
                </div>
                <div className='col-sm-12 col-md-6 col-sm-6'>
                  <div class="mb-3">
                    <label class="form-label  text-primary">Rating
                      <span className='mx-2' style={{ color: "red" }}></span>
                    </label>
                    <input type="number" class="form-control"
                      value={Rating}
                      onChange={(e) => setRating(e.target.value)}
                    // onChange={(event) => Addhandlechange(event, "Rating")}
                    />
                  </div>

                </div>
                <div className='col-sm-12 col-md-6 col-sm-6'>
                  <div class="mb-3">
                    <label class="form-label  text-primary">Price
                      <span className='mx-2' style={{ color: "red" }}></span>
                    </label>
                    <input type="number" class="form-control"
                      value={Price}
                      onChange={(e) => setPrice(e.target.value)}
                    // onChange={(event) => Addhandlechange(event, "Price")}
                    />
                  </div>

                </div>
                <div className='col-sm-12 col-md-6 col-sm-6'>
                  <div class="mb-3">
                    <label class="form-label  text-primary">OfferPrice
                      <span className='mx-2' style={{ color: "red" }}></span>
                    </label>
                    <input type="number" class="form-control"
                      value={Offerprice}
                      onChange={(e) => setOfferprice(e.target.value)}
                    // onChange={(event) => Addhandlechange(event, "offerPrice")}
                    />
                  </div>

                </div>
              </div>
            </form>
          </div>
        </ModalBody>
        <ModalFooter>
          <button className="btn btn-success" onClick={() => handlesubmit()}>submit</button>
        </ModalFooter>
      </Modal>

      <Modal isOpen={isEdit} toggle={() => setisEdit(!isEdit)} size="lg">
        <ModalHeader>Edit Products</ModalHeader>
        <ModalBody>
          <div className='container w-75 '>
            {/* <h1 className='text-center text-primary'>shop Name</h1> */}

            <div className='row mt-5'>
              <div className='col-sm-12 col-md-6 col-lg-6'>

                <div class="mb-3 needs-validation" novalidate>
                  <label class="form-label text-primary mx-2">Image

                    <span className='mx-2' style={{ color: "red" }}></span></label>
                  <input type="file" class="form-control"
                    //  value={editproduct.Image}
                    onChange={(e) => uploadImage(e)}

                  />
                  {Image == "" || Image == null ? "" : <img width={"100"} height={"100"} src={Image} />}
                </div>
              </div>
              <div className='col-sm-12 col-md-6 col-lg-6'>
                <div class="mb-3">
                  <label class="form-label text-primary mx-2">productName

                    <span className='mx-2' style={{ color: "red" }}>*</span></label>
                  <input type="text" class="form-control"
                    value={editproduct.productName}
                    onChange={(event) => handlechange(event, "productName")}
                  />
                </div>
                </div>



              <div className='col-sm-12 col-md-6 col-lg-6'>
                <div class="mb-3">
                  <label class="form-label  text-primary">Description
                    <span className='mx-2' style={{ color: "red" }}>{ }</span>
                  </label>
                  <input type="text" class="form-control"
                    value={editproduct.Description}
                    onChange={(event) => handlechange(event, "Description")}
                  />
                </div>
              </div>
              <div className='col-sm-12 col-md-6 col-lg-6'>
                <div class="mb-3">
                  <label class="form-label  text-primary">Rating
                    <span className='mx-2' style={{ color: "red" }}></span>
                  </label>
                  <input type="number" class="form-control"
                    value={editproduct.Rating}
                    onChange={(event) => handlechange(event, "Rating")}
                  />
                </div>

              </div>
              <div className='col-sm-12 col-md-6 col-lg-6'>
                <div class="mb-3">
                  <label class="form-label  text-primary">Price
                    <span className='mx-2' style={{ color: "red" }}></span>
                  </label>
                  <input type="number" class="form-control"
                    value={editproduct.Price}
                    onChange={(event) => handlechange(event, "Price")}
                  />
                </div>

              </div>
              <div className='col-sm-12 col-md-6 col-lg-6'>
                <div class="mb-3">
                  <label class="form-label  text-primary">OfferPrice
                    <span className='mx-2' style={{ color: "red" }}></span>
                  </label>
                  <input type="number" class="form-control"
                    value={editproduct.Offerprice}
                    onChange={(event) => handlechange(event, "offerPrice")}
                  />
                </div>

              </div>
            </div>




          </div>




        </ModalBody>
        <ModalFooter>
          <button className="btn btn-success" onClick={() => handleUpdateProduct()}>Update</button>
        </ModalFooter>
      </Modal>
      <Modal isOpen={Deletemodal} toggle={() => setDeletemodal(!Deletemodal)}>
        <ModalHeader> Delete Confirmation</ModalHeader>
        <ModalBody>
          <div className="container">
            <p>
              Are you sure want to Delete this product?
            </p>
            <div>
              <button className="btn btn-success mx-2" onClick={() => deleteproduct()}>Yes</button>

              <button className="btn btn-danger" onClick={() => cancelDelete()}>No</button>
            </div>
          </div>
        </ModalBody>
      </Modal>

    </div>
  );
}

export default Products;