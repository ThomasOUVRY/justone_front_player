export type GameStatus = "WAITING_FOR_PLAYERS" | "STARTED" | "FINISHED";
export type GameType = "JUST_ONE" | "IMPOSTER";

export type Game = {
  code: string;
  type: GameType;
  status: GameStatus;
};
