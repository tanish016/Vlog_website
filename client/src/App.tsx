import './App.css'
import { BrowserRouter, Routes, Route, } from 'react-router-dom'
import Login from './Pages/login'
import Signup from './Pages/signup'
import HomeLayout from './layout/HomeLayout';
import Create_blog from './layout/BlogCreate';
import Blogs from './layout/Blogs';
import Account from './layout/UserAccount';
import Openblog from './layout/BlogOpened';
import { SessionProvider } from './context/session';

function App() {
  return (
    <div>
      <BrowserRouter>
        <SessionProvider>
          <Routes>
            <Route path="/signup" element={<Signup />} />
            <Route path="/login" element={<Login />} />
            <Route path="/" element={<HomeLayout />} />
            <Route path="/create_blog" element={<Create_blog />} />
            <Route path="/blog" element={<Blogs />} />
            <Route path="/account" element={<Account />} />
            <Route path="/openblog/:id" element={<Openblog />} />
          </Routes>
        </SessionProvider>
      </BrowserRouter>
    </div>
  )
}



export default App;