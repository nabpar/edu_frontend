import React, { useEffect, useState } from 'react'
import { MdNoteAdd } from "react-icons/md";
import { useGET } from '../hooks/useApi';
import axios from '../api/axios';
import Modal from '../components/Modal';
import {API_URLS} from '../api/constants';
import { BsUpload } from 'react-icons/bs'
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';
import { TbFileSymlink } from "react-icons/tb";
import { BiTrash } from "react-icons/bi";



const AddSyllabus = () => {


  // const files={
  //   category_img:null,
  //   subject_img:null,
  //   subject_file:null
  // }


  const [categoryOptions, setCategoryOptions] = useState([])
  const [subjectOptions, setsubjectOptions] = useState([])
  const [isModalOpen, setModalOpen] = useState(false)
  const [selectedCategory, setSelectedCategory] = useState(null)
  const [selectedSubject, setSelectedSubject] = useState(null)
  const [syallabusFile, setsyallabusFile] = useState()
  const [loading, setLoading] = useState(false)


  const { data: fileList, refetch } = useGET(API_URLS.viewSyllabus)


  const addFiles = () => {
    setSelectedCategory(categoryOptions[0]?.value)
    setModalOpen(true)

  }


  const onCategoryChange = (e) => {
    setSelectedCategory(e.target.value)
  }

  const onSubjectChange = (e) => {
    setSelectedSubject(e.target.value)
  }


  const onFileSelectChange = (e) => {
    return e.target.files[0]
  }


  useEffect(() => {
    axios.get(`${API_URLS.viewCategorys}?&page_size=500`).then(resp => {
      const data = resp?.data?.results?.map(item => ({ label: item.name, value: item.id }))
      setCategoryOptions(data)
    })
    return () => {
    }
  }, [])

  useEffect(() => {
    axios.get(`${API_URLS.viewSubjects}?category=${selectedCategory}&page_size=500`).then(resp => {
      const data = resp?.data?.results?.map(item => ({ label: item.name, value: item.id }))
      setsubjectOptions(data)
    })
    return () => {
    }
  }, [selectedCategory])




  const handleDelete=(fileid)=>{
    axios.delete(`${API_URLS.deleteSyllabus}/${fileid}`).then(
      () => {
        toast.warning('Deleted successfully')
        refetch()
      }
    ).catch(err => {
      const messages = Object.values(err.response.data).join(',').toUpperCase()
      toast.error(`${messages}`, {
        pauseOnHover: true,
        autoClose: 3500
      })
    }).finally(
      () => {
        setModalOpen(false)
        refetch()
      }
    )
  }


  const handleSubmit = (e) => {
    e.preventDefault()
    setLoading(true)
    console.log(e)
    const formData = new FormData()
    formData.append('syllabus_file', syallabusFile);
    formData.append('name', e.target.syllabusname.value);
    formData.append('category', selectedCategory);
    formData.append('subject', selectedSubject || subjectOptions[0].value);

    console.table(formData)

    axios.post(`${API_URLS.createSyllabus}\\`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      }
    }).then(
      () => {
        toast.success('Added successfully')
        refetch()

      }
    ).catch(err => {
      const messages = Object.values(err.response.data).join(',').toUpperCase()
      toast.error(`${messages}`, {
        pauseOnHover: true,
        autoClose: 3500
      })
    }).finally(
      () => {
        setModalOpen(false)
        refetch()
        setLoading(false)
      }
    )
  }



  const FilesForm = () => {
    return (
      <>
        <form onSubmit={handleSubmit} className='w-full h-full'>
          <div className='flex flex-col gap-2'>
            <div className='mt-4 mb-2'>
              <label htmlFor="category" className="block text-sm font-medium text-gray-700">
                Category <span className="text-red-500">*</span>
              </label>

              {/* .........................................................FOR SELECTOPTIONS....................................................................... */}

              <select required value={selectedCategory} onChange={onCategoryChange} id='category' name='category' className='w-full mt-1 p-2 cursor-pointer outline-gray-300 rounded bg-transparent outline outline-1'>
                {
                  categoryOptions?.map(item =>
                    <option className='w-full' value={item.value}>
                      {item.label}
                    </option>
                  )
                }
              </select>
            </div>

            <div className='mb-4'>

              <label htmlFor="category" className="block text-sm font-medium text-gray-700">
                Subject <span className="text-red-500">*</span>
              </label>

              {/* .........................................................FOR SELECTOPTIONS....................................................................... */}


              <select required value={selectedSubject} onChange={onSubjectChange} id='subject' name='subject' className='w-full mt-1 p-2 cursor-pointer outline-gray-300 rounded bg-transparent outline outline-1'>
                {
                  subjectOptions?.map(item =>
                    <option className='w-full' value={item.value}>
                      {item.label}
                    </option>
                  )
                }
              </select>
            </div>

            <div className='mb-4'>
              <label htmlFor="category" className="block text-sm font-medium text-gray-700">
                Syllabus File <span className="text-red-500">*</span>
              </label>
              <div className="flex items-center my-2 w-full">
                <label for="syallabus-file" className="relative cursor-pointer w-full">
                  <div className="border-2 w-full border-dashed border-gray-300 rounded-md py-2 text-xs px-8 flex flex-col items-center justify-center space-y-4">
                    <BsUpload />
                    <span class="text-gray-500">{syallabusFile?.name || "Upload a file"}</span>
                  </div>
                  <input onChange={e => setsyallabusFile(onFileSelectChange(e))} accept='application/pdf' id="syallabus-file" name="syallabus-file" type="file" class="absolute hidden" />
                </label>
                <span id="file-name" class="ml-3"></span>
              </div>
            </div>
          </div>
          <div className='mb-4'>
            <label htmlFor="syllabusname" className="block text-sm font-medium text-gray-700">
                Name <span className="text-red-500">*</span>
              </label>
              <input type='text' required name='syllabusname' className='w-full mt-1 p-2 outline-gray-300 rounded bg-transparent outline outline-1 '/>

            </div>

          <div className="flex justify-center">
            <button
              disabled={loading}
              type="submit"
              className="px-4 py-2 text-white bg-blue-500 rounded-md hover:bg-blue-600"
            >
              Add Resource
            </button>
          </div>


        </form>
      </>
    )
  }



  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold">Add Syllabus</h2>
        <button onClick={addFiles} className="px-4 py-2 text-white bg-blue-500 rounded-md hover:bg-blue-600">
          <MdNoteAdd className="w-5 h-5 mr-2 inline-block" />
          Add Syllabus
        </button>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white">
          <thead>
            <tr className='text-left font-semibold bg-gray-500 text-gray-200'>
              <th className="py-3 px-4 border-b ">
                Category
              </th>
              <th className="py-3 px-4 border-b ">
                Subject
              </th>
              <th className="py-3 px-4 border-b ">
                Syllabus File
              </th>
              <th className="py-3 px-4 border-b ">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {fileList?.map((file) => (
              <tr key={file.id}>
                <td className="py-4 px-6 border-b">
                  <Link className='text-blue-700' to={`/course/${file?.category}`}>{file.category_name || file.category}</Link>
                </td>
                <td className="py-4 px-6 border-b">
                  <Link className='text-blue-700' to={`/course/${file?.category}/${file?.subject}`}>{file.subject_name || file.subject}</Link>
                </td>
                <td className="py-4 px-6 border-b">
                  <a href={file.syllabus_file} className='aspect-sqaure flex items-center gap-2 text-blue-500'>
                    Access File
                    <TbFileSymlink />
                  </a>
                </td>
                <td className="py-4 px-6 border-b">
                  {/* <button className="text-blue-500 hover:text-blue-600 hover:scale-110  mr-2">
                                        <BiPencil  className="w-5 h-5 "/>
                                    </button> */}
                  <button onClick={()=>handleDelete(file.id)} className="text-red-500 hover:scale-110 hover:text-red-600">
                    <BiTrash className="w-5 h-5" />
                  </button>
                </td>


              </tr>
            ))
            }

          </tbody>
        </table>
      </div>

      <Modal isOpen={isModalOpen} setIsOpen={setModalOpen} title={'Add a new resource'} content={<FilesForm />} />
    </div>

  )
}

export default AddSyllabus