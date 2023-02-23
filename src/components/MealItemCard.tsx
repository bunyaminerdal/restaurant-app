import React from "react";
import {
  Button,
  Container,
  Card,
  CardContent,
  CardActions,
  Typography,
  RadioGroup,
  FormControlLabel,
  Radio,
  FormControl,
  FormLabel,
  Stack,
} from "@mui/material";
import { Meal, QualityMap } from "../types/types";
import { useLocation, useNavigate } from "react-router-dom";
import { BasketContext } from "../state/BasketContextProvider";
import { BasketActionMap } from "../state/basketState";

/**
 * this component will be more proper if we use real form structure with react-hook-form
 */
const MealItemCard = ({ meal }: { meal: Meal }) => {
  const { pathname } = useLocation();
  const navigate = useNavigate();

  const { dispatch } = React.useContext(BasketContext);
  const isSingleMeal = pathname?.includes("menu");
  const [mealWithQualityIngredients, setMealWithQualityIngredients] =
    React.useState<Meal>();

  React.useEffect(() => {
    setMealWithQualityIngredients({
      ...meal,
      ingredients: meal?.ingredients.map((ing) => {
        return {
          ...ing,
          selectedQuality:
            ing.selectedQuality ??
            ing.options.find((o) => o.quality === QualityMap.high),
        };
      }),
    });
  }, [meal]);

  const handleChange = (value: string, ingredientName: string) => {
    if (mealWithQualityIngredients)
      setMealWithQualityIngredients({
        ...mealWithQualityIngredients,
        ingredients: mealWithQualityIngredients?.ingredients.map((ing) => {
          return {
            ...ing,
            selectedQuality:
              ing.name === ingredientName
                ? ing.options.find((o) => o.quality === (value as QualityMap))
                : ing.selectedQuality,
          };
        }),
      });
  };
  const handleAddBasket = () => {
    if (mealWithQualityIngredients)
      dispatch({
        type: BasketActionMap.ADD,
        payload: mealWithQualityIngredients,
      });
  };
  const handleOrderNow = () => {
    navigate("/order");
    dispatch({
      type: BasketActionMap.ORDER,
    });
  };
  const handleRemoveFromBasket = () => {
    if (mealWithQualityIngredients)
      dispatch({
        type: BasketActionMap.REMOVE,
        payload: mealWithQualityIngredients.id,
      });
  };
  if (!mealWithQualityIngredients) return null; //TODO: need proper loading
  return (
    <Container sx={{ padding: "10px" }}>
      <Card variant="outlined">
        <CardContent>
          <Typography sx={{ fontSize: { xs: 16, md: 22 } }} gutterBottom>
            {mealWithQualityIngredients?.name}
          </Typography>
          <Stack>
            {mealWithQualityIngredients?.ingredients.map((ingredient) => {
              return (
                <FormControl key={ingredient.name}>
                  <FormLabel>{ingredient.name}</FormLabel>
                  <RadioGroup
                    row
                    name="row-radio-buttons-group"
                    value={ingredient.selectedQuality?.quality}
                    onChange={(v) =>
                      handleChange(v.target.value, ingredient.name)
                    }
                  >
                    <FormControlLabel
                      sx={{ ml: 1, mb: 1 }}
                      value={QualityMap.low}
                      control={
                        <Radio
                          sx={{
                            "& .MuiSvgIcon-root": {
                              fontSize: { xs: 20, md: 26 },
                            },
                            padding: { xs: 0, md: 1 },
                          }}
                        />
                      }
                      label={
                        <Typography sx={{ fontSize: { xs: 12, md: 16 } }}>
                          {QualityMap.low + " quality"}
                        </Typography>
                      }
                    />
                    <FormControlLabel
                      sx={{ mb: 1 }}
                      value={QualityMap.medium}
                      control={
                        <Radio
                          sx={{
                            "& .MuiSvgIcon-root": {
                              fontSize: { xs: 20, md: 26 },
                            },
                            padding: { xs: 0, md: 1 },
                          }}
                        />
                      }
                      label={
                        <Typography sx={{ fontSize: { xs: 12, md: 16 } }}>
                          {QualityMap.medium + " quality"}
                        </Typography>
                      }
                    />
                    <FormControlLabel
                      sx={{ mb: 1 }}
                      value={QualityMap.high}
                      control={
                        <Radio
                          sx={{
                            "& .MuiSvgIcon-root": {
                              fontSize: { xs: 20, md: 26 },
                            },
                            padding: { xs: 0, md: 1 },
                          }}
                        />
                      }
                      label={
                        <Typography sx={{ fontSize: { xs: 12, md: 16 } }}>
                          {QualityMap.high + " quality"}
                        </Typography>
                      }
                    />
                  </RadioGroup>
                </FormControl>
              );
            })}
          </Stack>
        </CardContent>
        {isSingleMeal ? (
          <CardActions>
            <Button size="small" onClick={() => handleAddBasket()}>
              Add to Basket
            </Button>
            <Button size="small" onClick={() => handleOrderNow()}>
              Order Now
            </Button>
          </CardActions>
        ) : (
          <CardActions>
            <Button size="small" onClick={() => handleRemoveFromBasket()}>
              Remove From Basket
            </Button>
          </CardActions>
        )}
      </Card>
    </Container>
  );
};

export default MealItemCard;
