import { createTheme } from "@mui/material/styles";
import { PaletteMode } from "@mui/material";

export const useCustomTheme = (mode: PaletteMode) => {
  return createTheme({
    palette: {
      mode,
      primary: {
        main: "#797979",
      },
      secondary: {
        main: "#4B9EFE",
      },
    },
  });
};
