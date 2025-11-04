"use client";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { useRouter } from "next/navigation";
// import axios from "../../utils/axiosConfig";
// import { saveFormData } from "../../store/PlayerSlice";
import { useState } from "react";
import { asyncUserLogin } from "../../store/actions/userAction";

export default function LoginPage() {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const dispatch = useDispatch();
  const router = useRouter();
  const [errorMessage, setErrorMessage] = useState("");

   const onSubmit = async (data) => {
    const result = await dispatch(asyncUserLogin(data));

    if (result.success) {
  
      router.push("/");
    } else {
      setErrorMessage(result.message);
    }
  };


  return (
    <main className="min-h-screen flex items-center justify-center bg-gradient-to-r from-gray-100 to-gray-200 p-6">
      <div className="bg-white/80 backdrop-blur-md rounded-2xl shadow-2xl w-full max-w-md border border-blue-100 p-8 transition duration-500 hover:-translate-y-1 hover:shadow-blue-200">
        <h1 className="text-3xl font-bold mb-6 text-center text-blue-700">Welcome Back</h1>
        <p className="text-center text-gray-600 mb-8">Please log in to continue</p>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          {/* Username */}
          <div>
            <label className="block mb-1 font-medium text-gray-700">Username</label>
            <input
              {...register("username", { required: "Username is required" })}
              placeholder="Enter your username"
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
            />
            {errors.username && (
              <p className="text-red-500 text-sm mt-1">{errors.username.message}</p>
            )}
          </div>

          {/* Email */}
          <div>
            <label className="block mb-1 font-medium text-gray-700">Email</label>
            <input
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^\S+@\S+$/i,
                  message: "Invalid email address",
                },
              })}
              type="email"
              placeholder="Enter your email"
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
            />
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
            )}
          </div>

          {/* Error Message */}
          {errorMessage && (
            <p className="text-red-600 text-center font-medium mt-2">{errorMessage}</p>
          )}

          {/* Login Button */}
          <div className="flex justify-center mt-4">
            <button
              type="submit"
              className="px-10 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-all duration-300 shadow-md hover:shadow-lg"
            >
              Login
            </button>
          </div>
        </form>

        <p className="text-center text-gray-500 mt-6">
          Don’t have an account?{" "}
          <a href="/signup" className="text-blue-600 font-semibold hover:underline">
            Sign up
          </a>
        </p>
      </div>
    </main>
  );
}
