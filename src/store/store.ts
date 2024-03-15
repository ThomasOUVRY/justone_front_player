import { configureStore } from "@reduxjs/toolkit";
import nameReducer from "./nameSlice";
import justOneRoundReducer from "./justOneRoundSlice";

export const store = configureStore({
  reducer: {
    name: nameReducer,
    justOneRound: justOneRoundReducer,
  },
});
