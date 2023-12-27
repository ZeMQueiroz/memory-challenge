import React from "react";

import styles from "./style";
import user from "../../redux/reducers/user";

const ScoreModal = ({ isOpen, onClose, scores }) => {
  if (!isOpen) return null;

  const mockScores = [
    { user: "user1", time: "00:07:00" },
    { user: "user2", time: "00:08:00" },
    { user: "user3", time: "00:09:00" },
  ];

  return (
    <div style={styles.backdrop}>
      <div style={styles.modal}>
        <h2 style={styles.title}>High Scores</h2>
        <ul style={styles.list}>
          {mockScores?.map((score, index) => (
            <li style={styles.listItem} key={index}>
              {score.user}: {score.time}
            </li>
          ))}
        </ul>
        <button style={styles.closeButton} onClick={onClose}>
          Close
        </button>
      </div>
    </div>
  );
};

export default ScoreModal;
