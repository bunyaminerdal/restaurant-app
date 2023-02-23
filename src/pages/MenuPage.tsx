import { Divider, Button } from "@mui/material";
import Container from "@mui/material/Container";
import React from "react";
import { getIngredientList, getMealList } from "../services/restourantService";
import { DietaryPreferencesMap, Ingredient, Meal } from "../types/types";
import SearchIcon from "@mui/icons-material/Search";
import MenuItemCard from "../components/MenuItemCard";
import Stack from "@mui/material/Stack";
import Input from "@mui/material/Input";
import InputAdornment from "@mui/material/InputAdornment";
import { SortDirectionsMap, useSortMealList } from "../hooks/useSortMealList";
import SortIcon from "@mui/icons-material/Sort";
import NorthIcon from "@mui/icons-material/North";
import SouthIcon from "@mui/icons-material/South";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import InputLabel from "@mui/material/InputLabel";

const availableDietaryPreferences = (meal: Meal) => {
  if (!meal || !meal.ingredients) return [];
  const allPreferences = meal.ingredients
    .map((ing) => ing?.groups)
    .reduce((pre, cur) => {
      if (!pre && !cur) return [];
      else return pre?.concat(cur!);
    }) as DietaryPreferencesMap[];

  let availableDietaryPreferences: DietaryPreferencesMap[] = [];
  Object.keys(DietaryPreferencesMap).forEach((v) => {
    const count = allPreferences?.filter((p) => p === v)?.length;
    if (count === meal.ingredients.length)
      return availableDietaryPreferences.push(v as DietaryPreferencesMap);
  });
  return availableDietaryPreferences;
};

const MenuPage = () => {
  const [mealList, setMealList] = React.useState<Meal[]>();
  const [ingredientList, setIngredientList] = React.useState<Ingredient[]>();
  const [searchTerm, setSearchTerm] = React.useState("");
  const [sortDir, setSortDir] = React.useState(SortDirectionsMap.normal);
  const [dietaryPreference, setDietaryPreference] = React.useState(
    DietaryPreferencesMap.none
  );

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
      mealList
        ?.map((meal) => {
          return {
            ...meal,
            ingredients: meal.ingredients.map((ing) =>
              ingredientList?.find((i) => i.name === ing.name)
            ),
          };
        })
        .map((meal) => {
          return {
            ...meal,
            dietaryPreference: availableDietaryPreferences(meal as Meal),
          };
        }),
    [ingredientList, mealList]
  );

  //TODO: search should be debounced or trigger by Enter key
  const searchedMeals = meals?.filter((meal) =>
    meal.name.toLowerCase().includes(searchTerm)
  );

  const SortedMeals = useSortMealList(searchedMeals as Meal[], sortDir);

  const filteredMeals =
    dietaryPreference !== DietaryPreferencesMap.none
      ? SortedMeals?.filter((meal) =>
          meal?.dietaryPreference?.includes(dietaryPreference)
        )
      : SortedMeals;

  const handleSortButton = () => {
    //Sorting circle normal -> asc -> desc -> normal
    switch (sortDir) {
      case SortDirectionsMap.normal:
        setSortDir(SortDirectionsMap.asc);
        break;
      case SortDirectionsMap.asc:
        setSortDir(SortDirectionsMap.desc);
        break;
      case SortDirectionsMap.desc:
        setSortDir(SortDirectionsMap.normal);
        break;
      default:
        setSortDir(SortDirectionsMap.asc);
        break;
    }
  };

  if (!mealList || !ingredientList) return null; // TODO: add a proper loading screen or skeleton
  return (
    <Stack sx={{ height: "100%" }}>
      <Container
        sx={{
          height: { xs: "26%", md: "6%" },
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Container
          sx={{
            height: "100%",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexDirection: { xs: "column-reverse", md: "row" },
          }}
        >
          <Button
            startIcon={<SortIcon />}
            endIcon={
              sortDir === SortDirectionsMap.asc ? (
                <SouthIcon />
              ) : sortDir === SortDirectionsMap.desc ? (
                <NorthIcon />
              ) : null
            }
            onClick={() => handleSortButton()}
          >
            Sort By Name
          </Button>
          <Input
            placeholder="Search Meal"
            onChange={(e) => setSearchTerm(e.target.value)}
            startAdornment={
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            }
          />
          <FormControl
            sx={{ m: 1, minWidth: 230 }}
            size="small"
            variant="standard"
          >
            <InputLabel id="demo-select-small">Dietary Preferences</InputLabel>
            <Select
              value={dietaryPreference}
              onChange={(e) =>
                setDietaryPreference(e.target.value as DietaryPreferencesMap)
              }
            >
              <MenuItem value={DietaryPreferencesMap.none}>
                <em>None</em>
              </MenuItem>
              <MenuItem value={DietaryPreferencesMap.vegan}>Vegan</MenuItem>
              <MenuItem value={DietaryPreferencesMap.vegetarian}>
                Vegetarian
              </MenuItem>
            </Select>
          </FormControl>
        </Container>
      </Container>

      <Divider sx={{ margin: "0 0 10px 0" }} />
      <Container
        sx={{
          height: { xs: "68%", md: "92%" },
          overflow: "auto",
          padding: "5px",
        }}
      >
        {filteredMeals?.map((meal) => {
          return <MenuItemCard meal={meal as Meal} key={meal.id} />;
        })}
      </Container>
    </Stack>
  );
};

export default MenuPage;
