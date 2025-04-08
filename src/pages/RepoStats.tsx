import RepoAllCommitsGraph from '@/components/RepoAllCommitsGraph';
import RepoCommitHistory from '@/components/RepoCommitHistory';
import RepoDetails from '@/components/RepoDetails';
import { Button } from '@/components/ui/button';
import { AppContext } from '@/context/AppContext';
import useGetUserRepoDetails from '@/hooks/useGetUserRepoStats';
import React, { useContext, useEffect } from 'react'

export interface RepoDetails {
  // existing properties
  updated_at?: string; // The updated_at property is optional
}

const RepoStats = () => {
  const { repoDetails: fetchedRepoDetails, loading, error, commits } = useGetUserRepoDetails();

  const repoDetails = fetchedRepoDetails
    ? { ...fetchedRepoDetails, updated_at: fetchedRepoDetails?.updated_at || new Date().toISOString() }
    : null;

  const context = useContext(AppContext);
  if (!context) return null;

  console.log(commits);


  return (
    <div className='sm:px-[5%] max-sm:px-3 lg:px-[5%] min-h-[80vh] '>


      <div className='lg:grid grid-cols-4 lg:gap-6'>
        <div className='max-lg:hidden lg:col-span-1 max-lg:w-full'>
          {repoDetails && <RepoDetails repoDetails={repoDetails} />}
        </div>
        <div className='lg:col-span-3 lg:gap-6 max-lg:w-full w-full flex flex-col '>
          <div>
            <RepoAllCommitsGraph commits={commits} />
          </div>
          <div className='max-lg:w-full'>
            <RepoCommitHistory commits={commits} />
          </div>
        </div>

      </div>


    </div>
  )
}

export default RepoStats
