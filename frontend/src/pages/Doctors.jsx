import React, { useContext, useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { AppContext } from '../context/AppContext';

const Doctors = () => {
  const { disease } = useParams();
  const navigate = useNavigate();
  const [filterDoc, setFilterDoc] = useState([]);
  const { hospitals } = useContext(AppContext);

  const applyFilter = () => {
    if (disease) {
      setFilterDoc(hospitals.filter(doc => doc.disease === disease));
    } else {
      setFilterDoc(hospitals);
    }
  };

  useEffect(() => {
    applyFilter();
  }, [hospitals, disease]);

  return (
    <div className="p-6 text-gray-900">
      <p className="text-xl font-semibold text-center mb-4">Browse through Hospitals Based on Disease</p>

      <div className="flex flex-col md:flex-row gap-6">
        {/* Disease Filters */}
        <div className="md:w-1/4 p-4 border-r border-gray-300">
  <p className="font-medium text-lg mb-4 text-gray-800">Select Disease:</p>
  <div className="flex flex-col gap-5">
    {["Viral Disease", "Heart Problem", "Respiratory Disease", "Skin Diseases", "Common Cold", "Sun-Stroke"].map((dis, index) => (
      <button
        key={index}
        className="px-4 py-2 text-sm font-medium text-gray-900 bg-gray-100 border border-gray-300 rounded-lg 
        hover:bg-emerald-800 hover:text-white transition-all duration-300 ease-in-out active:scale-95 focus:outline-none"
        onClick={() => navigate(`/doctors/${dis}`)}
      >
        {dis}
      </button>
    ))}
  </div>
</div>


        {/* Hospital List */}
        <div className="md:w-3/4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filterDoc.length > 0 ? (
            filterDoc.map((item, index) => (
              <div
                onClick={() => navigate(`/appointment/${item._id}`)}
                key={index}
                className="border border-blue-200 rounded-xl overflow-hidden cursor-pointer hover:-translate-y-2 transition-all duration-500"
              >
                <img className="bg-blue-50 w-full h-60 object-cover" src={item.image} alt="" />
                <div className="p-4">
                  <div className="flex items-center gap-2 text-sm text-green-500">
                    <p className="w-2 h-2 bg-green-500 rounded-full"></p>
                    <p>Opened</p>
                  </div>
                  <p className="text-lg font-medium">{item.name}</p>
                  <p className="text-sm text-gray-600">{item.disease}</p>
                </div>
              </div>
            ))
          ) : (
            <p className="text-center text-gray-500 col-span-full">No hospitals found for this disease.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Doctors;
