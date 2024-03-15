import { createLazyFileRoute, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import useWebSocket from "react-use-websocket";
import { useDispatch } from "react-redux";
import { updateName } from "../store/nameSlice.ts";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export const Route = createLazyFileRoute("/register/$gameId")({
  component: Index,
});

function Index() {
  const { gameId } = Route.useParams();
  const [name, setName] = useState<string>("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { sendMessage } = useWebSocket(import.meta.env.VITE_WS_URL);

  const sendGameParticipation = async () => {
    sendMessage(
      JSON.stringify({
        topic: "join-game",
        message: {
          gameCode: gameId,
          name,
        },
      }),
    );
    dispatch(updateName(name));
    navigate({ to: "/hub/$gameId", params: { gameId } });
  };

  const onNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value);
  };

  return (
    <main className="min-h-[100dvh] w-full flex flex-col items-center justify-center">
      <FontAwesomeIcon
        icon={["fas", "arrow-left"]}
        onClick={() => navigate({ to: "/" })}
        color={"#000"}
      ></FontAwesomeIcon>

      <div className={"flex flex-col items-center justify-center p-4"}>
        <fieldset className={"w-full py-2"}>
          <legend className={"w-full"}>Votre nom</legend>
          <input
            className={"input w-full input-bordered"}
            type="text"
            onChange={onNameChange}
            value={name}
          />
        </fieldset>
        <button
          className={"mt-4 btn btn-primary btn-wide"}
          onClick={sendGameParticipation}
        >
          Rejoindre la partie
        </button>
      </div>
    </main>
  );
}
