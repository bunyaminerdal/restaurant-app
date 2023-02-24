import Stack from "@mui/material/Stack";
import React from "react";
import MealItemCard from "../components/MealItemCard";
import { BasketContext } from "../state/BasketContextProvider";
import { Box, Container, Link, Typography } from "@mui/material";
import Divider from "@mui/material/Divider/Divider";
import Button from "@mui/material/Button/Button";
import { useNavigate } from "react-router-dom";
import { BasketActionMap } from "../state/basketState";

const BasketPage = () => {
  const { state, dispatch } = React.useContext(BasketContext);
  const navigate = useNavigate();

  const handleOrderNow = () => {
    navigate("/order");
    dispatch({
      type: BasketActionMap.ORDER,
    });
  };
  if (state.meals.length <= 0)
    return (
      <Container>
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          minHeight="100vh"
          flexDirection="column"
        >
          <Typography>Your Basket is empty!</Typography>
          <Link href="/menu" underline="hover">
            Go to Menu
          </Link>
        </Box>
      </Container>
    );
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
          <Typography>BASKET</Typography>
          <Stack direction="row" sx={{ alignItems: "center", gap: 1 }}>
            <Typography sx={{ fontSize: { xs: 12, md: 16 } }}>
              {"Total Price: " + state.totalPrice?.toFixed(2) + "$"}
            </Typography>
            <Button size="small" onClick={() => handleOrderNow()}>
              Order Now
            </Button>
          </Stack>
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
          {state.meals.map((meal) => {
            return <MealItemCard meal={meal} key={meal.id} />;
          })}
        </Stack>
      </Container>
    </Stack>
  );
};

export default BasketPage;
