import { useDispatch, useSelector } from "react-redux";
import {
  getJustOneRound,
  isRoundEnded,
  updateHint,
} from "../../store/justOneRound.slice";
import { useEffect, useState } from "react";
import { getCurrentRound } from "../../store/justOneGame.slice.ts";
import { Route } from "../../routes/justone.$gameId.lazy.tsx";

export const GiveHint = () => {
  const { gameId } = Route.useParams();
  const dispatch = useDispatch();
  const { hint } = useSelector(getJustOneRound);
  const roundIsEnded = useSelector(isRoundEnded);
  const name = localStorage.getItem("name") ?? "todo, register name";
  const currentRound = useSelector(getCurrentRound);

  const [confirmedHint, setConfirmedHint] = useState(false);

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
    <div className={"flex flex-col gap-2"}>
      {!roundIsEnded && (
        <>
          <input
            disabled={confirmedHint}
            type="text"
            placeholder="Indice..."
            className="input input-bordered input-primary w-full"
            value={hint}
            onChange={onChange}
          />
          {!confirmedHint && (
            <button
              className="btn btn-primary w-full"
              onClick={() => setConfirmedHint(true)}
            >
              Envoyer l'indice
            </button>
          )}
          {confirmedHint && (
            <button
              className="btn btn-accent w-full"
              onClick={() => setConfirmedHint(false)}
            >
              Modifier
            </button>
          )}
        </>
      )}
      {roundIsEnded && (
        <div className="flex flex-col gap-2">
          <p className="text-2xl font-bold text-center">
            Indice envoyé ! Attendez que tout le monde ait envoyé son indice
            pour passer à la phase suivante.
          </p>
        </div>
      )}
    </div>
  );
};
