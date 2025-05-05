// filepath: e:\Personal\Projects\VLOG_WEBSITE\client\src\Componentsforpage\nabvar.tsx
import { Link, useNavigate } from 'react-router-dom';
import { User, Menu } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useSession } from '../context/session';
import { useState } from 'react';
import { Button } from '@/components/ui/button';

const Navbar = () => {
  const navigate = useNavigate();
  const { user, logout } = useSession();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

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
        <div className="flex justify-between items-center h-16 ">
          {/* Logo */}
          <div className="flex-shrink-0 text-2xl font-bold text-gray-800">
            Logo
          </div>

          {/* Hamburger for mobile */}
          <div className="md:hidden flex items-center">
            <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="focus:outline-none">
              <Menu size={28} />
            </button>
          </div>

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
        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <>
            {/* Overlay */}
            <div className="fixed inset-0 backdrop-blur-sm bg-opacity-40 z-40" onClick={() => setMobileMenuOpen(false)} />
            {/* Popup Menu */}
            <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white shadow-lg rounded-lg p-4 animate-fade-in z-50 max-w-xs w-full mx-auto justify-center items-center">
              <Link to={'/'} onClick={() => setMobileMenuOpen(false)} className="text-gray-600 hover:text-gray-900 px-3 py-2 rounded-md text-base font-medium hover:underline block border-b-2">Home</Link>
              <Link to={'/blog'} onClick={() => setMobileMenuOpen(false)} className="text-gray-600 hover:text-gray-900 px-3 py-2 rounded-md text-base font-medium hover:underline block border-b-2">Blog</Link>
              <Link to={'/create_blog'} onClick={() => setMobileMenuOpen(false)} className="text-gray-600 hover:text-gray-900 px-3 py-2 rounded-md text-base font-medium hover:underline block border-b-2">Create Blog</Link>
              <div className="border-2 rounded-full hover:bg-gray-200 p-1 w-fit mt-2">
                {user ? (
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                     <User size={24} />
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
                ) : (
                  <Button 
                    onClick={() => { setMobileMenuOpen(false); navigate('/login'); }}
                    className="cursor-pointer"
                    variant={'outline'}
                  >
                    Account..
                  </Button>
                )}
              </div>
            </div>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;