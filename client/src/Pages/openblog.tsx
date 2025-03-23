import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Button } from "@/components/ui/button";

const OpenBlog = () => {
  const { id } = useParams();
  const [blog, setBlog] = useState(null);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();
  

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

  useEffect(()=>{
    const fetchUser = async () =>{
      try{
        const response = await axios.get('/api/user', {withCredentials: true});
        setUser(response.data);
      }catch(error){
        console.error(error);
      }
    }
    fetchUser();
  })

  const handleDelete = async () => {
    try {
      await axios.delete(`/api/blog/${id}`, {withCredentials: true});
      alert('Blog deleted successfully');
      navigate('/blog');
    } catch (error) {
      console.error(error);
      alert('Failed to delete blog');
    }
  }


  if (!blog) {
    console.log(blog);
    return <p>Loading...</p>;
    
  }

  return (
    <div className="container mx-auto p-4 cursor-default">
      <Card>
        <CardHeader>
          <CardTitle>{blog.title}</CardTitle>
          <CardDescription>Author: {blog.author}</CardDescription>
        </CardHeader>
        <CardContent>
          {blog.content}
         {blog.imageUrl && (
        <img src={blog.imageUrl} alt={blog.title} className="w-full h-auto rounded" />
      )}
          </CardContent>
        <CardFooter>{new Date(blog.date).toLocaleDateString()}</CardFooter>
        {user && user.id === blog.userId && (
        <Button onClick={handleDelete} className="w-1/9 border-2 shadow-2xl" variant="outline">Delete</Button>
      )}
      </Card>
    </div>
  );
};

export default OpenBlog;