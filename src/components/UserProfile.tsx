import { AppContext } from '@/context/AppContext';
import React, { useContext } from 'react'

function UserProfile() {
    const context = useContext(AppContext);
    if (!context) return null;
    const { user } = context;
    return (
        <div>
            <div className='flex flex-col p-4 mt-5'>
                <h1>User Profile</h1>
                <div className=''>
                    <img className='rounded-full' src={user?.avatar_url} alt="" />
                </div>
                <p className='sm:text-md font-semibold md:text-xl lg:text-2xl'>{user?.name}</p>
                <p onClick={() => window.open(`${user?.html_url}`, "_blank")} className='text-lg font-medium hover:text-blue-500 cursor-pointer hover:underline'>{user?.login}</p>
                <p className='text-sm '>{user?.bio}</p>
            </div>
        </div>
    )
}

export default UserProfile