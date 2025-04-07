import { AppContext } from '@/context/AppContext';
import React, { useContext } from 'react'

function UserAllRepos() {
    const context = useContext(AppContext);
    if (!context) return null;
    const { user, repos } = context;

    return (
        <div>
            <div className='overflow-y-auto h-[30vh]'>
                <div className='mx-auto mt-5 lg:max-w-6xl md:max-w-3xl p-4' >
                    {
                        repos.map((repo, index) => {
                            return (
                                <div key={index}>
                                    {repo.full_name.split("/")[1]}
                                </div>
                            )
                        })
                    }
                </div>
            </div>
        </div>
    )
}

export default UserAllRepos