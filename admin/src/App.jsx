import React, { useContext } from 'react';
import { Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Dashboard from './pages/Admin/Dashboard';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { AdminContext } from './context/AdminContext';
import { DoctorContext } from './context/DoctorContext';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import AllAppointments from './pages/Admin/AllAppointments';
import AddDoctor from './pages/Admin/AddDoctor';
import DoctorsList from './pages/Admin/DoctorsList';
import HospitalStatus from './pages/Doctor/HospitalStatus';

const App = () => {
  const { aToken } = useContext(AdminContext);
  const { hToken } = useContext(DoctorContext);

  return (
    <>
      {aToken ? (
        <div className="flex bg-[#F8F9FD]">
          <Sidebar />
          <div className="flex-1">
            <Navbar />
            <div className="p-6">
              <Routes>
                <Route path ="/" element={<></>}  />
                <Route path="/admin-dashboard" element={<Dashboard />} />
                <Route path="/all-appointments" element={<AllAppointments />} />
                <Route path="/add-doctor" element={<AddDoctor />} />
                <Route path="/doctor-list" element={<DoctorsList />} />
                {/* Add other routes here */}
              </Routes>
            </div>
          </div>
        </div>
      ) : hToken ? (
        <div className="min-h-screen bg-[#F8F9FD]">
          <Navbar />
          <Routes>
            <Route path="/" element={<HospitalStatus />} />
            <Route path="*" element={<HospitalStatus />} />
          </Routes>
        </div>
      ) : (
        <Login />
      )}
      <ToastContainer />
    </>
  );
};

export default App;
