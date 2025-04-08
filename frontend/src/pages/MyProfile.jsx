import React, { useState } from "react";
import { assets } from "../assets/asset"; // Ensure this path is correct

const MyProfile = () => {
  const [userData, setUserData] = useState({
    name: "Aayush Singhal",
    image: assets.profpic,
    email: "aayush.singhal@example.com",
    phone: "+91 9876543210",
    age: 28,
    bloodGroup: "O+",
    allergies: ["Peanuts", "Pollen"],
    medicalHistory: [
      { disease: "Diabetes", status: "Ongoing", date: "2021-08-10" },
      { disease: "Hypertension", status: "Controlled", date: "2020-05-15" },
      { disease: "Covid-19", status: "Recovered", date: "2022-01-02" },
    ],
  });

  const [editMode, setEditMode] = useState(false);
  const [updatedData, setUpdatedData] = useState(userData);

  const handleChange = (e) => {
    setUpdatedData({ ...updatedData, [e.target.name]: e.target.value });
  };

  const handleSave = () => {
    setUserData(updatedData);
    setEditMode(false);
  };

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center py-10">
      <div className="w-full max-w-3xl bg-white shadow-lg rounded-lg p-6">
        
        {/* Profile Header */}
        <div className="flex items-center gap-6 border-b pb-4">
          <img
            src={userData.image}
            alt="Profile"
            className="w-24 h-24 rounded-full object-cover border-4 border-blue-500"
          />
          <div>
            {editMode ? (
              <input
                type="text"
                name="name"
                value={updatedData.name}
                onChange={handleChange}
                className="text-2xl font-semibold text-gray-900 border rounded-lg p-2 focus:outline-none focus:ring focus:ring-blue-300"
              />
            ) : (
              <h2 className="text-2xl font-semibold text-gray-900">{userData.name}</h2>
            )}
            {editMode ? (
              <input
                type="email"
                name="email"
                value={updatedData.email}
                onChange={handleChange}
                className="text-gray-500 border rounded-lg p-2 w-full focus:outline-none focus:ring focus:ring-blue-300"
              />
            ) : (
              <p className="text-gray-500">{userData.email}</p>
            )}
            {editMode ? (
              <input
                type="text"
                name="phone"
                value={updatedData.phone}
                onChange={handleChange}
                className="text-gray-500 border rounded-lg p-2 w-full focus:outline-none focus:ring focus:ring-blue-300"
              />
            ) : (
              <p className="text-gray-500">{userData.phone}</p>
            )}
          </div>
        </div>

        {/* Health Details */}
        <div className="mt-6">
          <h3 className="text-xl font-medium text-gray-800 border-b pb-2">Health Details</h3>
          <div className="grid grid-cols-2 gap-4 mt-4">
            <p className="text-gray-700">
              <strong>Age:</strong>{" "}
              {editMode ? (
                <input
                  type="number"
                  name="age"
                  value={updatedData.age}
                  onChange={handleChange}
                  className="border rounded-lg p-1 w-16 focus:outline-none focus:ring focus:ring-blue-300"
                />
              ) : (
                userData.age
              )}
            </p>
            <p className="text-gray-700">
              <strong>Blood Group:</strong> {userData.bloodGroup}
            </p>
            <p className="text-gray-700 col-span-2">
              <strong>Allergies:</strong> {userData.allergies.join(", ") || "None"}
            </p>
          </div>
        </div>

        {/* Medical History */}
        <div className="mt-6">
          <h3 className="text-xl font-medium text-gray-800 border-b pb-2">Medical History</h3>
          <div className="mt-4">
            {userData.medicalHistory.length > 0 ? (
              <ul className="space-y-3">
                {userData.medicalHistory.map((record, index) => (
                  <li key={index} className="flex justify-between items-center bg-blue-50 p-3 rounded-lg shadow-sm">
                    <div>
                      <p className="text-gray-800 font-medium">{record.disease}</p>
                      <p className="text-sm text-gray-600">Status: {record.status}</p>
                    </div>
                    <p className="text-sm text-gray-500">{record.date}</p>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-gray-600">No medical history available.</p>
            )}
          </div>
        </div>

        {/* Edit & Save Buttons */}
        <div className="mt-6 flex justify-center gap-4">
          {editMode ? (
            <>
              <button
                className="px-5 py-2 bg-green-500 text-white font-medium rounded-lg hover:bg-green-600 transition-all"
                onClick={handleSave}
              >
                Save
              </button>
              <button
                className="px-5 py-2 bg-gray-400 text-white font-medium rounded-lg hover:bg-gray-500 transition-all"
                onClick={() => setEditMode(false)}
              >
                Cancel
              </button>
            </>
          ) : (
            <button
              className="px-5 py-2 bg-blue-500 text-white font-medium rounded-lg hover:bg-blue-600 transition-all"
              onClick={() => setEditMode(true)}
            >
              Edit Profile
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default MyProfile;
