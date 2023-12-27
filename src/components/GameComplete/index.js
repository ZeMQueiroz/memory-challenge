import React from "react";
import { useSelector } from "react-redux";
import styles from "./style";

const GameComplete = ({ checkScore, handlePlayAgain }) => {
  const username = useSelector((state) => state.user.user);

  return (
    <div style={styles.container}>
      <h2>Congratulations {username}! You've won!</h2>
      <button onClick={checkScore} style={styles.button}>
        Check High Scores
      </button>
      <button onClick={handlePlayAgain} style={styles.button}>
        Restart Game
      </button>
    </div>
  );
};

export default GameComplete;
