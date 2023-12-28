import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { loginUser } from "../../redux/reducers/user";
import { useNavigate } from "react-router-dom";

import LoginForm from "../../components/LoginForm";

import styles from "./style";

const Login = () => {
  const [username, setUsername] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(loginUser(username));
    navigate("/game");
  };

  return (
    <div style={styles.container}>
      <LoginForm
        onSubmit={handleSubmit}
        value={username}
        onChange={setUsername}
      />
    </div>
  );
};

export default Login;
