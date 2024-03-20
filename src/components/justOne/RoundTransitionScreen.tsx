import {
  getIsGuessing,
  getTransitionDuration,
  isRoundInTransition,
  updateIsGuessing,
  updateWordToGuess,
} from "../../store/justOneRound.slice.ts";
import { useDispatch, useSelector } from "react-redux";
import { CSSProperties, useEffect, useState } from "react";
import { getCurrentRound } from "../../store/justOneGame.slice.ts";
import { Route } from "../../routes/justone.$gameId.lazy.tsx";
import { RoundGuesser } from "../../models/RoundGuesser.ts";
import { useReceiveMessage } from "../../hooks/useReceiveMessage.ts";

export function RoundTransitionScreen() {
  const playerName = localStorage.getItem("name") ?? "";
  const dispatch = useDispatch();
  const { gameId } = Route.useParams();

  const currentRound = useSelector(getCurrentRound);
  const roundInTransition = useSelector(isRoundInTransition);
  const roundTransitionDuration = useSelector(getTransitionDuration);

  const [transitionTimeSpent, setTransitionTimeSpent] = useState(0);
  const roundTransitionMessage = useReceiveMessage("justone-round-transition");

  useEffect(() => {
    if (roundTransitionMessage) {
      setTransitionTimeSpent(0);
    }
  }, [roundTransitionMessage]);

  const willGuess = useSelector(getIsGuessing);

  useEffect(() => {
    if (roundInTransition) {
      fetch(
        `${import.meta.env.VITE_BACKEND_URL}/games/${gameId}/justone/round/${currentRound}`,
      )
        .then((response) => response.json())
        .then((data: RoundGuesser) => {
          dispatch(updateIsGuessing(data.playerName === playerName));
          dispatch(updateWordToGuess(data.word));
        });

      const interval = setInterval(() => {
        setTransitionTimeSpent((prev) => prev + 0.01);
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [roundInTransition]);

  if (!roundInTransition) {
    return;
  }

  return (
    <div className={"flex flex-col items-center"}>
      <div>
        <div
          className="radial-progress"
          style={
            {
              "--value": `${(transitionTimeSpent / roundTransitionDuration) * 100}`,
            } as CSSProperties
          }
          role="progressbar"
        ></div>
      </div>
      <div>La prochaine manche arrive !</div>
      {willGuess && <div>Vous allez devoir deviner</div>}
      {!willGuess && <div>Vous allez devoir faire deviner</div>}
    </div>
  );
}
