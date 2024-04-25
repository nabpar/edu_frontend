
import React, { useState, useEffect } from 'react'
import Modal from "../components/Modal";
import { useGET } from '../hooks/useApi';
import { formatAPIDate } from '../utils/Dates'
import { AiOutlinePlus } from 'react-icons/ai';
import { BiPencil, BiTrash } from 'react-icons/bi'
import { toast } from 'react-toastify';
import axios from '../api/axios';
import { Link } from 'react-router-dom';
import {API_URLS} from '../api/constants';
import Loading from '../components/Loading';
import { useAuth } from '../hooks/useAuth';


const AddTopic = () => {

  const emptyFormData = {
    name: '',
    category: null,
    subject: null,
    assign_to: null,
  }
  const { user } = useAuth()

  const [isEdit, setIsEdit] = useState(false)
  const [isModalOpen, setModalOpen] = useState(false)
  const [formData, setFormData] = useState(emptyFormData);
  const [categoryOptions, setcategoryOptions] = useState([])
  const [subjectOptions, setSubjectOptions] = useState([])
  const [teacherOptions, setTeacherOptions] = useState([])
  const [selectedCategory, setSelectedCategory] = useState("")
  const [currentPage, setCurrentPage] = useState(1);

  const { data: topics, isLoading, refetch } = useGET(`${API_URLS.viewTopics}?page=${currentPage}`)


  const handleNextPage = () => {
    if (topics?.next) {
      setCurrentPage(prevPage => prevPage + 1);

    }
  };

  const handlePrevPage = () => {
    if (topics?.previous) {
      setCurrentPage(prevPage => prevPage - 1);
    }
  };




  useEffect(() => {
    axios.get(`${API_URLS.viewCategorys}?page_size=500`).then(resp => {
      const data = resp?.data?.results?.map(item => ({ label: item.name, value: item.id }))
      setcategoryOptions(data)

    })
    return () => {
    }
  }, [])

  useEffect(() => {
    axios.get(`${API_URLS.viewSubjects}?page_size=500`).then(resp => {
      const data = resp?.data?.results?.map(item => ({ label: item.name, value: item.id }))
      setSubjectOptions(data)
    })
    return () => {
    }
  }, [selectedCategory])

  useEffect(() => {
    axios.get(`${API_URLS.listTeachers}`, {
      headers: {
        Authorization: `Bearer ${user.token.access}`,
      }
    }).then(resp => {
      const data = resp?.data?.map(item => ({ label: item.email, name: item.name, value: item.id }))
      setTeacherOptions(data)
    })
    return () => {
    }
  }, [])












  const addTopic = () => {
    setIsEdit(false)
    setFormData({ ...emptyFormData,assign_to:user?.id })
    setModalOpen(true)

  }

  const editTopic = (topic) => {
    if(user?.role=='TEACHER' && topic.assign_to != user?.id){
      toast.error('Unauthorized for this operation')
      return
    }
    
    setIsEdit(true)
    setFormData({ name: topic.name, subject: topic.subject, category: topic.category, id: topic.id, assign_to: user?.id})
    setModalOpen(true)

  }

  const deleteTopic = (topic) => {
    if(user?.role=='TEACHER' && topic.assign_to != user?.id)
    {
      toast.error('Unauthorized operation')
      return
    }
    
    setIsEdit(false)
      axios.delete(`${API_URLS.deleteTopics}/${topic.id}/`).then(
      () => {
        toast.success('Deleted successfully')
        refetch()

      }).catch(err => {
        toast.error('Encountered Error')
      }).finally(
        () => {
          setModalOpen(false)
        }
      )
    
    
  }
  //............................................................................. This state is for categoryOptions...............................................................//
  const onCategoryChange = (e) => {
    setFormData({ ...formData, category: e.target.value })
    axios.get(`${API_URLS.viewSubjects}?category=${e.target.value}&page_size=500`).then(resp => {
      const data = resp?.data?.results?.map(item => ({ label: item.name, value: item.id }))
      setSubjectOptions(data)

    })

  }
  const onSubjectChange = (e) => {
    setFormData({ ...formData, subject: e.target.value })

  }

  const onTeacherChange = (e) => {
    setFormData({ ...formData, assign_to: e.target.value })
  }






  const TopicForm = () => {
    const { name, category, subject, assign_to } = formData;
    const handleChange = (e) => {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    };
    const handleSubmit = (e) => {
      e.preventDefault();


      //--------------------------------------------------------------API for Edit Subject--------------------------------------------------------------//

      if (isEdit) {
        axios.patch(`/${API_URLS.updateTopics}/${formData.id}/`, { name: name, category: category, subject: subject, assign_to: assign_to }).then(
          () => {
            toast.success('Updated successfully')
            refetch()
          }
        ).catch(err => {
          const messages = Object.values(err.response.data).join(',').toUpperCase()
          toast.error(`${messages}`, {
            pauseOnHover: true,
            autoClose: 3000
          })
        }).finally(
          () => {
            setModalOpen(false)
            refetch()
          }
        )
      }

      //-----------------------------------------------------API for Post Subject-------------------------------------------------------------------------------------//

      else {
        axios.post(`/${API_URLS.createTopics}/`, { name: name, category: category, subject: subject, assign_to: assign_to }).then(
          () => {
            toast.success('Added successfully')
            refetch()

          }
        ).catch(err => {
          const messages = Object.values(err.response.data).join(',').toUpperCase()
          toast.error(`${messages}`, {
            pauseOnHover: true,
            autoClose: 3000
          })
        }).finally(
          () => {
            setModalOpen(false)
            refetch()
          }
        )

      }

    };
    return (
      <>
        <form className='py-2 px-1' onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="category" className="block text-sm font-medium text-gray-700">
              Category <span className="text-red-500">*</span>
            </label>

            <select required value={formData.category} onChange={onCategoryChange} id='category' name='category' className='w-full mt-1 p-2 cursor-pointer outline-gray-300 rounded bg-transparent outline outline-1'>
              <option value="" className='text-gray-600'>Select Option</option>
              {
                categoryOptions?.map(item =>
                  <option className='w-full' value={item.value}>
                    {item.label}
                  </option>
                )
              }
            </select>
          </div>
          <div className="mb-4">
            <label htmlFor="subject" className="block text-sm font-medium text-gray-700">
              Subject <span className="text-red-500">*</span>
            </label>

            <select required value={formData.subject} onChange={onSubjectChange} id='subject' name='subject' className='w-full mt-1 p-2 cursor-pointer outline-gray-300 rounded bg-transparent outline outline-1'>
              <option value="" >Select Option</option>
              {
                subjectOptions?.map(item =>
                  <option className='w-full' value={item.value}>
                    {item.label}
                  </option>
                )
              }
            </select>
          </div>

          <div className="mb-4">
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">
              Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={name}
              onChange={handleChange}
              required
              className="mt-1 px-3 py-2 block w-full border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            />
          </div>
          <div className="mb-4">


            {
              user.role == 'ADMIN' ?
                <>
                  <label htmlFor="category" className="block text-sm font-medium text-gray-700">
                    Assign To <span className="text-red-500">*</span>
                  </label>
                  <select required value={formData.assign_to} onChange={onTeacherChange} id='assign_to' name='assign_to' className='w-full mt-1 p-2 cursor-pointer outline-gray-300 rounded bg-transparent outline outline-1'>
                    <option value="" >Select Option</option>
                    {
                      teacherOptions?.map(item =>
                        <option className='w-full' value={item.value}>
                          {item.label} ({item.name})
                        </option>
                      )
                    }
                  </select>
                </>
                :
                <input type='hidden' value={user?.id}  id='assign_to' name='assign_to' />
            }
          </div>



          {/* ............................................................FOR ADD & UPDATE BUTTON ........................................................................ */}



          <div className="flex justify-end">
            <button
              type="submit"
              className="px-4 py-2 text-white bg-blue-500 rounded-md hover:bg-blue-600"
            >
              {isEdit ? 'Update' : 'Add'}
            </button>
          </div>
        </form>
      </>
    )
  }

  if (isLoading) {
    return (
      <>
        <Loading />
      </>
    )
  }

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold">Topics List</h2>






        <button onClick={addTopic} className="px-4 py-2 text-white bg-blue-500 rounded-md hover:bg-blue-600">
          <AiOutlinePlus className="w-5 h-5 mr-2 inline-block" />
          Add Topic
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white">
          <thead>
            <tr className='text-left font-semibold bg-gray-500 text-gray-200'>
              {/* <th className="py-3 px-4 border-b ">
                            Course
                        </th> */}
              <th className="py-3 px-4 border-b ">
                Category
              </th>
              <th className="py-3 px-4 border-b ">
                Subject
              </th>

              <th className="py-3 px-4 border-b ">
                Name
              </th>
              <th className="py-3 px-4 border-b ">
                Assigned To
              </th>

              {/* <th className="py-3 px-4 border-b ">
                            Created
                        </th>
                        <th className="py-3 px-4 border-b ">
                            Updated
                        </th> */}
              <th className="py-3 px-4 border-b ">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {topics?.results?.map((sub) => (
              <tr key={sub.id}>
                <td className="py-4 px-6 border-b">
                  <Link to={`/course/${sub.category}`} className='text-blue-700'>
                    {sub.category_name || sub.category}
                  </Link>
                </td>
                <td className="py-4 px-6 border-b">
                  <Link to={`/course/${sub.category}/${sub.subject}`} className='text-blue-700'>
                    {sub.subject_name || sub.subject}
                  </Link>


                </td>

                {/* <td className="py-4 px-6 border-b">
                            <Link className='text-blue-700' to={`/course/${sub.category}`}>{sub.category_name}</Link>
                            </td> */}
                <td className="py-4 px-6 border-b">
                  {sub.name}
                </td>
                <td className="py-4 px-6 border-b">
                  {sub.assign_to_name}
                </td>

                {/* <td className="py-4 px-6 border-b">{formatAPIDate(sub.date_created)}</td>
                            <td className="py-4 px-6 border-b">{formatAPIDate(sub.date_updated)}</td> */}
                <td className="py-4 px-6 border-b">
                  <button className="text-blue-500 hover:text-blue-600 mr-2 hover:scale-110">
                    <BiPencil onClick={() => editTopic(sub)} className="w-5 h-5" />
                  </button>
                  <button onClick={() => deleteTopic(sub)} className="text-red-500 hover:scale-110 hover:text-red-600">
                    <BiTrash className="w-5 h-5" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className='flex p-2 justify-center items-center'>
          {
            (topics?.next || topics?.previous) &&
            <div className='flex gap-2 w-full'>
              <button onClick={handlePrevPage} disabled={!topics.previous} className={`px-4 py-2 text-white bg-blue-500 rounded hover:bg-blue-600 ${!topics.previous && 'opacity-50 cursor-not-allowed'}`}>
                Previous
              </button>
              <button onClick={handleNextPage} disabled={!topics.next} className={`px-4 py-2 text-white bg-blue-500 rounded hover:bg-blue-600 ${!topics.next && 'opacity-50 cursor-not-allowed'}`}>
                Next
              </button>
            </div>
          }
        </div>

        <Modal isOpen={isModalOpen} setIsOpen={setModalOpen} title={isEdit ? 'Update Topic' : 'Add Topic'} content={TopicForm()} />
      </div>
    </div>
  )
}
export default AddTopic




