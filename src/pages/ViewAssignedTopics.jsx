import React, { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { useGET } from '../hooks/useApi'
import {API_URLS} from '../api/constants';
import { useAuth } from '../hooks/useAuth'
import Loading from '../components/Loading'
import { formatAPIDate } from '../utils/Dates'
import { IoIosArrowForward } from "react-icons/io";
import Chip from '../components/Chip'
import { Editor } from '@tinymce/tinymce-react';
import axios from '../api/axios'



const STATUS = [
    'ALL',
    'DRAFT',
    'REVIEW',
    'REJECTED',
    'PUBLISHED',
]

const ViewAssignedTopics = () => {

    const { user } = useAuth();
    const apiKey = process.env.REACT_APP_TINYMCE_API
    const editorRef = useRef(null);
    const [assignedTopics, setassignedTopics] = useState([])
    const [selectStatus, setSelectedStatus] = useState()
    const [loading, setLoading] = useState(false)


    const { data: allData, isLoading, refetch } = useGET(`${API_URLS.assignedTopics}`, {
        'Authorization': `Bearer ${user.token.access}`
    })
    // setassignedTopics(allData)

    useEffect(() => {
        if (!isLoading && allData) {
            setassignedTopics(allData);
        }
    }, [allData, isLoading]);


    const handleStatusChange = (e) => {
        const status = e.target.value;
        setSelectedStatus(selectStatus)

        setLoading(true)
        if (status == 'ALL') {
            axios.get(`${API_URLS.assignedTopics}`, {
                headers: {
                    'Authorization': `Bearer ${user.token.access}`
                }
            }).then(resp => {
                setassignedTopics(resp.data)

            }).catch(err => {
                console.log(err)
            }).finally(() => {
                setLoading(false)
            })
        }
        else {

            axios.get(`${API_URLS.assignedTopics}?content__status=${status}`, {
                headers: {
                    'Authorization': `Bearer ${user.token.access}`
                }
            }).then(resp => {
                setassignedTopics(resp.data)

            }).catch(err => {
                console.log(err)
            }).finally(() => {
                setLoading(false)
            })
        }
        // setSelectedStatus(status)
    }


    if (isLoading) {
        return <Loading />
    }

    return (
        <>
            <div className="container mx-auto p-4">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-bold">Assigned Topics</h2>
                </div>

            </div>
            <div className='text-gray-700 text-xl space-y-4'>
                <div>
                    <select value={selectStatus} className='p-2 rounded cursor-pointer outline outline-1 text-base' onChange={handleStatusChange}>
                        {
                            STATUS.map(item => (
                                <option value={item}>{item}</option>
                            ))
                        }
                    </select>
                </div>
                {
                    loading ?
                        <Loading /> :
                        assignedTopics?.map(item => (
                            <>
                                <details className='p-2 w-full outline outline-1 rounded cursor-pointer '>
                                    <summary className='text-lg flex justify-between items-center '>
                                        <div className='flex w-full justify-between'>
                                            <div className='flex font-semibold  items-center gap-1'>
                                            {item.category_name} <IoIosArrowForward /> {item.subject_name}<IoIosArrowForward /> {item.name}
                                            </div>
                                            <div className='flex items-center gap-1'>
                                            <Chip status={item?.content?.status} />
                                                <p className='text-sm italic'>Updated: {formatAPIDate(item.date_updated)}</p>
                                            </div>
                                        </div>
                                    </summary>
                                    <div className='w-full h-1 my-2 bg-gray-700'></div>
                                    <div className='w-full p-2  text-sm bg-gray-300'>
                                        <span className='font-semibold'>Feedback:</span> <span>{item?.content?.message}</span>
                                    </div>
                                    <div className='p-2 space-y-2  flex flex-col text-md'>
                                        <div className='flex justify-between py-2 items-center'>
                                            <Link to={`/assigned-topics/${item?.content?.id}/`} className='px-4 text-sm py-2 rounded text-gray-100 bg-emerald-600'>
                                                {item?.content?.status == 'DRAFT' ? 'Add Content' : 'Edit Content'}
                                            </Link>
                                        </div>
                                        {
                                            <Editor
                                                disabled
                                                value={item.content.data}
                                                key={item?.id}
                                                apiKey={apiKey}
                                                onInit={(evt, editor) => editorRef.current = editor}
                                                initialValue={item?.cotent?.data}
                                                init={{

                                                    height: 300, // Set the height as needed
                                                    readonly: true, // Make the editor readonly

                                                    menubar: false,
                                                    toolbar: false,
                                                    plugins: [
                                                        'advlist', 'autolink', 'lists', 'link', 'image', 'charmap', 'preview',
                                                        'anchor', 'searchreplace', 'visualblocks', 'code', 'fullscreen',
                                                        'insertdatetime', 'media', 'code', 'help', 'wordcount', 'visualblocks'
                                                    ],
                                                    content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }'
                                                }}
                                            />

                                        }
                                    </div>
                                </details>
                            </>
                        ))
                }
            </div>
        </>

    )
}

export default ViewAssignedTopics