import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { MenuIcon, Search, User2Icon } from "lucide-react";
import { ModeToggle } from "./theme-btn";
import {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from "./ui/sheet";
import { AppContext } from "@/context/AppContext";
import { Button } from "./ui/button";
import { useTheme } from "next-themes";

const Navbar = () => {
  const context = useContext(AppContext);
  if (!context) return null;
  const { user, repos } = context as { user: { login?: string; avatar_url?: string; name?: string; html_url?: string; bio?: string } | null; repos: any };
  const navigate = useNavigate()

  const handleLogoutUser = () => {
    context.clearUser()
    navigate("/")
  }

  const { theme } = useTheme();
  const isDark = theme === 'dark';

  return (
    <nav className={`py-2 bg-background/50 sticky top-0 backdrop-blur border-b z-10 sm:px-[5%] max-sm:px-3 lg:px-[5%]    `}>
      <div className="container mx-auto flex justify-between items-center  ">
        {/* <Link to={`${user ? `/${user?.login}}` : "/"}`>
          <div className="text-lg font-bold">DevTrace</div>
        </Link> */}
        <Link to={`${user?.login ? `/user/${user?.login}` : "/"}`}>
          <div className="text-lg font-bold">DevTrace</div>
        </Link>


        <div className="flex items-center gap-3">

          <div className="flex  gap-3">
            {
              user &&
              <Button variant={"outline"} onClick={handleLogoutUser}><Search /></Button>
            }
            <ModeToggle />
          </div>


          <div className="sm:hidden flex gap-3 items-center">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant={"outline"}>
                  <MenuIcon className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right">
                <SheetHeader>
                  <SheetTitle className="font-bold mt-2">DevTrace</SheetTitle>
                  <SheetDescription>
                    <div className='flex flex-col p-4 mt-3'>
                      <div className=''>
                        <img className='rounded-full' src={user?.avatar_url} alt="" />
                      </div>
                      <p className='text-xl font-bold '>{user?.name}</p>
                      <p onClick={() => window.open(`${user?.html_url}`, "_blank")} className='text-lg font-medium hover:text-blue-500 cursor-pointer hover:underline'>{user?.login}</p>
                      <p className='text-sm '>{user?.bio}</p>
                    </div>
                  </SheetDescription>
                </SheetHeader>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
