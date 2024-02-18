import React from "react";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import apiUser from "../../api/users/user";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {
  FaFacebookF,
  FaGoogle,
  FaLinkedinIn,
  FaRegEnvelope,
} from 'react-icons/fa';
import { MdLockOutline } from 'react-icons/md';

export default function Signup() {
  const { register, handleSubmit} = useForm({});
  const router = useRouter();

  const handleLoginClick = () => {
    router.push("/login");
  };

 const handleSuccess = () => {
    toast.success('Signup succesfuly!', {
      position: 'top-center',
      autoClose: 3000, // Durée en millisecondes (ajustez selon vos besoins)
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
    });
  };
const handleError = () => {
    toast.error('Signup failed!', {
      position: 'top-center',
      autoClose: 3000, // Durée en millisecondes (ajustez selon vos besoins)
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
    });
  };
 const passError = () => {
    toast.error('Signup faild password incompatible!', {
      position: 'top-center',
      autoClose: 3000, // Durée en millisecondes (ajustez selon vos besoins)
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
    });
  };

    const onSubmit = async (data) => {
    apiUser.signup(data).then((res) => {
      if (data.password != data.confirmPassword) {
        passError();
      }else if (res == "User created with success") {
        setTimeout(() => {
          handleSuccess();
        }, 900);
        setTimeout(() => {
          router.push("/login");
        }, 1400);
      }else{
        setTimeout(() => {
          handleError
        }, 1000);
      }
    });
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2 bg-gray-100">
      <main className='flex flex-col items-center justify-center w-full flex-1 px-4 md:px-8 lg:px-16 xl:px-32 text-center'>
        <div className='bg-white rounded-2xl shadow-2xl flex flex-col md:flex-row w-full max-w-4xl'>
          <div className="md:w-3/5 p-5">
            <div className="py-10">
              <h2 className="text-3xl font-bold text-blue-500 mb-2">Sign up for an Account</h2>
              <div className="border-2 w-10 border-blue-500 inline-block mb-2"></div>
              <div className="flex justify-center my-2">
                <a href="#" className="border-2 border-blue-500 rounded-full text-blue-500 p-3 mx-1 transition duration-300 ease-in-out transform hover:scale-110">
                  <FaFacebookF className="text-sm" />
                </a>
                <a href="#" className="border-2 border-blue-500 rounded-full text-blue-500text-black p-3 mx-1 transition duration-300 ease-in-out transform hover:scale-110">
                  <FaLinkedinIn className="text-sm" />
                </a>
                <a href="#" className="border-2 border-blue-500 rounded-full text-blue-500 p-3 mx-1 transition duration-300 ease-in-out transform hover:scale-110">
                  <FaGoogle className="text-sm" />
                </a>
              </div>
              <p className='text-gray-400 my-3'>Or use your email account</p>
              <form onSubmit={handleSubmit(onSubmit)}>
                <div className='flex flex-col items-center'>
                  <div className= 'bg-gray-100 w-64 p-2 flex items-center mb-3 ' >
                    <input
                      type="text"
                      id="firstName"
                      name="firstName"
                      placeholder="First Name"
                    
                      className='bg-gray-100 outline-none text-sm flex-1 text-black'
                      {...register("first_name", { required: true })}
                    />
                  </div>
                  <div className= 'bg-gray-100 w-64 p-2 flex items-center mb-3 '>
                    <input 
                      type="text"
                     id="lastName"
                     name="lastName"
                     placeholder="Last Name"
                     {...register("last_name", { required: true })}
                     className='bg-gray-100 outline-none text-sm flex-1 text-black'
                    />
                  </div>
                  <div className= 'bg-gray-100 w-64 p-2 flex items-center mb-3 '>
                    <FaRegEnvelope className="text-gray-400 m-2 text-black" />
                    <input
                       type="email"
                       id="email"
                       name="email"
                       placeholder="Email"
                       {...register("email", { required: true })}
                      className='bg-gray-100 outline-none text-sm flex-1 text-black'
                      
                    />
                  </div>
                  <div className= 'bg-gray-100 w-64 p-2 flex items-center mb-3 '>
                    <MdLockOutline className="text-gray-400 m-2" />
                    <input
                      type='password'
                      id='password'
                      name='password'
                      placeholder="Password"
                      className='bg-gray-100 outline-none text-sm flex-1 text-black'
                           {...register("password",
                          { required: true, minLength:{value:8, message:" please enter a password longer than 8 characters "} })}
                    />
                  </div>
                  <div className= 'bg-gray-100 w-64 p-2 flex items-center mb-3 '>
                    <MdLockOutline className="text-gray-400 m-2" />
                    <input
                      type='password'
                      id='confirmPassword'
                      name='confirmPassword'
                      placeholder="ConfirmPassword"
                      className='bg-gray-100 outline-none text-sm flex-1 text-black'
                                    {...register("confirmPassword", 
              { required: true, minLength:{value:8, message:" please enter a password longer than 8 characters "} })}
                    />
                  </div>
                  <button
                    type="submit"
                    className="border-blue-500 text-blue-500 border-2 rounded-full px-12 py-2 inline-block font-semibold hover:bg-blue-500 hover:text-white"
                  >
                    Sign Up
                  </button>
                </div>
              </form>
            </div>
          </div>
          <div className="md:w-2/5 bg-blue-500 text-white rounded-tr-2xl rounded-bl-2xl py-12 px-6 md:py-24 md:px-12 flex flex-col items-center justify-center">
            <h2 className="text-3xl font-bold mb-2">Hello, Friend</h2>
            <div className="border-2 w-10 border-white inline-block mb-2"></div>
            <p className="mb-10">Welcome to Google Docs</p>
            <button
              type='button'
              onClick={handleLoginClick}
              className="border-white border-2 rounded-full px-12 py-2 inline-block font-semibold hover:bg-white hover:text-blue-500"
            >
              Login
            </button>
          </div>

        </div>
      </main>
    </div>
  );
  
}
