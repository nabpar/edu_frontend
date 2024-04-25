import React, { useState, useEffect } from 'react'
import { useGET } from '../hooks/useApi'
import { formatAPIDate } from '../utils/Dates'
import { AiOutlinePlus } from 'react-icons/ai';
import { BiPencil, BiTrash } from 'react-icons/bi'
import Modal from '../components/Modal';
import { toast } from 'react-toastify';
import axios from '../api/axios';
import { Link } from 'react-router-dom';
import {API_URLS} from '../api/constants';

const Messages = () => {
    const emptyFormData = {
        name: '',
        email: '',
        phone: '',
        message: '',
        status: '',
    }
    const [isEdit, setIsEdit] = useState(false)
    const [isModalOpen, setModalOpen] = useState(false)
    const [formData, setFormData] = useState(emptyFormData);
    const { data: messageList, refetch, setData: setmessageList } = useGET(`${API_URLS.contact}/`)

    const [searchTerm, setSearchTerm] = useState('');


    const onChange = (event) => {
        setSearchTerm(event.target.value);
        onSearch(event.target.value);
    }

    const onSearch = (searchTerm) => {
        //our api//
        axios.get(`${API_URLS.contact}/?search=${searchTerm}`)
            .then(res => {
                setmessageList(res.data);
            })
            .catch(err => {
                console.log(err)
            });



    }

    const editMessage = (msg) => {
        setIsEdit(true)
        setFormData({ name: msg.name, email: msg.email, id: msg.id, phone: msg.phone, status: msg.status, message: msg.message })
        setModalOpen(true)

    }

    const deleteMessage = (msg) => {
        setIsEdit(false)
        axios.delete(`${API_URLS.contact}/${msg.id}/`).then(
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

    const MessageForm = () => {
        const { status } = formData;
        const handleChange = (e) => {
            setFormData({ ...formData, [e.target.name]: e.target.value });
        };
        const handleSubmit = (e) => {
            e.preventDefault();

            //----------------------------------------------Api for performing Course Edit-------------------------------------------------//

            if (isEdit) {
                axios.patch(`/${API_URLS.contact}/${formData.id}/`, { status: status }).then(
                    () => {
                        toast.success('Updated successfully')
                        refetch()
                    }
                ).catch(err => {
                    toast.error('Encountered Error')
                }).finally(
                    () => {
                        setModalOpen(false)
                        refetch()
                    }
                )
            }


            //----------------------------------------------------API for category create--------------------------------------------//

            // Handle form submission logic here
        };
        return (
            <>
                <form className='py-2 px-1' onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                            Name <span className="text-red-500">*</span>
                        </label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            disabled
                            value={formData.name}
                            onChange={handleChange}
                            required
                            className="mt-1 px-3 py-2 block w-full border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                            Email
                        </label>
                        <input
                            disabled
                            type="text"
                            id="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            className="mt-1 px-3 py-2 block w-full border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                            Phone
                        </label>
                        <input
                            disabled
                            type="text"
                            id="phone"
                            name="phone"
                            value={formData.phone}
                            onChange={handleChange}
                            className="mt-1 px-3 py-2 block w-full border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                            Phone
                        </label>
                        <select
                            id="status"
                            name="status"
                            value={formData.status}
                            onChange={handleChange}
                            className="mt-1 px-3 py-2 block w-full border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                        >
                            <option value='RESOLVED'>RESOLVED</option>
                            <option value='PENDING'>PENDING</option>
                            <option value='IN_PROGRESS'>IN_PROGRESS</option>
                            <option value='SPAM'>SPAM</option>
                        </select>
                    </div>



                    <div className="flex justify-end">
                        <button
                            type="submit"
                            className="px-4 py-2 text-white bg-blue-500 rounded-md hover:bg-blue-600"
                        >
                            {isEdit && 'Update'}
                        </button>
                    </div>
                </form>
            </>
        )
    }

    return (
        <div className="container mx-auto p-4">
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold">Messages</h2>

                {/* ............................................For SearchButton............................................................ */}


                <div>
                    <input type="text"
                        placeholder="Search..."
                        value={searchTerm}
                        onChange={onChange}

                        className='border p-2 rounded-2xl w-64 pl-12' />

                    <button onClick={() => onSearch(searchTerm)} className='bg-blue-500 text-white py-1 rounded-xl focus:outline-none px-8 m-2'>Search</button>
                </div>



            </div>

            <div className="overflow-x-auto">
                <table className="min-w-full bg-white">
                    <thead>
                        <tr className='text-left font-semibold bg-gray-500 text-gray-200'>
                            <th className="py-3 px-4 border-b ">
                                Name
                            </th>
                            <th className="py-3 px-4 border-b ">
                                Email
                            </th>
                            <th className="py-3 px-4 border-b ">
                                Phone
                            </th>
                            <th className="py-3 px-4 border-b ">
                                Message
                            </th>
                            <th className="py-3 px-4 border-b ">
                                Created
                            </th>
                            <th className="py-3 px-4 border-b ">
                                Status
                            </th>
                            <th className="py-3 px-4 border-b ">
                                Actions
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {messageList?.map((message) => (
                            <tr key={message.id}>
                                <td className="py-4 px-6 border-b">
                                    {message.name}</td>
                                <td className="py-4 px-6 border-b">
                                    {message.email}
                                </td>
                                <td className="py-4 px-6 border-b">
                                    {message.phone}
                                </td>
                                <td className="py-4 px-6 border-b">
                                    {message.message}
                                </td>
                                <td className="py-4 px-6 border-b">{formatAPIDate(message.date_created)}</td>
                                <td className="py-4 px-6 border-b">
                                    <span
                                        className={`px-3 py-1 rounded outline outline-1 ${message.status === 'RESOLVED'
                                                ? 'bg-green-500 text-white' // Style for RESOLVED status
                                                : message.status === 'PENDING'
                                                    ? 'bg-yellow-500 text-black' // Style for PENDING status
                                                    : message.status === 'IN_PROGRESS'
                                                        ? 'bg-blue-500 text-white' // Style for IN_PROGRESS status
                                                        : message.status === 'SPAM'
                                                            ? 'bg-red-500 text-white' // Style for SPAM status
                                                            : '' // Default style when status is not recognized
                                            }`}
                                    >
                                        {message.status}
                                    </span>
                                </td>
                                <td className="py-4 px-6 border-b">
                                    <button className="text-blue-500 hover:text-blue-600 hover:scale-110  mr-2">
                                        <BiPencil onClick={() => editMessage(message)} className="w-5 h-5 " />
                                    </button>
                                    <button onClick={() => deleteMessage(message)} className="text-red-500 hover:scale-110 hover:text-red-600">
                                        <BiTrash className="w-5 h-5" />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <Modal isOpen={isModalOpen} setIsOpen={setModalOpen} title={'Update Status'} content={MessageForm()} />
            </div>
        </div>)
}

export default Messages