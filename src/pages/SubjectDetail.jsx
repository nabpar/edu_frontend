import React, { useEffect, useState } from 'react';
import { formatAPIDate } from '../utils/Dates'
import { Link, useParams } from 'react-router-dom'
import { useGET } from '../hooks/useApi'
import { API_URLS } from '../api/constants';
import { Tab } from '@headlessui/react'
import ReactTimeago from 'react-timeago';
import { useAuth } from '../hooks/useAuth';




function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}

const SubjectDetail = () => {
    const { courseid, subjectid } = useParams()
    const { user } = useAuth()
    const [currentPage, setCurrentPage] = useState(1);
    const { isLoading: loadingTopics, data: topicsData } = useGET(`${API_URLS.viewTopics}?subject=${subjectid}&course=${courseid}&content__status=PUBLISHED&page=${currentPage}`)
    const [topics, setTopics] = useState([]);

    const { isLoading, data, isError, error } = useGET(`${API_URLS.viewSubjects}/${subjectid}/`)

    const handleLoadMore = () => {
        if (topicsData?.next) {
            setCurrentPage(prevPage => prevPage + 1);
        }
    };


    useEffect(() => {
        const respData = topicsData?.results || []

        setTopics(prevCourses => [...prevCourses, ...respData]);

    }, [topicsData]);


    if (isLoading || loadingTopics) {
        return <>
            <h2 className='text-lg text-blue-600'>Loading.....</h2>
        </>
    }



    if (isError) {
        return <>
            <h2 className='text-lg text-red-600'>{error}</h2>
        </>
    }

    const BASE_COURSE_LINK = user ? 'course' : 'all-courses'

    return (
        <div className='w-full h-full max-h-full flex flex-col items-center p-4 gap-2 overflow-y-scroll'>
            <h2 className='p-3 text-left w-full text-lg font-semibold text-blue-600 flex gap-2'>
                <Link to={`/${BASE_COURSE_LINK}`}>Courses</Link>/<Link to={`/${BASE_COURSE_LINK}/${courseid}/`} >{data?.category_name}</Link>/<Link to={`/${BASE_COURSE_LINK}/${courseid}/${subjectid}`} >{data?.name}</Link>
            </h2>
            <div className='flex flex-wrap w-full gap-4 items-center rounded min-w-md p-4'>
                <div className="w-full px-2 sm:px-0">
                    <Tab.Group>
                        <Tab.List className="flex space-x-1 rounded-xl outline-1 outline outline-gray-700 p-1">
                            <Tab
                                key='topics'
                                className={({ selected }) =>
                                    classNames(
                                        'w-full rounded-lg py-2.5 text-sm font-medium leading-5',
                                        'ring-white/60  ring-offset-blue-400 focus:outline-none focus:ring-1',
                                        selected
                                            ? 'bg-white text-blue-600 shadow'
                                            : 'text-gray-800 hover:text-blue-700 bg-gray-300 hover:bg-white/30'
                                    )
                                }
                            >
                                Topics
                            </Tab>

                            <Tab
                                key='syllabus'
                                className={({ selected }) =>
                                    classNames(
                                        'w-full rounded-lg py-2.5 text-sm font-medium leading-5',
                                        'ring-white/60  ring-offset-blue-400 focus:outline-none focus:ring-1',
                                        selected
                                            ? 'bg-white text-blue-600 shadow'
                                            : 'text-gray-800 hover:text-blue-700 bg-gray-300 hover:bg-white/30'
                                    )
                                }
                            >
                                Syllabus
                            </Tab>
                            <Tab
                                key='others'
                                className={({ selected }) =>
                                    classNames(
                                        'w-full rounded-lg py-2.5 text-sm font-medium leading-5',
                                        'ring-white/60  ring-offset-blue-400 focus:outline-none focus:ring-1',
                                        selected
                                            ? 'bg-white text-blue-600 shadow'
                                            : 'text-gray-800 hover:text-blue-700 bg-gray-300 hover:bg-white/30'
                                    )
                                }
                            >
                                Other Files
                            </Tab>

                        </Tab.List>
                        <Tab.Panels className="mt-2">
                            <Tab.Panel
                                key='topic-panel'
                                className={classNames(
                                    'rounded-xl bg-white p-3',
                                    'ring-white/60 ring-offset-1 ring-offset-blue-400 focus:outline-none focus:ring-1 h-[60vh]'
                                )}
                            >
                                {
                                    topicsData?.results?.map(item => (
                                        <Link to={`/${BASE_COURSE_LINK}/${courseid}/${subjectid}/${item.id}/`}>
                                            <div className='flex my-2 p-2 justify-between items-center outline outline-1 cursor-pointer hover:bg-gray-300 transition-colors rounded'>
                                                <h1 className='text-gray-800 font-semibold text-lg'>{item.name}</h1>
                                                <span className='text-sm space-x-1'>
                                                    <span className='italic'>Last Updated: </span>
                                                    <ReactTimeago date={item.date_updated} className='font-semibold' />
                                                </span>

                                            </div>
                                        </Link>
                                    ))
                                }
                                <>
                                    {(data?.next) && (
                                        <div className='flex justify-center'>
                                            <button onClick={handleLoadMore} className='px-4 py-2 text-white bg-blue-500 rounded hover:bg-blue-600'>
                                                Load More
                                            </button>
                                        </div>
                                    )}
                                </>

                            </Tab.Panel>

                            <Tab.Panel
                                key='syllabus-panel'
                                className={classNames(
                                    'rounded-xl bg-white p-3',
                                    'ring-white/60 ring-offset-1 ring-offset-blue-400 focus:outline-none focus:ring-1 h-[60vh]'
                                )}
                            >
                                {
                                    data.syllabus_url ?
                                        <iframe src={data.syllabus_url} loading='lazy' width={"100%"} height={"100%"} />
                                        :
                                        <> <span className='p-4 text-lg font-semibold text-red-500'>Syllabus file not found</span></>
                                }
                            </Tab.Panel>

                            <Tab.Panel
                                key='others-panel'
                                className={classNames(
                                    'rounded-xl bg-white p-3',
                                    'ring-white/60 ring-offset-1 ring-offset-blue-400 focus:outline-none focus:ring-1 h-[60vh]'
                                )}
                            >
                                <ul >
                                    {
                                        data.other_files
                                            ?
                                            data.other_files?.map(
                                                item =>
                                                    <>
                                                        <li className='flex justify-between p-2 gap-4 outline outline-1 outline-gray-500 rounded hover:bg-gray-200'>

                                                            <a href={item.url} target='__blank' className='hover:cursor-pointer text-blue-500 hover:text-blue-800'>
                                                                {item?.filename}
                                                            </a>
                                                            <span>{formatAPIDate(item.created_at)}</span>
                                                        </li>
                                                    </>
                                            )
                                            :
                                            <span className='p-4 text-lg font-semibold text-red-500'>No extra files available</span>
                                    }
                                </ul>
                            </Tab.Panel>

                        </Tab.Panels>

                    </Tab.Group>
                </div>
            </div>
        </div>
    )
}

export default SubjectDetail