import React, { useEffect, useRef, useState } from 'react'
import axios from '../api/axios'
import {API_URLS} from '../api/constants'
import { useAuth } from '../hooks/useAuth'
import { IoMdNotifications } from "react-icons/io";
import { formatAPIDate } from '../utils/Dates';
import ReactTimeago from 'react-timeago';
import { Link,useLocation } from 'react-router-dom';
import {NOTIFICATION_REFRESH_INTERVAL} from '../api/constants'
import NotificationSound from '../assets/notify.wav';

const NotifyBadge = () => {
    const [notifyCount, setNotifyCount] = useState(0)
    const [notifyData, setNotifyData] = useState([])
    const [openNotifyBar,setOpenNotifyBar]=useState(false) 
    const { user } = useAuth()
    const audioPlayer=useRef(null)
    const location = useLocation();

    const getNotifications = () => {
        axios.get(API_URLS.notificationSummary, {
            headers: {
                'Authorization': `Bearer ${user?.token?.access}`
            }
        }).then(resp => {
            const data = resp.data
            const newUnreadCount = data?.unread_notifications;
            if (newUnreadCount > notifyCount) {
                audioPlayer.current?.play();
            }
            setNotifyCount(data?.unread_notifications)
            setNotifyData(data?.latest_notifications)
        })
    }

    useEffect(() => {
        const timer = setInterval(getNotifications, NOTIFICATION_REFRESH_INTERVAL);
        return () => clearInterval(timer);
    }, []);

    const handleDropdownClick = () => {
        // Handle click to show dropdown or perform other actions
        setOpenNotifyBar(!openNotifyBar)
        if (!openNotifyBar){
            axios.post(API_URLS.notificationMarkAll,{},{
                headers:{
                    'Authorization': `Bearer ${user?.token?.access}`
                }
            }).then(resp=>{
                //
            })
        }
    };

    useEffect(() => {
      
        setOpenNotifyBar(false)
      return () => {
        
      }
    }, [location])
    


    return (
        <div className="relative cursor-pointer text-gray-600">
            <div onClick={handleDropdownClick}>
                <IoMdNotifications className='text-4xl' />
                {notifyCount > 0 && (
                    <>
                    <span className="absolute top-0 right-0 inline-block bg-red-500 text-white rounded-full px-1 py-0 text-xs">{notifyCount}</span>
                    <audio ref={audioPlayer} src={NotificationSound} />
                    </>
                )}
            </div>
            {/* Dropdown content */}
            {openNotifyBar && (
                <div className="absolute right-0 mt-2 z-50 w-64 max-h-64 shadow-xl bg-white border border-gray-200 rounded px-2 pb-3  overflow-auto">
                    <div className='py-2 bg-white w-full sticky top-0'>
                    <h3 className="text-lg font-bold ">Notifications</h3>
                    </div>
                    {notifyData.map(notification => (
                        <div key={notification.id} className={`mb-2 p-2 rounded ${notification.is_read ? 'bg-gray-300':'bg-sky-200'} `}>
                            <p className="text-sm">{notification.message}</p>
                            {/* <p className="text-xs text-gray-500">{formatAPIDate(notification.created_at)}</p> */}
                            <ReactTimeago  date={notification.created_at}/>
                        </div>
                    ))}
                    {
                        notifyData.length > 0 &&
                        <>
                        <div className='w-full h-1 bg-gray-500 my-2'/>
                        <div className='px-1 py-2 w-full flex justify-center text-center'>
                        <Link to='/notifications' className='px-3 py-2 w-full outline outline-1 rounded'>See All</Link>
                        </div>
                        </>
                    }
                </div>
            )}
        </div>
    )
}

export default NotifyBadge