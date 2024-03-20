import { useReceiveMessage } from "../../hooks/useReceiveMessage.ts";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getGameConfig,
  updateCurrentRound,
} from "../../store/justOneGame.slice.ts";

export function RoundDisplay() {
  const nextRoundMessage = useReceiveMessage("justone-next-round");

  const { currentRound, nbRounds, gameIsEnded } = useSelector(getGameConfig);
  const dispatch = useDispatch();

  useEffect(() => {
    if (nextRoundMessage) {
      dispatch(updateCurrentRound(nextRoundMessage.currentRound));
    }
  }, [nextRoundMessage]);

  return (
    <>
      {!gameIsEnded && (
        <div className="flex justify-center items-center gap-2">
          <p className="text-5xl font-bold">{currentRound}</p>
          <p className="text-4xl font-bold">/ {nbRounds}</p>
        </div>
      )}
      {gameIsEnded && (
        <div className="flex justify-center items-center">
          <p className="text-3xl font-bold">Fin de la partie !</p>
        </div>
      )}
    </>
  );
}
