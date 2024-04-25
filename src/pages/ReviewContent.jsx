import React, { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { useGET } from '../hooks/useApi'
import {API_URLS} from '../api/constants';
import { useAuth } from '../hooks/useAuth'
import Loading from '../components/Loading'
import { formatAPIDate } from '../utils/Dates'
import { IoIosArrowForward } from "react-icons/io";
import { Tab } from '@headlessui/react'
import { Editor } from '@tinymce/tinymce-react';
import axios from '../api/axios'
import Chip from '../components/Chip'
import { toast } from 'react-toastify';



const STATUS = [
    'ALL',
    // 'DRAFT',
    'REVIEW',
    'REJECTED',
    'PUBLISHED',
]

const ReviewContent = () => {

    const { user } = useAuth();
    const apiKey = process.env.REACT_APP_TINYMCE_API
    const editorRef = useRef(null);
    const feedbackRef=useRef(null);

    const [assignedTopics, setassignedTopics] = useState([])
    const [selectStatus, setSelectedStatus] = useState('REVIEW')
    const [editorData,setEditorData]=useState([])
    const [loading, setLoading] = useState(false)


    const { data: allData, isLoading, refetch } = useGET(`${API_URLS.viewTopics}`, {
        'Authorization': `Bearer ${user.token.access}`
    })
    // setassignedTopics(allData)


    useEffect(() => {
        if (!isLoading && allData) {
            setassignedTopics(allData?.results);
            setEditorData(allData?.results.map(item => ({
                id: item.content?.id,
                content: item.content?.data
            })));
        }
    }, [allData, isLoading]);

    const handleStatusChange = (e) => {
        const status = e.target.value;
        setSelectedStatus(selectStatus)

        setLoading(true)
        if (status == 'ALL') {
            axios.get(`${API_URLS.viewTopics}`, {
                headers: {
                    'Authorization': `Bearer ${user.token.access}`
                }
            }).then(resp => {
                setassignedTopics(resp?.data?.results)

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
                setassignedTopics(resp?.data?.results)

            }).catch(err => {
                console.log(err)
            }).finally(() => {
                setLoading(false)
            })
        }
    }

    const handleUpdatePublish = (topicid) => {
        if (window.confirm('Are you sure?')) {
            const content = editorData.find(data => data.id === topicid)?.content || "<p></p>";
            console.log('TopicId',topicid,content)
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

    // const toggleRejectUpdate = () => {
    //     setIsrejectUpdate(!isrejectUpdate)
    // }
    const handleUpdateReject = (topicid) => {
        const message=window.prompt("Why was the content rejected ?", '')
        if (window.confirm('Are you sure?')) {
            const content = editorData.find(data => data.id === topicid)?.content || "<p></p>";
            console.log('TopicId-Reject',topicid,content)
            axios.put(`${API_URLS.topicContents}/${topicid}/`, {
                content: content,
                status: 'REJECTED',
                // status_message: feedbackRef.current.value
                status_message: message
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

    const handleEditorChange = (id, newContent) => {
        setEditorData(prevItems => {
          return prevItems.map(item => {
            if (item.id === id) {
              return { ...item, content: newContent };
            }
            return item;
          });
        });
      };


    if (isLoading) {
        return <Loading />
    }

    return (
        <>
            <div className="container mx-auto p-4 overflow-auto">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-bold">Review Topics</h2>
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
                                        <div className='flex font-semibold  items-center gap-1'>
                                            {item.category_name} <IoIosArrowForward /> {item.subject_name}<IoIosArrowForward /> {item.name}
                                        </div>
                                        <div className='flex items-center gap-1'>
                                            <Chip status={item?.content?.status} />
                                            <p className='text-sm italic'>Last change on {formatAPIDate(item.date_updated)}</p>
                                        </div>
                                    </summary>
                                    <div className='w-full h-1 my-2 bg-gray-700'></div>
                                    <div className='p-2 space-y-2  flex flex-col text-md'>
                                        <h3>Review Content</h3>
                                        {
                                            <Editor
                                                disabled
                                                value={editorData.find(data => data.id === item.content?.id)?.content || ''}
                                                onEditorChange={(newContent, editor) => handleEditorChange(item.id, newContent)}
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
                                        <div className='h-1 w-full bg-gray-700' />
                                        <div className='flex justify-between py-2 items-center'>
                                            <div className='flex gap-2 text-sm'>
                                                <button onClick={()=>handleUpdatePublish(item?.content?.id)} className='px-3 ml-2 py-2 bg-green-600 hover:bg-green-500 text-gray-200 rounded font-[500]'>Publish</button>
                                                <button onClick={()=>handleUpdateReject(item?.content?.id)} className='px-3 ml-2 py-2 bg-red-600 hover:bg-red-500 text-gray-200 rounded font-[500]'>Reject</button>
                                                {/* {isrejectUpdate && <>
                                                    <input type='text' ref={feedbackRef} className='p-2 transition-all outline-1 rounded' placeholder='Rejection feeback message' />
                                                </>
                                                }
                                                {!isrejectUpdate && <button onClick={toggleRejectUpdate} className='px-3 py-2 bg-amber-600 hover:bg-amber-500 text-gray-200 rounded font-[500]'>Reject</button>} */}
                                            </div>
                                            <div>
                                            </div>
                                            <Link to={`/review-content/${item?.content?.id}/`} className='px-4 text-sm py-2 rounded text-gray-100 bg-emerald-600'>
                                                Edit Content
                                            </Link>
                                        </div>

                                    </div>
                                </details>
                            </>
                        ))
                }
            </div>
        </>

    )
}

export default ReviewContent