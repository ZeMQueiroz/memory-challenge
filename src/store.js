import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./reducers/user";
import gameReducer from "./reducers/game";

const store = configureStore({
  reducer: {
    user: userReducer,
    game: gameReducer,
  },
});

export default store;
