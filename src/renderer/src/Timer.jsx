import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './assets/main.css';

function Timer() {
  const { minutes } = useParams();
  const navigate = useNavigate();
  const initialTime = parseInt(minutes, 10);
  const [time, setTime] = useState(initialTime * 60);
  const [isActive, setIsActive] = useState(false);
  const [currentType, setCurrentType] = useState('work');

  useEffect(() => {
    let interval = null;

    if (isActive && time > 0) {
      interval = setInterval(() => {
        setTime((prevTime) => prevTime - 1);
      }, 1000);
    } else if (time === 0) {
      setIsActive(false);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isActive, time]);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleStart = () => setIsActive(true);
  const handlePause = () => setIsActive(false);
  const handleStop = () => {
    setIsActive(false);
    setTime(initialTime * 60);
  };
  const handleRest = () => {
    setIsActive(false);
    setTime(5 * 60); // 5 minutes break
    setCurrentType('break');
  };

  const bgColor = currentType === 'work' ? 'bg-blue-100' : 'bg-green-100';

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className={`w-[300px] h-[300px] ${bgColor} rounded-lg shadow-md p-4 flex flex-col justify-between`}>
        <div className="text-5xl font-bold text-center my-4">{formatTime(time)}</div>
        <div className="text-xl font-semibold text-center mb-4">
          {currentType === 'work' ? 'Work Time' : 'Break Time'}
        </div>
        <div className="grid grid-cols-3 gap-2">
          <button onClick={isActive ? handlePause : handleStart} className="bg-blue-500 text-white py-2 rounded">
            {isActive ? 'Pause' : 'Start'}
          </button>
          <button onClick={handleRest} className="bg-green-200 hover:bg-green-300 py-2 rounded">
            Rest
          </button>
          <button onClick={handleStop} className="bg-gray-300 py-2 rounded">
            Reset
          </button>
        </div>
        <button onClick={() => navigate('/')} className="bg-gray-300 py-2 rounded mt-2">
          Back
        </button>
      </div>
    </div>
  );
}

export default Timer; 