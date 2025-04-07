import { AppContext } from '@/context/AppContext';
import React, { useContext } from 'react'

function UserProfile() {
    const context = useContext(AppContext);
    if (!context) return null;
    const { user } = context;
    return (
        <div>
            <div className='flex flex-col p-4'>
                <div className=''>
                    <img className='rounded-full' src={user?.avatar_url} alt="" />
                </div>
                <p className='sm:text-md font-semibold md:text-xl lg:text-2xl'>{user?.name}</p>
                <p className='text-lg font-medium'>{user?.login}</p>
                <p className='text-sm '>{user?.bio}</p>
            </div>
        </div>
    )
}

export default UserProfile