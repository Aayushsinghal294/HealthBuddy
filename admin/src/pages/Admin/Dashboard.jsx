import React from 'react';
import HospitalCard from '../../components/HospitalCard';
import { hospitals } from '../../assets/asset'; // Assuming hospital data is stored here

const Dashboard = () => {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Hospital Overview</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {hospitals.map((hospital) => (
          <HospitalCard key={hospital._id} hospital={hospital} />
        ))}
      </div>
    </div>
  );
};

export default Dashboard;