import React, { useState, useEffect } from 'react';

function Timer({ activeQuestionIndex }) {
  // Get time per question from localStorage
  const getTimePerQuestion = () => {
    try {
      const quizInfo = JSON.parse(localStorage.getItem('quizInfo'));
      return quizInfo.timePerQuestion || 15; // fallback to 15 if not found
    } catch (error) {
      //console.log('Error reading timePerQuestion:', error);
      return 15; // fallback value
    }
  };

  const [timeLeft, setTimeLeft] = useState(getTimePerQuestion());

  useEffect(() => {
    const timePerQuestion = getTimePerQuestion();
    setTimeLeft(timePerQuestion); // Reset timer with stored value when question changes
    
    const timer = setInterval(() => {
      setTimeLeft(prev => Math.max(0, prev - 1));
    }, 1000);

    return () => clearInterval(timer);
  }, [activeQuestionIndex]);

  // Style timer based on remaining percentage of time
  const getTimerColor = () => {
    const totalTime = getTimePerQuestion();
    const percentage = (timeLeft / totalTime) * 100;
    
    if (percentage > 66) return 'btn-success';
    if (percentage > 33) return 'btn-warning';
    return 'btn-danger';
  };

  return (
    <div className="col-12 text-center mb-3">
      <button 
        className={`btn ${getTimerColor()} rounded-pill px-4 py-2`}
        disabled
      >
        Time Remaining: {timeLeft}s
      </button>
    </div>
  );
}

export default Timer;