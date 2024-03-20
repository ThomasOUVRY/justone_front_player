import { useNavigate } from "@tanstack/react-router";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export function NavigationControl({ className }: { className?: string }) {
  const navigate = useNavigate();

  return (
    <div className={"w-full flex justify-start pt-4"}>
      <button
        className={"btn btn-primary"}
        onClick={() => navigate({ to: "/" })}
      >
        <FontAwesomeIcon
          className={className}
          icon={["fas", "arrow-left"]}
          color={"text-primary-content"}
        ></FontAwesomeIcon>
        Acceuil
      </button>
    </div>
  );
}
