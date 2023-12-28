import React from "react";

import styles from "./style";

const LoginForm = ({ onSubmit, value, onChange }) => {
  return (
    <div style={styles.container}>
      <form style={styles.form} onSubmit={onSubmit}>
        <h2 style={styles.title}>Login</h2>
        <input
          style={styles.input}
          type='text'
          placeholder='Enter your username'
          value={value}
          onChange={(e) => onChange(e.target.value)}
        />
        <button style={styles.button} type='submit'>
          Submit
        </button>
      </form>
    </div>
  );
};

export default LoginForm;
