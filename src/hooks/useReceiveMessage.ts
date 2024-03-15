import useWebSocket from "react-use-websocket";
import {
  WebsocketMessage,
  WebsocketTopic,
} from "../models/websocketMessage.ts";

export const useReceiveMessage = <T>(topic: WebsocketTopic): T | undefined => {
  const { lastJsonMessage } = useWebSocket<WebsocketMessage>(
    import.meta.env.VITE_WS_URL,
  );

  console.log("lastJsonMessage", lastJsonMessage);
  return lastJsonMessage?.topic === topic
    ? (JSON.parse(lastJsonMessage.message) as T)
    : undefined;
};
