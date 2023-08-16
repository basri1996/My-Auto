import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import { SearchCompContextProvider } from "./SearchCompContext";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <SearchCompContextProvider>
    <App />
  </SearchCompContextProvider>
);
