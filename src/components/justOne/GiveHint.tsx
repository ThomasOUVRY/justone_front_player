import { useDispatch, useSelector } from "react-redux";
import { getHint, updateHint } from "../../store/justOneRoundSlice.ts";

export const GiveHint = () => {
  const dispatch = useDispatch();
  const hint = useSelector(getHint);

  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const hint = event.target.value;
    dispatch(updateHint(hint));
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Type here"
        className="input input-bordered input-info w-full max-w-xs"
        value={hint}
        onChange={onChange}
      />
    </div>
  );
};
