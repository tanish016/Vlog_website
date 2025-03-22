import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const OpenBlog = () => {
  const { id } = useParams();
  const [blog, setBlog] = useState(null);

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const response = await axios.get(`/api/blog/${id}`);
        console.log(response.data);
        setBlog(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchBlog();
  }, [id]);

  if (!blog) {
    console.log(blog);
    return <p>Loading...</p>;
    
  }

  return (
    <div className="container mx-auto p-4 cursor-default">
      <h1 className="text-2xl font-bold mb-4 text-center underline">{blog.title}</h1>
      <p className="text-gray-500 mb-2 text-end">Date: {new Date(blog.date).toLocaleDateString()}</p>
      <p className="text-gray-500 mb-2 font-bold underline">Author: {blog.author}</p>
      <p className="text-gray-700 mb-2">{blog.content}</p>
      {blog.imageUrl && (
        <img src={blog.imageUrl} alt={blog.title} className="w-full h-auto rounded" />
      )}
    </div>
  );
};

export default OpenBlog;