// filepath: e:\Personal\Projects\VLOG_WEBSITE\client\src\Pages\create_blog.tsx
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useSession } from '../context/session';
import { Button } from '@/components/ui/button';

const CreateBlog = () => {
  const navigate = useNavigate();
  const { user, loading } = useSession();
  const [form, setForm] = useState({
    title: '',
    content: '',
    author: '',
    date: '',
    image: null,
  });

  const [submitting, setSubmitting] = useState(false);
  

  const getCurrentDate = () => {
    const date = new Date();
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  useEffect(() => {
    if (!loading && !user) {
      navigate('/login');
    }
  }, [loading, user, navigate]);

  useEffect(() => {
    if (user) {
      setForm((prevForm) => ({
        ...prevForm,
        author: user.username,
        date: getCurrentDate(),
      }));
    }
  }, [user]);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleFileChange = (e) => {
    setForm({
      ...form,
      image: e.target.files[0],
    });
    if (e.target.files[0]) {
      console.log('Image uploaded:', e.target.files[0].name);
      alert('Image uploaded successfully');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    const { title, content, author, date, image } = form;

    if (title === '' || content === '' || author === '' || date === '') {
      alert('Please fill all the details');
      setSubmitting(false);
      return;
    }

    const formData = new FormData();
    formData.append('title', title);
    formData.append('content', content);
    formData.append('author', author);
    formData.append('date', date);
    if (image) {
      formData.append('image', image);
    }

    try {
      const response = await axios.post("/api/create_blog", formData, { withCredentials: true });
      if (response) {
        console.log('Blog created successfully. Navigating...');
        alert('Blog created successfully');
        navigate('/');
      } else {
        console.log('Failed to create blog. Status code:', response.status);
        alert('Failed to create blog. Status code: ' + response.status);
      }
    } catch (error) {
      console.error('Server error:', error);
      alert('Server error. Check console for details.');
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div className='bg-blue-50 min-h-full min-w-auto'>
      <h1 className='text-2xl font-bold text-center pr-2 mt-2'>
        Create Your Own Blog Here
      </h1>
      <div className="flex justify-center items-center">
        <div className="bg-white rounded-lg shadow-md w-200 p-6 m-8">
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="title">Title:</label>
              <input
                className="shadow appearance-none border rounded w-full h-15 font-mono py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="title"
                name="title"
                type="text"
                placeholder="Title"
                value={form.title}
                onChange={handleChange}
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="content">Content:</label>
              <textarea
                className="shadow appearance-none border rounded w-full h-100 font-mono py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="content"
                name="content"
                placeholder="Content"
                value={form.content}
                onChange={handleChange}
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="author">Author:</label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 font-mono text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="author"
                name="author"
                type="text"
                placeholder="Author"
                value={form.author}
                onChange={handleChange}
                disabled
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="date">Date:</label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight font-mono focus:outline-none focus:shadow-outline"
                id="date"
                name="date"
                type="date"
                placeholder="Date"
                value={form.date}
                onChange={handleChange}
                disabled
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-4" htmlFor="image">Image:</label>
              <input
                className="hidden"
                id="image"
                name="image"
                type="file"
                onChange={handleFileChange}
              />
              <label
                htmlFor="image"
                className="hover:brightness-110 hover:animate-pulse font-mono font-bold py-3 px-6 rounded-md bg-gradient-to-r from-blue-500 to-pink-500 text-white ml-10 cursor-pointer"
              >
                Upload Image
              </label>
            </div>
            <div className='flex justify-center items-center pt-5'>
              <Button type="submit" className='w-full' disabled={submitting}>
                {submitting ? (
                  <span className="flex items-center justify-center">
                    <svg className="animate-spin h-5 w-5 mr-2 text-white" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
                    </svg>
                    Creating...
                  </span>
                ) : (
                  "Create Blog"
                )}
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreateBlog;