import { createRoot } from "react-dom/client";
import App from "./App/index.tsx";
import "./styles.module.css";
import { getPageData } from "./shared/data.ts";

const domRoot = document.getElementById("app");
if (!domRoot) throw new Error("No root element found");

const reactRoot = createRoot(domRoot);
reactRoot.render(<App videos={getPageData()} />);
