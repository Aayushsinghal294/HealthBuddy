import React, { useContext } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { AppContext } from "../context/AppContext";

const SearchResults = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { disease } = location.state || {};
  const { hospitals } = useContext(AppContext);

  const matchedHospitals = hospitals
    .filter((h) => h.disease === disease)
    .sort((a, b) => {
      const queueA = Number(a.bedsAvailable ?? a.queue ?? 0);
      const queueB = Number(b.bedsAvailable ?? b.queue ?? 0);
      const travelA = Number(a.estimatedWaitMins ?? a.travel ?? 0);
      const travelB = Number(b.estimatedWaitMins ?? b.travel ?? 0);
      const totalA = queueA + travelA;
      const totalB = queueB + travelB;
      if (totalA === totalB) {
        return parseFloat(b.rating) - parseFloat(a.rating);
      }
      return totalA - totalB;
    });

  return (
    <div className="px-6 md:px-28 py-10">
      <h2 className="text-2xl font-semibold mb-6 text-center">
        Hospitals for: <span className="text-[var(--primary-500)]">{disease}</span>
      </h2>

      {matchedHospitals.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {matchedHospitals.map((item, i) => (
            <SearchHospitalTile key={item._id} item={item} onClick={() => navigate(`/appointment/${item._id}`)} />
          ))}
        </div>
      ) : (
        <p className="text-center text-red-600 text-lg font-medium">
          No hospitals found for <span className="text-black">{disease}</span>
        </p>
      )}
    </div>
  );
};

export default SearchResults;

const SearchHospitalTile = ({ item, onClick }) => {
  const [justUpdated, setJustUpdated] = React.useState(false)
  const prev = React.useRef(item.lastUpdated)

  React.useEffect(() => {
    if (!item.lastUpdated) return
    if (prev.current && item.lastUpdated !== prev.current) {
      setJustUpdated(true)
      const t = setTimeout(() => setJustUpdated(false), 3000)
      return () => clearTimeout(t)
    }
    prev.current = item.lastUpdated
  }, [item.lastUpdated])

  return (
    <div onClick={onClick} className="card rounded-xl overflow-hidden cursor-pointer hover:-translate-y-1 transition-transform duration-300 relative">
      <img src={item.image} alt={item.name} className="w-full h-44 sm:h-56 object-cover" />
      {justUpdated && <div className="absolute right-3 top-3 bg-green-100 text-green-800 text-xs font-semibold px-2 py-1 rounded">Live</div>}
      <div className="p-4">
        <div className="flex items-center gap-2 text-sm text-green-600 font-medium">
          <span className="w-2 h-2 bg-green-500 rounded-full inline-block" />
          <span>{item.available ? 'Open Now' : 'Closed'}</span>
        </div>
        <p className="text-lg font-semibold mt-2">{item.name}</p>
        <p className="text-sm text-gray-500">{item.disease}</p>

        <div className="flex items-center justify-between mt-3">
          <p className="text-sm text-gray-700 font-medium">
            Total time: {(Number(item.queue) || 0) + (Number(item.travel) || 0)} mins
            <span className="text-xs text-gray-400 ml-2">(Queue + Travel)</span>
          </p>
          <p className="text-sm text-yellow-600 font-semibold">⭐ {item.rating || 0}</p>
        </div>
      </div>
    </div>
  )
}
