import React, { useRef, useState } from 'react'
import { useParams } from 'react-router-dom'
import { Link } from 'react-router-dom'
import { useGET } from '../hooks/useApi'
import {API_URLS} from '../api/constants';
import { Editor } from '@tinymce/tinymce-react';
import { formatAPIDate } from '../utils/Dates';
import axios from '../api/axios';
import { useAuth } from '../hooks/useAuth';
import { toast } from 'react-toastify';
import { IoMdArrowRoundBack } from "react-icons/io";
import Chip from '../components/Chip'

const AdminContentEdit = () => {
    const { user } = useAuth();
    const { topicid } = useParams()
    const { data, refetch } = useGET(`${API_URLS.topicContents}/${topicid}/`)
    const editorRef = useRef(null);
    const feedbackRef=useRef(null);
    const apiKey = process.env.REACT_APP_TINYMCE_API

    const [isrejectUpdate, setIsrejectUpdate] = useState(false)

    const handleUpdatePublish = () => {
        if (window.confirm('Are you sure?')) {
            const content = editorRef.current.getContent()
            axios.put(`${API_URLS.topicContents}/${topicid}/`, {
                content: content,
                status: 'PUBLISHED',
                status_message: 'Edited by admin and published'
            }, {
                headers: {
                    'Authorization': `Bearer ${user?.token?.access}`

                }
            }).then(resp => {
                toast.success('Published')
            }).catch(err => {
                console.error(err)
                toast.error('Something went wrong.')
            })
            refetch()

        };
    }

    const toggleRejectUpdate = () => {
        setIsrejectUpdate(!isrejectUpdate)
    }
    const handleUpdateReject = () => {
        if (window.confirm('Are you sure?')) {
            const content = editorRef.current.getContent()
            axios.put(`${API_URLS.topicContents}/${topicid}/`, {
                content: content,
                status: 'REJECTED',
                status_message: feedbackRef.current.value
            }, {
                headers: {
                    'Authorization': `Bearer ${user?.token?.access}`

                }
            }).then(resp => {
                toast.success('Rejected ')
            }).catch(err => {
                console.error(err)
                toast.error('Something went wrong.')
            })
            refetch()

        };

    }

    return (
        <div className="container mx-auto p-4">
            <div className="flex justify-between items-center mb-4">
                <div className='space-x-2 flex items-center'>
                    <Link to='/review-content'>
                        <IoMdArrowRoundBack className='text-2xl cursor-pointer hover:bg-gray-100 rounded ' />
                    </Link>
                    <h2 className="text-2xl font-bold">{data?.topic?.name}</h2>
                    <Chip status={data?.status}/>
                </div>
                <div className='flex gap-2'>
                    <button onClick={handleUpdatePublish} className='px-3 py-2 bg-emerald-600 hover:bg-emerald-500 text-gray-200 rounded font-[500]'>Update and Publish</button>
                    <div className='flex'>
                        {isrejectUpdate && <>
                            <input type='text' ref={feedbackRef} className='p-2 transition-all outline-1 rounded' placeholder='Rejection feeback message' />
                            <button onClick={handleUpdateReject} className='px-3 ml-2 py-2 bg-red-600 hover:bg-red-500 text-gray-200 rounded font-[500]'>Reject</button>
                        </>
                        }
                        {!isrejectUpdate && <button onClick={toggleRejectUpdate} className='px-3 py-2 bg-amber-600 hover:bg-amber-500 text-gray-200 rounded font-[500]'>Update Only with Reject</button>}

                    </div>
                </div>
            </div>
            <div className='flex pb-2 justify-between'>
                <h4 className='text-xs italic'>{data?.status_message}</h4>
                <h4 className='text-sm italic'>Last Update on {formatAPIDate(data?.date_updated)}</h4>
            </div>
            <div className="overflow-x-auto">
                <Editor
                    apiKey={apiKey}
                    onInit={(evt, editor) => editorRef.current = editor}
                    initialValue={data?.content || ''}
                    init={{
                        height: 500,
                        menubar: false,
                        plugins: [
                            'advlist', 'autolink', 'lists', 'link', 'image', 'charmap', 'preview',
                            'anchor', 'searchreplace', 'visualblocks', 'code', 'fullscreen',
                            'insertdatetime', 'media', 'table', 'code', 'help', 'wordcount', 'visualblocks'
                        ],
                        toolbar: 'undo redo | blocks | ' +
                            'bold italic forecolor | alignleft aligncenter ' +
                            'alignright alignjustify | bullist numlist outdent indent | ' +
                            'removeformat | help',
                        content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }'
                    }}
                />
            </div>
        </div>
    )
}

export default AdminContentEdit;