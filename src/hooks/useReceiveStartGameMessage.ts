import { useReceiveMessage } from "./useReceiveMessage.ts";

export const useReceiveStartGameMessage = (gameCode: string) => {
  const message = useReceiveMessage("start-game");
  console.log(message, gameCode);

  if (message) {
    return message.code === gameCode ? message : undefined;
  }
};
