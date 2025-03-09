import correct from '../assets/correct.webp';
import contin from '../assets/continue.jpg';
import { useNavigate } from 'react-router-dom';
import { useContext, useEffect, useState } from 'react';
import { AuthContext } from './AuthContext';
import axios from 'axios';

export default function TqLetter() {
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
  const [info, setInfo] = useState([]);

  useEffect(() => {
    if (!user?._id) return; // Prevent API call if user is not available

    const fetchBookings = async () => {
      try {
        const response = await axios.get('http://localhost:3000/booking');
        const userBookings = response.data.filter((item) => item.user === user._id);
        setInfo(userBookings);
      } catch (error) {
        console.error("Error fetching bookings:", error);
      }
    };

    fetchBookings();
  }, [user?._id]); // Dependency array to ensure effect runs only when user._id changes

  // Format Date Function
  const convertDate = (data) => {
    return new Date(data).toLocaleDateString('en-us', {
      weekday: "long",
      year: "numeric",
      month: "short",
    });
  };

  return (
    <div className="w-full min-h-screen flex flex-col bg-gray-100 px-6 py-8">
      
    {/* Success Icon */}
    <div className="w-full flex justify-center mb-6">
      <img src={correct} alt="Success" className="w-28 md:w-32" />
    </div>

    {/* Display Appointment Details */}
    {info.length > 0 ? (
      info.map((item, index) => (
        <div
          key={index}
          className="mb-6 p-6 border border-gray-300 rounded-xl shadow-lg bg-blue-900 text-white"
        >
          <h1 className="text-xl md:text-2xl text-center uppercase font-bold text-yellow-400">
            Appointment - {index + 1}
          </h1>

          <p className="font-medium text-lg">
            Thank You for Your Appointment Confirmation,  
            <span className="text-yellow-400 font-bold"> {user?.name}</span>
          </p>

          <p className="font-medium">
            Patient’s Name: <span className="text-yellow-400">{user?.name}</span>
          </p>

          <p className="font-medium">
            Appointment Date & Time:  
            <span className="text-yellow-400"> {convertDate(item.date)}</span> &  
            <span className="text-yellow-400"> {item.time}</span>
          </p>

          <p className="font-medium">
            Your Location: <span className="text-yellow-400">{item.address}</span>
          </p>

          <p className="leading-relaxed mt-3 text-gray-300">
            Our team is ready to assist you, and an ambulance will be dispatched promptly.  
            If you have any special requests, please contact us at  
            <span className="text-yellow-300 font-semibold"> [example@email.com/09977327487]</span>.
          </p>

          <p className="font-medium mt-3 text-gray-300">
            Thank you for trusting our emergency ambulance services. We wish you a safe and speedy recovery.
          </p>
        </div>
      ))
    ) : (
      <p className="text-center text-gray-500 text-lg">No appointments found.</p>
    )}

    {/* Continue Button */}
    <div className="mx-auto mt-8">
      <img
        src={contin}
        alt="Continue"
        onClick={() => navigate('/')}
        className="w-56 cursor-pointer hover:scale-105 transition-transform"
      />
    </div>
  </div>
);
}
