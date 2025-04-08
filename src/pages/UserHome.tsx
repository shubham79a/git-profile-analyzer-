import { Button } from '@/components/ui/button';
import UserAllCommitsGraph from '@/components/UserAllCommitsGraph';
import UserAllRepos from '@/components/UserAllRepos';
import UserProfile from '@/components/UserProfile';
import { AppContext } from '@/context/AppContext';
import useGetUserAllCommits from '@/hooks/useGetUserAllCommits';
import useGetAllRepos from '@/hooks/useGetUserAllRepos';
import useGetUserDetails from '@/hooks/useGetUserDetails';
import React, { useContext, useEffect } from 'react'
import { useParams } from 'react-router-dom';

const UserHome = () => {
  useGetUserDetails();
  useGetAllRepos();
  // const context = useContext(AppContext);
  // if (!context) return null;
  // const { user } = context;

  useGetUserAllCommits()

  const context = useContext(AppContext);
  if (!context) return null;
  const { user, repos } = context;



  return (
    <div className='sm:px-[5%] max-sm:px-3 lg:px-[5%] '>

      {/* <div className='mx-auto mt-5 lg:max-w-6xl md:max-w-3xl p-4' >
      {
        repos.map((repo, index) => {
          return (
            <div key={index}>
              {repo.full_name.split("/")[1]}
            </div>
          )
        })
      }
    </div> */}

      <div className='md:grid grid-cols-4'>
        <div className='max-md:hidden md:col-span-1 '>
          <UserProfile />
        </div>
        <div className='md:col-span-3 max-md:w-full w-full flex flex-col '>
          <div>
            <UserAllCommitsGraph />
          </div>
          <div>
            <UserAllRepos />
          </div>
        </div>

      </div>
    </div>
  )
}

export default UserHome
