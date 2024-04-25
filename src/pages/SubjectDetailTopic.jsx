import React,{useEffect,useRef} from 'react';
import { formatAPIDate } from '../utils/Dates'
import { Link, useParams } from 'react-router-dom'
import { useGET } from '../hooks/useApi'
import {API_URLS} from '../api/constants';
import { useAuth } from '../hooks/useAuth';
import Loading from '../components/Loading';
import { Editor } from '@tinymce/tinymce-react';


const SubjectDetailTopic = () => {
  const { courseid, subjectid ,topicid} = useParams()
  const {isLoading,data}=useGET(`${API_URLS.viewTopics}/${topicid}/`)
  const apiKey = process.env.REACT_APP_TINYMCE_API
  const editorRef = useRef(null);

  const {user}=useAuth()

  const BASE_COURSE_LINK=user ? 'course':'all-courses'


  if(isLoading){
    return <Loading/>
  }

  return (
    <div className='w-full h-full max-h-full flex flex-col items-center p-4 gap-2 overflow-y-scroll'>
    <h2 className='p-3 text-left w-full text-lg font-semibold text-blue-600 flex gap-2'>
    <Link to={`/${BASE_COURSE_LINK}`}>Courses</Link>/<Link to={`/${BASE_COURSE_LINK}/${courseid}/`} >{data?.category_name}</Link>/<Link to={`/${BASE_COURSE_LINK}/${courseid}/${subjectid}/${topicid}`} >{data?.name}</Link>
    </h2>
    <div className='flex flex-wrap w-full gap-4 items-center rounded min-w-md p-4'>
      <h3 className='text-gray-700 text-xl font-bold'>{data?.name}</h3>
    <Editor
                                                disabled
                                                value={data?.content?.data}
                                                key={data?.id}
                                                apiKey={apiKey}
                                                onInit={(evt, editor) => editorRef.current = editor}
                                                initialValue={data?.content?.data}
                                                init={{
                                                    width:'100vw',

                                                    height: '80vh', // Set the height as needed
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
    </div>
    </div>
  )
}

export default SubjectDetailTopic