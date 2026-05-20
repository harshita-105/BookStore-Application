import React, { useState } from 'react';
import {Link} from 'react-router-dom'; 
import '../index.css'
import { HiBars3 } from "react-icons/hi2";
import { FaSearch } from "react-icons/fa";
import { FaRegUserCircle } from "react-icons/fa";
import { GoHeart } from "react-icons/go";
import { TiShoppingCart } from "react-icons/ti";
import avatar from "../assets/avatar.png";
import { useSelector } from 'react-redux';
import { useAuth } from '../context/AuthContext';


const navigation= [
  {name:"Dashboard", href:"/dashboard"},
  {name:"Orders", href:"/orders"},
  {name:"Cart", href:"/cart"},
  {name:"Checkout", href:"/checkout"},
]

const Navbar = () => {

  const {currentUser, logout}= useAuth()
  const handleLogout= ()=>{
    logout()
  }

  const [dropDownOpen, setDropDownOpen]= useState(false);
  const cartItems= useSelector(state=>state.cart.cartItems)

  return (
    <header className='max-w-screen-2xl mx-auto px-4 py-6'>
      
    <nav className='flex justify-between items-center'>
      
      <div className='flex items-center md:gap-16 gap-4'> {/*left*/}
        <Link to="/"><HiBars3  className='size-6'/></Link>  {/*bars*/}

        <div className='relative sm:w-72 w-40 space-x-2'> {/*search field*/}
          <FaSearch className='absolute inline-block left-3 inset-y-2'/>
          <input type='text' placeholder='Search here' className='bg-[#EAEAEA]
          w-full py-1 md:px-8 px-6 rounded-md focus:outline-none'></input>
        </div>

      </div>
      
      <div className='relative flex items-center md:space-x-3 space-x-2'> {/*right*/}

        <div className>    {/*user pic*/}
          {
            currentUser?
            <>
              <button onClick={()=> setDropDownOpen(!dropDownOpen)}>
                <img alt='user img' src={avatar} className={`size-7 rounded-full 
                  ${currentUser? 'ring-2 ring-black':'' }`}/>
              </button>
              {/*dropdown*/}
 
              {
                dropDownOpen && (
                  <div className='absolute right-0 mt-2 w-48 bg-white shadow-lg rounded-md z-40'>
                    <ul className='py-2 px-2'>
                      {
                        navigation.map((item)=>(
                          <li key={item.name} onClick={()=>(setDropDownOpen(false))}>
                            <Link to={item.href} className='block px-4 py-2 text-sm hover:bg-gray-100'> {item.name} </Link>
                          </li>
                        ))
                      }

                      <li>
                        <button onClick={handleLogout} className='block w-full px-4 py-2 text-sm text-left hover:bg-gray-100'>Logout</button>
                      </li>
                    </ul>
                  </div>
                )
              }  

            </>:
            <Link to="/login"><FaRegUserCircle className='size-6'/></Link>
          }
        </div>  

        <button className='hidden sm:block'><GoHeart className='size-7 '/></button>  {/*likes */}

        <Link to="/cart" className='bg-primary p-1 sm:px-6 px-2 flex items-center rounded-sm'>
        <TiShoppingCart className='size-6'/>              {/*cart */}

        {
          cartItems.length>0? <span className='text-sm font-semibold sm:ml-1'>{cartItems.length}</span>:<span className='text-sm font-semibold sm:ml-1'>0</span>
        }
        
        </Link>

      </div>

    </nav>

    </header>
  )
}

export default Navbar;
