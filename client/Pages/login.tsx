import React, { useState } from "react";
// import {useState} from "react";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Email:", email);
    console.log("Password:", password);
  };

  return (
    <div className="flex justify-center items-center h-screen w-full bg-[url('../images/background.jpg')] bg-cover bg-center bg-no-repeat">

      <div className="bg-white/70 backdrop-blur-sm p-9 rounded-3xl shadow-md h-auto w-100">

      <h1 className="text-3xl font-bold mb-6 text-center">
        Login
        </h1>

      <form className="flex flex-col space-y-8" onSubmit={handleSubmit}>

        <input 
          type="text" 
          placeholder="Email" 
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <input 
          type="password" 
          placeholder="Password" 
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        
        <button 
          type="submit"
          className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition-colors"
        >
          Login
        </button>
      </form>
    </div>
  </div>
  )
};

export default Login;


