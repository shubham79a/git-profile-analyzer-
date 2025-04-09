import { AppContext } from '@/context/AppContext';
import React, { useContext } from 'react'

interface User {
    avatar_url: string;
    name: string;
    html_url: string;
    login: string;
    bio: string;
}

function UserProfile() {
    const context = useContext(AppContext) as { user: User } | null;
    if (!context) return null;
    const { user } = context;
    return (
        <div>
            <div className='flex flex-col p-4 mt-5'>
                <h1 className='text-left pl-2 mb-6 text-2xl font-bold'>User Profile</h1>
                <div className=''>
                    <img className='rounded-full' src={user?.avatar_url} alt="" />
                </div>
                <p className='sm:text-md font-semibold md:text-xl lg:text-2xl pt-3 '>{user?.name}</p>
                <p onClick={() => window.open(`${user?.html_url}`, "_blank")} className='text-lg font-medium hover:text-violet-400 cursor-pointer hover:underline'>{user?.login}</p>
                <p className='text-sm mt-3'>{user?.bio}</p>
            </div>
        </div>
    )
}

export default UserProfile