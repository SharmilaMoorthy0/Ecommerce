import axios from "axios";
import React, { useEffect, useState } from "react";
import moneyplant from '../Images/money plant.jpg'
import './product.css'
import toast from "react-hot-toast";
import { Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap";
import { useNavigate } from "react-router-dom";



function Products({ }) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false)
  const [Deletemodal, setDeletemodal] = useState(false)
  const [Deleteid, setDeleteid] = useState(null)
  const user = JSON.parse(localStorage.getItem('userData'))
  const navigate = useNavigate()

  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);

  const handleSearch = () => {
    setLoading(true);
    axios.post("https://backend-t6li.onrender.com/product/search", { query: searchQuery }, {
      headers: {
        Authorization: localStorage.getItem("myapptoken")
      }
    })
      .then((res) => {
        setLoading(false);
        setSearchResults(res.data.response);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
        toast.error('Error searching products');
      });
  };
  const fetchAllProducts = () => {
    axios
      .post("https://backend-t6li.onrender.com/all/product", {
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
    localStorage.setItem('edit', JSON.stringify(data))
    navigate('/edit')

  }
  const handleAddtoCart = (data) => {
    localStorage.setItem('cart', JSON.stringify(data))
    navigate('/cart')
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
    axios.post("https://backend-t6li.onrender.com/remove/product", { id: Deleteid }, {
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


  return (
    <div className="container">
      <div className="d-flex justify-content-between align-items-center input-group ">

      <h1 className="mx-3">Plants</h1>
      <input type='text' className='form-control w-50 m-auto ' placeholder='search' value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
         
        />
         <button className='btn login' onClick={handleSearch} ><i class="fa fa-search" aria-hidden="true"></i></button>
         
       
        {user?.role === 'admin' && <div><button className="btn btn-primary mx-5" onClick={() => navigate('/add')}>add</button>
        </div>
        } </div>
       
     
     {searchQuery ? <div className="container mt-5">
      <div className="row">
          {loading ? 
            <div className="col text-center">Loading...</div>
          : searchResults.length === 0 ? (
            <div className="col text-center">No results found.</div>
          ) : (
            searchResults.map((list) => (
              <div className="col-sm-12 col-md-6 col-lg-4 my-3" key={list._id}>
                <div className=" product-card">
                  <img src={list.Image} className="card-img-top" alt={list.productName} />
                  <div className="card-body">
                    <h5 className="card-title">{list.productName}</h5>
                    <div>
                      <span className={Number(list.Rating) >= 3 ? "badge text-bg-success" : "badge text-bg-danger"}>
                        {list.Rating} <i className="fa fa-star-o" aria-hidden="true"></i>
                      </span>
                    </div>
                    <p>
                      <strong>${list.Offerprice}</strong>
                      <span className="text-decoration-line-through text-muted fs-6">${list.Price}</span>
                    </p>
                   
                    <div>
                      <button className="add-btn " onClick={() => handleAddtoCart(list)}>
                        <i className="fa fa-cart-plus me-1" aria-hidden="true"></i> Add to Cart
                      </button>
                      <button className="buy" onClick={() => handleBuyNow(list)}>
                        <i className="fa fa-bolt me-1" aria-hidden="true"></i> Buy Now
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>:<div className="container mt-5">
      <div className="row">
             {loading ? <div>Loading.....</div> : products.map((list) => {
                return <div className="col-sm-12 col-md-6 col-lg-4 my-5 product">
                  <div class=" product-card" style={{ width: "22rem" }}>
                    <img src={list.Image} class="card-img-top" alt="..." />
                    <div class="card-body">
                      <p class="card-title">{list.productName}</p>
                      {/* <p class="card-text">
                        {list.Description}
                      </p> */}
                      <div><span class={Number(list.Rating) >= 3 ? "badge text-bg-success" : "badge text-bg-danger"}>{list.Rating} <i class="fa fa-star-o" aria-hidden="true"></i></span></div>
                      <p ><h5>${list.Offerprice} <span className="text-decoration-line-through text-muted fs-6">${list.Price}</span></h5></p>
                      {
                        user?.role === 'admin' && <div className="my-2">
                          <button className="btn btn-sm btn-outline-primary mx-2" onClick={()=>edittoggle(list)}>Edit</button>
                          <button className="btn btn-sm btn-outline-danger" onClick={()=>ondelete(list._id)}>Delete</button>
                        </div>
                      }

                      <div>
                        <button className="add-btn" onClick={() => handleAddtoCart(list)}><i class="fa fa-cart-plus" aria-hidden="true"></i> Add to Cart</button>
                        <button className="buy" onClick={()=>handleBuyNow(list)}><i class="fa fa-bolt" aria-hidden="true"></i> Buy Now</button>
                      </div>
                    </div>
                  </div>
                </div>
              })
            }

</div>
</div>     }  
                
        



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

      </div >
      );
}

export default Products;