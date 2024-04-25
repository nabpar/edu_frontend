import React, { useState } from 'react'
import { useNavigate,useParams} from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { toast } from "react-toastify";
import axios from '../api/axios';
import {API_URLS} from '../api/constants';

function PublicChangePassword() {

  const { user } = useAuth()
  const {uid,token} = useParams();
  const [newpassword, setNewpassword] = useState("");
  const [confirmPassword, setconfirmPassword] = useState("");
  const [error, setError] = useState({
    newpassword: null,
    confirmPassword: null
  });

  const navigate = useNavigate()

  const handlenewpassword = (e) => {
    setError({...error,newpassword:null})
    setNewpassword(e.target.value);
  };

  const handleconfirmPassword = (e) => {
    if (e.target.value!==newpassword){
      setError({...error,confirmPassword:'Password does not match'})
    }
    else{
      setError({...error,confirmPassword:null})
    }

    setconfirmPassword(e.target.value);
  };


  const handleValidation = () => {
    let allOk = true
    if (newpassword.length < 1) {
      setError(prevval=>({ ...prevval, newpassword: 'New Password is required.' }))
      allOk = false
    }
    if (confirmPassword.length < 1) {
      setError(preval=>({ ...preval, confirmPassword: ' Confirm Password is required.' }))
      allOk = false
    }
    if (confirmPassword !== newpassword){
      setError({ ...error, confirmPassword: 'Password does not match' })
      allOk=false
    }
    return allOk
  }

  const handleApiCall=()=>{

    // Call Api Here and show the blows on sucss only
    var data={
      "password":newpassword,
      "password2":confirmPassword
    }
    axios.post(`${API_URLS.userPasswordReset}/${uid}/${token}/`,data
    ).then(resp=>{
      toast.success('Password updated successfully.')
      navigate('/')
    }).catch(error=>{
    const responsemsg=error?.response?.data?.errors?.non_field_errors?.[0]
      toast.error(`Unable to change password:${responsemsg}`)
    })
    setNewpassword('')
    setconfirmPassword('')
  }


  const handleSubmit=(e)=>{
    e.preventDefault();
    const passValidation=handleValidation()
    if (passValidation){
        handleApiCall()
      }
    }


  return (
    <>
      <div className="w-full h-full max-h-full flex flex-col items-center p-4 gap-2 overflow-y-scroll">
      <h2 className='text-left w-full text-xl font-semibold text-gray-700'>Change Password</h2>
      <div className='flex flex-1 justify-center w-full h-full items-center'>
        <form onSubmit={handleSubmit} className="bg-white/40 flex flex-col gap-2 shadow-md lg rounded px-8 pt-3 pb-8 mb-4 md:w-1/3 lg:w-1/2">
          <div className='text-left'>
            <label className="block text-gray-700 font-semibold mb-2" htmlFor="New Password">
              New Password
            </label>
            <input className="outline outline-1 outline-gray-500 appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:outline "
              type="password"
              name='New Password'
              placeholder="New Password"
              value={newpassword}
              onChange={handlenewpassword}
            />
            {error?.newpassword && <p className="text-red-300 text-sm py-1">{error?.newpassword}</p>}
          </div>

          {/* for change password */}
          <div className='text-left'>
            <label className="block text-gray-700 font-semibold mb-2" htmlFor="Confirm Password">
              Confirm Password
            </label>
            <input className="outline outline-1 outline-gray-500 appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:outline "
              type="password"
              name='Confirm Password'
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={handleconfirmPassword}
            />
            {error?.confirmPassword && <p className="text-red-300 text-sm py-1">{error?.confirmPassword}</p>}
          </div>

          <div className="flex flex-col items-center justify-between">
            <button className="p-2 px-4 bg-blue-500 hover:bg-emerald-700 rounded text-gray-100"
              type="submit">
              Save
            </button>
          </div>

        </form>
        </div>

      </div>



    </>

  )
}

export default PublicChangePassword