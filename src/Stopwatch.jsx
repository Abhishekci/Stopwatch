import React, { useState, useRef } from 'react';
import './Stopwatch.css';

const Stopwatch = () => {
  const [time, setTime] = useState(0);
  const [running, setRunning] = useState(false);
  const [laps, setLaps] = useState([]);
  const timerRef = useRef(null);

  const startStop = () => {
    if (running) {
      clearInterval(timerRef.current);
      setRunning(false);
    } else {
      const startTime = Date.now() - time;
      timerRef.current = setInterval(() => {
        setTime(Date.now() - startTime);
      }, 100);
      setRunning(true);
    }
  };

  const reset = () => {
    clearInterval(timerRef.current);
    setTime(0);
    setLaps([]);
    setRunning(false);
  };

  const lap = () => {
    setLaps([...laps, time]);
  };

  const formatTime = (time) => {
    const milliseconds = Math.floor((time % 1000) / 100);
    const seconds = Math.floor((time / 1000) % 60);
    const minutes = Math.floor((time / (1000 * 60)) % 60);
    const hours = Math.floor((time / (1000 * 60 * 60)) % 24);

    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}.${milliseconds}`;
  };

  return (
    <div className="stopwatch">
      <div id="display">{formatTime(time)}</div>
      <div className="buttons">
        <button onClick={startStop}>{running ? 'Stop' : 'Start'}</button>
        <button onClick={reset}>Reset</button>
        <button onClick={lap} disabled={!running}>Lap</button>
      </div>
      <div className="laps">
        {laps.map((lapTime, index) => (
          <div key={index} className="lap">
            Lap {index + 1}: {formatTime(lapTime)}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Stopwatch;
