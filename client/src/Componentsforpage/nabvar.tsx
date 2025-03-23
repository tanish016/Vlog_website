// filepath: e:\Personal\Projects\VLOG_WEBSITE\client\src\Componentsforpage\nabvar.tsx
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { User } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useSession } from '../context/session';

const Navbar = () => {
  const navigate = useNavigate();
  const { user, loading, logout } = useSession();

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/');
    } catch (error) {
      console.error(error);
    }
  }


  return (
    <nav className="bg-white shadow-lg">
      <div className="max-w-8xl mx-auto px-4">
        <div className="flex justify-around items-center h-16 ">
          {/* Logo */}
          <div className="flex-shrink-0 text-2xl font-bold text-gray-800">
            Logo
          </div>

          <div className='flex-grow'></div>
          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-9">
            <p className="text-gray-600 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium cursor-pointer hover:underline">
              <Link to={'/'}>Home</Link>
            </p>
            <p className="text-gray-600 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium cursor-pointer hover:underline">
              <Link to={'/blog'}>Blog</Link>
            </p>
            <p className="text-gray-600 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium cursor-pointer hover:underline">
              <Link to={'/create_blog'}>
                Create Blog
              </Link>
            </p>
            <input type="text" placeholder="Search" className="border-2 border-gray-300 p-1 rounded-md w-[230px]" />
            <div className="border-2 rounded-full hover:bg-gray-200 p-1">
                {user?(
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <User size={28} />
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuLabel>My Account</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <Link to={'/account'}>
                    <DropdownMenuItem>
                      Account
                    </DropdownMenuItem>
                  </Link>
                    <DropdownMenuItem onClick={handleLogout}>
                      Logout
                    </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
              ):(
                <button 
            onClick={() => navigate('/login')}
            className="cursor-pointer"
          >
            <User size={28} />
          </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;