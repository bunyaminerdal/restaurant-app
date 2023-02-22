import {
  Button,
  Container,
  Divider,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";
import { Meal } from "../types/types";

const MenuItemCard = ({ meal }: { meal: Meal }) => {
  const navigate = useNavigate();
  return (
    <Container key={meal?.id + "-container"}>
      <Button
        onClick={() => navigate(`/menu/${meal?.id}`)}
        sx={{
          width: "100%",
          display: "flex",
          alignItems: "center",
        }}
      >
        <Paper
          elevation={3}
          sx={{
            width: "100%",
            padding: "5px",
          }}
        >
          <Stack direction="row" display="flex" justifyContent="space-between">
            <Stack>
              <Container sx={{ padding: "5px" }}>
                <Typography
                  fontWeight={700}
                  textTransform="capitalize"
                  sx={{ fontSize: { xs: 12, md: 22 }, display: "flex" }}
                >
                  {meal?.name}
                </Typography>
              </Container>
              <Container sx={{ padding: "5px" }}>
                <Stack direction="row" columnGap="2px">
                  <Typography
                    sx={{
                      fontSize: { xs: 10, md: 14 },
                      display: "flex",
                    }}
                    textTransform="capitalize"
                  >
                    {"Ingredients:"}
                  </Typography>
                  <Stack
                    direction="row"
                    divider={
                      <Typography
                        sx={{
                          fontSize: { xs: 10, md: 14 },
                          display: "flex",
                        }}
                        textTransform="capitalize"
                      >
                        {", "}
                      </Typography>
                    }
                  >
                    {meal?.ingredients?.map((ingredient, index) => {
                      return (
                        <Typography
                          key={index}
                          textTransform="capitalize"
                          sx={{
                            fontSize: { xs: 10, md: 14 },
                            display: "block",
                          }}
                        >
                          {ingredient?.name}
                        </Typography>
                      );
                    })}
                  </Stack>
                </Stack>
              </Container>
            </Stack>
            <Stack display="flex" justifyContent="center" alignItems="center">
              <Typography
                textTransform="capitalize"
                sx={{ fontSize: { xs: 12, md: 22 }, display: "flex" }}
              >
                {"Price"}
              </Typography>
            </Stack>
          </Stack>
        </Paper>
      </Button>
      <Divider sx={{ margin: "10px 0 10px 0" }} />
    </Container>
  );
};

export default MenuItemCard;
