export enum DietaryPreferencesMap {
  "none" = "",
  "vegan" = "vegan",
  "vegetarian" = "vegetarian",
}
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
  groups: DietaryPreferencesMap[];
  options: IngredientOption[];
  quantity: number;
  quantity_type: string; //TODO:this should be a string union or enum if I need to use
  selectedQuality: IngredientOption | undefined;
};
export type Meal = {
  id: number;
  name: string;
  ingredients: Ingredient[];
  dietaryPreference: DietaryPreferencesMap[];
  minPrice: number;
  maxPrice: number;
  price: number;
};
