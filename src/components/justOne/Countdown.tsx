import { useReceiveMessage } from "../../hooks/useReceiveMessage.ts";
import { useDispatch } from "react-redux";
import { endRound } from "../../store/justOneRound.slice.ts";
import { CSSProperties } from "react";

export const Countdown = () => {
  const message = useReceiveMessage("justone-round-time");
  const roundIsEnded = message?.secondsRemaining == 0;

  const dispatch = useDispatch();

  if (message && roundIsEnded) {
    dispatch(endRound());
  }

  return (
    <label className={"swap"}>
      <input type="checkbox" checked={roundIsEnded} readOnly />
      <div className={`flex flex-col gap-2 swap-off items-center`}>
        <span className="countdown text-4xl text-primary">
          <span
            style={{ "--value": message?.secondsRemaining } as CSSProperties}
          ></span>
        </span>
        <span className="text-4xl">secondes restantes !</span>
      </div>
      <div className={`text-4xl swap-on text-center`}>Fin de la manche !</div>
    </label>
  );
};
