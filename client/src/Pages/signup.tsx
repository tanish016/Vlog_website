import React, {useState} from "react";
import { Link , useNavigate} from "react-router-dom";
import axios from "axios";
import  useAuthRedirect  from '../hooks/userAuth.tsx';


const Signup = () => {
  const Navigate = useNavigate();
  useAuthRedirect();
  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
  });
  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handelSignUp = async () => {
    const { name, email, password } = form;
    if (!name || !email || !password) {
      alert("you must filled all details");
      return;
    }
    try {
      const resp = await axios.post("/api/signup", form);
      if (resp.status === 201) {
        alert(`user created successfully`);
        Navigate("/login");
      }
     else if(resp.status === 400 && resp.data.message === "User already exist"){
        alert("User already exist");
      }
    } catch (error) {
      alert("server error");
      console.log(error);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
  };

  return (
    <div className="bg-gray-100 h-screen flex flex-col items-center justify-center">

    <div className="bg-white p-10 rounded-md shadow-2xl border-2 border-gray-300">

      <h1 className="text-3xl font-bold text-center hover:text-blue-500 underline pt-6 pb-10">
        Signup-page
        </h1>

      <form className="flex flex-col gap-4 items-center p-3" onSubmit={handleSubmit}>

        <label 
              htmlFor="name" 
              className="text-lg font-bold underline">
          Name:
          </label>

        <input 
              type="text" 
              placeholder="Name" 
              name="name"
              id="name" 
              value={form.name}
              onChange={handleChange}
              className="hover:border-2 p-2 border-b-2 hover:rounded-md w-100" 
        />

        <label 
              htmlFor="email" 
              className="text-lg font-bold underline">
          Email:
          </label>

        <input 
              type="email" 
              name="email"
              placeholder="Email"
              value={form.email}
              onChange={handleChange}
              id="email" 
              className="hover:border-2 p-2 hover:rounded-md border-b-2 w-100" />

        <label 
              htmlFor="password" 
              className="text-lg font-bold underline">
          Password:
          </label>

        <input 
              type="password" 
              name="password"
              placeholder="Password" 
              id="password" 
              value={form.password}
              onChange={handleChange}
              className="hover:border-2 p-2 hover:rounded-md border-b-2 w-100" 
        />

        <button 
               type="submit" 
               onClick={handelSignUp}
               className="hover:bg-blue-600 hover:text-white border-3 rounded-md p-2 w-30">
          Signup
          </button>

      </form>

      {/* To login */}
      <div>

        <p className="text-center pt-2 font-bold">
          To login: 
          <Link to="/login" className="hover:text-blue-500 underline">
          Click here
          </Link></p>

      </div>

    </div>
  </div>
  )
};

export default Signup;