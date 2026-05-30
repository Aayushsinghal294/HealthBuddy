import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import HospitalCard from '../../components/HospitalCard';
import { AdminContext } from '../../context/AdminContext';

const Dashboard = () => {
  const { backendUrl } = useContext(AdminContext);
  const [hospitals, setHospitals] = useState([]);

  useEffect(() => {
    const loadHospitals = async () => {
      try {
        const { data } = await axios.get(`${backendUrl}/api/hospitals`);
        if (data.success && Array.isArray(data.hospitals)) {
          setHospitals(data.hospitals);
        }
      } catch (error) {
        console.error('Failed to load hospitals', error);
      }
    };

    loadHospitals();
  }, [backendUrl]);

  const availableCount = hospitals.filter((hospital) => hospital.available).length;
  const totalBeds = hospitals.reduce(
    (sum, hospital) => sum + Number(hospital.bedsAvailable ?? hospital.queue ?? 0),
    0
  );

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-800">Hospital Overview</h1>
        <p className="text-sm text-gray-500">Live hospital data from the backend</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="rounded-2xl bg-white p-5 shadow border">
          <p className="text-sm text-gray-500">Hospitals</p>
          <p className="text-3xl font-bold text-gray-900">{hospitals.length}</p>
        </div>
        <div className="rounded-2xl bg-white p-5 shadow border">
          <p className="text-sm text-gray-500">Open Hospitals</p>
          <p className="text-3xl font-bold text-emerald-600">{availableCount}</p>
        </div>
        <div className="rounded-2xl bg-white p-5 shadow border">
          <p className="text-sm text-gray-500">Beds Available</p>
          <p className="text-3xl font-bold text-blue-600">{totalBeds}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {hospitals.map((hospital) => (
          <HospitalCard key={hospital._id} hospital={hospital} />
        ))}
      </div>
    </div>
  );
};

export default Dashboard;