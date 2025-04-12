import React from 'react';

const HospitalCard = ({ hospital }) => {
  return (
    <div className="border border-gray-300 rounded-lg shadow-md p-4 bg-white hover:shadow-lg transition">
      <img
        src={hospital.image}
        alt={hospital.name}
        className="w-full h-40 object-cover rounded-md mb-4"
      />
      <h3 className="text-lg font-bold text-gray-800">{hospital.name}</h3>
      <p className="text-sm text-gray-600">Disease: {hospital.disease}</p>
      <p className="text-sm text-gray-600">Beds Available: {hospital.queue}</p>
      <p className="text-sm text-gray-600">Travel Time: {hospital.travel} mins</p>
      <p className="text-sm text-gray-600">Rating: {hospital.rating} ⭐</p>
    </div>
  );
};

export default HospitalCard;