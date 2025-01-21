import { createRoot } from "react-dom/client";
import App from "./App/index.tsx";
import videos from "video-data";

const domRoot = document.getElementById("root");
if (!domRoot) throw new Error("No root element found");

const reactRoot = createRoot(domRoot);
reactRoot.render(<App videos={videos} />);
