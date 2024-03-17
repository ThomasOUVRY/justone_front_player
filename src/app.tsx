import ReactDOM from "react-dom/client";
import { createRouter, RouterProvider } from "@tanstack/react-router";
import "./index.css";
import "react-toastify/dist/ReactToastify.css";
import "./utils/icons.ts";

// Import the generated route tree
import { routeTree } from "./routeTree.gen";
import { Provider } from "react-redux";
import { store } from "./store/store.ts";
import { ToastContainer } from "react-toastify";

// Create a new router instance
const router = createRouter({ routeTree });

// Register the router instance for type safety
declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

// Render the app
const rootElement = document.getElementById("app")!;
if (!rootElement.innerHTML) {
  const root = ReactDOM.createRoot(rootElement);

  root.render(
    <Provider store={store}>
      <ToastContainer />
      <RouterProvider router={router} />
    </Provider>,
  );
}
