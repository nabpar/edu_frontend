
import { useState } from "react";
import { useGET } from '../hooks/useApi'
import { Link } from "react-router-dom";
import Loading from "../components/Loading";
import {API_URLS} from "../api/constants";



function Blogs() {
  
  
  const [currentPage, setCurrentPage] = useState(1);
  const { data,isLoading, refetch, setData: setblogList } = useGET(`${API_URLS.viewBlogs}?page=${currentPage}`)

  const handleNextPage = () => {
    if (data?.next) {
      setCurrentPage(prevPage => prevPage + 1);

    }
  };

  const handlePrevPage = () => {
    if (data?.previous) {
      setCurrentPage(prevPage => prevPage - 1);
    }
  };

  
  if (isLoading){
    return <Loading/> 
  }



  return (
    <>
      <div className='justify-center content-center px-4 pl-8'>
        <div className='mt-4 pr-66 font-boldtext-center text-2xl  p-2 px-4 mb-4  text-slate-700'>
          Blogs
        </div>
        {/* our cards */}
        <div className='pb-5 pt-2 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 md:gap-4 lg:gap-6'>
          {
              data?.results?.map((card, index) => (
                <Link key={card.id} to={`${card.id}`}>
                  <div key={card.id} className="bg-white rounded-lg shadow-lg overflow-hidden ">
                    <img className="h-48 w-full object-cover object-center hover:scale-110 "

                      src={card.image} alt="Blog post image" />
                    <div className="p-4">
                      <p className="py-4 px-6 border-b">
                        {card.created_by}</p>

                      <h3 className="text-lg font-medium text-gray-900">{card.title}</h3>

                      <p className="text-gray-600 mt-2 line-clamp-3">{card.content}</p>
                      <div className="mt-4">
                        {/* <span onClick={()=>toggleModal({card})} className="text-indigo-500 cursor-pointer hover:text-indigo-600 font-medium">Read more</span> */}
                        <span className="text-blue-700 cursor-pointer hover:text-blue-600 font-medium">Read more</span>
                      </div>
                    </div>
                  </div>
                </Link>
              ))
          }


        </div>
        <div className='flex justify-center items-center'>
          {
            (data?.next || data?.previous) &&
            <div className='flex justify-between gap-2 w-full'>
              <button onClick={handlePrevPage} disabled={!data.previous} className={`px-4 py-2 text-white bg-blue-500 rounded hover:bg-blue-600 ${!data.previous && 'opacity-50 cursor-not-allowed'}`}>
                Previous
              </button>
              <button onClick={handleNextPage} disabled={!data.next} className={`px-4 py-2 text-white bg-blue-500 rounded hover:bg-blue-600 ${!data.next && 'opacity-50 cursor-not-allowed'}`}>
                Next
              </button>
            </div>
          }
        </div>

      </div>
      {/* <BlogModal data={modalData} isOpen={modalOpen} setIsOpen={setModalOpen} /> */}
    </>
  )
}

export default Blogs