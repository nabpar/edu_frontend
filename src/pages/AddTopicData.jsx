import React, { useRef } from 'react'
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

const AddTopicData = () => {
    const { user } = useAuth();
    const { topicid } = useParams()
    const { data, refetch } = useGET(`${API_URLS.topicContents}/${topicid}/`)
    const editorRef = useRef(null);
    const apiKey = process.env.REACT_APP_TINYMCE_API
    const log = () => {
        if (editorRef.current) {
            console.log(editorRef.current.getContent());
        }
    };

    const handleSave = () => {
        if (window.confirm('Are you sure?')) {
            const content = editorRef.current.getContent()
            axios.put(`${API_URLS.topicContents}/${topicid}/`, {
                content: content,
                status: 'REVIEW',
                status_message: 'Submitted for review'
            }, {
                headers: {
                    'Authorization': `Bearer ${user?.token?.access}`

                }
            }).then(resp => {
                toast.success('Submitted for review')
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
                    <Link to='/assigned-topics'>
                        <IoMdArrowRoundBack className='text-2xl cursor-pointer hover:bg-gray-100 rounded ' />
                    </Link>
                    <h2 className="text-2xl font-bold">{data?.topic?.name}</h2>
                    <Chip status={data?.status}/>
                </div>
                <div>
                    <button onClick={handleSave} className='px-3 py-2 bg-emerald-600 hover:bg-emerald-500 text-gray-200 rounded font-[500]'>{['DRAFT', 'REJECTED'].includes(data?.status) ? 'Submit' : 'Update'}</button>
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

export default AddTopicData