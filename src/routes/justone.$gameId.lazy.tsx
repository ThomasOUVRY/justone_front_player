import { createLazyFileRoute } from "@tanstack/react-router";
import { useDispatch, useSelector } from "react-redux";
import { BeginGameTransitionScreen } from "../components/justOne/BeginGameTransitionScreen.tsx";
import { WordToHint } from "../components/justOne/WordToHint.tsx";
import { GiveHint } from "../components/justOne/GiveHint.tsx";
import { Countdown } from "../components/justOne/Countdown.tsx";
import { RoundDisplay } from "../components/justOne/RoundDisplay.tsx";
import { EndGameScreen } from "../components/justOne/EndGameScreen.tsx";
import { isGameEnded } from "../store/justOneGame.slice.ts";
import {
  getIsGuessing,
  isRoundInTransition,
} from "../store/justOneRound.slice.ts";
import { RoundTransitionScreen } from "../components/justOne/RoundTransitionScreen.tsx";

export const Route = createLazyFileRoute("/justone/$gameId")({
  component: JustOne,
});

export function JustOne() {
  const dispatch = useDispatch();
  // const {gameId} = Route.useParams();

  const isGuessing: boolean = useSelector(getIsGuessing);
  const gameEnded = useSelector(isGameEnded);
  const roundInTransition = useSelector(isRoundInTransition);
  //
  // const roundTransitionMessage = useReceiveMessage("justone-round-transition");
  //
  // useEffect(() => {
  //   fetch(
  //     `${import.meta.env.VITE_BACKEND_URL}/games/${gameId}/justone/configure`,
  //   )
  //     .then((response) => response.json() as Promise<JustOneGameConfiguration>)
  //     .then((data) => {
  //       dispatch(
  //         initRound({
  //           roundDuration: data.roundSecondsDuration,
  //         }),
  //       );
  //       dispatch(updateGameConfig(data));
  //     });
  // }, []);
  //
  // useEffect(() => {
  //   if (roundTransitionMessage) {
  //     dispatch(startRoundTransition(roundTransitionMessage.transitionDuration));
  //     setTimeout(() => {
  //       dispatch(endRoundTransition());
  //     }, roundTransitionMessage.transitionDuration * 1000);
  //
  //     fetch("");
  //   }
  // }, [roundTransitionMessage]);

  return (
    <main className="min-h-[100dvh] w-full flex flex-col items-center justify-evenly">
      <BeginGameTransitionScreen />
      <RoundTransitionScreen />
      {/*<RoundTransitionScreen />*/}
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
