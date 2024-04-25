import React, { useState, useEffect } from 'react'
import { useGET } from '../hooks/useApi'
import { AiOutlinePlus } from 'react-icons/ai';
import { BiTrash } from 'react-icons/bi'
import Modal from '../components/Modal';
import { toast } from 'react-toastify';
import axios from '../api/axios';
import {API_URLS} from '../api/constants';
import { useAuth } from '../hooks/useAuth';

const Addblogsdata = () => {

    const {user}=useAuth()

    const emptyFormData = {
        id: '',
        title: '',
        content: '',
        created_by: '',
        category: null,
    }

    const [isEdit, setIsEdit] = useState(false)
    const [isModalOpen, setModalOpen] = useState(false)
    const [formData, setFormData] = useState(emptyFormData);
    const [selectOptions, setSelectOptions] = useState([])

    const [currentPage, setCurrentPage] = useState(1);

    const { data: blogList, refetch, setData: setblogList } = useGET(`${API_URLS.viewBlogs}?page=${currentPage}`)

    const handleNextPage = () => {
        if (blogList?.next) {
            setCurrentPage(prevPage => prevPage + 1);

        }
    };

    const handlePrevPage = () => {
        if (blogList?.previous) {
            setCurrentPage(prevPage => prevPage - 1);
        }
    };


    useEffect(() => {

        axios.get(`${API_URLS.viewCategorys}?page_size=500`).then(resp => {

            const data = resp?.data?.results?.map(item => ({ label: item.name, value: item.id }))
            setSelectOptions(data)

        })

        return () => {
        }
    }, [])



    const onCategoryChange = (e) => {
        setFormData({ ...formData, category: e.target.value })
    }


    const addblogs = () => {
        setIsEdit(false)
        setFormData({ ...emptyFormData,created_by:user?.name, category: selectOptions[0]?.value })
        // setBaseCategory()
        setModalOpen(true)

    }

    const deleteBlog = (blog) => {
        setIsEdit(false)
        axios.delete(`${API_URLS.deleteBlogs}/${blog.id}/`).then(
            () => {
                toast.success('Deleted successfully')
                refetch()

            }
        ).catch(err => {
            toast.error('Encountered Error')
        }).finally(
            () => {
                setModalOpen(false)
            }
        )
    }






    const BlogForm = () => {

        const {user}=useAuth();

        const [blogImage, setImage] = useState(null);

        const handleImageChange = (event) => {
            setImage(event.target.files[0]);
        }

        const { id, title, content, created_by } = formData;
        const handleChange = (e) => {

            setFormData({ ...formData, [e.target.name]: e.target.value });

        }



        const handleSubmit = (e) => {

            e.preventDefault();

            const form = new FormData();

            form.append('id', formData.id)
            form.append('title', formData.title)
            form.append('category', formData.category)
            form.append('content', formData.content)
            form.append('created_by', formData.created_by)
            form.append('image', blogImage)
            console.log(form)



            //----------------------------------------------------API for category create--------------------------------------------//
            if (isEdit) {
                console.log('Edit mode not created for blog edit')

            }
            else {
                axios.post(`${API_URLS.createBlogs}\\`, form, {
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
                    }
                )
            }

            // Handle form submission logic here
        };
        return (
            <>
                <form className='py-2 px-1' onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label htmlFor="category" className="block text-sm font-medium text-gray-700">
                            Category <span className="text-red-500">*</span>
                        </label>

                        {/* .........................................................FOR SELECTOPTIONS....................................................................... */}


                        <select required value={formData.category} onChange={onCategoryChange} id='category' name='category' className='w-full mt-1 p-2 cursor-pointer outline-gray-300 rounded bg-transparent outline outline-1'>
                            {
                                selectOptions?.map(item =>
                                    <option className='w-full' value={item.value}>
                                        {item.label}
                                    </option>
                                )
                            }
                        </select>
                    </div>

                    <div className="mb-4">
                        <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                            Unique ID <span className="text-red-500">*</span>
                        </label>
                        <input
                            type="text"
                            id="id"
                            name="id"
                            value={id}
                            onChange={handleChange}
                            required
                            className="mt-1 px-3 py-2 block w-full border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                        />
                    </div>

                    <div className="mb-4">
                        <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                            Title  <span className="text-red-500">*</span>
                        </label>
                        <input
                            type="text"
                            id="title"
                            name="title"
                            value={title}
                            onChange={handleChange}
                            required
                            className="mt-1 px-3 py-2 block w-full border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                        />
                    </div>

                    <div className="mb-4">
                        <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                            Content  <span className="text-red-500">*</span>
                        </label>
                        <textarea
                            rows={10}
                            id="content"
                            name="content"
                            value={content}
                            onChange={handleChange}
                            required
                            className="mt-1 px-3 py-2 block w-full border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                        />
                    </div>

                    <div className="mb-4">
                        <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                            Author  <span className="text-red-500">*</span>
                        </label>
                        <select value={user?.name} name='created_by' className='w-full mt-1 p-2 cursor-pointer outline-gray-300 rounded bg-transparent outline outline-1'>
                            <option defaultValue={user?.name}>{user?.name}</option>
                        </select>
                    </div>



                    <div className="mb-4">
                        <label htmlFor="image" className="block text-sm font-medium text-gray-700">
                            Image
                        </label>
                        <input
                            type="file"
                            accept='image/png,image/jpeg;image/jpeg'
                            id="image"
                            name="image"
                            onChange={handleImageChange}
                            className="mt-1 px-3 py-2 block w-full border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                        />
                    </div>

                    <div className="flex justify-end">
                        <button
                            type="submit"
                            className="px-4 py-2 text-white bg-blue-500 rounded-md hover:bg-blue-600"
                        >
                            Add
                        </button>
                    </div>


                </form>
            </>
        )
    }

    return (
        <div className="container mx-auto p-4">
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold">Blog List</h2>




                <button onClick={addblogs} className="px-4 py-2 text-white bg-blue-500 rounded-md hover:bg-blue-600">
                    <AiOutlinePlus className="w-5 h-5 mr-2 inline-block" />
                    Add Blog
                </button>
            </div>

            <div className="overflow-x-auto">
                <table className="min-w-full bg-white">
                    <thead>
                        <tr className='text-left font-semibold bg-gray-500 text-gray-200'>
                            {/* <th className="py-3 px-4 border-b ">
                                Id
                            </th> */}
                            <th className="py-3 px-4 border-b ">
                                Title
                            </th>
                            <th className="py-3 px-4 border-b ">
                                Content
                            </th>
                            <th className="py-3 px-4 border-b ">
                                Author
                            </th>
                            <th className="py-3 px-4 border-b ">
                                Category
                            </th>
                            <th className="py-3 px-4 border-b ">
                                Image
                            </th>
                            <th className="py-3 px-4 border-b ">
                                Actions
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {blogList?.results?.map((blogs) => (
                            <tr key={blogs.id}>
                                {/* <td className="py-4 px-6 border-b">
                                    <Link className='text-blue-700' to={`/blogs/${blogs.id}`}>{blogs.id}</Link></td> */}
                                <td className="py-4 px-6 border-b">
                                    {blogs.title}
                                </td>
                                <td className="py-4 px-6 border-b">
                                    <p className='line-clamp-4'>{blogs.content}</p>
                                    <a href={`blogs/${blogs.id}`} target='__blank' className='text-blue-500'>Read More</a>
                                </td>
                                <td className="py-4 px-6 border-b">{blogs.created_by}</td>
                                <td className="py-4 px-6 border-b">{selectOptions?.find(item => item?.value === blogs?.category)?.label}</td>
                                <td className="py-4 px-6 border-b">
                                    <a href={blogs.image} target='__blank'><img src={blogs.image} className='aspect-sqaure w-20' /></a>
                                </td>
                                <td className="py-4 px-6 border-b">
                                    {/* <button className="text-blue-500 hover:text-blue-600 hover:scale-110  mr-2">
                                        <BiPencil  className="w-5 h-5 "/>
                                    </button> */}
                                    <button onClick={() => deleteBlog(blogs)} className="text-red-500 hover:scale-110 hover:text-red-600">
                                        <BiTrash className="w-5 h-5" />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <div className='flex justify-center items-center'>
                    {
                        (blogList?.next || blogList?.previous) &&
                        <div className='flex justify-between gap-2 w-full'>
                            <button onClick={handlePrevPage} disabled={!blogList.previous} className={`px-4 py-2 text-white bg-blue-500 rounded hover:bg-blue-600 ${!blogList.previous && 'opacity-50 cursor-not-allowed'}`}>
                                Previous
                            </button>
                            <button onClick={handleNextPage} disabled={!blogList.next} className={`px-4 py-2 text-white bg-blue-500 rounded hover:bg-blue-600 ${!blogList.next && 'opacity-50 cursor-not-allowed'}`}>
                                Next
                            </button>
                        </div>
                    }
                </div>

                <Modal isOpen={isModalOpen} setIsOpen={setModalOpen} title={'Create a blog'} content={BlogForm()} />
            </div>
        </div>
    )
}

export default Addblogsdata