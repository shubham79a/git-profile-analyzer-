import { AppContext } from '@/context/AppContext';
import React, { useContext } from 'react'
import RepoCard from './RepoCard';

function UserAllRepos() {
    const context = useContext(AppContext);
    if (!context) return null;
    const { repos } = context;
    return (
        <div>
            <p className='sm:px-4 mt-4 mb-3 text-2xl font-bold'>All Reprositary</p>
            <div className='overflow-y-auto h-[60vh] mt-3'>
                <div className='mx-auto sm:px-4 py-2 flex flex-col gap-3' >
                    {
                        repos?.slice()?.sort((a, b) => new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime()).map((repo, index) => {
                            if (repo.name && repo.description && repo.html_url && repo.stargazers_count !== undefined && repo.language && repo.forks_count !== undefined) {
                                return (
                                    <div key={index}>
                                        <RepoCard repo={repo} />
                                    </div>
                                )
                            }
                            return null;
                        })
                    }
                </div>
            </div>
        </div>
    )
}

export default UserAllRepos