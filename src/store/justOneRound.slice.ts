import { createSlice } from "@reduxjs/toolkit";

export type JustOneRoundSlice = {
  hint: string;
  wordToGuess: string;
  isGuessing: boolean;
  roundRemainingDuration: number;
  roundIsEnded: boolean;
  roundInTransition: boolean;
  transitionDuration: number;
};

const justOneRoundSlice = createSlice({
  name: "justOneRound",
  initialState: {
    hint: "",
    isGuessing: false,
    roundIsEnded: false,
  } as JustOneRoundSlice,
  reducers: {
    startRoundTransition: (state, payload) => {
      state.roundInTransition = true;
      state.transitionDuration = payload.payload;
    },
    endRoundTransition: (state) => {
      state.roundInTransition = false;
      state.roundIsEnded = false;
      state.hint = "";
    },
    endRound: (state) => {
      state.roundIsEnded = true;
    },
    updateHint: (state, action) => {
      state.hint = action.payload;
    },
    updateIsGuessing: (state, action) => {
      state.isGuessing = action.payload;
    },
    updateRemainingDuration: (state, action) => {
      state.roundRemainingDuration = action.payload;
      if (state.roundRemainingDuration <= 0) {
        state.roundIsEnded = true;
      }
    },
    resetRound: (state) => {
      state.hint = "";
      state.roundIsEnded = false;
    },
    initRound: (state, action) => {
      state.hint = "";
      state.isGuessing = false;
      state.roundIsEnded = false;
      state.roundRemainingDuration = action.payload.roundDuration;
    },
    updateWordToGuess: (state, action) => {
      state.wordToGuess = action.payload;
    },
  },
  selectors: {
    getHint: (state): string => state.hint,
    getIsGuessing: (state): boolean => state.isGuessing,
    getRoundRemainingDuration: (state): number => state.roundRemainingDuration,
    getJustOneRound: (state): JustOneRoundSlice => state,
    isRoundEnded: (state): boolean => state.roundIsEnded,
    isRoundInTransition: (state): boolean => state.roundInTransition,
    getTransitionDuration: (state): number => state.transitionDuration,
    getWordToGuess: (state): string => state.wordToGuess,
  },
});

export const {
  endRound,
  initRound,
  updateRemainingDuration,
  updateHint,
  resetRound,
  updateIsGuessing,
  startRoundTransition,
  endRoundTransition,
  updateWordToGuess,
} = justOneRoundSlice.actions;
export const {
  getRoundRemainingDuration,
  isRoundEnded,
  getJustOneRound,
  getHint,
  getIsGuessing,
  isRoundInTransition,
  getTransitionDuration,
  getWordToGuess,
} = justOneRoundSlice.selectors;
export default justOneRoundSlice.reducer;
