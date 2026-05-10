import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import "./App.css";
import { ClerkProvider } from "@clerk/react";
import { dark, neobrutalism, shadesOfPurple } from '@clerk/ui/themes'


createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ClerkProvider
    appearance={{
    theme: shadesOfPurple,
  }}
    >
      <App />
    </ClerkProvider>
  </StrictMode>,
);
