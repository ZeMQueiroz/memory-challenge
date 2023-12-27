import React from "react";

import styles from "./style";

const LogoutButton = ({ handleLogout }) => {
  return (
    <div style={styles.container}>
      <button onClick={handleLogout} style={styles.button}>
        Logout
      </button>
    </div>
  );
};

export default LogoutButton;
