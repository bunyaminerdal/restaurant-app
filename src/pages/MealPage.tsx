import { Button, Container, Divider, Stack } from "@mui/material";
import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import MealItemCard from "../components/MealItemCard";
import { getMealById } from "../services/restourantService";
import { Meal } from "../types/types";

const MealPage = () => {
  const navigate = useNavigate();
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
    <Stack sx={{ height: "100%" }}>
      <Container
        sx={{
          height: { xs: "8%", md: "6%" },
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Container
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Button size="small" onClick={() => navigate("/menu")}>
            Back To Menu
          </Button>
        </Container>
      </Container>

      <Divider sx={{ margin: "0 0 10px 0" }} />
      <Container
        sx={{
          height: { xs: "90%", md: "92%" },
          overflow: "auto",
          padding: "5px",
        }}
      >
        <Stack>
          <MealItemCard meal={meal} />
        </Stack>
      </Container>
    </Stack>
  );
};

export default MealPage;
