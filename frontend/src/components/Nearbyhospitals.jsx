import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../context/AppContext";

const Nearbyhospitals = () => {
  const navigate = useNavigate();
  const { hospitals } = useContext(AppContext);

  const getBedsAvailable = (hospital) => hospital.bedsAvailable ?? hospital.queue ?? 0;
  const getWaitMinutes = (hospital) => hospital.estimatedWaitMins ?? hospital.travel ?? 0;

  return (
    <section className="flex flex-col items-center gap-6 my-12 text-gray-900 px-4 md:px-12 lg:px-24 container-max">
      <h1 className="text-2xl md:text-3xl font-semibold text-center">Hospitals Nearby You</h1>
      <p className="text-center text-gray-600 max-w-xl">
        Skip the guesswork — recommendations based on availability and estimated wait time.
      </p>

      <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
        {hospitals.slice(0, 9).map((item, index) => (
          <HospitalTile key={item._id} item={item} onClick={() => navigate(`/appointment/${item._id}`)} /> 
        ))}
      </div>

      <button
        onClick={() => {
          navigate("/doctors");
          scrollTo(0, 0);
        }}
        className="mt-8 btn-primary"
      >
        View All Hospitals
      </button>
    </section>
  );
};

const HospitalTile = ({ item, onClick }) => {
  const [justUpdated, setJustUpdated] = React.useState(false);
  const prev = React.useRef(item.lastUpdated);

  React.useEffect(() => {
    if (!item.lastUpdated) return;
    if (prev.current && item.lastUpdated !== prev.current) {
      setJustUpdated(true);
      const t = setTimeout(() => setJustUpdated(false), 3000);
      return () => clearTimeout(t);
    }
    prev.current = item.lastUpdated;
  }, [item.lastUpdated]);

  return (
    <div onClick={onClick} className={`card rounded-2xl transition-all duration-300 cursor-pointer overflow-hidden flex flex-col relative`}>
      <img src={item.image} alt={item.name} className="h-40 w-full object-cover" />
      {justUpdated && <div className="absolute right-3 top-3 bg-green-100 text-green-800 text-xs font-semibold px-2 py-1 rounded">Live</div>}
      <div className="p-4 flex flex-col gap-2 flex-grow">
        <div className="flex items-center gap-2 text-sm text-green-600 font-medium">
          <span className={`w-2 h-2 rounded-full inline-block ${item.available ? 'bg-green-500' : 'bg-gray-300'}`} />
          <span>{item.available ? 'Open Now' : 'Currently Closed'}</span>
        </div>
        <h2 className="text-lg font-semibold">{item.name}</h2>
        <p className="text-gray-500 text-sm">{item.disease}</p>

        <div className="flex items-center justify-between mt-3 text-sm">
          <p className="text-gray-700 font-medium">
            Total time: {Number(item.bedsAvailable ?? item.queue ?? 0) + Number(item.estimatedWaitMins ?? item.travel ?? 0)} mins
            <span className="text-xs text-gray-400 ml-2">(Beds + Wait)</span>
          </p>
          <p className="text-yellow-600 font-semibold">⭐ {item.rating || 0}</p>
        </div>

        <button className="mt-4 btn-primary text-sm w-fit">
          Book Now
        </button>
      </div>
    </div>
  );
}

export default Nearbyhospitals;
