import { createRoot } from "react-dom/client";
import App from "./App/index.tsx";
import styles from "./styles.module.css";
import { getPageData } from "./shared/data.ts";

// Prevent this CSS module from being tree-shaken. Since it is actually just
// global styles, it shouldn't be a module per Vite's default behavior. But I'm
// leaving it at such to match original source code.
console.log(styles);

const domRoot = document.getElementById("app");
if (!domRoot) throw new Error("No root element found");

const reactRoot = createRoot(domRoot);
reactRoot.render(<App videos={getPageData()} />);
