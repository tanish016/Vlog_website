import React from 'react';
import { Link } from 'react-router-dom';
import {User} from 'lucide-react';
const Navbar = () => {

    return (
        <nav className="bg-white shadow-lg">
            <div className="max-w-8xl mx-auto px-4">
                <div className="flex justify-around items-center h-16 ">
                    {/* Logo */}
                    <div className="flex-shrink-0text-2xl font-bold text-gray-800">
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
                        <div className=" border-2 rounded-full hover:bg-gray-200 p-1">
                            <Link to={'/account'}>
                        <User size={28} />
                        </Link>
                    </div>
                    </div>
                        
                </div>
                    </div>
        </nav>
    );
};

export default Navbar;
