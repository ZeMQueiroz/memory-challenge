import React from "react";
import { Provider } from "react-redux";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import store from "./store";

import Login from "./screens/Login";
import Board from "./screens/Board";
import Score from "./screens/Score";

import ProtectedRoute from "./components/AuthenticatedRoute";

import "./App.css";

function App() {
  return (
    <Provider store={store}>
      <Router>
        <Routes>
          <Route path='/' element={<Login />} />
          <Route
            path='/board'
            element={
              <ProtectedRoute>
                <Board />
              </ProtectedRoute>
            }
          />
          <Route
            path='/score'
            element={
              <ProtectedRoute>
                <Score />
              </ProtectedRoute>
            }
          />
        </Routes>
      </Router>
    </Provider>
  );
}

export default App;
