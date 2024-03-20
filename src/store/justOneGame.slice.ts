import { createSlice } from "@reduxjs/toolkit";

export type JustOneGameSlice = {
  currentRound: number;
  nbRounds: number;
  gameIsEnded: boolean;
  roundSecondsDuration: number;
};

const justOneRoundSlice = createSlice({
  name: "justOneGame",
  initialState: {
    currentRound: 1,
  } as JustOneGameSlice,
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
      state.roundSecondsDuration = action.payload.roundSecondsDuration;
    },
  },
  selectors: {
    getGameConfig: (state): JustOneGameSlice => state,
    getCurrentRound: (state): number => state.currentRound,
    isGameEnded: (state): boolean => state.gameIsEnded,
  },
});

export const { resetGame, updateCurrentRound, updateGameConfig } =
  justOneRoundSlice.actions;
export const { isGameEnded, getCurrentRound, getGameConfig } =
  justOneRoundSlice.selectors;
export default justOneRoundSlice.reducer;
