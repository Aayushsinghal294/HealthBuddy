import React, { useEffect, useRef, useState } from 'react';

const HospitalCard = ({ hospital }) => {
  const bedsAvailable = hospital.bedsAvailable ?? hospital.queue ?? 0;
  const waitMinutes = hospital.estimatedWaitMins ?? hospital.travel ?? 0;

  const [justUpdated, setJustUpdated] = useState(false)
  const prevUpdated = useRef(hospital.lastUpdated)

  useEffect(() => {
    const cur = hospital.lastUpdated
    if (!cur) return
    if (prevUpdated.current && cur !== prevUpdated.current) {
      setJustUpdated(true)
      const t = setTimeout(() => setJustUpdated(false), 3000)
      return () => clearTimeout(t)
    }
    prevUpdated.current = cur
  }, [hospital.lastUpdated])

  return (
    <div className={`border rounded-lg p-4 bg-white transition ${justUpdated ? 'ring-2 ring-green-300' : 'shadow-md hover:shadow-lg'}`}>
      <img
        src={hospital.image}
        alt={hospital.name}
        className="w-full h-40 object-cover rounded-md mb-4"
      />
      {justUpdated && (
        <div className="absolute right-4 top-4 bg-green-100 text-green-800 text-xs font-semibold px-2 py-1 rounded">
          Updated
        </div>
      )}
      <h3 className="text-lg font-bold text-gray-800">{hospital.name}</h3>
      <p className="text-sm text-gray-600">Disease: {hospital.disease}</p>
      <p className="text-sm text-gray-600">Beds Available: {bedsAvailable}</p>
      <p className="text-sm text-gray-600">Travel Time: {waitMinutes} mins</p>
      <p className="text-sm text-gray-600">Rating: {hospital.rating} ⭐</p>
    </div>
  );
};

export default HospitalCard;