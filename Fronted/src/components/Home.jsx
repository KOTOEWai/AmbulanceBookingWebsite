
import logo from '../assets/car.jpg'
import herocar from '../assets/car1.jpg'
import firstAid from '../assets/firstAid.jpg'
import realtime from '../assets/realtime.jpg'
import car from '../assets/DALL·E 2024-12-16 13.24.04 - A detailed illustration of an ambulance car with a modern design, featuring a white body with red and blue emergency markings, a light bar on top, and.webp'
import GoogleMap from './googleMap'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup';
import axios from 'axios'
import { useContext, useState } from 'react'
import { AuthContext } from './AuthContext'
import { useNavigate } from 'react-router-dom'
import  map  from '../assets/map.png'
const isFutureDate = (value) => {
  const currentDate = new Date();
  const selectedDate = new Date(value);
  return selectedDate > currentDate;
}

const schema = yup.object({
    user : yup.string(),
    name: yup.string().required('Name is required'),
    phone: yup.string().required( 'Invalid phone number'),
    email: yup.string().email('Invalid email').required('Email is required'),
    relativeName: yup.string().required('Relative name is required'),
    date: yup.date().required('Date is required').test('furture date','Date must be in the future',isFutureDate),
    time: yup.string().required('Time is required'),
    address : yup.string(),
    typeofEmergency: yup.string().required('Type of emergency')
}).required()
export default function Home() {
    const { user , dispatch } = useContext(AuthContext);
 
    const navigate = useNavigate();
    const [ data , setData] = useState(null)
     const addre = JSON.stringify(data?.display_name);
  

     
    const { register , formState: {errors}, handleSubmit} = useForm({
        resolver: yupResolver(schema),
        defaultValues:{
            user:user._id,
            name: '',
            phone: '',
            email: '',
            relativeName: '',
            date: '',
            time: '',
            address:'',
            typeofEmergency: ''
        }
    })

    const [ open , setOpen] = useState(false)
 
   
const onSubmit = async (data) => {
  data.address = addre;
  try{
      const res =  await axios.post('http://localhost:3000/booking',data,{
        withCredentials: true,
       
      })
      if(res.status >= 200 && res.status < 300){
      alert('Form submitted successfully!')
      navigate('/tqletter')
      }
   
     
  }catch(e){
    console.error('Error:', e)
    alert('Error in form submission',e.response.message)
    }
}

 const Logout = async ()=>{

  const res = await  axios.post('http://localhost:3000/user/logout',{},{
        withCredentials: true,
      })

  if(res.status >= 200 && res.status < 300){
    dispatch({type:'LOGOUT'})
    navigate('/login')
  }else{
    alert('Error in logging out')
  }
 }
  return (
    <>
 <header
    className="fixed inset-x-0 top-0 z-30 mx-auto w-full max-w-screen-md border border-gray-100 bg-white/80 py-3 shadow backdrop-blur-lg md:top-6 md:rounded-3xl lg:max-w-screen-lg">
    <div className="px-4">
        <div className="flex items-center justify-between">
            <div className="flex shrink-0">
                <a aria-current="page" className="flex items-center" href="/">
                    <img className="h-7 w-auto rounded-lg" src={logo} alt=""/>
                    <p className="text-black ms-5">Ambulance</p>
                </a>
            </div>
            <div className="hidden md:flex md:items-center md:justify-center md:gap-5">
                <a aria-current="page"
                    className="inline-block rounded-lg px-2 py-1 text-sm font-medium text-gray-900 transition-all duration-200 hover:bg-gray-100 hover:text-gray-900"
                    href="">Home</a>
                <a className="inline-block rounded-lg px-2 py-1 text-sm font-medium text-gray-900 transition-all duration-200 hover:bg-gray-100 hover:text-gray-900"
                    href="/googleMap">Our Location</a>
                     <a className="inline-block rounded-lg px-2 py-1 text-sm font-medium text-gray-900 transition-all duration-200 hover:bg-gray-100 hover:text-gray-900"
                    href="/tqLetter"> Appointments</a>
            </div>

          <div className="flex items-center justify-end gap-3">
          { !user && (
               <><a className="hidden items-center justify-center rounded-xl bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 transition-all duration-150 hover:bg-gray-50 sm:inline-flex"
                  href="/SignUp">SignUp</a><a className="inline-flex items-center justify-center rounded-xl bg-blue-600 px-3 py-2 text-sm font-semibold text-white shadow-sm transition-all duration-150 hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
                    href="/login">Login</a></>
                  ) }
            </div>
            {
              user && (
                  <div className="flex items-center justify-end gap-3">
                    <a onClick={()=>Logout()} className="hidden items-center justify-center rounded-xl bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 transition-all duration-150 hover:bg-gray-50 sm:inline-flex" >Logout</a>
                  </div>
              )
            }
        </div>
    </div>
</header>

<div className='grid grid-cols-1 md:grid-cols-2 border-b-2 border-s-orange-50'>
  <div className='flex flex-col  text-white justify-center'>
      <h1 className='text-7xl font-mono text-center mt-9'>Ambulance Service</h1>
     <p className='text-white p-10'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quae unde earum rem laborum consequuntur libero minima harum est hic inventore! Illo ipsam minus laborum consectetur
     doloribus mollitia qui praesentium deserunt! Lorem ipsum dolor sit amet consectetur adipisicing elit. Ea, consectetur! Id fuga doloremque atque obcaecati unde ipsa culpa neque! Sequi ad quo optio facere placeat sint aspernatur deleniti nobis modi!</p>
  </div>
  <div className='m-28'>
  <img src={car} alt="" className='object-fill rounded-lg  ' />
  </div>
</div>
<div className=" py-16 border-b-2 border-s-orange-50">
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
  
    <div className="text-center mb-12">
      <h2 className="text-3xl font-bold text-white">Our Services</h2>
      <p className="text-lg  mt-2">Fast, reliable, and professional ambulance services tailored to your needs.</p>
    </div>

    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
    
      <div className="bg-white shadow-md rounded-lg p-6 text-center hover:shadow-lg transition-shadow duration-300">
        <div className="flex justify-center items-center bg-red-100 text-red-600 w-16 h-16 rounded-full mx-auto mb-4">
        <img src={herocar} alt="" className='rounded-full' />
          <i className="fas fa-ambulance text-3xl"></i>
        </div>
        <h3 className="text-xl font-semibold text-gray-800">Emergency Ambulance</h3>
        <p className="text-gray-600 mt-2">24/7 emergency medical transport for critical care situations.</p>
        <a href="#" className="inline-block mt-4 text-red-600 hover:underline font-medium">Learn More</a>
      </div>

     
      <div className="bg-white shadow-md rounded-lg p-6 text-center hover:shadow-lg transition-shadow duration-300">
        <div className="flex justify-center items-center bg-red-100 text-red-600 w-16 h-16 rounded-full mx-auto mb-4">
         <img src={firstAid} alt="" className='rounded-full' />
          <i className="fas fa-first-aid text-3xl"></i>
        </div>
        <h3 className="text-xl font-semibold text-gray-800">First Aid Support</h3>
        <p className="text-gray-600 mt-2">On-site medical aid for non-critical injuries and emergencies.</p>
        <a href="#" className="inline-block mt-4 text-red-600 hover:underline font-medium">Learn More</a>
      </div>

    
      <div className="bg-white shadow-md rounded-lg p-6 text-center hover:shadow-lg transition-shadow duration-300">
        <div className="flex justify-center items-center bg-red-100 text-red-600 w-16 h-16 rounded-full mx-auto mb-4">
        <img src={realtime} alt="" className='rounded-full' />
          <i className="fas fa-map-marked-alt text-3xl"></i>
        </div>
        <h3 className="text-xl font-semibold text-gray-800">Real-Time Tracking</h3>
        <p className="text-gray-600 mt-2">Track your ambulance in real time for better planning and peace of mind.</p>
        <a href="#" className="inline-block mt-4 text-red-600 hover:underline font-medium">Learn More</a>
      </div>
    </div>
  </div>
</div>
   <h2 className='text-center py-5 text-4xl'>BOOK AN APPOINTMENT</h2>
<div className="flex items-center justify-center p-5 border-b-2 border-s-orange-50 ">
    <div className="mx-auto w-full max-w-[950px] bg-white p-10 rounded-lg shadow-yellow-200 ">
     
    <form onSubmit={handleSubmit(onSubmit)}>
  {/* Full Name and Phone Number */}
  <div className='flex justify-center gap-3'>
    <div className="mb-5 w-full">
      <label htmlFor="name" className="mb-3 block text-base font-medium text-[#07074D]">
        Full Name
      </label>
      <input
        {...register('name')}
        type="text"
        name="name"
        id="name"
        placeholder="Full Name"
        autoComplete="name"
        className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
      />
      {errors.name && <p className='text-red-700'>{errors.name.message}</p>}
    </div>

    <div className="mb-5 w-full">
      <label htmlFor="phone" className="mb-3 block text-base font-medium text-[#07074D]">
        Phone Number
      </label>
      <input
        {...register('phone')}
        type="tel"
        name="phone"
        id="phone"
        placeholder="Enter your phone number"
        autoComplete="tel"
        className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
      />
      {errors.phone && <p className='text-red-700'>{errors.phone.message}</p>}
    </div>
  </div>

  {/* Email and Relative Name */}
  <div className='flex justify-center gap-3'>
    <div className="mb-5 w-full">
      <label htmlFor="email" className="mb-3 block text-base font-medium text-[#07074D]">
        Email Address
      </label>
      <input
        {...register('email')}
        type="email"
        name="email"
        id="email"
        placeholder="Enter your email"
        autoComplete="email"
        className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
      />
      {errors.email && <p className='text-red-700'>{errors.email.message}</p>}
    </div>

    <div className="mb-5 w-full">
      <label htmlFor="relativeName" className="mb-3 block text-base font-medium text-[#07074D]">
        Relative Name
      </label>
      <input
        {...register('relativeName')}
        type="text"
        name="relativeName"
        id="relativeName"
        placeholder="Enter your Relative Name"
        autoComplete="name"
        className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
      />
      {errors.relativeName && <p className='text-red-700'>{errors.relativeName.message}</p>}
    </div>
  </div>

  {/* Date and Time */}
  <div className="-mx-3 flex flex-wrap">
    <div className="w-full px-3 sm:w-1/2">
      <div className="mb-5">
        <label htmlFor="date" className="mb-3 block text-base font-medium text-[#07074D]">
          Date
        </label>
        <input
          {...register('date')}
          type="date"
          name="date"
          id="date"
          autoComplete="off"
          className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
        />
        {errors.date && <p className='text-red-700'>{errors.date.message}</p>}
      </div>
    </div>
    <div className="w-full px-3 sm:w-1/2">
      <div className="mb-5">
        <label htmlFor="time" className="mb-3 block text-base font-medium text-[#07074D]">
          Time
        </label>
        <input
          {...register('time')}
          type="time"
          name="time"
          id="time"
          autoComplete="off"
          className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
        />
        {errors.time && <p className='text-red-700'>{errors.time.message}</p>}
      </div>
    </div>
  </div>

  {/* Address Details */}
  <div className="mb-5 pt-3 ">
    <label className="mb-5 block text-base font-semibold text-[#07074D] sm:text-xl">
      Address Details
    </label>
    
    
    <div className="w-full px-3 sm:w-1/2">

        <div className="mb-5 w-full">

    <label htmlFor="" className="mb-3 block text-base font-medium text-[#07074D]">
    { !data ? <p>Select Your current location</p>   : 

     <p className='text-black '>Your location : {data?.display_name}</p>

     
     }  <img src={map} alt="" onClick={()=>setOpen(true)} className="w-10 h-10 object-cover cursor-pointer object-center" />
          </label>
       

         
 { open &&
   
 
  <div className="fixed inset-0 z-30 w-screen overflow-y-auto  ">
   
        <div className="bg-white m-10  sm:p-6 sm:pb-4 ">
          
           <div>
           <p className='text-black text-end ' onClick={()=>setOpen(false)}>Close</p>
               <GoogleMap setData={setData} />
            </div>
        </div>
      </div>

  
}


        </div>
      </div>

  </div>

  {/* Type of Emergency */}
  <div className='mb-5 pt-3'>
    <label htmlFor="typeofEmergency" className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
      Type Of Emergency
    </label>
    <div className="relative">
      <select
        {...register('typeofEmergency')}
        id="typeofEmergency"
        className="block appearance-none w-full border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
      >
        <option value='Accident'>Accident</option>
        <option value='Heart Attack'>Heart Attack</option>
        <option value='Stroke'>Stroke</option>
        <option value='Injury'>Injury</option>
        <option value='Other'>Other</option>
      </select>
      <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
        <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
          <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/>
        </svg>
      </div>
    </div>
    {errors.typeofEmergency && <p className='text-red-700'>{errors.typeofEmergency.message}</p>}
  </div>

  {/* Submit Button */}
  <div>
    <button
      type='submit'
      className="hover:shadow-form w-full rounded-md bg-[#6A64F1] py-3 px-8 text-center text-base font-semibold text-white outline-none"
    >
      Book Appointment
    </button>
  </div>
</form>

    </div>
</div>


<footer className="" style={{backgroundColor:'#FFFED3'}}>
    <div className="mx-auto w-full max-w-screen-xl p-4 py-6 lg:py-8">
        <div className="md:flex md:justify-between">
          <div className="mb-6 md:mb-0">
              <a href="https://flowbite.com/" className="flex items-center">
                  <img src={logo} className="h-8 me-3" alt="FlowBite Logo" />
                  <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-black">Emergency </span>
              </a>
          </div>
          <div className="grid grid-cols-2 gap-8 sm:gap-6 sm:grid-cols-3">
              <div>
                  <h2 className="mb-6 text-sm font-semibold text-gray-900 uppercase dark:text-black">Resources</h2>
                  <ul className="text-black dark:text-black-400 font-medium">
                      <li className="mb-4">
                          <a href="https://flowbite.com/" className="hover:underline"></a>
                      </li>
                      <li>
                          <a href="https://tailwindcss.com/" className="hover:underline">Amb@email.com</a>
                      </li>
                  </ul>
              </div>
              <div>
                  <h2 className="mb-6 text-sm font-semibold text-gray-900 uppercase dark:text-black">Connect us</h2>
                  <ul className="text-black dark:text-black font-medium">
                      <li className="mb-4">
                          <a href="https://github.com/themesberg/flowbite" className="hover:underline ">www.amb.com</a>
                      </li>
                      <li className='mb-4'>
                          <a href="https://discord.gg/4eeurUVvTy" className="hover:underline">Viber</a>

                      </li>
                      <li>
                          <a href="https://discord.gg/4eeurUVvTy" className="hover:underline">Telegram</a>
                          
                      </li>
                  </ul>
              </div>
              <div>
                  <h2 className="mb-6 text-sm font-semibold text-gray-900 uppercase dark:text-white">Legal</h2>
                  <ul className="text-black dark:text-black font-medium">
                      <li className="mb-4">
                          <a href="#" className="hover:underline">Privacy Policy</a>
                      </li>
                      <li>
                          <a href="#" className="hover:underline">Terms &amp; Conditions</a>
                      </li>
                  </ul>
              </div>
          </div>
      </div>
      <hr className="my-6 border-gray-200 sm:mx-auto dark:border-gray-700 lg:my-8" />
      <div className="sm:flex sm:items-center sm:justify-between">
          <span className="text-sm text-gray-500 sm:text-center dark:text-gray-400">© 2023 <a href="https://flowbite.com/" className="hover:underline">Emergency Ambulance</a>. All Rights Reserved.
          </span>
          <div className="flex mt-4 sm:justify-center sm:mt-0">
              <a href="#" className="text-black hover:text-gray-900 dark:hover:text-black">
                  <svg className="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 8 19">
                        <path fillRule="evenodd" d="M6.135 3H8V0H6.135a4.147 4.147 0 0 0-4.142 4.142V6H0v3h2v9.938h3V9h2.021l.592-3H5V3.591A.6.6 0 0 1 5.592 3h.543Z" clipRule="evenodd"/>
                    </svg>
                  <span className="sr-only">Facebook page</span>
              </a>
              <a href="#" className="text-black hover:text-black dark:hover:text-white ms-5">
                  <svg className="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 21 16">
                        <path d="M16.942 1.556a16.3 16.3 0 0 0-4.126-1.3 12.04 12.04 0 0 0-.529 1.1 15.175 15.175 0 0 0-4.573 0 11.585 11.585 0 0 0-.535-1.1 16.274 16.274 0 0 0-4.129 1.3A17.392 17.392 0 0 0 .182 13.218a15.785 15.785 0 0 0 4.963 2.521c.41-.564.773-1.16 1.084-1.785a10.63 10.63 0 0 1-1.706-.83c.143-.106.283-.217.418-.33a11.664 11.664 0 0 0 10.118 0c.137.113.277.224.418.33-.544.328-1.116.606-1.71.832a12.52 12.52 0 0 0 1.084 1.785 16.46 16.46 0 0 0 5.064-2.595 17.286 17.286 0 0 0-2.973-11.59ZM6.678 10.813a1.941 1.941 0 0 1-1.8-2.045 1.93 1.93 0 0 1 1.8-2.047 1.919 1.919 0 0 1 1.8 2.047 1.93 1.93 0 0 1-1.8 2.045Zm6.644 0a1.94 1.94 0 0 1-1.8-2.045 1.93 1.93 0 0 1 1.8-2.047 1.918 1.918 0 0 1 1.8 2.047 1.93 1.93 0 0 1-1.8 2.045Z"/>
                    </svg>
                  <span className="sr-only">Discord community</span>
              </a>
              <a href="#" className="text-gray-500 hover:text-gray-900 dark:hover:text-white ms-5">
                  <svg className="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 17">
                    <path fillRule="evenodd" d="M20 1.892a8.178 8.178 0 0 1-2.355.635 4.074 4.074 0 0 0 1.8-2.235 8.344 8.344 0 0 1-2.605.98A4.13 4.13 0 0 0 13.85 0a4.068 4.068 0 0 0-4.1 4.038 4 4 0 0 0 .105.919A11.705 11.705 0 0 1 1.4.734a4.006 4.006 0 0 0 1.268 5.392 4.165 4.165 0 0 1-1.859-.5v.05A4.057 4.057 0 0 0 4.1 9.635a4.19 4.19 0 0 1-1.856.07 4.108 4.108 0 0 0 3.831 2.807A8.36 8.36 0 0 1 0 14.184 11.732 11.732 0 0 0 6.291 16 11.502 11.502 0 0 0 17.964 4.5c0-.177 0-.35-.012-.523A8.143 8.143 0 0 0 20 1.892Z" clipRule="evenodd"/>
                </svg>
                  <span className="sr-only">Twitter page</span>
              </a>
              <a href="#" className="text-gray-500 hover:text-gray-900 dark:hover:text-white ms-5">
                  <svg className="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 .333A9.911 9.911 0 0 0 6.866 19.65c.5.092.678-.215.678-.477 0-.237-.01-1.017-.014-1.845-2.757.6-3.338-1.169-3.338-1.169a2.627 2.627 0 0 0-1.1-1.451c-.9-.615.07-.6.07-.6a2.084 2.084 0 0 1 1.518 1.021 2.11 2.11 0 0 0 2.884.823c.044-.503.268-.973.63-1.325-2.2-.25-4.516-1.1-4.516-4.9A3.832 3.832 0 0 1 4.7 7.068a3.56 3.56 0 0 1 .095-2.623s.832-.266 2.726 1.016a9.409 9.409 0 0 1 4.962 0c1.89-1.282 2.717-1.016 2.717-1.016.366.83.402 1.768.1 2.623a3.827 3.827 0 0 1 1.02 2.659c0 3.807-2.319 4.644-4.525 4.889a2.366 2.366 0 0 1 .673 1.834c0 1.326-.012 2.394-.012 2.72 0 .263.18.572.681.475A9.911 9.911 0 0 0 10 .333Z" clipRule="evenodd"/>
                  </svg>
                  <span className="sr-only">GitHub account</span>
              </a>
              <a href="#" className="text-gray-500 hover:text-gray-900 dark:hover:text-white ms-5">
                  <svg className="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 0a10 10 0 1 0 10 10A10.009 10.009 0 0 0 10 0Zm6.613 4.614a8.523 8.523 0 0 1 1.93 5.32 20.094 20.094 0 0 0-5.949-.274c-.059-.149-.122-.292-.184-.441a23.879 23.879 0 0 0-.566-1.239 11.41 11.41 0 0 0 4.769-3.366ZM8 1.707a8.821 8.821 0 0 1 2-.238 8.5 8.5 0 0 1 5.664 2.152 9.608 9.608 0 0 1-4.476 3.087A45.758 45.758 0 0 0 8 1.707ZM1.642 8.262a8.57 8.57 0 0 1 4.73-5.981A53.998 53.998 0 0 1 9.54 7.222a32.078 32.078 0 0 1-7.9 1.04h.002Zm2.01 7.46a8.51 8.51 0 0 1-2.2-5.707v-.262a31.64 31.64 0 0 0 8.777-1.219c.243.477.477.964.692 1.449-.114.032-.227.067-.336.1a13.569 13.569 0 0 0-6.942 5.636l.009.003ZM10 18.556a8.508 8.508 0 0 1-5.243-1.8 11.717 11.717 0 0 1 6.7-5.332.509.509 0 0 1 .055-.02 35.65 35.65 0 0 1 1.819 6.476 8.476 8.476 0 0 1-3.331.676Zm4.772-1.462A37.232 37.232 0 0 0 13.113 11a12.513 12.513 0 0 1 5.321.364 8.56 8.56 0 0 1-3.66 5.73h-.002Z" clipRule="evenodd"/>
                </svg>
                  <span className="sr-only">Dribbble account</span>
              </a>
          </div>
      </div>
    </div>
</footer>

    </>
  )
}
