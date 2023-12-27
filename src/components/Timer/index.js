import React, { useEffect } from "react";

import styles from "./style";

const Timer = ({ timeCount, setTimeCount, timerActive }) => {
  useEffect(() => {
    let interval;

    if (timerActive) {
      interval = setInterval(() => {
        setTimeCount((prevTime) => prevTime + 1);
      }, 1000);
    }

    return () => clearInterval(interval);
  }, [timerActive, setTimeCount]);

  return (
    <div style={styles.container}>
      <div style={styles.timer}>Timer: {timeCount} seconds</div>
    </div>
  );
};

export default Timer;
