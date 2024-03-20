import { createSlice } from "@reduxjs/toolkit";

export type JustOneRoundSlice = {
  currentRound: number;
  nbRounds: number;
  gameIsEnded: boolean;
};

const justOneRoundSlice = createSlice({
  name: "justOneGame",
  initialState: {
    currentRound: 1,
  } as JustOneRoundSlice,
  reducers: {
    resetGame: (state) => {
      state.currentRound = 1;
      state.gameIsEnded = false;
    },
    updateCurrentRound: (state, action) => {
      state.currentRound = action.payload;

      if (state.currentRound > state.nbRounds) {
        state.gameIsEnded = true;
      }
    },
    updateGameConfig: (state, action) => {
      state.nbRounds = action.payload.nbRounds;
      state.currentRound = action.payload.currentRound;

      if (state.currentRound > state.nbRounds) {
        state.gameIsEnded = true;
      }
    },
  },
  selectors: {
    getGameConfig: (state): JustOneRoundSlice => state,
    getCurrentRound: (state): number => state.currentRound,
    isGameEnded: (state): boolean => state.gameIsEnded,
  },
});

export const { resetGame, updateCurrentRound, updateGameConfig } =
  justOneRoundSlice.actions;
export const { isGameEnded, getCurrentRound, getGameConfig } =
  justOneRoundSlice.selectors;
export default justOneRoundSlice.reducer;
