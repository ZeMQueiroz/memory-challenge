import React from "react";
import { Provider } from "react-redux";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import store from "./redux/store";

import Login from "./screens/Login";
import Board from "./screens/Board";

import ProtectedRoute from "./components/AuthenticatedRoute";

import "./App.css";

function App() {
  return (
    <Provider store={store}>
      <Router>
        <Routes>
          <Route path='/' element={<Login />} />
          <Route
            path='/game'
            element={
              <ProtectedRoute>
                <Board />
              </ProtectedRoute>
            }
          />
          {/* This route will also render the Board component, but the presence of 
              /game/scores in the URL will be used to trigger the modal display */}
          <Route
            path='/game/scores'
            element={
              <ProtectedRoute>
                <Board />
              </ProtectedRoute>
            }
          />
        </Routes>
      </Router>
    </Provider>
  );
}

export default App;
