import axios from "axios"
import { useContext, useState } from "react"
import { useNavigate } from "react-router-dom"
import { AuthContext } from "./AuthContext";

export default function Login() {
    const navigate = useNavigate();
    const [ formData, setFormData] = useState ({
        email: '',
        password: ''
    })
    const handleInput = (e) => {
        setFormData( {...formData, [e.target.id] : e.target.value})

    }
    const { dispatch } = useContext(AuthContext)

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post('http://localhost:3000/user/login',formData,{
                withCredentials: true
            });

            if ( res.status >=200 && res.status < 300){
                alert('Logged In Successfully')
                dispatch({ type: 'LOGIN', payload: res.data });
                return navigate('/')
            }

        }catch (errors) {
            alert("user not found")
            console.error('Error:', errors)
        }

    }


  return (
       
<div className="min-h-screen  flex flex-col justify-center py-12   lg:px-8">
    <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <img className="mx-auto h-10 w-auto" src="https://www.svgrepo.com/show/301692/login.svg" alt="Workflow"/>
        <h2 className="mt-6 text-3xl font-extrabold text-white text-center">
            Sign in to your account
        </h2>
    </div>

    <div className="mt-5 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
            <form onSubmit={handleSubmit} method="POST" action="#">
            
                <div className="mt-6">
                    <label htmlFor="email" className="block text-sm font-medium leading-5 text-gray-700">
                        Email address
                    </label>
                    <div className="mt-1 relative rounded-md shadow-sm">
                        <input id="email"
                        value={formData.email}
                        onChange={handleInput}
                        name="email" placeholder="user@example.com" type="email"
                            required=""
                            className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:shadow-outline-blue focus:border-blue-300 transition duration-150 ease-in-out sm:text-sm sm:leading-5"/>
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
                        <input id="password"
                        value={formData.password}
                        onChange={handleInput}
                        name="password" type="password" required=""
                            className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:shadow-outline-blue focus:border-blue-300 transition duration-150 ease-in-out sm:text-sm sm:leading-5"/>
                    </div>
                </div>

              
                <div className="mt-6">
                    <span className="block w-full rounded-md shadow-sm">
                        <button type="submit"
                            className="w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-500 focus:outline-none focus:border-indigo-700 focus:shadow-outline-indigo active:bg-indigo-700 transition duration-150 ease-in-out">
                            Login account
                        </button>
                    </span>
                </div>
            </form>

        </div>
    </div>
</div>
    
  )
}
