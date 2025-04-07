import { AppContext } from '@/context/AppContext';
import React, { useContext } from 'react'
import RepoCard from './RepoCard';

function UserAllRepos() {
    const context = useContext(AppContext);
    if (!context) return null;
    const { user, repos } = context;
    return (
        <div>
            <div className='overflow-y-auto h-[50vh] mt-3'>
                <div className='mx-auto px-4 py-2 flex flex-col gap-3' >
                    {
                        repos.map((repo, index) => {
                            return (
                                <div key={index}>
                                    <RepoCard repo={repo} />    
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