import React from "react";
import { useParams } from "react-router-dom";
import MealItemCard from "../components/MealItemCard";
import { getMealById } from "../services/restourantService";
import { Meal } from "../types/types";

const MealPage = () => {
  const { mealId } = useParams();
  const [meal, setMeal] = React.useState<Meal>();
  React.useEffect(() => {
    if (mealId)
      getMealById(mealId)
        .then((data) => setMeal(data))
        .catch((e) => console.log(e));
  }, [mealId]);
  if (!meal) return null;
  return (
    <div>
      <MealItemCard meal={meal} />
    </div>
  );
};

export default MealPage;
