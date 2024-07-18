import React, { useState, useEffect } from 'react';

function Timer({setTimerCompleted}) {
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(30);

  useEffect(() => {
    const interval = setInterval(() => {
      if (seconds > 0) {
        setSeconds(seconds - 1);
      } else if (minutes > 0) {
        setMinutes(minutes - 1);
        setSeconds(59);
      } else {
        clearInterval(interval);
        setTimerCompleted(true)
      }
    }, 1000);

    // Cleanup the interval on unmount
    return () => {
      clearInterval(interval)
    };
  }, [minutes, seconds]);


  return (
    String(seconds).padStart(1, '0') != 0 && (
    <span>
      You will receive code within{' '}
      {`${String(minutes).padStart(1, '0')}:${String(seconds).padStart(1, '0')}`}{' '}
      sec
    </span>
    )
  );
}

export default Timer;