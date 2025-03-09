import {useForm} from 'react-hook-form';
import { yupResolver} from '@hookform/resolvers/yup';
import * as yup from 'yup';
import axios from 'axios';

import { useContext } from 'react';
import { AuthContext } from './AuthContext';

const schema = yup.object(
    {
        name: yup.string().required('name is required'), 
        email: yup.string().email('invalid email').required('email is required'),
        password: yup.string().min(8,'password must be at least 8 characters').required('password is required'),
    }
).required();

export default function SignUp() {
    
    const {dispatch} = useContext(AuthContext)
    const { register, formState : { errors},handleSubmit } = useForm ({
        resolver: yupResolver(schema),
    })
    
    const onSubmit = async (data) => {
        try{
            const res = await axios.post('http://localhost:3000/user/signUp', data,{
            withCredentials: true,
            })
            console.log(res.data);
            dispatch({type: 'LOGIN', payload: res.data})
            alert('User successfully signed up')
        }catch(err){
            console.error(err.message);
            alert('Error signing up')
        }
        
    }
  return (
    
<div className="min-h-screen  flex flex-col justify-center py-12   lg:px-8">
    <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <img className="mx-auto h-10 w-auto" src="https://www.svgrepo.com/show/301692/login.svg" alt="Workflow"/>
        <h2 className="mt-6 text-center text-3xl leading-9 font-extrabold text-white">
            Create a new account
        </h2>
        <p className="mt-2 text-center text-sm leading-5 text-slate-200 max-w">
            Or
            <a href="/login"
                className="font-medium text-stone-300 hover:text-blue-500 focus:outline-none focus:underline transition ease-in-out duration-150">
                login to your account
            </a>
        </p>
    </div>

    <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
            <form onSubmit={handleSubmit(onSubmit)} method="POST" action="#">
                <div>
                    <label htmlFor="email" className="block text-sm font-medium leading-5  text-gray-700">Name</label>
                    <div className="mt-1 relative rounded-md shadow-sm">
                        <input {...register('name')} id="name" name="name" placeholder="John Doe" type="text" required=""
                            className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md text-black focus:outline-none focus:shadow-outline-blue focus:border-blue-300 transition duration-150 ease-in-out sm:text-sm sm:leading-5"/>
                           {errors.name && <p className='text-red-700'>{errors.name.message}</p>} 
                        <div className="hidden absolute inset-y-0 right-0 pr-3 items-center pointer-events-none">
                            <svg className="h-5 w-5 text-red-500" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd"
                                    d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                                    clipRule="evenodd">
                                </path>
                            </svg>
                        </div>
                    </div>
                </div>

            

                <div className="mt-6">
                    <label htmlFor="email" className="block text-sm font-medium leading-5 text-gray-700">
                        Email address
                    </label>
                    <div className="mt-1 relative rounded-md shadow-sm">
                        <input {...register('email')} id="email" name="email" placeholder="user@example.com" type="email"
                            required=""
                            className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md text-black placeholder-gray-400 focus:outline-none focus:shadow-outline-blue focus:border-blue-300 transition duration-150 ease-in-out sm:text-sm sm:leading-5"/>
                        {errors.email && <p className='text-red-700'>{errors.email.message}</p>}
                        <div className="hidden absolute inset-y-0 right-0 pr-3 items-center pointer-events-none">
                            <svg className="h-5 w-5 text-red-500" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd"
                                    d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                                    clipRule="evenodd"></path>
                            </svg>
                        </div>
                    </div>
                </div>

                <div className="mt-6">
                    <label htmlFor="password" className="block text-sm font-medium leading-5 text-gray-700">
                        Password
                    </label>
                    <div className="mt-1 rounded-md shadow-sm">
                        <input {...register('password')} id="password" name="password" type="password" required=""
                            className="appearance-none block w-full px-3 py-2 border text-black border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:shadow-outline-blue focus:border-blue-300 transition duration-150 ease-in-out sm:text-sm sm:leading-5"/>
                            {errors.password && <p className='text-red-700'>{errors.password.message}</p>}
                    </div>
                </div>

              
                <div className="mt-6">
                    <span className="block w-full rounded-md shadow-sm">
                        <button type="submit"
                            className="w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-500 focus:outline-none focus:border-indigo-700 focus:shadow-outline-indigo active:bg-indigo-700 transition duration-150 ease-in-out">
                            Create account
                        </button>
                    </span>
                </div>
            </form>

        </div>
    </div>
</div>
    
  )
}
