import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";

function LoginForm() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("STUDENT");
  const [loading, setLoading] = useState(false);
  const [selectedOption, setSelectedOption] = useState("");
  const [error, setError] = useState({
    email:null,
    password:null,
    role:null,
    api:null
  });

  const handlemail = (e) => {
    setError({ ...error, email: null });
    setEmail(e.target.value);
  };

  const handlePassword = (e) => {
    setError({ ...error, password: null });
    setPassword(e.target.value);
  };

  const handleRole = (e) => {
    setError({ ...error, role: null })
    setRole(e.target.value);
  };

  // const Radioption = (e) => {
  //   setError({...error,admin:null,student:null,teacher:null})
  //   setSelectedOption(e.target.value);
  // };
 

  const handleAPIError = (error) => {
    let errormessage = error?.response?.data?.message;
    setError({ ...error, api: errormessage });
    toast.error(errormessage);
  };

  const handleSuccess = () => {
    setError("");

    if (handleValidation()) {
      if (selectedOption === "option1") {
        navigate("/profile", { replace: true });
      }
      if (selectedOption === "option2") {
        navigate("/profile", { replace: true });
      }
      if (selectedOption === "option3") {
        navigate("/profile", { replace: true });
      }
    }

    navigate("/profile", { replace: true });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const localValidationOk = handleValidation();
    if (localValidationOk === false) {
      setLoading(false);
      return;
    }
    setError({ api: null, email: null, password: null });
    try {
      const resp=await login(email, password,role)
      console.log('Login response')
      console.log(resp)
      handleSuccess()
    }
    catch (error) {
      handleAPIError(error)
    }
    finally{
      setLoading(false)
    }
  };

  const handleValidation = () => {
    let allOk = true;
    if (email.length < 1) {
      setError({ ...error, email: "Email is required." });
      allOk = false;
    }
    if (password.length < 1) {
      setError({ ...error, password: "Password is required." });
      allOk = false;
    }

    // if (selectedOption == "") {
    //   setError({ ...error, selectedOption: "Please select an option." });
    //   allOk = false;
    // }

    return allOk;
  };

  return (
    <>
      <form
        onSubmit={handleSubmit}
        className="w-full h-full flex flex-col justify-center items-center p-4 space-y-4"
      >
        <div>
          <h2 className="font-semibold text-blue-500 text-3xl">Login</h2>
        </div>
        <div className="space-y-4 flex justify-center items-center flex-col">
          <div className="space-y-1 flex flex-col text-left">
            <label htmlFor="email">Email</label>
            <input
              name="email"
              type="text"
              placeholder="Email"
              value={email}
              onChange={handlemail}
              className="p-1 md:w-72 rounded border border-1 border-gray-500"
            />
            {error?.email && <p className="text-red-300">{error?.email}</p>}
          </div>

          <div className="space-y-1 flex flex-col text-left">
            <label htmlFor="password">Password</label>
            <input
              name="password"
              type="password"
              placeholder="**********"
              value={password}
              onChange={handlePassword}
              className="p-1 md:w-72 rounded border border-1 border-gray-500"
            />
            {error?.password && (
              <p className="text-red-300">{error?.password}</p>
            )}
          </div>



          {/* for Radiobutton */}

          {/* <div className="grid grid-cols-3 gap-1">
            <label
              htmlFor="admin"
              className="flex gap-2  hover:ring-1  border-gray-600 rounded px-2 py-1 cursor-pointer "
            >
              <input
                id="admin"
                type="radio"
                value="option1"
                name="usertype"
                checked={selectedOption === "option1"}
                onChange={() => setSelectedOption("option1")}
              />

              <span>Admin</span>
            </label>

            <label
              htmlFor="student"
              className="flex gap-2 hover:ring-1 border-gray-600 rounded px-2 py-1 cursor-pointer "
            >
              <input
                id="student"
                type="radio"
                value="option2"
                name="usertype"
                checked={selectedOption === "option2"}
                onChange={() => setSelectedOption("option2")}
              />
              <span>Student</span>
            </label>

            <label
              htmlFor="teacher"
              className="flex gap-2 hover:ring-1  border-gray-600 rounded px-2 py-1 cursor-pointer "
            >
              <input
                id="teacher"
                type="radio"
                value="option3"
                name="usertype"
                checked={selectedOption === "option3"}
                onChange={() => setSelectedOption("option3")}
              />
              <span>Teacher</span>
            </label>
          </div>
          <div className="flex justify-center items-center">
            {error?.selectedOption && (
              <p className="text-red-300">{error?.selectedOption}</p>
            )}
          </div> */}
          {/* for button */}
          <div>
            <button
              disabled={loading}
              className="p-2 px-4 bg-blue-500 hover:bg-emerald-700 rounded text-gray-100"
            >
              {loading ? "Logging In..." : "Login"}
            </button>
          </div>
        </div>
        <Link to="reset-password" className="text-blue-600">
          Forgot Password?
        </Link>
      </form>
    </>
  );
}

export default LoginForm;
