import React from 'react'
import { BiMenu } from "react-icons/bi";
import { GrClose } from "react-icons/gr"
import Logo from "../assets/Edulogoo.png";
import { useAuth } from '../hooks/useAuth';
import NotifyBadge from './NotifyBadge';

function DashNavbar({ sidebarOpen, toggleSidebar }) {

  const {logout}=useAuth()

  return (
    <>
      <div className="bg-white h-14 text-black grid grid-cols-2 w-full items-center">

        {/* for logo */}
        <div className="w-32 h-full object-cover">
          <a href='/'>
          <img src={Logo} className="scale-75" />
          </a>
        </div>
        <div className='flex items-center justify-end px-2 space-x-4 md:space-x-6'>
          <NotifyBadge/>
          {/* for login button */}
          <span onClick={logout} className='text-sm md:text-base px-3 py-1 hover:bg-red-300 bg-red-200 rounded text-red-700 cursor-pointer'>LogOut</span>
          <div className="md:hidden block text-2xl font-bold cursor-pointer"
            onClick={toggleSidebar}
          >
            {sidebarOpen ?
              <GrClose className='w-6 h-6 font-light' />
              : <BiMenu className='w-6 h-6' />
            }            
            </div>

        </div>
      </div>

    </>


  )
}

export default DashNavbar
