import { createLazyFileRoute, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { updateName } from "../store/name.slice";
import { useSendMessage } from "../hooks/useSendMessage.ts";
import { NavigationControl } from "../components/shared/NavigationControl.tsx";
import { GameName } from "../components/shared/GameName.tsx";

export const Route = createLazyFileRoute("/register/$gameId")({
  component: Index,
});

function Index() {
  const { gameId } = Route.useParams();
  const [name, setName] = useState<string>(localStorage.getItem("name") ?? "");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const sendJoinGame = useSendMessage("join-game");

  const sendGameParticipation = async () => {
    sendJoinGame({
      gameCode: gameId,
      name,
    });
    dispatch(updateName(name));
    localStorage.setItem("name", name);
    navigate({ to: "/hub/$gameId", params: { gameId } });
  };

  const onNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value);
  };

  return (
    <main className="min-h-[100dvh] flex flex-col items-center justify-center ">
      <NavigationControl className={"justify-self-start"} />
      <div className={"flex-1 flex flex-col items-center justify-center p-4"}>
        <GameName />
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
