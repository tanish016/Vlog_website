import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Login from '../Pages/login'
import Signup from '../Pages/signup'
// import Navbar from '../components/nabvar'
// import Home from '../Pages/Home';
import Footer from '../components/footer';
function App() {

  return (
    <>
      <div>
        {/* <Navbar />  */}
        {/* <Home/> */}
        <Footer/>
      <BrowserRouter>
      <Routes>
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </BrowserRouter>
    
      </div>
    </>
  )
}

export default App
