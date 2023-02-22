import { Meal } from "../types/types";

export enum BasketActionMap {
  ADD = "ADD_TO_BASKET",
  REMOVE = "REMOVE_FROM_BASKET",
  ORDER = "ORDER_NOW",
}

type AddAction = {
  type: BasketActionMap.ADD;
  payload: Meal;
};
type RemoveAction = {
  type: BasketActionMap.REMOVE;
  payload: number;
};
type OrderNowAction = {
  type: BasketActionMap.ORDER;
  payload?: never;
};

export type BasketActions = AddAction | RemoveAction | OrderNowAction;

export interface BasketState {
  meals: Meal[];
}

export function basketReducer(state: BasketState, action: BasketActions) {
  const { type, payload } = action;
  switch (type) {
    case BasketActionMap.ADD:
      return {
        ...state,
        meals: [...state.meals, payload],
      };
    case BasketActionMap.REMOVE:
      return {
        ...state,
        meals: state.meals.filter((meal) => meal.id !== payload),
      };
    case BasketActionMap.ORDER:
      return {
        ...state,
        meals: [],
      };
    default:
      return state;
  }
}
