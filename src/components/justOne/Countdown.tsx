/*
    This component is responsible for displaying the countdown
    and the round ended message.

    On the end of the round, the component should display the hint given by the player (stored in the store).
 */
import { useDispatch, useSelector } from "react-redux";
import {
  getJustOneRound,
  updateRoundDuration,
} from "../../store/justOneRoundSlice.ts";
import { useEffect } from "react";

export const Countdown = () => {
  const { roundRemainingDuration, roundIsEnded } = useSelector(getJustOneRound);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!roundIsEnded) {
      const interval = setInterval(() => {
        dispatch(updateRoundDuration(roundRemainingDuration - 1));
      }, 1000);

      return () => clearInterval(interval);
    }
  }, [roundRemainingDuration]);

  return (
    <div>
      <span className="countdown">
        <span style={{ "--value": roundRemainingDuration }}></span>
      </span>
      {roundIsEnded && <div>Round ended !</div>}
    </div>
  );
};
