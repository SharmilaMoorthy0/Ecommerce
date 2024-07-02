import logo from './logo.svg';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './components/Home/Home';

import Header from './components/Header/Header';
import About from './components/About/About';
import Product from './components/product/Product';
import Contact from './components/Contact/Contact';
import Cartitem from './components/Cart/CartItem'
import { Toaster } from 'react-hot-toast';


import axios from 'axios';
import { useEffect, useState } from 'react';
import { Userprovider } from './Context/Context';

import CheckOut from './components/checkout/Checkout';
import Order from './components/order/Order';
import Check from './components/Checkpage/Check';
import ProductAdd from './components/Add/ProductAdd';
import ProductEdit from './components/edit/ProductEdit';
import AddToCart from './components/Addtocart/AddToCart';
import AddressPage from './components/Address/AddressPage';
import EditAddress from './components/EditAddress/EditAddress';
import MobileNav from './components/MobileNav/MobileNav';


function App() {
  const [cartData,setCartData]=useState([])
  let token=localStorage.getItem("myapptoken")
  const fetchCartData = ()=>{
    axios.post('http://localhost:8000/all/cart','',{
      headers:{
        Authorization:localStorage.getItem("myapptoken")
      }
    })
    .then((res)=>{
      setCartData(res.data.response)
    }).catch((err)=>{
      console.log(err)
    })
  }

 
  

useEffect(()=>{
 
    fetchCartData()
 
   
  },[])
  return (
   <BrowserRouter>
   <Userprovider value={cartData}>
   <Header cartData={cartData} setCartData={setCartData} fetchCartData={fetchCartData}/>
<Routes>
    <Route path='/' element={<Home/>}/>
    <Route path='/mobile/nav' element={<MobileNav  setCartData={setCartData} />}/>
    <Route path='/about' element={<About/>}/>
    <Route path='/product' element={<Product  cartData={cartData} setCartData={setCartData}/>}/>
    <Route path='/contact' element={<Contact/>}/>
   
    <Route path='/checkout' element={<CheckOut fetchCartData={fetchCartData}/>}/>
    <Route path='/cartItem' element={<Cartitem Cart  fetchCartData={fetchCartData} />}/>
    <Route path='/check' element={<Check fetchCartData={fetchCartData}/>}/>
    <Route path='/order'element={<Order/>}/>
    <Route path='/add'element={<ProductAdd/>}/>
    <Route path='/edit'element={<ProductEdit/>}/>
    <Route path='/cart'element={<AddToCart cartData={cartData} setCartData={setCartData}/>}/>
    <Route path='/address'element={<AddressPage  fetchCartData={fetchCartData}/>}/>
    <Route path='/edit/address'element={<EditAddress />}/>
   </Routes>
  
   <Toaster/>
   </Userprovider>
   </BrowserRouter>
  )}

   export default App;
 