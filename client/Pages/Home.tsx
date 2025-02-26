import React from "react";
import Bg_vedio from '../vedio/winter-town-buildings.mp4';

const home = () =>{
    return (
        <div>
           <video autoPlay loop muted className="absolute w-[100%] h-[100%] object-cover z-[-1]">
            <source src={Bg_vedio} type="video/mp4" />
            </video> 
            <div className="flex flex-col justify-center h-screen pl-20">
                <h1 className="text-6xl font-bold">
                    Create your own Blog
                </h1>

                <h3 className="text-2xl font-bold mt-2">
                    & Share your experience with us
                </h3>

                
                <button className="border-2 rounded-2xl w-30 p-3 mt-4 font-bold bg-red-800  hover:bg-blue-500">
                    Create Blog
                </button>
                
            </div>
            <div>
                <h1 className=" text-2xl font-bold text-center mt-9 hover:text-gray-800 cursor-default">
                    Welcome! Explore, Discover, and Enjoy: Your journey starts here!
                </h1>
            </div>
        </div>
    )
}

export default home;