import React from "react";
import { useSelector } from "react-redux";

import styles, { topScores } from "./style";

const ScoreModal = ({ isOpen, onClose }) => {
  const scores = useSelector((state) => state.game.highScores);
  console.log("🚀🚀 ~  file: index.js:8 ~  ScoreModal ~  scores:", scores);

  if (!isOpen) return null;

  const renderList = () => {
    return (
      <div style={styles.listContainer}>
        <ul style={styles.list}>
          {listHeader()}
          {listItem()}
        </ul>
      </div>
    );
  };

  const listItem = () => {
    return scores.map((score, index) => {
      let style = styles.listItem;
      if (index === 0) style = { ...style, ...topScores.gold };
      else if (index === 1) style = { ...style, ...topScores.silver };
      else if (index === 2) style = { ...style, ...topScores.bronze };

      return (
        <li style={style} key={index}>
          <div style={styles.listName}>{score.username}</div>
          <div style={styles.listTime}>{score.time}</div>
        </li>
      );
    });
  };

  const listHeader = () => {
    return (
      <li style={styles.listItemHeader}>
        <h3 style={styles.listName}>Username</h3>
        <h3 style={styles.listTime}>Time</h3>
      </li>
    );
  };

  return (
    <div style={styles.backdrop}>
      <div style={styles.modal}>
        <h2 style={styles.title}>High Scores</h2>
        {renderList()}
        <button style={styles.closeButton} onClick={onClose}>
          Close
        </button>
      </div>
    </div>
  );
};

export default ScoreModal;
