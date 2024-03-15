import { createLazyFileRoute } from "@tanstack/react-router";
import { useEffect } from "react";
import { JustOneGameConfiguration } from "../models/justOneGameConfig.ts";
import { Countdown } from "../components/justOne/Countdown.tsx";
import { GiveHint } from "../components/justOne/GiveHint.tsx";
import { useDispatch, useSelector } from "react-redux";
import { getIsGuessing, initRound } from "../store/justOneRoundSlice.ts";

export const Route = createLazyFileRoute("/justone/$gameId")({
  component: JustOne,
});

export function JustOne() {
  const dispatch = useDispatch();

  const { gameId } = Route.useParams();
  const isGuessing = useSelector(getIsGuessing);

  useEffect(() => {
    fetch(
      `${import.meta.env.VITE_BACKEND_URL}/games/${gameId}/justone/configure`,
    )
      .then((response) => response.json() as Promise<JustOneGameConfiguration>)
      .then((data) => {
        console.log("data", data);
        dispatch(
          initRound({
            roundDuration: data.roundSecondsDuration,
          }),
        );
      });
  }, []);

  return (
    <div>
      <Countdown />

      {isGuessing && <div>Guessing</div>}
      {!isGuessing && <GiveHint />}
    </div>
  );
}
