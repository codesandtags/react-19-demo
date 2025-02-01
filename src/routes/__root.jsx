import { useState } from "react";

import { createRootRoute, Outlet } from "@tanstack/react-router";

import { TanStackRouterDevtools } from "@tanstack/router-devtools";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

import PizzaOfTheDay from "../components/PizzaOfTheDay";
import Header from "../components/Header";

import { CartContext } from "../state/contexts";
import { useResizeWindow } from "../hooks/useResizeWindow";

export const Route = createRootRoute({
  component: () => {
    const cartHook = useState([]);
    const windowSize = useResizeWindow();

    return (
      <>
        <CartContext.Provider value={cartHook}>
          <div>
            <Header />
            <Outlet />
            <PizzaOfTheDay />
          </div>
        </CartContext.Provider>
        <TanStackRouterDevtools />
        <ReactQueryDevtools />
      </>
    );
  },
});
