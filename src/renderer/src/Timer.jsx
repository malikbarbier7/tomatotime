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
  const [sessionCount, setSessionCount] = useState(0);

  useEffect(() => {
    let interval = null;

    if (isActive && time > 0) {
      interval = setInterval(() => {
        setTime((prevTime) => prevTime - 1);
      }, 1000);
    } else if (time === 0) {
      setIsActive(false);
      if (currentType === 'work') {
        setSessionCount((prevCount) => prevCount + 1);
        handleRest();
      } else {
        handleStart();
      }
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isActive, time, currentType]);

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
    setCurrentType('work');
    setSessionCount(0);
    setBackgroundImage(getInitialBackgroundImage(initialTime));
  };

  const handleRest = () => {
    setIsActive(false);
    if (sessionCount > 0 && (sessionCount + 1) % 4 === 0) {
      setTime(15 * 60); // 15 minutes break after 4 sessions
    } else {
      setTime(5 * 60); // 5 minutes break
    }
    setCurrentType('break');
    setBackgroundImage(getInitialBackgroundImage(initialTime));
  };

  const handleSkip = () => {
    setIsActive(false);
    if (currentType === 'work') {
      if (sessionCount > 0 && (sessionCount + 1) % 4 === 0) {
        setTime(15 * 60); // Skip to a 15-minute break after 4 sessions
      } else {
        setTime(5 * 60); // Skip to a 5-minute break
      }
      setSessionCount((prevCount) => prevCount + 1);
      setCurrentType('break');
    } else {
      setTime(initialTime * 60); // Skip to the next work session
      setCurrentType('work');
    }
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
          <button onClick={handleSkip} className="bg-green-200 hover:bg-green-300 py-2 rounded">
            Skip
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

