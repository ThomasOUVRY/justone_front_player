import useWebSocket from "react-use-websocket";
import { WebSocketTopic } from "../models/WebSocketTopic.ts";
import {
  MessageResponseMap,
  WebsocketMessageResponse,
} from "../models/websocketMessageResponse.ts";

export const useReceiveMessage = <T extends WebSocketTopic>(
  topic: T,
): MessageResponseMap[T] | undefined => {
  const { lastJsonMessage } = useWebSocket<WebsocketMessageResponse<T>>(
    import.meta.env.VITE_WS_URL,
  );

  if (lastJsonMessage?.topic !== topic) {
    return undefined;
  }

  if (typeof lastJsonMessage.message === "string") {
    return JSON.parse(lastJsonMessage.message);
  }

  return lastJsonMessage.message;
};
