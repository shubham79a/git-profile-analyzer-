import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { AppContext } from '@/context/AppContext'
import React, { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom'

const Home = () => {

  const context = useContext(AppContext);
  if (!context) return null;
  const { username, setUsername } = context;

  const navigate = useNavigate();

  return (
    <div>

      <div className='mx-auto mt-10 lg:max-w-6xl md:max-w-3xl p-4'>
        <div className='flex flex-col justify-between  gap-8 items-end'>
          {/* <Label>Accept terms and conditions</Label> */}
          <Input placeholder='Write your github profile' className='w-full '
            onChange={(e) => setUsername(e.target.value)}
            value={username}
          />
          <Button onClick={() => navigate(`/user/${username}`)} className=''>Search</Button>
        </div>
      </div>

    </div >
  )
}

export default Home
