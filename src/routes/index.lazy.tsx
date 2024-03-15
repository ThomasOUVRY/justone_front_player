import { createLazyFileRoute, useNavigate } from "@tanstack/react-router";
import { ChangeEvent, useState } from "react";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { toast } from "react-toastify";

library.add(faTrash);

export const Route = createLazyFileRoute("/")({
  component: Index,
});

function Index() {
  const [gameId, setGameId] = useState<string>("");

  const navigate = useNavigate();

  const joinGame = async (): Promise<void> => {
    const gameExists = await fetchGameExists(gameId);

    if (!gameExists) {
      toast("Aucune partie avec ce code n'existe", {
        type: "error",
      });
    } else {
      await navigate({
        to: "/register/$gameId",
        params: { gameId },
      });
    }
  };

  const updateGameId = (event: ChangeEvent<HTMLInputElement>): void => {
    setGameId(event.target.value);
  };

  const fetchGameExists = async (gameId: string) => {
    const response = await fetch(
      ` ${import.meta.env.VITE_BACKEND_URL}/games/${gameId}/exist`,
    );
    return (await response.text()) === "true";
  };

  return (
    <main className="min-h-[100dvh] w-full flex flex-col items-center justify-center">
      <div className={"flex flex-col items-center justify-center p-4"}>
        <section className={"flex flex-col items-center justify-center py-2"}>
          <h1 className={"text-3xl text-primary"}>Just One</h1>
          <h2 className={"text-2xl text-secondary"}>Édition Romain</h2>
        </section>
        <fieldset className={"w-full py-2"}>
          <legend className={"w-full"}>Code de la partie</legend>
          <input
            className={"input w-full input-bordered"}
            type="text"
            onChange={updateGameId}
            value={gameId}
          />
        </fieldset>
        <button className={"mt-4 btn btn-primary btn-wide"} onClick={joinGame}>
          Rejoindre la partie
        </button>
      </div>
    </main>
  );
}
