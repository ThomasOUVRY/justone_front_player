import useWebSocket from "react-use-websocket";
import { WebSocketTopic } from "../models/WebSocketTopic";
import { MessageBodyMap } from "../models/websocketMessageBody.ts";

export const useSendMessage = <T extends WebSocketTopic>(
  topic: T,
): ((message: MessageBodyMap[T]) => void) => {
  const { sendMessage } = useWebSocket(import.meta.env.VITE_WS_URL);

  return (message: unknown): void => {
    sendMessage(
      JSON.stringify({
        topic,
        message,
      }),
    );
  };
};
