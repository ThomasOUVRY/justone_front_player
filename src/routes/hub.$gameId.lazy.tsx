import { createLazyFileRoute, useNavigate } from "@tanstack/react-router";
import { useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { getName } from "../store/nameSlice.ts";
import { useEffect } from "react";
import { useReceiveStartGameMessage } from "../hooks/useReceiveStartGameMessage.ts";
import { useSendMessage } from "../hooks/useSendMessage.ts";

export const Route = createLazyFileRoute("/hub/$gameId")({
  component: Hub,
});

function Hub() {
  const navigate = useNavigate();
  const { gameId } = Route.useParams();
  const name = useSelector(getName);

  const sendLeaveMessage = useSendMessage("leave-game");
  const gameStartedMessage = useReceiveStartGameMessage(gameId);

  useEffect(() => {
    if (
      gameStartedMessage &&
      gameStartedMessage.code === gameId &&
      gameStartedMessage.type === "JUST_ONE"
    ) {
      navigate({ to: "/justone/$gameId", params: { gameId } });
    }
  }, [gameStartedMessage]);

  const goBack = () => {
    sendLeaveMessage({
      gameCode: gameId,
      name,
    });
    navigate({ to: "/register/$gameId", params: { gameId } });
  };

  useEffect(() => {
    if (!name) {
      navigate({ to: "/register/$gameId", params: { gameId } });
    }

    const handleBeforeUnload = () => {
      sendLeaveMessage({
        gameCode: gameId,
        name,
      });
    };

    document.addEventListener("visibilitychange", () => {
      if (document.visibilityState === "hidden") {
        handleBeforeUnload();
      } else {
        sendLeaveMessage({
          gameCode: gameId,
          name,
        });
      }
    });
    window.addEventListener("beforeunload", () => handleBeforeUnload());

    return () => {
      window.removeEventListener("beforeunload", () => handleBeforeUnload());
      document.removeEventListener("visibilitychange", () =>
        handleBeforeUnload(),
      );
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <main className="min-h-[100dvh] w-full flex flex-col items-center justify-center">
      <FontAwesomeIcon
        icon={["fas", "arrow-left"]}
        onClick={goBack}
        color={"#000"}
      ></FontAwesomeIcon>
      <div className={"flex flex-col items-center justify-center p-4"}>
        <h1>
          Vous êtes connecté à la partie {gameId} en tant que {name}
        </h1>
        <h2>Veuillez attendre que le maitre de jeu lance la partie</h2>
      </div>
    </main>
  );
}
