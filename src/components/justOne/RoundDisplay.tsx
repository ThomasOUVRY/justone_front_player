import { useReceiveMessage } from "../../hooks/useReceiveMessage.ts";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getCurrentRound,
  updateCurrentRound,
} from "../../store/justOneGame.slice.ts";

export function RoundDisplay() {
  const nextRoundMessage = useReceiveMessage("justone-next-round");
  const currentRound = useSelector(getCurrentRound);
  const dispatch = useDispatch();

  useEffect(() => {
    if (nextRoundMessage) {
      dispatch(updateCurrentRound(nextRoundMessage.currentRound));
    }
  }, [nextRoundMessage]);

  return (
    <div className="flex justify-center items-center">
      <div className="flex justify-center items-center w-12 h-12 bg-white rounded-full">
        <p className="text-3xl font-bold">{currentRound}</p>
      </div>
      <p className="text-2xl font-bold ml-2">/ 30</p>
    </div>
  );
}
