import React, { useContext } from 'react'
import './mobilenav.css'
import { useNavigate } from 'react-router-dom'
import Usercontext from '../../Context/Context'
import { useState } from 'react'
import Login from '../login/Login'
import SignUp from '../Signup/Signup'
import { Modal ,ModalBody} from 'reactstrap'

function MobileNav({ isopen, togglemenu, setCartData }) {
  const navigate = useNavigate()
  const [islogin, setIsLogin] = useState(false)
  const [isSignup, setIsSignup] = useState(false)
  let cartList = useContext(Usercontext)
  let token = localStorage.getItem('myapptoken')
  let userData = JSON.parse(localStorage.getItem('userData'))
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
  return (

    <div className={`mobile-menu ${isopen ? "active" : ""}`}
      onClick={togglemenu} 
    >
      <div className='mobile-menu-container '>

      <button className='menu_btn d-lg-none d-md-none d-sm-block ' onClick={togglemenu}>
      {isopen ?<i class="fa fa-times" aria-hidden="true"></i> : "" }</button>
        <ul>
          <li> <a className="menu_item " href='/'> Home</a></li>
          <li><a className="menu_item " href='/About'> About</a></li>
          <li><a className="menu_item" href='/product'> Product</a></li>
          <li><a className="menu_item" href='/contact'> contact</a></li>
          <li><a className="menu_item" href='/order'> Order</a></li>
         
          {
              token ? <span className='mx-3  text-white border border-0 fs-1 fw-bold rounded-circle text-uppercase'>{userData ? userData.username[0] : 
              <i class="fa fa-user" aria-hidden="true"></i>}</span> : 
              <button className='button1' onClick={() => setIsLogin(!islogin)}>logIn</button>
            }
        </ul>
        
        {
          token && <button className='button2 ' onClick={() => onLogout()}>Logout</button>
        }


      </div>
      <Modal isOpen={islogin} toggle={() => setIsLogin(!islogin)} centered size='md'>
          <ModalBody>
            <Login toggleSignUp={toggleSignUp} closeLogin={closeLogin} />
          </ModalBody>
        </Modal>
        <Modal isOpen={isSignup} toggle={() => setIsSignup(!isSignup)} centered size='md'>
          <ModalBody>
            <SignUp toggleLogin={toggleLogin} />
          </ModalBody>
        </Modal>
    </div>
  )
}

export default MobileNav