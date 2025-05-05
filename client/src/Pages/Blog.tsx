import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Heart, Share2, MessageSquare } from 'lucide-react';

const Blogs = () => {
  const [blogs, setBlogs] = useState([]);
  const navigate = useNavigate();
  const [likeCount, setLikeCount] = useState(0);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await axios.get('/api/blogs');
        console.log(response.data);
        setBlogs(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchBlogs();
  }, []);

  const truncateContent = (content, wordLimit) => {
    const words = content.split(' ');
    if (words.length > wordLimit) {
      return words.slice(0, wordLimit).join(' ') + '...';
    }
    return content;
  };

  const handleBlogClick = (id) => {
    navigate(`/openblog/${id}`);
  };

  return (
    <div className="container mx-auto p-4 cursor-default">
      <h1 className="text-2xl font-bold mb-4 text-center underline">All Blogs</h1>
      {blogs.length === 0 ? (
        <p>No blogs available</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {blogs.map((blog) => (
            <div
              key={blog._id}
              className="bg-white p-4 rounded shadow-md hover:shadow-2xl hover:transition hover:duration-500 cursor-pointer"
              onClick={() => handleBlogClick(blog._id)}
            >
              <p className="text-gray-500 mb-2 text-end">Date: {new Date(blog.date).toLocaleDateString()}</p>
              <h2 className="text-xl font-bold mb-2">{blog.title}</h2>
              <p className="text-gray-500 mb-2 font-bold underline">Author: {blog.author}</p>
              <p className="text-gray-700 mb-2 hover:text-blue-500">{truncateContent(blog.content, 20)}</p>
              {blog.image ? (
                <img src={blog.image} alt={blog.title} className="w-full h-auto rounded mb-3" />
              ) : (
                <p className="text-gray-500 mb-3 font-extrabold">Caution: No image available</p>
              )}
              <div className="flex gap-2 justify-around border-2 p-2 pointer-events-none relative group">

                <span className="absolute -top-8 left-1/2 -translate-x-1/2 bg-gray-800 text-white text-xs rounded px-3 py-1 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-10">
                  This is not in use
                </span>
                
                <div className="flex gap-1 ">
                  <Heart onClick={e => { e.stopPropagation(); setLikeCount(likeCount + 1); }} className="cursor-pointer" />
                  <span>{likeCount}</span>
                </div>

                <div>
                  <MessageSquare />
                </div>

                <div>
                  <Share2 />
                </div>

              </div>

            </div>

          ))}
        </div>
      )}
    </div>
  );
};

export default Blogs;