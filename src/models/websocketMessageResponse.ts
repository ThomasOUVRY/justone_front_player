import { WebSocketTopic } from "./WebSocketTopic.ts";

type JoinGameMessageResponse = {
  name: string;
  gameCode: string;
  connected: boolean;
};
type LeaveGameMessageResponse = {
  name: string;
  gameCode: string;
  connected: boolean;
};
type StartGameMessageResponse = {
  code: string;
  type: "JUST_ONE" | "IMPOSTOR";
  status: "STARTED";
};

type JustOneRoundTimeMessageResponse = { secondsRemaining: number };

type JustOneNextRoundMessageResponse = {
  currentRound: number;
  gameCode: string;
};

export type MessageResponseMap = {
  "join-game": JoinGameMessageResponse;
  "leave-game": LeaveGameMessageResponse;
  "start-game": StartGameMessageResponse;
  "justone-round-time": JustOneRoundTimeMessageResponse;
  "justone-next-round": JustOneNextRoundMessageResponse;
};

type WebsocketMessageResponse<T extends WebSocketTopic> = {
  topic: T;
  message: MessageResponseMap[T];
};

export type { WebsocketMessageResponse };