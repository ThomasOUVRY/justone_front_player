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
  "justone-round-transition": never;
};

export type WebsocketMessageBody<T extends keyof MessageBodyMap> = {
  topic: T;
  message: MessageBodyMap[T];
};
