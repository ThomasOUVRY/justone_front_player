import { useReceiveMessage } from "../../hooks/useReceiveMessage.ts";
import { useDispatch } from "react-redux";
import { endRound } from "../../store/justOneRound.slice.ts";
import { CSSProperties } from "react";

export const Countdown = () => {
  const message = useReceiveMessage("justone-round-time");
  const roundIsEnded = message?.secondsRemaining === 0;

  const dispatch = useDispatch();

  if (roundIsEnded) {
    dispatch(endRound());
  }

  return (
    <div>
      <span className="countdown">
        <span
          style={{ "--value": message?.secondsRemaining } as CSSProperties}
        ></span>
      </span>
      {roundIsEnded && <div>Round ended !</div>}
    </div>
  );
};
