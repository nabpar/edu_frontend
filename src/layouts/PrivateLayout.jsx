import React from "react";
import { Outlet, redirect } from "react-router-dom";
import Navbar2 from "../components/DashNavbar";
import Sidebar from "../components/Sidebar";
import { useState } from "react";
import { ToastContainer } from 'react-toastify';


function PrivateLayout() {

  const [sideOpen, setSideOpen] = useState(true)

  const toggleSide = () => {
    setSideOpen(!sideOpen)
  }


  return (
    <>
      <div className=" h-screen max-h-screen overflow-auto flex flex-col font-montserrat">
        <div className="flex w-full" >
          <Navbar2 sidebarOpen={sideOpen} toggleSidebar={toggleSide} />
        </div >
        <div className="flex flex-1 bg-gray-200">
          <Sidebar open={sideOpen} toggleSidebar={toggleSide} />
          <div className="w-full h-full flex flex-col px-6 py-2 bg-gray-200 overflow-y-auto">
            <ToastContainer
              position="top-center"
              autoClose={2000}
              limit={5}
              hideProgressBar={false}
              newestOnTop={false}
              closeOnClick
              rtl={false}
              pauseOnFocusLoss={false}
              draggable
              pauseOnHover={false}
              theme="light"
            />
            <Outlet />
          </div>
        </div>
      </div >
    </>
  )
}


export default PrivateLayout;