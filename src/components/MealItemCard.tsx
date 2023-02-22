import React from "react";
import {
  Button,
  Container,
  Card,
  CardContent,
  CardActions,
  Typography,
} from "@mui/material";
import { Meal } from "../types/types";
import { useLocation } from "react-router-dom";

const MealItemCard = ({ meal }: { meal: Meal }) => {
  const { pathname } = useLocation();
  const isSingleMeal = pathname?.includes("menu");
  return (
    <Container sx={{ padding: "10px" }}>
      <Card variant="outlined">
        <CardContent>
          <Typography sx={{ fontSize: { xs: 12, md: 22 } }} gutterBottom>
            {meal?.name}
          </Typography>
          <Typography sx={{ mb: 1.5 }}>adjective</Typography>
          <Typography variant="body2">
            well meaning and kindly.
            <br />
            {'"a benevolent smile"'}
          </Typography>
        </CardContent>
        {isSingleMeal ? (
          <CardActions>
            <Button size="small">Add to Basket</Button>
            <Button size="small">Order Now</Button>
          </CardActions>
        ) : null}
      </Card>
    </Container>
  );
};

export default MealItemCard;
