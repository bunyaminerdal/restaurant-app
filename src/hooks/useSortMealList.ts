import { Meal } from "../types/types";

export enum SortDirectionsMap {
  "asc" = "asc",
  "desc" = "desc",
  "normal" = "normal",
}

/**
 * Usefull and simple way to sort an MealList by given direction
 *
 * @param mealList Meal[]
 * @param sortDirection SortDirectionsMap
 * @returns Meal[]
 */
export const useSortMealList = (
  mealList: Meal[],
  sortDirection: SortDirectionsMap
): Meal[] => {
  if (sortDirection === SortDirectionsMap.normal || !mealList) return mealList;
  return mealList.sort((a, b) => {
    let fa = a.name.toLowerCase(),
      fb = b.name.toLowerCase();
    switch (sortDirection) {
      case SortDirectionsMap.asc:
        if (fa < fb) {
          return -1;
        }
        if (fa > fb) {
          return 1;
        }
        return 0;
      case SortDirectionsMap.desc:
        if (fa < fb) {
          return 1;
        }
        if (fa > fb) {
          return -1;
        }
        return 0;
      default:
        return 0;
    }
  });
};
