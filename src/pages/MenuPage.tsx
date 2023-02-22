import { Divider, IconButton, TextField } from "@mui/material";
import Box from "@mui/material/Box/Box";
import Container from "@mui/material/Container";
import React from "react";
import { getIngredientList, getMealList } from "../services/restourantService";
import { Ingredient, Meal } from "../types/types";
import SearchIcon from "@mui/icons-material/Search";
import MenuItemCard from "../components/MenuItemCard";

const MenuPage = () => {
  const [mealList, setMealList] = React.useState<Meal[]>();
  const [ingredientList, setIngredientList] = React.useState<Ingredient[]>();

  React.useEffect(() => {
    getMealList()
      .then((data) => setMealList(data))
      .catch((e) => console.log(e));
    getIngredientList()
      .then((data) => setIngredientList(data))
      .catch((e) => console.log(e));
  }, []);
  const meals = React.useMemo(
    () =>
      mealList?.map((meal) => {
        return {
          ...meal,
          ingredients: meal.ingredients.map((ing) =>
            ingredientList?.find((i) => i.name === ing.name)
          ),
        };
      }),
    [ingredientList, mealList]
  );
  //TODO: add search funcionality (search by name, ingredients.name)

  //TODO: filter by vegan , vegeterian

  //TODO: sort by name

  if (!meals || !mealList || !ingredientList) return null; // TODO: add a proper loading screen or skeleton
  return (
    <Container sx={{ height: "100%" }}>
      <Container maxWidth="md" sx={{ height: { xs: "8%", md: "6%" } }}>
        <Box sx={{ display: "flex", alignItems: "flex-end" }}>
          <IconButton type="button" sx={{ p: "10px" }} aria-label="search">
            <SearchIcon />
          </IconButton>
          <TextField
            label="Search Meal"
            variant="standard"
            sx={{ width: "300px" }}
          />
        </Box>
      </Container>
      <Divider sx={{ margin: "10px 0 10px 0" }} />
      <Container
        sx={{
          height: { xs: "90%", md: "92%" },
          overflow: "auto",
          padding: "5px",
        }}
      >
        {meals?.map((meal) => {
          return <MenuItemCard meal={meal as Meal} key={meal.id} />;
        })}
      </Container>
    </Container>
  );
};

export default MenuPage;
