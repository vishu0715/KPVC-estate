// eslint-disable-next-line no-unused-vars
import React from 'react'
import {useSelector} from 'react-redux'

export default function Profile() {
  const {currentUser} = useSelector(state => state.user);
  return (
    <div className='p-3 max-w-lg mx-auto'>
      <h1 className='text-3xl font-semibold text-center my-7'>Profile</h1>
      <form className='flex flex-col gap-4'>
        <img src={currentUser.avatar} alt="profile" 
        className='w-26 h-26 object-cover rounded-full cursor-pointer self-center mt-2'/>
        <input type="text" placeholder="Username" id='username' className='border p-3 rounded-lg'/>
        <input type="email" placeholder="email" id='email' className='border p-3 rounded-lg'/>
        <input type="password" placeholder="password" id='password' className='border p-3 rounded-lg'/>
        <button className='bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80'>update</button>

      </form>
      <div className='flex justify-between mt-5'>
        <span className='text-red-700 cursor-pointer'>Delete account</span>
        <span className='text-red-700 cursor-pointer'>Sign out</span>
      </div>
    </div>
  )
}
