import React,{useState,useEffect} from 'react'
import { formatAPIDate } from '../utils/Dates'
import { Link, useParams } from 'react-router-dom'
import { useGET } from '../hooks/useApi'
import {API_URLS} from '../api/constants';
import Loading from '../components/Loading'
import { useAuth } from '../hooks/useAuth';

function CourseSubjects() {

  const { courseid, subjectid } = useParams()
  const [currentPage, setCurrentPage] = useState(1);
  const [subjects, setSubjects] = useState([]);
  const { isLoading, data, isError } = useGET(`${API_URLS.viewSubjects}?category=${courseid}&page=${currentPage}`)
  const {user}=useAuth()

  const BASE_COURSE_LINK=user ? 'course':'all-courses'
  const handleLoadMore = () => {
    if (data?.next) {
      setCurrentPage(prevPage => prevPage + 1);
    }
  };

  // When new data is fetched, append it to the existing courses
  // This ensures that previous courses are not overwritten
  useEffect(() => {
    if (data && data.results) {
      setSubjects(prevCourses => [...prevCourses, ...data.results]);
    }
  }, [data]);


  if (isLoading) {
    return <>
      <Loading />
    </>
  }


  return (
    <>
      <div className='w-full h-full max-h-full flex flex-col items-center p-4 gap-2 overflow-y-scroll'>
        <h2 className='p-3 text-left w-full text-lg font-semibold text-blue-600 flex gap-2'>
          <Link to={`/${BASE_COURSE_LINK}`}>Courses</Link>/<Link to={`/${BASE_COURSE_LINK}/${courseid}`} >{data?.results?.[0]?.category_name}</Link>
        </h2>
        <div className='flex flex-wrap w-full gap-4 items-center rounded min-w-md p-4'>
          {
            subjects?.map(
              item => (


                <Link to={`${item.id}`} key={item.id} className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/8 px-4 mb-8">
                  <div className="bg-white rounded-lg overflow-hidden shadow-md">
                    <div className="aspect-video">
                      <img
                        src={item.image}
                        className="object-cover w-full h-full"
                      />
                    </div>
                    <div className="p-4">
                      <h3 className="text-xl font-semibold mb-2">{item.name}</h3>
                      <p className="text-sm text-gray-600">
                        Course created on <span className='font-[600]'>{formatAPIDate(item.date_created)}</span>
                      </p>
                    </div>
                  </div>
                </Link>
              )
            )
          }
        </div>
        <>
          {(data?.next ) && (
            <div className='flex justify-center'>
              <button onClick={handleLoadMore} className='px-4 py-2 text-white bg-blue-500 rounded hover:bg-blue-600'>
                Load More
              </button>
            </div>
          )}
        </>

      </div >
    </>
  )
}

export default CourseSubjects