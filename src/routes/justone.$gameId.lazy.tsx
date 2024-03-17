import { createLazyFileRoute } from "@tanstack/react-router";
import { useEffect } from "react";
import { JustOneGameConfiguration } from "../models/justOneGameConfig.ts";
import { Countdown } from "../components/justOne/Countdown.tsx";
import { GiveHint } from "../components/justOne/GiveHint.tsx";
import { useDispatch, useSelector } from "react-redux";
import { getIsGuessing, initRound } from "../store/justOneRound.slice.ts";
import { RoundDisplay } from "../components/justOne/RoundDisplay.tsx";

export const Route = createLazyFileRoute("/justone/$gameId")({
  component: JustOne,
});

export function JustOne() {
  const dispatch = useDispatch();

  const { gameId } = Route.useParams();
  const isGuessing: boolean = useSelector(getIsGuessing);

  useEffect(() => {
    fetch(
      `${import.meta.env.VITE_BACKEND_URL}/games/${gameId}/justone/configure`,
    )
      .then((response) => response.json() as Promise<JustOneGameConfiguration>)
      .then((data) => {
        dispatch(
          initRound({
            roundDuration: data.roundSecondsDuration,
          }),
        );
      });
  }, []);

  return (
    <div>
      <RoundDisplay />
      <Countdown />

      {isGuessing && <div>Guessing</div>}
      {!isGuessing && <GiveHint gameId={gameId} />}
    </div>
  );
}
