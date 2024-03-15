export type WebsocketTopic = "join-game" | "leave-game" | "start-game";

export type WebsocketMessage = {
  topic: WebsocketTopic;
  message: string;
};
