import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isPaused: false,
  highScores: [],
};

const gameSlice = createSlice({
  name: "game",
  initialState,
  reducers: {
    pauseGame: (state) => {
      state.isPaused = true;
    },
    resumeGame: (state) => {
      state.isPaused = false;
    },
    addHighScore: (state, action) => {
      state.highScores.push(action.payload);
    },
  },
});

export const { pauseGame, resumeGame, addHighScore } = gameSlice.actions;

export default gameSlice.reducer;
