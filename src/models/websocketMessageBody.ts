import { WebSocketTopic } from "./WebSocketTopic.ts";

type JoinGameMessageBody = {
  name: string;
  gameCode: string;
};
type LeaveGameMessageBody = {
  name: string;
  gameCode: string;
};
type StartGameMessageBody = {
  code: string;
  type: "JUST_ONE" | "IMPOSTOR";
  status: "STARTED";
};

type JustOneRoundTimeMessageBody = { secondsRemaining: number };

type JustOneNextRoundMessageBody = Record<string, never>;

export type MessageBodyMap = {
  "join-game": JoinGameMessageBody;
  "leave-game": LeaveGameMessageBody;
  "start-game": StartGameMessageBody;
  "justone-round-time": JustOneRoundTimeMessageBody;
  "justone-next-round": JustOneNextRoundMessageBody;
};

export type WebsocketMessageBody<T extends WebSocketTopic> = {
  topic: T;
  message: MessageBodyMap[T];
};
