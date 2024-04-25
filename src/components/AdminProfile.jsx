import { useEffect, useRef, useState } from "react";
import { useAuth } from "../hooks/useAuth";
import { RiAdminLine } from "react-icons/ri";
import { AiOutlineMail } from "react-icons/ai";
import axios from "../api/axios";
import Avatar from "react-avatar";
import { useGET } from "../hooks/useApi";
import {API_URLS} from "../api/constants";

const AdminProfile = () => {
  const { user, getUser } = useAuth();
  const fileInputRef = useRef(null);
  const [Image, setImage] = useState(null);
  const [isEdit, setIsEdit] = useState(false);
  const { auth } = useAuth();

  const handleFileUpload = (e) => {
    const { files } = e.target;
    if (files && files.length) {
      //console.log(files)
      //console.log(files[0].path)
      let imagePath = URL.createObjectURL(files[0]);
      console.log(imagePath);
      setImage(imagePath);
    }
  };

  const handleUploadClick = () => {
    fileInputRef.current.click();
  };

  //for validation part
  const [values, setValues] = useState({
    name: "",
    email: "",
    contact: "",
  });
  const [errors, setErros] = useState({});
  const handleChange = (event) => {
    setValues({
      ...values,
      [event.target.name]: event.target.value,
    });
  };
  const handleForSubmit = (event) => {
    event.preventDefault(event);
    // setErros(Validation(values));
  };

  useEffect(() => {
    getUser();
    return () => {};
  }, []);

  return (
    <div>
      <div>
        <div className="  w-full  flex items-center justify-center p-3">
          <form className="bg-white shadow-lg rounded px-8 pt-3 pb-8 mb-4 md:w-1/3 lg:w-2/4 ">
            <div className="mb-2 text-gray-800 font-semibold text-center mx-auto">
              <h3 className="py-2 block text-gray-700  font-bold mb-2 text text-xl">
                Profile
              </h3>
              <div className="flex justify-center w-full">
                <div className=" flex flex-col relative rounded-full overflow-clip -z-5 w-32 h-32 bg-gray-500">
                  <a href={Image}>
                    {
                      Image?
                    <img
                      src={Image}
                      alt="UserImage"
                      className="w-full h-full rounded-full z-0 object-cover"
                    />
                    :<Avatar name={user?.name} round size={130}/>
                  }
                  </a>
                  <span
                    onClick={handleUploadClick}
                    className="cursor-pointer absolute bottom-0 h-1/3 transition-all duration-200 ease-in-out  text-center p-2 w-full bg-orange-300 opacity-0 hover:opacity-90"
                  >
                    <input
                      className="hidden w-0"
                      type="file"
                      accept="image/*"
                      ref={fileInputRef}
                      onChange={handleFileUpload}
                    />
                    Upload
                  </span>
                </div>
              </div>
            </div>
            <div className="py-4 w-full flex justify-center">
                <span className="px-4 py-1 rounded bg-blue-500 text-gray-100">{user?.role}</span>
              </div>

            <div className="flex flex-wrap gap-3 w-full justify-center">
              {/* for name */}

              <div className="mb-4 text-left">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="Name"
                >
                  Name
                </label>
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="name"
                  type="text"
                  name="name"
                  placeholder="Full Name"
                  value={user?.name}
                  readOnly={!isEdit}
                  onChange={handleChange}
                />

                {errors.Name && (
                  <p className="mt-1 text-red-700 pl-2">{errors?.name}</p>
                )}
              </div>

              {/* for email */}
              <div className="mb-6 text-left">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="email"
                >
                  Email
                </label>
                <input
                  readOnly={true}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                  id="email"
                  type="text"
                  name="email"
                  placeholder="email"
                  value={user?.email}
                  onChange={handleChange}
                />

                {errors.email && (
                  <p className="mt-1 text-red-700 pl-2">{errors.email}</p>
                )}
              </div>

              {/* for contact */}

              <div className="mb-4 text-left">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="Contact"
                >
                  Contact
                </label>
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="contact"
                  type="text"
                  name="contact"
                  placeholder="+977"
                  values={user?.contact}
                  onChange={handleChange}
                  readOnly={!isEdit}
                />
                {errors.contact && (
                  <p className="mt-1 text-red-700 pl-2">{errors.contact}</p>
                )}
              </div>
            </div>

            {/* for button */}
            <div className="flex flex-col items-center justify-between">
              <button
                className="w-medium bg-blue hover:bg-blue text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                type="button"
                onClick={handleForSubmit}
              >
                Submit
              </button>
              <div
                className="mt-3 px-2 py-1 border-2 rounded cursor-pointer inline-block align-baseline font-bold text-sm text-blue hover:text-blue"
                onClick={() => setIsEdit(!isEdit)}
              >
                {isEdit ? (
                  <span className=" w-full h-full text-red-400">
                    Cancel Editing
                  </span>
                ) : (
                  <span className=" w-full h-full text-green-700">
                    Edit Profile
                  </span>
                )}
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AdminProfile;
