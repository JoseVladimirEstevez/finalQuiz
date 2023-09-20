import React, { useEffect, useState } from "react";

function Timer() {
  const [time, setTime] = useState(0);

  useEffect(() => {
    setTime(JSON.parse(localStorage.getItem("time")));
    setInterval(() => {
      console.log("tik");
      setTime((time) => time - 1)
      if (time == 0) {
        return
      }
    }, 1000);
  }, []);
  return (
    <div className="m-3 d-flex align-items-center justify-content-start">
        <h3>Time left: {time}</h3>
    </div>
  )
}

export default Timer