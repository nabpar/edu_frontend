import React, { useState,useEffect } from 'react'
import { toast } from 'react-toastify'
import { NOTIFICATION_REFRESH_INTERVAL } from '../api/constants'
import Loading from '../components/Loading'
import {API_URLS} from '../api/constants';
import ReactTimeago from 'react-timeago'
import axios from '../api/axios'
import { useGET } from '../hooks/useApi'
import { AiFillDelete } from 'react-icons/ai'
import { useAuth } from '../hooks/useAuth'

const Notifications = () => {


    const {user}=useAuth()
    const [notifications, setNotifications] = useState([])
    const [loading,setLoading]=useState(false)

    useEffect(() => {
      getNotifications();
    
      return () => {
        
      }
    }, [])
    

    function getNotifications() {
        axios.get(API_URLS.notifications, {
            headers: {
                'Authorization': `Bearer ${user?.token?.access}`
            }
        }).then(resp => {
                const data = resp?.data || [];
                setNotifications(data)
        }).catch(err => {
            console.error('Error fetching notifications:', err);
        }).finally(()=>{
            setLoading(false)
        })
    }

    useEffect(() => {
            const timer = setInterval(getNotifications, NOTIFICATION_REFRESH_INTERVAL);
            return () => clearInterval(timer);
    }, []);

    useEffect(() => {
        axios.post(API_URLS.notificationMarkAll, {}, {
            headers: {
                'Authorization': `Bearer ${user?.token?.access}`
            }
        }).then(resp => {
            console.log(resp)
        })
    }, [])






    const handleDeleteRead = () => {
        axios.post(API_URLS.notificationsDelete, {}, {
            headers: {
                'Authorization': `Bearer ${user?.token?.access}`
            }
        }).then(resp => {
            console.log(resp)
            toast.info('All Notifications Cleared')
            getNotifications()
        }).catch(err=>{
            console.log(err)
        })
    }


    if (loading){
        return <Loading/>
    }

    return (
        <div className="container mx-auto p-4">
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold">Notifications</h2>
                <button onClick={handleDeleteRead} className="px-4 py-2 text-white bg-red-500 rounded-md hover:bg-red-600">
                    <AiFillDelete className="w-5 h-5 mr-2 inline-block" />
                    Delete All Read
                </button>
            </div>
            <div className='px-2 pb-10 max-h-screen overflow-auto'>
            <div className="space-y-6">
                {notifications?.map((notification, index) => (
                    <div key={index} className="bg-white shadow-lg rounded-lg overflow-hidden">
                        <div className="px-6 py-4">
                          
                            <p className="text-gray-700 mb-2">{notification?.message}</p>
                            <p className="text-gray-700 text-sm"><ReactTimeago date={notification?.created_at} /></p>
                        </div>
                    </div>
                ))}
            </div>        </div>
            </div>
    )
}

export default Notifications