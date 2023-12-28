import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isPaused: false,
  highScores: [],
};

// a Slice encapsulates the reducer logic and actions for a single feature
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
  },
});

export const { pauseGame, resumeGame } = gameSlice.actions;

export default gameSlice.reducer;
