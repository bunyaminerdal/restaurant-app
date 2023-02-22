import axios from "axios";

export const getMealList = async () => {
  const { data } = await axios.get(
    "https://apis.career.otsimo.xyz/api/restaurant/listMeals"
  );
  return data;
};
export const getIngredientList = async () => {
  const { data } = await axios.get(
    "https://apis.career.otsimo.xyz/api/restaurant/listIngredients"
  );
  return data;
};

export const getMealById = async (mealId: string) => {
  const { data } = await axios.get(
    `https://apis.career.otsimo.xyz/api/restaurant/get/${mealId}`
  );
  return data;
};
