import { Game } from "../models/game.ts";
import { useReceiveMessage } from "./useReceiveMessage.ts";

export const useReceiveStartGameMessage = (gameCode: string) => {
  const message = useReceiveMessage<Game>("start-game");

  if (message) {
    return message.code === gameCode ? message : undefined;
  }
};
