import { createLazyFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect } from "react";
import { useReceiveStartGameMessage } from "../hooks/useReceiveStartGameMessage.ts";
import { useSendMessage } from "../hooks/useSendMessage.ts";
import { NavigationControl } from "../components/shared/NavigationControl.tsx";
import { RoundTransitionScreen } from "../components/justOne/RoundTransitionScreen.tsx";
import { useReceiveMessage } from "../hooks/useReceiveMessage.ts";
import { useDispatch, useSelector } from "react-redux";
import {
  endRoundTransition,
  isRoundInTransition,
  startRoundTransition,
} from "../store/justOneRound.slice.ts";

export const Route = createLazyFileRoute("/hub/$gameId")({
  component: Hub,
});

function Hub() {
  const navigate = useNavigate();
  const { gameId } = Route.useParams();
  const name =
    localStorage.getItem("name") ?? "todo, rediriger vers la page de login";

  const dispatch = useDispatch();

  const sendLeaveMessage = useSendMessage("leave-game");
  const gameStartedMessage = useReceiveStartGameMessage(gameId);

  const startGameRoundTransitionmessage = useReceiveMessage(
    "justone-round-transition",
  );
  const isInRoundTransition = useSelector(isRoundInTransition);

  useEffect(() => {
    if (startGameRoundTransitionmessage) {
      dispatch(
        startRoundTransition(
          startGameRoundTransitionmessage.transitionDuration,
        ),
      );
      setTimeout(() => {
        dispatch(endRoundTransition());
        navigate({ to: "/justone/$gameId", params: { gameId } });
      }, startGameRoundTransitionmessage.transitionDuration * 1000);
    }
  }, [startGameRoundTransitionmessage]);

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
      {!isInRoundTransition && (
        <>
          <NavigationControl className={"justify-self-start"} />
          <div
            className={"flex-1 flex flex-col items-center justify-center gap-8"}
          >
            <h1
              className={
                "card bg-primary-content border-primary border-2 p-4 text-4xl w-full"
              }
            >
              Code de la partie <span className={"text-5xl"}>{gameId}</span>
            </h1>

            <h2 className={"text-3xl"}>
              Veuillez attendre que le maitre de jeu lance la partie
            </h2>
          </div>
        </>
      )}
      {isInRoundTransition && <RoundTransitionScreen />}
    </main>
  );
}
