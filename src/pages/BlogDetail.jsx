import React, { useState,useEffect } from 'react'
import { Link, useParams } from 'react-router-dom';
import { useGET } from '../hooks/useApi';
import {API_URLS} from '../api/constants';
import { IoMdArrowRoundBack } from "react-icons/io";
import { formatAPIDate } from '../utils/Dates';
import axios from '../api/axios';
import { toast } from 'react-toastify';
import Loading from '../components/Loading';

const BlogDetail = () => {

    const { blogid } = useParams()

    const [commentsList,setCommentsList]=useState([])

    const [commentuser, setCommentUser] = useState('')
    const [commentBody, setCommentBody] = useState('')

    const { isLoading, data, isError } = useGET(`${API_URLS.viewBlogs}/${blogid}/`)
    const { isLoading: commentsLoad, data: commentsData, isError: commentError, refetch: reloadComment } = useGET(`${API_URLS.comments}?post=${blogid}`)

    if (isLoading) {
        return <>
            <Loading/>
        </>
    }


    const handleSubmit = () => {
        axios.post(API_URLS.comments, {
            name: commentuser,
            body: commentBody,
            post: blogid
        }).then(resp => {
            reloadComment()
        }).catch(err => {
            toast.error('Unable to process')
        })

    }


    return (
        <div className='justify-center content-center px-4 pl-8 w-full'>
            <div className='mt-4 pr-66 font-bold text-center text-2xl  p-2 px-4 mb-4  text-slate-700'>
                <Link to='/blogs' className='flex gap-2 items-center text-blue-500'><IoMdArrowRoundBack />All Blogs</Link>
            </div>
            {/* our cards */}
            <div className='pb-5 pt-2 px-4 flex flex-col gap-2 w-full'>
                <h1 className='text-2xl font-semibold'>{data?.title}</h1>
                <hr className='h-1 w-full bg-gray-700' />
                <div className='flex justify-between'>
                    <h3>{data?.created_by}</h3>
                    <h3>{formatAPIDate(data?.date_created)}</h3>
                </div>
                <hr className='h-1 w-full bg-gray-700' />
                <div className='flex justify-center py-2'>
                    <img src={data?.image} className='w-full object-cover max-w-md rounded' />
                </div>
                <div>
                    {data?.content}
                </div>
                <div className="w-full my-4 flex flex-col lg:flex-row px-2">
                    <div className="lg:w-1/2 lg:pr-8">
                        <h2 className="text-xl font-semibold mb-4">Leave a Comment</h2>

                        <div className="mb-4">
                            <label htmlFor="commentUser" className="block text-sm font-medium text-gray-600">
                                Display Name
                            </label>
                            <input
                                type="text"
                                id="commentUser"
                                className="mt-1 p-2 w-full border border-gray-300 rounded-md"
                                placeholder="Enter your display name"
                                value={commentuser}
                                onChange={(e) => setCommentUser(e.target.value)}
                            />
                        </div>

                        <div className="mb-4">
                            <label htmlFor="commentBody" className="block text-sm font-medium text-gray-600">
                                Comment
                            </label>
                            <textarea
                                id="commentBody"
                                rows="4"
                                className="mt-1 p-2 w-full border border-gray-300 rounded-md"
                                placeholder="Enter your comment"
                                value={commentBody}
                                onChange={(e) => setCommentBody(e.target.value)}
                            ></textarea>
                        </div>

                        <button
                            className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
                            onClick={handleSubmit}
                        >
                            Submit Comment
                        </button>
                    </div>

                    <div className="lg:w-1/2 lg:pl-8 mt-8 lg:mt-0 border-0 border-l-2 border-gray-700 p-2 max-h-96 overflow-scroll">
                        <h3 className="text-xl font-semibold mb-4">Comments</h3>
                        {commentsData?.map((c, index) => (
                            <div key={c.id} className="mb-4 p-2 outline outline-1 rounded w-full">
                                <p className="font-semibold">{c.name}</p>
                                <p>{c.body}</p>
                                <p className="text-gray-500 text-sm">{formatAPIDate(c.date_added)}</p>
                            </div>))}
                        <button className='mx-auto px-3 py-2 outline outline-1 rounded '>Load Older Comments</button>
                    </div>
                </div>

            </div>
        </div>
    )
}

export default BlogDetail;