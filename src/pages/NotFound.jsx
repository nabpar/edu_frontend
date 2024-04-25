import React from 'react'

const NotFound = () => {
  return (
    <div className='w-full h-screen flex flex-col space-y-2 justify-center items-center'>
        <h1 className='text-5xl text-red-500'>
            Looks like you strayed from the path ;) 
        </h1>
        <h3 className='text-red-400 text-3xl'>404-Path Not Found</h3>
    </div>
  )
}

export default NotFound