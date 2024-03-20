import { createLazyFileRoute } from "@tanstack/react-router";
import { useEffect } from "react";
import { JustOneGameConfiguration } from "../models/justOneGameConfig.ts";
import { Countdown } from "../components/justOne/Countdown.tsx";
import { GiveHint } from "../components/justOne/GiveHint.tsx";
import { useDispatch, useSelector } from "react-redux";
import {
  endRoundTransition,
  getIsGuessing,
  initRound,
  isRoundInTransition,
  startRoundTransition,
} from "../store/justOneRound.slice.ts";
import { RoundDisplay } from "../components/justOne/RoundDisplay.tsx";
import { isGameEnded, updateGameConfig } from "../store/justOneGame.slice.ts";
import { WordToHint } from "../components/justOne/WordToHint.tsx";
import { EndGameScreen } from "../components/justOne/EndGameScreen.tsx";
import { RoundTransitionScreen } from "../components/justOne/RoundTransitionScreen.tsx";
import { useReceiveMessage } from "../hooks/useReceiveMessage.ts";

export const Route = createLazyFileRoute("/justone/$gameId")({
  component: JustOne,
});

export function JustOne() {
  const dispatch = useDispatch();
  const { gameId } = Route.useParams();
  const isGuessing: boolean = useSelector(getIsGuessing);
  const gameEnded = useSelector(isGameEnded);
  const roundInTransition = useSelector(isRoundInTransition);

  const roundTransitionMessage = useReceiveMessage("justone-round-transition");

  useEffect(() => {
    fetch(
      `${import.meta.env.VITE_BACKEND_URL}/games/${gameId}/justone/configure`,
    )
      .then((response) => response.json() as Promise<JustOneGameConfiguration>)
      .then((data) => {
        dispatch(
          initRound({
            roundDuration: data.roundSecondsDuration,
          }),
        );
        dispatch(updateGameConfig(data));
      });
  }, []);

  useEffect(() => {
    if (roundTransitionMessage) {
      dispatch(startRoundTransition(roundTransitionMessage.transitionDuration));
      setTimeout(() => {
        dispatch(endRoundTransition());
      }, roundTransitionMessage.transitionDuration * 1000);

      fetch("");
    }
  }, [roundTransitionMessage]);

  return (
    <main className="min-h-[100dvh] w-full flex flex-col items-center justify-evenly">
      <RoundTransitionScreen />
      {gameEnded && <EndGameScreen />}
      {!gameEnded && !roundInTransition && (
        <>
          {
            <>
              <>
                <div className={"flex flex-col gap-8"}>
                  <RoundDisplay />
                  <Countdown />
                </div>
              </>
              <>
                {isGuessing && <div>Guessing</div>}
                {!isGuessing && (
                  <>
                    <WordToHint />
                    <GiveHint />
                  </>
                )}
              </>
            </>
          }
        </>
      )}
    </main>
  );
}
