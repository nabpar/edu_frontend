import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function PublicLayout() {
  return (
    <div className=" h-screen max-h-screen overflow-auto flex flex-col font-montserrat">
      <ToastContainer
        position="top-center"
        autoClose={3000}
        limit={5}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss={false}
        draggable
        pauseOnHover
        theme="light"
      />
      <div className="flex w-full sticky top-0 z-[99] bg-white">
        <Navbar />
      </div>
      <div className="flex flex-1 bg-gray-200">
        <Outlet />
      </div>
    </div>
  );
}

export default PublicLayout;
