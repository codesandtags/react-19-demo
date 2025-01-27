import React from "react";
import { createRoot } from "react-dom/client";

import Pizza from "./Pizza";
import Order from "./Order";

const App = () => {
  return (
    <div>
      <h1>👋 React 19</h1>
      <Order />
    </div>
  );
};

const container = document.getElementById("root");
const root = createRoot(container);
root.render(React.createElement(App));
