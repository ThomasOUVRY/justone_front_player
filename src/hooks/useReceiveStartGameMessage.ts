import { useReceiveMessage } from "./useReceiveMessage.ts";

export const useReceiveStartGameMessage = (gameCode: string) => {
  const message = useReceiveMessage("start-game");

  if (message) {
    return message.code === gameCode ? message : undefined;
  }
};
