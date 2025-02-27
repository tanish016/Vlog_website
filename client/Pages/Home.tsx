import React from "react";
import Bg_vedio from '../vedio/winter-town-buildings.mp4';
import image from '../Images/Japan.jpg';

const home = () =>{
    const today=new Date();
    const time=today.toLocaleDateString();
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
                <h1 className=" text-2xl font-bold text-center mt-9 hover:text-gray-800 cursor-default underline">
                    Welcome! Explore, Discover, and Enjoy: Your journey starts here!
                </h1>
            </div>

          {/* Featured Post */}
            <div className=" border-2 p-4 rounded-lg shadow-lg w-1/2 h-auto mx-auto bg-stone-200 mt-5">
                <h1 className="font-bold text-2xl hover:text-gray-600 cursor-default pb-4">
                    Featured Post!
                </h1>
                <div className="flex">
                <img src={image} alt="featured post" className="w-1/2 border-2 rounded-md border-transparent"/>
                <div className="flex ml-4 flex-col justify-center hover:text-blue-400 cursor-default">
                <h1 className="text-xl font-bold m-2">
                    {time}
                </h1>
                
                <h2 className="text-2xl font-bold">
                    Best Hikes in Japan
                </h2>
                
                <p className="font-extralight m-2">
                Chureito Pagoda, located in Fujiyoshida, offers one of Japan's most iconic views, with its five-story structure set against the stunning backdrop of Mount Fuji, especially during cherry blossom season and autumn foliage.
                </p>
                </div>
                </div>
            </div>

          {/*All Post in a grid*/}
          <div>
            <h1 className="text-2xl font-bold text-center mt-9 hover:text-gray-800 cursor-default">
                All Post 
                </h1>
          </div>
        </div>
    )
}

export default home;