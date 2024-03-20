import { useNavigate } from "@tanstack/react-router";
import { useDispatch } from "react-redux";
import { resetRound } from "../../store/justOneRound.slice.ts";
import { resetGame } from "../../store/justOneGame.slice.ts";

export function EndGameScreen() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const goToHome = () => {
    dispatch(resetGame());
    dispatch(resetRound());
    navigate({ to: "/" });
  };

  return (
    <div
      className={
        "bg-primary-content p-10 m-auto rounded-3xl flex flex-col gap-4"
      }
    >
      <h1 className={"text-5xl"}>La partie est terminée</h1>
      <button className={"btn btn-primary"} onClick={goToHome}>
        Retour à l'accueil
      </button>
    </div>
  );
}
