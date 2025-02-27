import React, { useState } from "react";
import { Link } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Email:", email);
    console.log("Password:", password);
  };

  return (
    <div className="flex justify-center items-center h-screen bg-[url('../images/background.jpg')] bg-cover bg-center bg-no-repeat">

      <div className="bg-gray-300 p-10 rounded-md shadow-2xl border-2 border-gray-300 ">

      <h1 className="text-3xl font-bold text-center pt-6 pb-10 underline cursor-default">
        Login
        </h1>

      <form className="flex flex-col gap-4 items-center p-3"onSubmit={handleSubmit}>

        <label 
          htmlFor="email" 
          className="text-lg font-bold underline">
          Email:
          </label>

        <input 
          type="text" 
          placeholder="Email" 
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="p-2 border-2 rounded-md hover:bg-gray-200 w-100"
        />

        <label 
          htmlFor="password" 
          className="text-lg font-bold underline">
          Password:
          </label>

        <input 
          type="password" 
          placeholder="Password" 
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="p-2 border-2 rounded-md hover:bg-gray-200 w-100"
        />

        <button 
          type="submit"
          className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600"
        >
          Login
        </button>
      </form>

      {/* To signup */}
      <div>
        <p className="text-center pt-2 font-bold">
          To signup: 
          <Link to="/signup" className="hover:text-blue-500 underline">
          Click here
          </Link></p>
      </div>
    </div>
  </div>
  )
};

export default Login;


