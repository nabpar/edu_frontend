import React, { useState } from "react";
import axios from "../api/axios";
import {API_URLS} from "../api/constants";
import { toast } from "react-toastify";
import forgetpass1 from "../assets/forgetpass1.png";

const ResetPasswordEmail = () => {
  const [email, setemail] = useState("");
  const [message, setMessage] = useState(null);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setError(false);
    setLoading(true);
    axios
      .post(`${API_URLS.sendResetPasswordEmail}/`, {
        email: email,
      })
      .then((resp) => {
        toast.success("Reset link sent to email.");
        setemail("");
        setMessage("A reset password link has been sent to your email.");
      })
      .catch((err) => {
        setError(true);
        toast.error("Unable to send password reset link.");
        setMessage("Unable to send reset link");
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <div claasName="">
      <div className="bg-white py-12 xl:px-12 lg:px-8 sm:px-5 px-1">
        <div className="xl:max-w-7xl w-full mx-auto">
          <div className="text-center mb-10">
            <h1 className="sm:text-3xl text-2xl font-medium title-font text-gray-900">
              Reset password
            </h1>
            <div className="h-0.5 bg-gradient-to-r from-cyan-500 to-transparent w-56 mt-2 mx-auto"></div>
          </div>

          <div className="bg-gray-50 py-8 px-6 shadow-md rounded-md flex items-center justify-center">
            <div className="md:w-1/2 px-16">
              <h2 className="font-bold text-2xl text-[#3a5d39]">
                Forget your password?
              </h2>
              <p className="text-sm mt-4">
                {" "}
                Please fill the following details.
              </p>

              <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                <div className="relative mb-4">
                  <input
                    type="text"
                    id="Email"
                    name="Email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setemail(e.target.value)}
                    className="w-full bg-white rounded border border-gray-300 mt-6  p-2 rounded-xl border focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                  />
                </div>

                {/* <button className="bg-[#0072bb] text-white py-2 rounded-2xl   hover:scale-110 duration-300">
                  Submit
                </button> */}

                <div className="flex flex-col pt-4 items-center justify-between">
                  <button
                    disabled={loading}
                    className="p-2 px-4 bg-blue-500 text-white py-2 rounded-2xl   hover:scale-110 duration-300 hover:bg-emerald-700 rounded text-gray-100"
                    type="submit"
                  >
                    {loading ? "Sending an email.." : "Reset Password"}
                  </button>
                </div>
                <div className="pt-5">
                  <span
                    className={`text-xl font-semibold ${
                      error ? "text-red-500" : "text-green-600"
                    }`}
                  ></span>
                </div>
              </form>
            </div>

            <div class="w-1/2  md:block hidden">
              <img src={forgetpass1} className="rounded-2xl w-full h-full " />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResetPasswordEmail;
