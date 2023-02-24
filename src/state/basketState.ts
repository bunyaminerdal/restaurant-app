import { Meal } from "../types/types";

export enum BasketActionMap {
  ADD = "ADD_TO_BASKET",
  CHANGE = "CHANGE_MEAL",
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
  totalPrice: number;
}
const calcPriceSum = (meals: Meal[]) => {
  return meals
    .map((meal) => meal.price)
    .reduce((prev, cur) => {
      return prev + cur;
    }, 0);
};
export function basketReducer(state: BasketState, action: BasketActions) {
  const { type, payload } = action;
  switch (type) {
    case BasketActionMap.ADD: //TODO: we should handle meal count
      const existsMeal1 = state.meals.find((meal) => meal.id === payload.id);
      return {
        ...state,
        meals: [
          ...state.meals.filter((meal) => meal.id !== existsMeal1?.id),
          payload,
        ],
        totalPrice:
          payload.price +
          calcPriceSum(
            state.meals.filter((meal) => meal.id !== existsMeal1?.id)
          ),
      };
    case BasketActionMap.REMOVE:
      return {
        ...state,
        meals: state.meals.filter((meal) => meal.id !== payload),
        totalPrice: calcPriceSum(
          state.meals.filter((meal) => meal.id !== payload)
        ),
      };
    case BasketActionMap.ORDER:
      return {
        ...state,
        meals: [],
        totalPrice: 0,
      };
    default:
      return state;
  }
}
