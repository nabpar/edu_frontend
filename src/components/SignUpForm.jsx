import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { toast } from "react-toastify";


const SignUpForm = () => {
  const { register } = useAuth()
  const navigate = useNavigate();
  const [formData, setformData] = useState({
    name: "",
    email: "",
    password: "",
    cpassword: "",
    contact: "",
    role: "STUDENT"
  })

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState({
    email: null,
    password: null,
    Cpassword: null,
    contact: null,
    name: null,
    api: null
  });

  const handlemail = (e) => {
    setError({ ...error, email: null })
    setformData(prev => ({ ...prev, email: e.target.value }));
  };

  const handleName = (e) => {
    setError({ ...error, name: null })
    setformData(prev => ({ ...prev, name: e.target.value }));
  };

  const handleCPassword = (e) => {
    setError({ ...error, Cpassword: null })
    setformData(prev => ({ ...prev, cpassword: e.target.value }));
  };
  const handlePassword = (e) => {
    setError({ ...error, password: null })
    setformData(prev => ({ ...prev, password: e.target.value }));
  };
  const handleContact = (e) => {
    setError({ ...error, contact: null })
    setformData(prev => ({ ...prev, contact: e.target.value }));
  };

  const handleRole = (e) => {
    setError({ ...error, role: null })
    setformData(prev => ({ ...prev, role: e.target.value }));
  };


  const handleSuccess = () => {
    setError("");
    setformData({
      name: "",
      email: "",
      password: "",
      cpassword: "",
      contact: "",
      role: "",
    })
    toast.success('Registered Successfully')
  };

  const handleSubmit = (e) => {
    e.preventDefault()
    setLoading(true)
    const localValidationOk = handleValidation()
    if (localValidationOk === false) {
      setLoading(false)
      return
    }
    setError({ api: null, name: null, email: null, password: null, Cpassword: null, contact: null })
    console.log(formData)
    register(formData.name, formData.email, formData.password, formData.cpassword, formData.contact, formData.role).then(
      resp => {
        handleSuccess()
      }
    ).catch(
      err => {
        toast.error(err.message)
      }

    ).finally(
      () => { setLoading(false) }
    )
  }

  const handleValidation = () => {
    const errors = {};

    // Validate email
    if (!formData.email) {
      errors.email = "Email is required.";
      // } else if (!/\S+@\S+\.\S+/.test(!formData.email)) {
      //   errors.email = "Email is invalid.";
    }

    // Validate password
    if (!formData.password) {
      errors.password = "Password is required.";
    } else if (formData.password.length < 6) {
      errors.password = "Password should be at least 6 characters long.";
    }

    // Validate confirm password
    if (!formData.cpassword) {
      errors.Cpassword = "Confirm password is required.";
    } else if (formData.cpassword !== formData.password) {
      errors.Cpassword = "Passwords do not match.";
    }

    // Validate name
    if (!formData.name) {
      errors.name = "Name is required.";
    }

    if (!formData.contact) {
      errors.name = "Contact is required.";
    }


    setError(errors);

    // Return true if there are no errors, otherwise return false
    return Object.keys(errors).length === 0;
  };


  return (
    <>
      <form onSubmit={handleSubmit} className="w-full h-full flex flex-col justify-center items-center p-4 space-y-4">
        <div>
          <h2 className="font-semibold text-blue-500 text-3xl">SignUp</h2>
        </div>
        <div className="space-y-4 flex justify-center items-center flex-col">
          <div className="space-y-1 flex flex-col text-left">
            <label htmlFor='Name'>Name</label>
            <input name='name' type='name' placeholder="Enter your name" value={formData.name}
              onChange={handleName} className="p-1 md:w-72 rounded border border-1 border-gray-500" />
            {error?.name && <p className="text-red-300 text-sm">{error?.name}</p>}
          </div>
          <div className="space-y-1 flex flex-col text-left">
            <label htmlFor='Name'>Contact</label>
            <input name='contact' type='number' minLength={10} maxLength={10} pattern="\d{10}" placeholder="9845XXXXXX" value={formData.contact}
              onChange={handleContact} className="  p-1 md:w-72 rounded border border-1 border-gray-500" />
            {error?.contact && <p className="text-red-300 text-sm">{error?.contact}</p>}
          </div>

          <div className="space-y-1 flex flex-col text-left">
            <label htmlFor='email'>Email</label>
            <input name='email' type='email' placeholder="Email" value={formData.email}
              onChange={handlemail} className="p-1 md:w-72 rounded border border-1 border-gray-500" />
            {error?.email && <p className="text-red-300 text-sm">{error?.email}</p>}
          </div>

          <div className="space-y-1 flex flex-col text-left">
            <label htmlFor='password'>Password</label>
            <input name='password' type='password' placeholder="**********" value={formData.password}
              onChange={handlePassword} className="p-1 md:w-72 rounded border border-1 border-gray-500" />
            {error?.password && <p className="text-red-300 text-sm">{error?.password}</p>}
          </div>

          <div className="space-y-1 flex flex-col text-left">
            <label htmlFor='confirm_password'>Confirm Password</label>
            <input name='confirm_password' type='password' placeholder="**********" value={formData.cpassword}
              onChange={handleCPassword} className="p-1 md:w-72 rounded border border-1 border-gray-500" />
            {error?.Cpassword && <p className="text-red-300 text-sm">{error?.Cpassword}</p>}
          </div>

          <div className="space-y-1 flex flex-col text-left justify-start">
            <label htmlFor='role'>Role</label>
            <select onChange={handleRole} name="role" className="p-1 md:w-72 rounded border border-1 border-gray-500 bg-transparent cursor-pointer">
              <option value='STUDENT'>STUDENT</option>
              <option value='TEACHER'>TEACHER</option>
              <option value='ADMIN'>ADMIN</option>
            </select>
          </div>



          <div>
            <button className="p-2 px-4 bg-blue-500 hover:bg-emerald-700 rounded text-gray-100" disabled={loading}>
              {
                loading ? 'Loading' : 'Signup'
              }
            </button>
          </div>
        </div>
      </form>
    </>
  );
}

export default SignUpForm;
