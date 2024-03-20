import { useSelector } from "react-redux";
import { getWordToGuess } from "../../store/justOneRound.slice.ts";

export function WordToHint() {
  const wordToGuess = useSelector(getWordToGuess);

  return (
    <div className={"text-3xl"}>
      Vous devez faire deviner le mot
      <br />
      <span className={"text-primary"}>{wordToGuess}</span>
    </div>
  );
}
