import React from 'react';
import { ModeToggle } from './theme-btn';
import { Link } from 'react-router-dom';
import { Menu, User, User2Icon, UserSquare, UserSquareIcon } from 'lucide-react';

const Navbar = () => {
  return (
    <nav className=" p-4 bg-background/50 sticky top-0 backdrop-blur border-b z-10">

      <div className="container mx-auto flex justify-between items-center ">
        <Link to="/">
          <div className="text-lg font-bold">
            DevTrace
          </div>
        </Link>
        <div className='flex items-center gap-3'>
          {/* <User /> */}
          <ModeToggle />
          <Menu className='sm:hidden' />
        </div>
      </div>


    </nav>
  );
}

export default Navbar;