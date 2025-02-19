import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './assets/main.css';

// Import images
import background1 from './assets/images/background1-1.png';
import background2 from './assets/images/background2-2.png';
import background3 from './assets/images/background3-3.png';
import background4 from './assets/images/background4-4.png';

function Timer() {
  const { minutes } = useParams();
  const navigate = useNavigate();
  const initialTime = parseInt(minutes, 10);

  // Determine initial background image based on initialTime
  const getInitialBackgroundImage = (time) => {
    if (time === 25) return background1;
    if (time === 35) return background2;
    if (time === 45) return background3;
    if (time === 60) return background4;
    return background1; // Default image
  };

  const [time, setTime] = useState(initialTime * 60);
  const [isActive, setIsActive] = useState(false);
  const [currentType, setCurrentType] = useState('work');
  const [backgroundImage, setBackgroundImage] = useState(getInitialBackgroundImage(initialTime));

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

  const handleStart = () => {
    setIsActive(true);
  };

  const handlePause = () => setIsActive(false);

  const handleStop = () => {
    setIsActive(false);
    setTime(initialTime * 60);
    setBackgroundImage(getInitialBackgroundImage(initialTime)); // Reset to initial image
  };

  const handleRest = () => {
    setIsActive(false);
    setTime(5 * 60); // 5 minutes break
    setCurrentType('break');
    // Keep the background image consistent with the initial timer setting
    setBackgroundImage(getInitialBackgroundImage(initialTime));
  };

  const bgStyle = {
    backgroundImage: `url(${backgroundImage})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    fontFamily: 'PressStart2P, sans-serif',
  };

  return (
    <div className="timer-container" style={bgStyle}>
      <div className={`w-full h-full rounded-lg shadow-md p-4 flex flex-col justify-between`}>
        <div className="text-5xl font-bold text-center my-4">{formatTime(time)}</div>
        <div className="text-xl font-semibold text-center mb-4 font-press">
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

