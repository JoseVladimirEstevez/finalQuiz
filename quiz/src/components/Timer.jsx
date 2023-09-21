import React, { useEffect, useState, useRef } from "react";

function Timer({ activeQuestionIndex }) {
  const [time, setTime] = useState(0);
  const timeRef = useRef(time);

  useEffect(() => {
    const storedTime = JSON.parse(localStorage.getItem("time"));
    setTime(storedTime || 0);
    timeRef.current = storedTime || 0;
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (timeRef.current === 0) {
        return;
      } else {
        setTime((time) => time - 1);
        timeRef.current = time - 1;
      }
    }, 1000);
    return () => clearTimeout(timer);
  }, [time]);

  useEffect(() => {
    setTime(JSON.parse(localStorage.getItem("time")) || 0); // Reset the timer when the question changes
    timeRef.current = JSON.parse(localStorage.getItem("time")) || 0; // Update the timeRef.current value
  }, [activeQuestionIndex]);

  return (
    <div className="m-3 d-flex align-items-center justify-content-start">
      <h3>Time left: {time}</h3>
    </div>
  );
}

export default Timer;