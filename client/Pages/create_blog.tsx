import React, { useState } from 'react';
import axios from 'axios';

const CreateBlog = () => {
  const [form, setForm] = useState({
    title: '',
    content: '',
    author: '',
    date: '',
    image: null,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prevForm) => ({
      ...prevForm,
      [name]: value,
    }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setForm((prevForm) => ({
      ...prevForm,
      image: file,
    }));
    if (file) {
      alert('Image uploaded successfully');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('title', form.title);
    formData.append('content', form.content);
    formData.append('author', form.author);
    formData.append('date', form.date);
    formData.append('image', form.image);

    try {
      const response = await axios.post('/api/create_blog', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      if (response.data) {
        alert('Blog created successfully');
      }
    } catch (error) {
      alert('Server error');
      console.log(error);
    }
  };

  return (
    <div className=' bg-blue-50 min-h-full min-w-auto'>
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
              className="hover:brightness-110 hover:animate-pulse font-mono font-bold py-3 px-6 rounded-full bg-gradient-to-r from-blue-500 to-pink-500 text-white ml-10">
              Upload Image
            </label>

          </div>
          <div className='flex justify-center items-center pt-5'>
          <button
            className="relative rounded-2xl bg-blue-500 px-4 py-2 font-serif font-bold text-white transition-colors duration-300 ease-linear before:absolute before:right-1/2 before:top-1/2 before:-z-[1] before:h-3/4 before:w-2/3 before:origin-bottom-left before:-translate-y-1/2 before:translate-x-1/2 before:animate-ping before:rounded-full before:bg-blue-500 hover:bg-blue-700 hover:before:bg-blue-700"
            type="submit"
          >
            Create Blog
          </button>
          </div>
        </form>
      </div>
    </div>
    </div>
  );
};

export default CreateBlog;