import React, { useContext } from 'react';
import { NavLink } from 'react-router-dom';
import { AdminContext } from '../context/AdminContext';

const Sidebar = () => {


const {aToken} = useContext(AdminContext)










  const menuItems = [
    { name: 'Dashboard', path: '/admin-dashboard', icon: '📊' },
    { name: 'AddDoctor', path: '/add-doctor', icon: '👨‍⚕️' },
    { name: 'Appointments', path: '/all-appointments', icon: '📅' },
    { name: 'Doctors List', path: '/doctor-list', icon: '🧑‍🤝‍🧑' },
    { name: 'Settings', path: '/settings', icon: '⚙️' },
  ];

  return (

    <div>
        {
            aToken &&   <div className="h-screen w-64 bg-gray-800 text-white flex flex-col">
            <div className="p-6 text-2xl font-bold border-b border-gray-700">
              Admin Panel
            </div>
            <nav className="flex-1 p-4">
              <ul className="space-y-4">
                {menuItems.map((item, index) => (
                  <li key={index}>
                    <NavLink
                      to={item.path}
                      className={({ isActive }) =>
                        `flex items-center gap-4 px-4 py-2 rounded-lg transition ${
                          isActive ? 'bg-gray-700' : 'hover:bg-gray-700'
                        }`
                      }
                    >
                      <span className="text-xl">{item.icon}</span>
                      <span>{item.name}</span>
                    </NavLink>
                  </li>
                ))}
              </ul>
            </nav>
            <div className="p-4 border-t border-gray-700">
              <button className="w-full bg-red-500 hover:bg-red-600 text-white py-2 rounded-lg transition">
                Logout
              </button>
            </div>
          </div>
        
        }
    </div>


  
);
};

export default Sidebar;