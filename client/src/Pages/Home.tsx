import Bg_vedio from '@/assets/winter-town-buildings.mp4';
import image from '@/assets/Japan.jpg';
import { Link } from 'react-router-dom';

const home = () =>{
    const today=new Date();
    const time=today.toLocaleDateString();
    return (
        <div>
           <video autoPlay loop muted className="absolute w-full h-full object-cover z-[-1]">
            <source src={Bg_vedio} type="video/mp4" />
            </video> 
            <div className="flex flex-col justify-center h-screen px-4 md:pl-20">
                <h1 className="text-3xl md:text-6xl font-bold">
                    Create your own Blog
                </h1>

                <h3 className="text-lg md:text-2xl font-bold mt-2">
                    & Share your experience with us
                </h3>

                
                <button className="border-2 rounded-2xl w-full md:w-30 p-3 mt-4 font-bold bg-red-800  hover:bg-blue-500">
                <Link to="/create_blog">
                    Create Blog
                    </Link>
                </button>
                
            </div>
            <div>
                <h1 className="text-lg md:text-2xl font-bold text-center mt-9 hover:text-gray-800 cursor-default underline">
                    Welcome! Explore, Discover, and Enjoy: Your journey starts here!
                </h1>
            </div>

          {/* Featured Post */}
            <div className="border-2 p-4 rounded-lg shadow-lg w-full md:w-1/2 h-auto mx-auto bg-stone-200 mt-5">
                <h1 className="font-bold text-xl md:text-2xl hover:text-gray-600 cursor-default pb-4">
                    Featured Post!
                </h1>
                <div className="flex flex-col md:flex-row">
                <img src={image} alt="featured post" className="w-full md:w-1/2 border-2 rounded-md border-transparent"/>
                <div className="flex md:ml-4 flex-col justify-center hover:text-blue-400 cursor-default">
                <h1 className="text-base md:text-xl font-bold m-2">
                    {time}
                </h1>
                
                <h2 className="text-lg md:text-2xl font-bold">
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
            <h1 className="text-lg md:text-2xl font-bold text-center mt-9 hover:text-gray-800 cursor-default underline m-10">
                Recent Post
                </h1>
          </div>
        </div>
    )
}

export default home;