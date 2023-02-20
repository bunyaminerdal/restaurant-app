import React from "react";
import { useTheme } from "@mui/material/styles";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";
import ListItemText from "@mui/material/ListItemText";
import { ColorModeContext } from "../App";
import { Icon, IconButton, Typography } from "@mui/material";

const ThemeChangeButton = () => {
  const theme = useTheme();
  const colorMode = React.useContext(ColorModeContext);
  return (
    <IconButton onClick={colorMode.toggleColorMode}>
      <Icon>
        {theme.palette.mode === "dark" ? (
          <Brightness4Icon />
        ) : (
          <Brightness7Icon />
        )}
      </Icon>
    </IconButton>
  );
};

export default ThemeChangeButton;
