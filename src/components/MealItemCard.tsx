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
import { IngredientOption, Meal, QualityMap } from "../types/types";
import { useLocation, useNavigate } from "react-router-dom";
import { BasketContext } from "../state/BasketContextProvider";
import { BasketActionMap } from "../state/basketState";
import CardHeader from "@mui/material/CardHeader";
import { rangedPriceCalc } from "../pages/MenuPage";
import { Link } from "react-router-dom";

const selectedPriceCalc = (
  meal: Meal,
  ingredientName: string,
  ingredientQuality: QualityMap
) => {
  if (!meal) return 1;
  const selectedIngredientsPrice = meal.ingredients
    .map((ing) => {
      if (ing.name === ingredientName) {
        let aditionalCost = 0;
        switch (ingredientQuality) {
          case QualityMap.low:
            aditionalCost = 0.1;
            break;
          case QualityMap.medium:
            aditionalCost = 0.05;
            break;
          default:
            aditionalCost = 0;
            break;
        }
        const selectedOption = ing.options.find(
          (o) => o.quality === ingredientQuality
        ) as IngredientOption;

        return (ing.quantity / 1000) * selectedOption.price + aditionalCost;
      }
      const highOption = ing.options.find(
        (o) => o.quality === QualityMap.high
      ) as IngredientOption;
      return (ing.quantity / 1000) * highOption.price;
    })
    .reduce((prev, cur) => prev + cur, 0);
  return selectedIngredientsPrice;
};
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
      minPrice: meal.minPrice ?? rangedPriceCalc(meal, "min"),
      maxPrice: meal.maxPrice ?? rangedPriceCalc(meal, "max"),
      price: meal.price ?? rangedPriceCalc(meal, "max"),
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
    if (mealWithQualityIngredients) {
      setMealWithQualityIngredients({
        ...mealWithQualityIngredients,
        price: selectedPriceCalc(
          mealWithQualityIngredients,
          ingredientName,
          value as QualityMap
        ),
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
      if (!isSingleMeal)
        dispatch({
          type: BasketActionMap.ADD,
          payload: {
            ...mealWithQualityIngredients,
            price: selectedPriceCalc(
              mealWithQualityIngredients,
              ingredientName,
              value as QualityMap
            ),
            ingredients: mealWithQualityIngredients?.ingredients.map((ing) => {
              return {
                ...ing,
                selectedQuality:
                  ing.name === ingredientName
                    ? ing.options.find(
                        (o) => o.quality === (value as QualityMap)
                      )
                    : ing.selectedQuality,
              };
            }),
          },
        });
    }
  };
  const handleAddBasket = () => {
    if (!mealWithQualityIngredients) return;
    dispatch({
      type: BasketActionMap.ADD,
      payload: mealWithQualityIngredients,
    });
    navigate("/basket");
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
        <CardHeader
          title={
            <Typography sx={{ fontSize: { xs: 16, md: 22 } }}>
              {mealWithQualityIngredients?.name}
            </Typography>
          }
          sx={{ padding: "10px 10px 0 10px" }}
        />
        <CardContent sx={{ padding: "10px" }}>
          <Stack>
            <Typography sx={{ fontSize: { xs: 12, md: 18 } }}>
              Ingredients:
            </Typography>
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
          <CardActions sx={{ padding: "10px" }}>
            <Button size="small" onClick={() => handleAddBasket()}>
              Add to Basket
            </Button>
            <Button
              size="small"
              onClick={() => handleOrderNow()}
              sx={{ margin: "auto" }}
            >
              Order Now
            </Button>
            <Typography sx={{ fontSize: { xs: 12, md: 16 } }}>
              {"Price: " + mealWithQualityIngredients.price?.toFixed(2) + "$"}
            </Typography>
          </CardActions>
        ) : (
          <CardActions
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Button size="small" onClick={() => handleRemoveFromBasket()}>
              Remove From Basket
            </Button>
            <Typography sx={{ fontSize: { xs: 12, md: 16 } }}>
              {"Price: " + mealWithQualityIngredients.price?.toFixed(2) + "$"}
            </Typography>
          </CardActions>
        )}
      </Card>
    </Container>
  );
};

export default MealItemCard;
