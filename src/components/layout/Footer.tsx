import { Box, Link, Typography, useTheme } from "@mui/material";
import React from "react";
import { ColorModeContext } from "../../App";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";

const Footer = () => {
  const theme = useTheme();
  const colorMode = React.useContext(ColorModeContext);
  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      height="100%"
    >
      <Typography variant="body2" color="text.secondary" align="center">
        <Link onClick={colorMode.toggleColorMode} underline="hover" href="#">
          {theme.palette.mode === "dark" ? (
            <>
              <Brightness4Icon sx={{ width: "13px", height: "13px" }} />
              {" Dark mode"}
            </>
          ) : (
            <>
              <Brightness7Icon sx={{ width: "13px", height: "13px" }} />
              {" Light mode"}
            </>
          )}
        </Link>
        {" - "}
        <Link href="/about" underline="hover">
          About us
        </Link>
        {" - "}
        <Link href="/contact" underline="hover">
          Contact us
        </Link>
        {" - Copyright © "}
        {new Date().getFullYear()}
      </Typography>
    </Box>
  );
};

export default Footer;
