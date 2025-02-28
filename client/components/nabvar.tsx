import React from 'react';
// import { Link } from 'react-router-dom';
const Navbar = () => {

    return (
        <nav className="bg-white shadow-lg">
            <div className="max-w-6xl mx-auto px-4">
                <div className="flex justify-between items-center h-16">
                    {/* Logo */}
                    <div className="flex-shrink-0text-2xl font-bold text-gray-800">
                            Logo
                    </div>

                    {/* Desktop Menu */}
                    <div className="hidden md:flex items-center space-x-8">
                        <p className="text-gray-600 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium cursor-pointer">
                            Home
                        </p>
                        <p className="text-gray-600 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium cursor-pointer">
                         Blog
                        </p>
                        <p className="text-gray-600 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium cursor-pointer">
                            About
                        </p>
                        <p className="text-gray-600 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium cursor-pointer">
                            Services
                        </p>
                        <p  className="text-gray-600 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium cursor-pointer">
                            Contact
                        </p>
                    </div>

                    
                        
                </div>
                    </div>
        </nav>
    );
};

export default Navbar;
