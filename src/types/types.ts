export enum QualityMap {
  "low" = "low",
  "medium" = "medium",
  "high" = "high",
}
export type IngredientOption = {
  name: string;
  quality: QualityMap;
  price: number;
  per_amount: string;
};
export type Ingredient = {
  name: string;
  groups: string[];
  options: IngredientOption[];
  quantity: number;
  quantity_type: string; //TODO:this should be a string union or enum
};
export type Meal = {
  id: number;
  name: string;
  ingredients: Ingredient[];
};
