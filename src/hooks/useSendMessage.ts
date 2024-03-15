import useWebSocket from "react-use-websocket";
import { WebsocketTopic } from "../models/websocketMessage.ts";

export const useSendMessage = (
  topic: WebsocketTopic,
): ((message: unknown) => void) => {
  const { sendMessage } = useWebSocket(import.meta.env.VITE_WS_URL);

  return (message: unknown): void => {
    console.log("sendMessage", JSON.stringify({ topic, message }));
    sendMessage(
      JSON.stringify({
        topic,
        message,
      }),
    );
  };
};
