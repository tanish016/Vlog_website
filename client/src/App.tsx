import React, { useEffect, useState } from 'react'
import './App.css'
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import axios from 'axios';
import Login from '../Pages/login'
import Signup from '../Pages/signup'
import Navbar from '../components/nabvar'
import Home from '../Pages/Home';
import Footer from '../components/footer';
// import Blogs from '../Pages/Blog';

function App() {
  const location = useLocation();
  const hideNavbarAndFooter = location.pathname === '/login' || location.pathname === '/signup';
  const [data, setData] = useState('');

  useEffect(() => {
    axios.get('/api/data')
      .then(response => {
        setData(response.data.message);
      })
      .catch(err => {
        console.error(err);
      });
  }, []);

  return (
    <div>
      {data}
      {!hideNavbarAndFooter && <Navbar />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
      </Routes>
      {!hideNavbarAndFooter && <Footer />}
    </div>
  )
}

function AppWrapper() {
  return (
    <BrowserRouter>
      <App />
    </BrowserRouter>
  );
}

export default AppWrapper;