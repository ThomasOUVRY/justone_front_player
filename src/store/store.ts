import { configureStore } from "@reduxjs/toolkit";
import nameReducer from "./name.slice";
import justOneRoundReducer from "./justOneRound.slice";
import justOneGameReducer from "./justOneGame.slice";

export const store = configureStore({
  reducer: {
    name: nameReducer,
    justOneRound: justOneRoundReducer,
    justOneGame: justOneGameReducer,
  },
});
