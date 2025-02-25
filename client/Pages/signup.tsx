import React from "react";
import { Link } from "react-router-dom";

const Signup = () => {
  return (
    <div className="bg-gray-100 h-screen flex flex-col items-center justify-center">

    <div className="bg-white p-10 rounded-md shadow-2xl border-2 border-gray-300">

      <h1 className="text-3xl font-bold text-center hover:text-blue-500 underline pt-6 pb-10">
        Signup-page
        </h1>

      <form className="flex flex-col gap-4 items-center p-3">

        <label 
              htmlFor="name" 
              className="text-lg font-bold underline">
          Name:
          </label>

        <input 
              type="text" 
              placeholder="Name" 
              id="name" 
              className="hover:border-2 p-2 border-b-2 hover:rounded-md w-100" 
        />

        <label 
              htmlFor="email" 
              className="text-lg font-bold underline">
          Email:
          </label>

        <input 
              type="email" 
              placeholder="Email" 
              id="email" 
              className="hover:border-2 p-2 hover:rounded-md border-b-2 w-100" />

        <label 
              htmlFor="password" 
              className="text-lg font-bold underline">
          Password:
          </label>

        <input 
              type="password" 
              placeholder="Password" 
              id="password" 
              className="hover:border-2 p-2 hover:rounded-md border-b-2 w-100" 
        />

        <button 
               type="submit" 
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