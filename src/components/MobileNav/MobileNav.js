import React, { useContext } from 'react'
import './mobilenav.css'
import { useNavigate } from 'react-router-dom'
import Usercontext from '../../Context/Context'

function MobileNav({isopen,togglemenu}) {
    const navigate=useNavigate()
    let cartList = useContext(Usercontext)
  let token = localStorage.getItem('myapptoken')
  let userData = JSON.parse(localStorage.getItem('userData'))
    return (
       
            <div className={`mobile-menu ${isopen ?"active":""}`}
            onClick={togglemenu}
            >
                 <div className='mobile-menu-container '>
                

                <ul>
                    <li> <a className="menu_item " href='/'> Home</a></li>
                    <li><a className="menu_item " href='/About'> About</a></li>
                    <li><a className="menu_item" href='/product'> Product</a></li>
                   <li><a className="menu_item" href='/contact'> contact</a></li>
                </ul>
                {/* <button className='cart-btn mx-2' onClick={() => navigate('/cartItem')}><i class="fa fa-cart-arrow-down" aria-hidden="true"></i>
              <span class="badge text-bg-danger">{cartList?.length}</span></button> */}

            </div>
        </div>
    )
}

export default MobileNav