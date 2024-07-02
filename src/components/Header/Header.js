import React, { useContext, useEffect, useState } from 'react'
import './header.css'
import { useNavigate } from 'react-router-dom'
import Login from '../login/Login'
import Signup from '../Signup/Signup'
import { Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap'
import Usercontext from '../../Context/Context'
import MobileNav from '../MobileNav/MobileNav'


function Header({ setCartData, fetchCartData, CartData }) {
  const navigate = useNavigate()
  const user = JSON.parse(localStorage.getItem('userData'))
  let cartList = useContext(Usercontext)
  let token = localStorage.getItem('myapptoken')
  let userData = JSON.parse(localStorage.getItem('userData'))
  const [islogin, setIsLogin] = useState(false)
  const [isSignup, setIsSignup] = useState(false)
  const [openmenu, setopemmenu] = useState(false)
  const togglemenu = () => {
    setopemmenu(!openmenu)
  }
  const closeLogin = () => setIsLogin(!islogin)

  const toggleSignUp = () => {
    setIsLogin(false)
    setIsSignup(true)
  }

  const toggleLogin = () => {
    setIsSignup(false)
    setIsLogin(true)
  }

  const onLogout = () => {
    localStorage.removeItem('myapptoken')
    localStorage.removeItem('userData')
    setCartData([])
    navigate('/')
  }
  useEffect(() => {
    fetchCartData()
  }, [])
  return (
    <>
      <MobileNav isopen={openmenu} togglemenu={togglemenu}  setCartData={setCartData}/>
      <nav class="navbar navbar-expand-lg  navbar-dark" id='navbar'>
        <div className='container'>
          <a class="navbar-brand" href="#">Plants</a>

          <div class="collapse navbar-collapse" id="navbarSupportedContent">
            <ul class="navbar-nav mx-auto ">
              <li class="nav-item">
                <a class="nav-link active" href="/">Home</a>
              </li>
              <li class="nav-item">
                <a class="nav-link active" href="/about">About</a>
              </li>

              <li class="nav-item">
                <a class="nav-link active" href="/product">Products</a>
              </li>

              <li class="nav-item">
                <a class="nav-link active" href="/contact">Contact</a>
              </li>
              
                 <li class="nav-item">
                  <a class="nav-link active" href="/order">Orders</a>
                </li>
              

            </ul>
            {
              token ? <span className='mx-3  text-white border border-0 fs-1 fw-bold rounded-circle text-uppercase'>{userData ? userData.username[0] : 
              <i class="fa fa-user" aria-hidden="true"></i>}</span> : 
              <button className='button1' onClick={() => setIsLogin(!islogin)}>logIn</button>
            }
            <button className='cart-btn mx-2' onClick={() => navigate('/cartItem')}><i class="fa fa-cart-arrow-down" aria-hidden="true"></i>
              <span class="badge   text-bg-danger">{cartList?.length}</span></button>

            {
              token && <button className='button2 ' onClick={() => onLogout()}>Logout</button>
            }

          </div>
          <div className='d-flex justify-content-between'> 
           <div className='d-flex  justify-content-between d-lg-none d-sm-block '>
           
               {/* {token? <button className='button2 w-10 ' onClick={() => onLogout()}>Logout</button>: <button className='button1 w-5 ' onClick={() => setIsLogin(!islogin)}>logIn</button>
            }  */}
             
              <button className='cart-btn mx-2' onClick={() => navigate('/cartItem')}><i class="fa fa-cart-arrow-down" aria-hidden="true"></i>
                <span class="badge   text-bg-danger">{cartList?.length}</span></button>

              
             </div>
             <button className='menu_btn d-lg-none d-md-none d-sm-block ' onClick={togglemenu}>
             {openmenu ?<i class="fa fa-times" aria-hidden="true"></i> : <i class="fa fa-bars" aria-hidden="true"></i>} </button>
          </div>

        </div>

        <Modal isOpen={islogin} toggle={() => setIsLogin(!islogin)} centered size='md'>
          <ModalBody>
            <Login toggleSignUp={toggleSignUp} closeLogin={closeLogin} />
          </ModalBody>
        </Modal>
        <Modal isOpen={isSignup} toggle={() => setIsSignup(!isSignup)} centered size='md'>
          <ModalBody>
            <Signup toggleLogin={toggleLogin} />
          </ModalBody>
        </Modal>
      </nav>
    </>

  )
}
export default Header