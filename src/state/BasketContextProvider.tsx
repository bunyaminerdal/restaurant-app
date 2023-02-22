import React from "react";
import { BasketActions, basketReducer, BasketState } from "./basketState";

export const BasketContext = React.createContext(
  {} as { state: BasketState; dispatch: React.Dispatch<BasketActions> }
);

export default function BasketContextProvider({
  children,
}: {
  children: JSX.Element;
}) {
  const [state, dispatch] = React.useReducer(basketReducer, { meals: [] });
  return (
    <BasketContext.Provider value={{ state, dispatch }}>
      {children}
    </BasketContext.Provider>
  );
}
