import React from "react"
import { createRoot } from "react-dom/client"
import { App } from "./App"
import { HelloContextProvider } from "./context"
import "./index.css"

const root = createRoot(document.getElementById("root"))
root.render(
  <HelloContextProvider>
    <App />
  </HelloContextProvider>
)
