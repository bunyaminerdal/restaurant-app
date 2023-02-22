import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import SoupKitchenIcon from "@mui/icons-material/SoupKitchen";
import { Badge, Link } from "@mui/material";
import ShoppingBasketIcon from "@mui/icons-material/ShoppingBasket";
import { useNavigate } from "react-router-dom";
import { BasketContext } from "../../state/BasketContextProvider";

function Navbar() {
  const navigate = useNavigate();
  const { state } = React.useContext(BasketContext);
  return (
    <AppBar>
      <Container maxWidth="xl">
        <Toolbar>
          <SoupKitchenIcon sx={{ display: { xs: "flex" }, mr: 1 }} />
          <Link
            href="/"
            underline="none"
            color="inherit"
            sx={{
              display: "flex",
              flexDirection: { xs: "column", md: "row" },
              columnGap: "10px",
              mr: 1,
            }}
          >
            <Typography sx={{ fontSize: { xs: 14, md: 20 } }}>
              {"TRANSPARENT"}
            </Typography>
            <Typography sx={{ fontSize: { xs: 12, md: 20 } }}>
              {"RESTAURANT"}
            </Typography>
          </Link>
          <Box sx={{ flexGrow: 1, display: { xs: "flex" } }}>
            <Button
              onClick={() => navigate("/menu")}
              sx={{ my: 2, color: "white", display: "block" }}
            >
              MENU
            </Button>
          </Box>

          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Basket">
              <IconButton
                color="inherit"
                onClick={() => {
                  if (state?.meals?.length > 0) navigate("/basket");
                  else navigate("/menu");
                }}
                sx={{ p: 0, height: "50px", width: "50px" }}
              >
                <Badge
                  color="secondary"
                  badgeContent={state?.meals?.length}
                  max={9}
                >
                  <ShoppingBasketIcon />
                </Badge>
              </IconButton>
            </Tooltip>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default Navbar;
