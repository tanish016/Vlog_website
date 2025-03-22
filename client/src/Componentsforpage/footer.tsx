import React from "react";

const Footer = () => {
    return (
        <footer className="bg-gray-800 text-white py-6 cursor-default">
            <div className="container mx-auto px-4">
                <div className="flex justify-between items-center">
                    <div>
                        <h1 className="text-2xl font-bold underline m-1">Blog Website</h1>
                        <p className="text-sm font-bold">Share your joinery experience</p>
                    </div>
                    <div className="flex space-x-4">
                        <a href="#" className="hover:text-gray-400">Home</a>
                        <a href="#" className="hover:text-gray-400">About</a>
                        <a href="#" className="hover:text-gray-400">Services</a>
                        <a href="#" className="hover:text-gray-400">Contact</a>
                    </div>
                </div>
                <div>
                    <input type="email" placeholder="Enter your email" className="w-1/4 p-2 mt-4 rounded-md border-2 " />
                    <button className="bg-blue-500 text-white p-2 rounded-md ml-2 hover:bg-blue-400">Subscribe</button>
                    <p className="text-sm mt-2 font-bold">Subscribe to our newsletter to get the latest updates</p>
                    </div>
                <div className="mt-4 text-center">
                    <p>Follow us on:</p>
                    <div className="flex justify-center space-x-4 mt-2">
                        <a href="#" className="hover:text-gray-400">Facebook</a>
                        <a href="#" className="hover:text-gray-400">Twitter</a>
                        <a href="#" className="hover:text-gray-400">Instagram</a>
                        <a href="#" className="hover:text-gray-400">LinkedIn</a>
                    </div>
                </div>
            </div>
        </footer>
    );
}

export default Footer;