import { useDispatch, useSelector } from "react-redux";
import { getJustOneRound, updateHint } from "../../store/justOneRound.slice";
import { useEffect } from "react";
import { getName } from "../../store/name.slice.ts";
import { getCurrentRound } from "../../store/justOneGame.slice.ts";

export const GiveHint = ({ gameId }: { gameId: string }) => {
  const dispatch = useDispatch();
  const { hint, roundIsEnded } = useSelector(getJustOneRound);
  const name = useSelector(getName);
  const currentRound = useSelector(getCurrentRound);

  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const hint = event.target.value;
    dispatch(updateHint(hint));
  };

  useEffect(() => {
    if (roundIsEnded) {
      fetch(
        `${import.meta.env.VITE_BACKEND_URL}/games/${gameId}/justone/hint`,
        {
          method: "POST",
          body: JSON.stringify({
            word: hint,
            playerName: name,
            roundNb: currentRound,
          }),
          headers: {
            "Content-Type": "application/json",
          },
        },
      );
    }
  }, [roundIsEnded]);

  return (
    <input
      type="text"
      placeholder="Type here"
      className="input input-bordered input-info w-full max-w-xs"
      value={hint}
      onChange={onChange}
    />
  );
};
