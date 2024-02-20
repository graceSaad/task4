import React, { useState, useEffect } from 'react';
import './Stopwatch.css';

const Stopwatch = () => {
  const [time, setTime] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [lapCounter, setLapCounter] = useState(0);

  useEffect(() => {
    let intervalId;
    if (isRunning) {
      intervalId = setInterval(() => {
        setTime(prevTime => prevTime + 1);
      }, 1000);
    }
    return () => clearInterval(intervalId);
  }, [isRunning]);

  const handleStart = () => {
    setIsRunning(true);
    setLapCounter(lapCounter + 1);
  };

  const handleStop = () => {
    setIsRunning(false)
  };

  const handleReset = () => {
    setIsRunning(false)
    setTime(0)
    setLapCounter(0)
  };

  const formatTime = (timeInSeconds) => {
    const hours = Math.floor(timeInSeconds / 3600);
    const minutes = Math.floor((timeInSeconds % 3600) / 60);
    const seconds = timeInSeconds % 60;

    const formatNumber = (number) => {
      return number.toString().padStart(2, '0');
    };

    return `${formatNumber(hours)}:${formatNumber(minutes)}:${formatNumber(seconds)}`;
  };

  return (
    <div className='container'>
      <h1 className='sw'>Stopwatch</h1>
      <div className='display'>{formatTime(time)}</div>
      <div className='buttons'>
        {!isRunning ? (
          <button className='button' onClick={handleStart}>Start</button>
        ) : (
          <button className='button' onClick={handleStop}>Stop</button>
        )}
        <button className='button' onClick={handleReset}>Reset</button>
      </div>
      <div className='disply'>Laps: {lapCounter}</div>
    </div>
  );
};

export default Stopwatch;