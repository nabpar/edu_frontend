import React from "react";
import { motion } from "framer-motion";
// import HomeHero from "../assets/HomeAsset.svg";
import Readingimg from "../assets/Readingimg.jpg";
import book from "../assets/book.png";
import computer from "../assets/computer.png";
import onlineedu from "../assets/onlineedu.png";
import onlinelearning from "../assets/onlinelearning.png";
import upload from "../assets/upload.png";
import onlinelibrary from "../assets/onlinelibrary.png";
import Logo from "../assets/Edulogoo.png";
import { MdEmail } from "react-icons/md";

const Home = () => {
  return (
    <>
      <div className="w-full bg-opacity-40 ">
        <div className="w-full mx-auto text-center">
          <div className='w-full bg-blend-overlay bg-gray-800 bg-reading bg-cover bg-center min-h-screen bg-opacity-80 flex justify-center items-center'>
            {/* <img
              src={Readingimg}
              className="w-full bg-cover bg-center"
              style={{ opacity: 0.8 }}
              alt="Reading"
            /> */}
            <div className="content-overlay"></div>
            <div className="content  z-20">
              <h2 className="text-2xl lg:text-3xl xl:text-4xl text-white">
                Find the Right Online Course for You!
              </h2>
              <h1 className="text-4xl lg:text-6xl xl:text-7xl font-bold text-white mt-8">
                "Best Learning Opportunities".
              </h1>
              <p className="text-xl w-full md:w-auto lg:text-2xl xl:text-3xl text-white mt-8">
                Our goal is to make online education work for everyone.
              </p>
              <div className="mt-8 px-12">
                <a
                  href="#"
                  className="inline-flex justify-center cursor-pointer items-center bg-[#ff814c] border-0 py-2 px-4 focus:outline-none hover:bg-[#0693d2] rounded text-white lg:mt-0"
                >
                  <i className="ri-arrow-right-s-line"></i>
                  <span className="ml-2">Take our services</span>
                </a>
              </div>
            </div>
          </div>
          {/* Our features section */}
          <div className="bg-white py-12 xl:px-12 lg:px-8  px-3">
            <div className="xl:max-w-7xl w-full mx-auto">
              <div className="text-center mb-10">
                <h1 className="sm:text-3xl text-2xl font-medium title-font text-gray-900">
                  Our Features
                </h1>

                <div class="h-0.5 bg-gradient-to-r from-cyan-500 to-transparent w-56 mt-2 mx-auto"></div>
              </div>

              <div className="grid sm:grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="py-8 px-4 shadow-md drop-shadow-md hover:scale-[1.02] duration-300 transition-all ease-in-out delay-75 rounded-md">
                  <img alt="content" className="w-32 mx-auto" src={onlineedu} />
                  <div className=" text-center">
                    <h2 className="text-xl font-medium title-font text-gray-900 mt-5">
                      Online Education
                    </h2>
                    <p className="flex justify-center items-center mt-2 text-sm">
                      Online learning refers to instruction that is delivered
                      electronically through various multimedia and Internet
                      platforms and applications. It is used interchangeably
                      with other terms such as web-based learning, e-learning,
                      computer-assisted instruction, and Internet-based
                      learning.
                    </p>
                  </div>
                </div>

                <div className="py-8 px-4 shadow-md drop-shadow-md hover:scale-[1.02] duration-300 transition-all ease-in-out delay-75 rounded-md">
                  <img
                    alt="content"
                    className="w-32 mx-auto"
                    src={onlinelearning}
                  />
                  <div className=" text-center">
                    <h2 className="text-xl font-medium title-font text-gray-900 mt-5">
                      Online Learning
                    </h2>
                    <p className="flex justify-center items-center mt-2 text-sm">
                      Online teaching is the process of educating others via the
                      internet from any location (home, coffee shop, co-working
                      space) using various methods such as one-on-one video
                      calls, group video calls, and webinars, by enrolling
                      students from various backgrounds and geographical areas.
                    </p>
                  </div>
                </div>

                <div className="py-8 px-4 shadow-md drop-shadow-md hover:scale-[1.02] duration-300 transition-all ease-in-out delay-75 rounded-md">
                  <img
                    alt="content"
                    className="w-32 mx-auto"
                    src={onlinelibrary}
                  />
                  <div className=" text-center">
                    <h2 className="text-xl font-medium title-font text-gray-900 mt-5">
                      Student can read from anywhere
                    </h2>
                    <p className="flex justify-center items-center mt-2 text-sm">
                      E-learning -- also called electronic learning or web-based
                      training -- is anywhere, anytime instruction delivered
                      over the internet or a corporate intranet to students and
                      other learners via a browser.
                    </p>
                  </div>
                </div>

                <div className="py-8 px-4 shadow-md drop-shadow-md hover:scale-[1.02] duration-300 transition-all ease-in-out delay-75 rounded-md">
                  <img alt="content" className="w-32 mx-auto" src={upload} />
                  <div className=" text-center">
                    <h2 className="text-xl font-medium title-font text-gray-900 mt-5">
                      Teacher can upload notes
                    </h2>
                    <p className="flex justify-center items-center mt-2 text-sm">
                      A teaching note is a document that accompanies a teaching
                      case to help potential instructors gain insight into the
                      case and achieve better usage of the case.
                    </p>
                  </div>
                </div>

                <div className="py-8 px-4 shadow-md drop-shadow-md hover:scale-[1.02] duration-300 transition-all ease-in-out delay-75 rounded-md">
                  <img alt="content" className="w-32 mx-auto" src={computer} />
                  <div className=" text-center">
                    <h2 className="text-xl font-medium title-font text-gray-900 mt-5">
                      E-learning
                    </h2>
                    <p className="flex justify-center items-center mt-2 text-sm">
                      Computers in education are used to provide Audio-Visual
                      learning, research, online learning, maintain records,
                      make documents, and learn new evolving technologies.
                    </p>
                  </div>
                </div>

                <div className="py-8 px-4 shadow-md drop-shadow-md hover:scale-[1.02] duration-300 transition-all ease-in-out delay-75 rounded-md">
                  <img alt="content" className="w-32 mx-auto" src={book} />
                  <div className=" text-center">
                    <h2 className="text-xl font-medium title-font text-gray-900 mt-5">
                      Idea & Knowledge
                    </h2>
                    <p className="flex justify-center items-center mt-2 text-sm">
                      E-learning creative ideas when designing our education is
                      such a great idea because it not only helps us remember
                      what we learned but also gives us something new every time
                      so that we Stand out and build our brand. visibility.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <footer className="bg-[#0693d2] body-font">
            <div className="container px-5 py-24 mx-auto flex md:items-center lg:items-start md:flex-row md:flex-nowrap flex-wrap flex-col">
              <div className="w-64 flex-shrink-0 md:mx-0 mx-auto text-center md:text-left">
                <a className="flex title-font font-medium items-center md:justify-start justify-center text-gray-900">
                  <img src={Logo} alt="" className="bg-white rounded-full" />
                </a>
                <p className="mt-2 text-sm cursor-pointer text-white">
                  E-learning -- also called electronic learning or web-based
                  training -- is anywhere, anytime instruction delivered over
                  the internet or a corporate intranet to students and other
                  learners via a browser.
                </p>
              </div>
              <div className="flex-grow flex flex-wrap md:pl-20 -mb-10 md:mt-0 mt-10 md:text-left text-center">
                <div className="lg:w-1/4 md:w-1/2 w-full cursor-pointer px-4">
                  <h2 className="title-font font-medium text-white text-gray-900 tracking-widest text-sm mb-3">
                    QUICK LINKS
                  </h2>
                  <nav className="list-none mb-10">
                    <ul>
                      <li>
                        <a className="text-gray-600 text-white hover:text-gray-800">
                          Home
                        </a>
                      </li>
                      <li>
                        <a className="text-gray-600 text-white hover:text-gray-800">
                          Blogs
                        </a>
                      </li>
                      <li>
                        <a className="text-gray-600 text-white hover:text-gray-800">
                          Course
                        </a>
                      </li>
                      <li>
                        <a className="text-gray-600 text-white hover:text-gray-800">
                          Contact
                        </a>
                      </li>
                    </ul>
                  </nav>
                </div>
                <div className="lg:w-1/4 md:w-1/2 w-full cursor-pointer px-4">
                  <h2 className="title-font text-white font-medium text-gray-900 tracking-widest text-sm mb-3">
                    SERVICES
                  </h2>
                  <nav className="list-none mb-10">
                    <li>
                      <a className="text-gray-600 text-white hover:text-gray-800">
                        Online Education
                      </a>
                    </li>
                    <li>
                      <a className="text-gray-600 text-white hover:text-gray-800">
                        Online Learning
                      </a>
                    </li>
                    <li>
                      <a className="text-gray-600 text-white hover:text-gray-800">
                        Student can read from anywhere
                      </a>
                    </li>
                    <li>
                      <a className="text-gray-600 text-white hover:text-gray-800">
                        Teacher can upload notes
                      </a>
                    </li>
                  </nav>
                </div>
                <div className="lg:w-1/4 md:w-1/2 w-full px-4 cursor-pointer">
                  <h2 className="title-font text-white font-medium text-gray-900 tracking-widest text-sm mb-3">
                    NEED HELP? WRITE US
                  </h2>
                  <div className="text-white">
                    <p className="flex flex-col items-center justify-center">
                      <span className="flex items-center mb-2">
                        <i className="ri-time-line mr-2 text-xl"></i>
                        <span className="ml-2">Mon-Sun: 9:00 am - 5:00 pm</span>
                      </span>

                      <span className="flex items-center mb-2">
                        <i className="ri-mail-fill mr-2 text-xl"></i>
                        <span className="ml-2">
                          <a href=""> info@bestcarpet.com.au</a>
                        </span>
                      </span>
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-[#ff814c]">
              <div className="container mx-auto py-4 px-5 flex flex-wrap flex-col sm:flex-row">
                <p className="text-gray-800 text-sm text-center sm:text-left">
                  ©Copyright 2024 Lorem ipsum dolor sit amet. —
                  <a
                    href="https://twitter.com/knyttneve"
                    rel="noopener noreferrer"
                    className="text-gray-800 ml-1"
                    target="_blank"
                  >
                    Powered by XYZ I.T.Solution pvt.Ltd.
                  </a>
                </p>
                <span className="inline-flex sm:ml-auto sm:mt-0 mt-2 justify-center sm:justify-start">
                  <a className="text-gray-800">
                    <svg
                      fill="currentColor"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      class="w-5 h-5"
                      viewBox="0 0 24 24"
                    >
                      <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"></path>
                    </svg>
                  </a>
                  <a className="ml-3 text-gray-800">
                    <svg
                      fill="currentColor"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      class="w-5 h-5"
                      viewBox="0 0 24 24"
                    >
                      <path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z"></path>
                    </svg>
                  </a>
                  <a className="ml-3 text-gray-800">
                    <svg
                      fill="none"
                      stroke="currentColor"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      class="w-5 h-5"
                      viewBox="0 0 24 24"
                    >
                      <rect
                        width="20"
                        height="20"
                        x="2"
                        y="2"
                        rx="5"
                        ry="5"
                      ></rect>
                      <path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37zm1.5-4.87h.01"></path>
                    </svg>
                  </a>
                  <a className="ml-3 text-gray-800">
                    <svg
                      fill="currentColor"
                      stroke="currentColor"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="0"
                      class="w-5 h-5"
                      viewBox="0 0 24 24"
                    >
                      <path
                        stroke="none"
                        d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z"
                      ></path>
                      <circle cx="4" cy="4" r="2" stroke="none"></circle>
                    </svg>
                  </a>
                </span>
              </div>
            </div>
          </footer>
        </div>
      </div>
    </>
  );
};

export default Home;
