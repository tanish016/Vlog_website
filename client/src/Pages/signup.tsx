import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import useAuthRedirect from '../hooks/userAuth.tsx';


const Signup = () => {
  const Navigate = useNavigate();
  useAuthRedirect();
  const [form, setForm] = useState({
    name: '',
    username: '',
    email: '',
    password: '',
  });
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handelSignUp = async () => {
    const { name, email, password, username } = form;
    if (!name || !email || !password || !username) {
      alert("you must filled all details");
      return;
    }
    try {
      const resp = await axios.post("/api/signup", form);
      if (resp.status === 201) {
        alert(`User created successfully`);
        Navigate("/login");
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.response && error.response.status === 409) {
          if (error.response.data.message === "User already exist") {
            console.log(error.response.data.message);
            alert("Email already exist");
          }
           else if(error.response.data.message === "Username already exist"){
            console.log(error.response.data.message);
            alert("Username already exist");
          } else {
            console.log("409 Conflict, but unexpected error message:", error.response.data);
            alert("Conflict error occurred");
          }
        } else {
          console.log("Unexpected error:", error);
          alert("An unexpected error occurred");
        }
      } else {
        console.log("Unknown error:", error);
        alert("Server error");
      }
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
  };

  return (
    <div className="bg-gray-100 h-screen flex flex-col items-center justify-center px-2">

      <div className="bg-white p-4 md:p-6 rounded-md shadow-2xl border-2 border-gray-300 w-full max-w-lg md:max-w-xl">

        <h1 className="text-2xl md:text-3xl font-bold text-center hover:text-blue-500 underline pt-2 md:pt-4 pb-4 md:pb-6">
          Signup-page
        </h1>

        <form className="flex flex-col gap-4 items-center p-1 md:p-3" onSubmit={handleSubmit}>

          <label
            htmlFor="name"
            className="text-base md:text-lg font-bold underline">
            Name:
          </label>

          <input
            type="text"
            placeholder="Name"
            name="name"
            id="name"
            value={form.name}
            onChange={handleChange}
            className="hover:border-2 p-2 border-b-2 hover:rounded-md w-full"
          />

          <label
            htmlFor="username"
            className="text-base md:text-lg font-bold underline">
            Username:
          </label>

          <input
            type="text"
            placeholder="username"
            name="username"
            id="username"
            value={form.username}
            onChange={handleChange}
            className="hover:border-2 p-2 border-b-2 hover:rounded-md w-full"
          />

          <label
            htmlFor="email"
            className="text-base md:text-lg font-bold underline">
            Email:
          </label>

          <input
            type="email"
            name="email"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
            id="email"
            className="hover:border-2 p-2 hover:rounded-md border-b-2 w-full" />

          <label
            htmlFor="password"
            className="text-base md:text-lg font-bold underline">
            Password:
          </label>

          <input
            type="password"
            name="password"
            placeholder="Password"
            id="password"
            value={form.password}
            onChange={handleChange}
            className="hover:border-2 p-2 hover:rounded-md border-b-2 w-full"
          />

          <button
            type="submit"
            onClick={handelSignUp}
            className="hover:bg-blue-600 hover:text-white border-3 rounded-md p-2 w-full">
            Signup
          </button>

        </form>

        {/* To login */}
        <div>

          <p className="text-center pt-2 font-bold text-sm md:text-base">
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