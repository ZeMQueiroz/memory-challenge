import React, { useEffect } from "react";

import styles from "./style";

const Timer = ({ timeCount, setTimeCount, timerActive, isPaused }) => {
  const timerDisplay = isPaused
    ? "Timer: Paused"
    : `Timer: ${timeCount} seconds`;

  useEffect(() => {
    let interval;

    if (!isPaused && timerActive) {
      interval = setInterval(() => {
        setTimeCount((prevTime) => prevTime + 1);
      }, 1000);
    }

    return () => clearInterval(interval);
  }, [timerActive, setTimeCount, isPaused]);

  return (
    <div style={styles.container}>
      <div style={styles.timer}>{timerDisplay}</div>
    </div>
  );
};

export default Timer;
