import { useDispatch, useSelector } from "react-redux";
import { CSSProperties, useEffect, useState } from "react";
import {
  getCurrentRound,
  updateGameConfig,
} from "../../store/justOneGame.slice.ts";
import { Route } from "../../routes/justone.$gameId.lazy.tsx";
import { RoundGuesser } from "../../models/RoundGuesser.ts";
import {
  endRoundTransition,
  getIsGuessing,
  getJustOneRound,
  updateIsGuessing,
  updateRoundGuesserConfig,
} from "../../store/justOneRound.slice.ts";
import { JustOneGameConfiguration } from "../../models/justOneGameConfig.ts";

export function BeginGameTransitionScreen() {
  const { gameId } = Route.useParams();
  const playerName = localStorage.getItem("name")!;

  const currentRound = useSelector(getCurrentRound);
  const willGuess = useSelector(getIsGuessing);
  const isFirstRound = currentRound === 1;

  const dispatch = useDispatch();
  const [transitionTimeSpent, setTransitionTimeSpent] = useState(0);
  const { transitionDuration, roundInTransition } =
    useSelector(getJustOneRound);

  useEffect(() => {
    let timerId: number;
    if (transitionDuration) {
      setTransitionTimeSpent(0);

      timerId = setInterval(() => {
        setTransitionTimeSpent((prevTimeSpent) => {
          const newTimeSpent = prevTimeSpent + 0.01;
          if (newTimeSpent >= transitionDuration) {
            clearInterval(timerId);
            dispatch(endRoundTransition());
          }
          return newTimeSpent;
        });
      }, 10);
    }

    return () => {
      if (timerId) {
        clearInterval(timerId);
      }
    };
  }, [transitionDuration]);

  useEffect(() => {
    if (isFirstRound) {
      fetch(
        `${import.meta.env.VITE_BACKEND_URL}/games/${gameId}/justone/round/1`,
      )
        .then((response) => response.json())
        .then((data: RoundGuesser) => {
          dispatch(updateIsGuessing(data.playerName === playerName));
          dispatch(
            updateRoundGuesserConfig({
              wordToGuess: data.word,
              isGuessing: data.playerName === playerName,
            }),
          );
        });
    }
  }, [dispatch, gameId, isFirstRound, playerName]);

  useEffect(() => {
    fetch(
      `${import.meta.env.VITE_BACKEND_URL}/games/${gameId}/justone/configure`,
    )
      .then((response) => response.json())
      .then((data: JustOneGameConfiguration) => {
        dispatch(updateGameConfig(data));
      });
  }, []);

  if (!isFirstRound || !roundInTransition) {
    return;
  }

  return (
    <div className={"flex flex-col items-center"}>
      <div>
        <div
          className="radial-progress"
          style={
            {
              "--value": `${(transitionTimeSpent / transitionDuration) * 100}`,
            } as CSSProperties
          }
          role="progressbar"
        ></div>
      </div>
      <div>La partie va bientôt commencer !</div>
      {willGuess && <div>Vous allez devoir deviner</div>}
      {!willGuess && <div>Vous allez devoir faire deviner</div>}
    </div>
  );
}
