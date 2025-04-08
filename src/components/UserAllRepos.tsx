import { AppContext } from '@/context/AppContext';
import React, { useContext } from 'react';
// import { AppContextType } from '@/context/AppContext'; // Ensure this path is correct
import RepoCard from './RepoCard';

type Repo = {
    name: string;
    description: string;
    html_url: string;
    stargazers_count: number;
    language: string;
    forks_count: number;
    updated_at: string;
};

interface Props {
    repo: Repo;
}

const UserAllRepos: React.FC = () => {
    const context = useContext(AppContext) as AppContextType;
    if (!context) return null;

    const { repos } = context;

    const sortedRepos: Repo[] = repos
        ?.slice()
        .sort((a: Repo, b: Repo) => new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime());

    return (
        <div>
            <p className='sm:px-4 mt-4 mb-3 text-2xl font-bold'>All Repositories</p>
            <div className='overflow-y-auto h-[60vh] mt-3'>
                <div className='mx-auto sm:px-4 py-2 flex flex-col gap-3'>
                    {sortedRepos?.map((repo, index) => (
                        <RepoCard key={`${repo.name}-${index}`} repo={repo} />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default UserAllRepos;
