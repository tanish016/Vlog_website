import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const CreateBlog = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    title: '',
    content: '',
    author: '',
    date: '',
    image: null,
  });

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

  // const handleSubmit = async () => {
  //   const { title, content, author, date } = form;
  //   if (title === '' || content === '' || author === '' || date === '') {
  //     alert('Please fill all the details');
  //     return;
  //   }
  //   try {
  //     console.log('Creating blog...');
  //     const resp = await axios.post("/api/create_blog", form);
  //     if (resp) {
  //       console.log('Blog created successfully. Navigating...');
  //         alert('Blog created successfully');
  //         navigate('/');
  //     } else {
  //       alert('Failed to create blog. Status code: ' + resp);
  //     }
  //   } catch (error){
  //     console.log('Server error:', error);
  //     alert('Server error. Check console for details.');
  //   }
  // };

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent default form submission behavior
    const { title, content, author, date, image } = form;
  
    if (title === '' || content === '' || author === '' || date === '') {
      alert('Please fill all the details');
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
      console.log('Creating blog...');
      const response = await axios.post("/api/create_blog", formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
  
      console.log('Server response:', response);
      if (response.status === 201) {
        console.log('Blog created successfully. Navigating...');
        alert('Blog created successfully');
        console.log('Navigating to home...');
        navigate('/');
      } else {
        console.log('Failed to create blog. Status code:', response.status);
        alert('Failed to create blog. Status code: ' + response.status);
      }
    } catch (error) {
      console.error('Server error:', error);
      alert('Server error. Check console for details.');
    }
  };
  

   const handleform = (e) => {
    e.preventDefault();
  //   // console.log(form);
  //   // const  resp=axios.post("/api/create_blog", form);
  //   // if(resp){
  //   //   alert('Form submitted successfully');
  //   //   navigate('/');
  //   // }
   
  //   // if(form.title != '' || form.content != '' || form.author != '' || form.date != ''){
  //   //   alert('Form submitted successfully');
  //   //   navigate('/');
  //   // }
  //   // else{
  //   //   alert('Form submitted successfully');
  //   //   navigate('/');
  //   // }

   };

  return (
    <div className='bg-blue-50 min-h-full min-w-auto'>
      <h1 className='text-2xl font-bold text-center pr-2 mt-2'>
        Create Your Own Blog Here
      </h1>
      <div className="flex justify-center items-center">
        <div className="bg-white rounded-lg shadow-md w-200 p-6 m-8">
          <form onSubmit={handleform}>
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
                className="hover:brightness-110 hover:animate-pulse font-mono font-bold py-3 px-6 rounded-full bg-gradient-to-r from-blue-500 to-pink-500 text-white ml-10 cursor-pointer"
              >
                Upload Image
              </label>
            </div>
            <div className='flex justify-center items-center pt-5'>
              <button
              onClick={handleSubmit}
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
