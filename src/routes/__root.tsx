import { createRootRoute, Outlet } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/router-devtools";

export const Route = createRootRoute({
  component: () => (
    <div id="route-base" className={"w-[90%] m-auto"}>
      <Outlet />
      <TanStackRouterDevtools />
    </div>
  ),
});
