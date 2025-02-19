import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Timer from './Timer';
import './assets/main.css';
import background1 from './assets/images/background1.png';
import background2 from './assets/images/background2.png';
import background3 from './assets/images/background3.png';
import background4 from './assets/images/background4.png';

function App() {
  const backgrounds = [background1, background2, background3, background4];
  const times = [25, 35, 45, 60];

  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            <div className="flex flex-col items-center justify-center m-0 bg-white min-h-screen">
              <div className="grid grid-cols-2 gap-1 mb-0 mt-2">
                {backgrounds.map((bg, i) => (
                  <Link to={`/timer/${times[i]}`} key={i}>
                    <div
                      className="w-[140px] h-[120px] bg-cover bg-center rounded-lg border-2 border-black"
                      style={{ backgroundImage: `url(${bg})`, fontFamily: 'PressStart2P, sans-serif' }}
                    />
                  </Link>
                ))}
              </div>
              <div
                className="w-full text-xs transform scale-75 text-right text-black mt-1 pr-3"
                style={{ fontFamily: 'PressStart2P, sans-serif' }}
              >
                made by @M with love
              </div>
            </div>
          }
        />
        <Route path="/timer/:minutes" element={<Timer />} />
      </Routes>
    </Router>
  );
}

export default App;

