import { Button } from '@/components/ui/button';
import UserAllCommitsGraph from '@/components/UserAllCommitsGraph';
import UserAllRepos from '@/components/UserAllRepos';
import UserProfile from '@/components/UserProfile';
import { AppContext } from '@/context/AppContext';
import useGetAllRepos from '@/hooks/useGetUserAllRepos';
import useGetUserDetails from '@/hooks/useGetUserDetails';
import React, { useContext, useEffect } from 'react'

const UserHome = () => {
  useGetUserDetails();
  useGetAllRepos();

  const context = useContext(AppContext);
  if (!context) return null;
  const { user, repos } = context;

  console.log(user);



  const sdsf = () => {
    console.log(user)
  }


  return (
    <div className='sm:px-[5%] max-sm:px-5 lg:px-[8%] '>

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

      <div className='sm:grid grid-cols-4'>
        <div className='max-sm:hidden sm:col-span-1 '>
          <UserProfile />
        </div>
        <div className='sm:col-span-3 max-sm:w-full w-full flex flex-col gap-10'>
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
