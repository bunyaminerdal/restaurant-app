import React from "react";
import { Box, Button, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

const HomePage = () => {
  const navigate = useNavigate();
  const randomMeal = () => {
    const min = 1;
    const max = 9;
    const rand = min + Math.random() * (max - min);
    navigate(`/menu/${rand.toFixed(0)}`);
  };
  return (
    <Box
      sx={{
        height: "100%",
        backgroundImage: `url(/images/aspava-restaurant.jpg)`,
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
      }}
    >
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        height="100%"
        flexDirection="column"
        sx={{
          backgroundColor: "rgba(0, 0, 0, 0.65)",
          padding: "20px",
        }}
      >
        <Typography variant="h4" color="HighlightText">
          Wellcome to Keçiören ASPAVA!
        </Typography>
        <Typography variant="h4" color="HighlightText">
          Anatolian Foods, also vegan and vegeterian
        </Typography>
        <Button
          onClick={() => navigate("/menu")}
          variant="contained"
          sx={{ mt: "20px" }}
        >
          Go to Menu
        </Button>
        <Button
          onClick={() => randomMeal()}
          variant="contained"
          sx={{ mt: "20px" }}
          color="secondary"
        >
          Try Lucky Food
        </Button>
      </Box>
    </Box>
  );
};

export default HomePage;
