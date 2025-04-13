import React, { useState, useContext } from 'react';
import { assets } from '../../assets/asset';
import { AdminContext } from '../../context/AdminContext';
import { toast } from 'react-toastify';
import axios from 'axios';

const AddDoctor = () => {
  const [docImg, setDocImg] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [queue, setQueue] = useState('');
  const [travel, setTravel] = useState('');
  const [rating, setRating] = useState('');
  const [about, setAbout] = useState('');
  const [address, setAddress] = useState('');
  const [disease, setDisease] = useState('Viral Disease');
  const [available, setAvailable] = useState(false);
  const [phone, setPhone] = useState('');

  const { backendUrl, aToken } = useContext(AdminContext);

  const onSubmitHandler = async (e) => {
    e.preventDefault();
  
    try {
      // Log all field values
      console.log({
        docImg,
        name,
        email,
        password,
        queue,
        travel,
        rating,
        about,
        address,
        disease,
        available,
        phone,
      });
  
      if (!docImg) {
        return toast.error("Please upload a hospital image");
      }
  
      const formData = new FormData();
      formData.append('image', docImg);
      formData.append('name', name);
      formData.append('email', email);
      formData.append('password', password);
      formData.append('queue', queue);
      formData.append('travel', travel);
      formData.append('rating', rating);
      formData.append('about', about);
      formData.append('address', address);
      formData.append('disease', disease);
      formData.append('available', available ? true : false);
      formData.append('phone', phone);
  
      const { data } = await axios.post(`${backendUrl}/api/admin/addDoctor`, formData, {
        headers: { aToken },
      });
  
      if (data.success) {
        toast.success(data.message);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.error("Error in form submission:", error);
      toast.error("Something went wrong");
    }
  };

  return (
    <form onSubmit={onSubmitHandler} className="max-w-6xl mx-auto bg-white p-10 rounded-3xl shadow-2xl mt-12 border border-blue-100">
      <h1 className="text-5xl font-black text-center text-gray-800 mb-10">
        Add <span className="text-blue-600">Hospital</span>
      </h1>

      <div className="space-y-10">
        <div className="flex flex-col items-center">
          <label htmlFor="doc-img" className="cursor-pointer group">
            <img
              src={docImg ? URL.createObjectURL(docImg) : assets.docicon}
              alt="Upload Icon"
              className="w-32 h-32 object-cover rounded-full border-4 border-dashed border-blue-400 group-hover:border-blue-600 transition-all duration-300"
            />
          </label>
          <input onChange={(e) => setDocImg(e.target.files[0])} type="file" id="doc-img" hidden />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Name */}
          <div>
            <label className="block text-gray-700 font-semibold mb-1">Your Name</label>
            <input
              onChange={(e) => setName(e.target.value)}
              value={name}
              type="text"
              name="name"
              placeholder="Enter your name"
              className="w-full px-5 py-3 border border-gray-300 rounded-xl focus:ring-4 focus:ring-blue-200 transition"
              required
            />
          </div>

          {/* Email */}
          <div>
            <label className="block text-gray-700 font-semibold mb-1">Your Email</label>
            <input
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              type="email"
              name="email"
              placeholder="Enter your email"
              className="w-full px-5 py-3 border border-gray-300 rounded-xl focus:ring-4 focus:ring-blue-200 transition"
              required
            />
          </div>

          {/* Password */}
          <div>
            <label className="block text-gray-700 font-semibold mb-1">Your Password</label>
            <input
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              type="password"
              name="password"
              placeholder="Enter your password"
              className="w-full px-5 py-3 border border-gray-300 rounded-xl focus:ring-4 focus:ring-blue-200 transition"
              required
            />
          </div>

          {/* Address */}
          <div>
            <label className="block text-gray-700 font-semibold mb-1">Address</label>
            <textarea
              onChange={(e) => setAddress(e.target.value)}
              value={address}
              name="address"
              placeholder="Enter hospital address"
              className="w-full px-5 py-3 border border-gray-300 rounded-xl focus:ring-4 focus:ring-blue-200 transition resize-none"
              required
            ></textarea>
          </div>

          {/* Disease Specialization */}
          <div>
            <label className="block text-gray-700 font-semibold mb-1">Disease Specialization</label>
            <select
              onChange={(e) => setDisease(e.target.value)}
              value={disease}
              name="disease"
              className="w-full px-5 py-3 border border-gray-300 rounded-xl focus:ring-4 focus:ring-blue-200 transition"
              required
            >
              <option value="" disabled>
                Select specialization
              </option>
              <option value="Viral Disease">Viral Disease</option>
              <option value="Heart Problem">Heart Problem</option>
              <option value="Respiratory Disease">Respiratory Disease</option>
              <option value="Skin Diseases">Skin Diseases</option>
              <option value="Common Cold">Common Cold</option>
              <option value="Sun-Stroke">Sun-Stroke</option>
            </select>
          </div>

          {/* Beds Available */}
          <div>
            <label className="block text-gray-700 font-semibold mb-1">Beds Available</label>
            <input
              onChange={(e) => setQueue(e.target.value)}
              value={queue}
              type="number"
              name="queue"
              placeholder="Queue of Beds"
              className="w-full px-5 py-3 border border-gray-300 rounded-xl focus:ring-4 focus:ring-blue-200 transition"
              required
            />
          </div>

          {/* Travel Time */}
          <div>
            <label className="block text-gray-700 font-semibold mb-1">Travel Time (mins)</label>
            <input
              onChange={(e) => setTravel(e.target.value)}
              value={travel}
              type="number"
              name="travel"
              placeholder="Enter travel time"
              className="w-full px-5 py-3 border border-gray-300 rounded-xl focus:ring-4 focus:ring-blue-200 transition"
              required
            />
          </div>

          {/* Rating */}
          <div>
            <label className="block text-gray-700 font-semibold mb-1">Rating</label>
            <input
              onChange={(e) => setRating(e.target.value)}
              value={rating}
              type="number"
              name="rating"
              placeholder="Enter hospital rating"
              step="0.1"
              min="0"
              max="5"
              className="w-full px-5 py-3 border border-gray-300 rounded-xl focus:ring-4 focus:ring-blue-200 transition"
              required
            />
          </div>

          {/* About */}
          <div>
            <label className="block text-gray-700 font-semibold mb-1">About</label>
            <textarea
              onChange={(e) => setAbout(e.target.value)}
              value={about}
              name="about"
              placeholder="Enter hospital description"
              className="w-full px-5 py-3 border border-gray-300 rounded-xl focus:ring-4 focus:ring-blue-200 transition resize-none"
              required
            ></textarea>
          </div>
        </div>

        {/* Availability */}
        <div className="flex items-center space-x-3 mt-2">
          <input
            onChange={(e) => setAvailable(e.target.checked)}
            checked={available}
            type="checkbox"
            name="available"
            className="w-5 h-5 text-blue-600 border-gray-300 rounded focus:ring-blue-400"
          />
          <label className="text-gray-700 font-medium">Available</label>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white py-4 rounded-xl font-bold text-xl tracking-wide transition-transform transform hover:scale-105 mt-4"
        >
          Add Hospital
        </button>
      </div>
    </form>
  );
};

export default AddDoctor;