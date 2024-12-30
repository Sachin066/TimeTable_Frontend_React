import React from 'react';
import './MasterData.css';
import { useNavigate } from 'react-router-dom';

const MasterData = () => {
  const navigate = useNavigate();

  const handleNavigation = (path) => {
    navigate(path);
  };

  return (
    <div className="w-full max-w-4xl mx-auto p-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 bg-transparent console.log('MasterData component rendered');
console.log('Navigation paths:', ['/Classroom', '/Professor']);  ">

      {/* Top Row */}
      <div
        className="h-16 bg-blue-500 flex items-center justify-center shadow text-white font-bold rounded cursor-pointer hover:bg-blue-600 transition"
        onClick={() => handleNavigation('/Classroom')}
      >
        Classroom
      </div>
      <div
        className="h-16 shadow bg-blue-500 flex items-center justify-center text-white font-bold rounded cursor-pointer hover:bg-blue-600 transition"
        onClick={() => handleNavigation('/Professor')}
      >
        Professor
      </div>
      <div
        className="h-16 shadow bg-blue-500 flex items-center justify-center text-white font-bold rounded cursor-pointer hover:bg-blue-600 transition"
        onClick={() => handleNavigation('/Year')}
      >
        Year
      </div>

      {/* Bottom Row */}
      <div
        className="h-16 shadow bg-blue-500 flex items-center justify-center text-white font-bold rounded cursor-pointer hover:bg-blue-600 transition"
        onClick={() => handleNavigation('/TimeSlot')}
      >
        TimeSlot
      </div>
      <div
        className="h-16 shadow bg-blue-500 flex items-center justify-center text-white font-bold rounded cursor-pointer hover:bg-blue-600 transition"
      >
        Shift
      </div>
      <div
        className="h-16 shadow bg-blue-500 flex items-center justify-center text-white font-bold rounded cursor-pointer hover:bg-blue-600 transition"
      >
        Division
      </div>
    </div>
  );
};

export default MasterData;
