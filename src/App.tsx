import React from "react";
import { createContext, useEffect, useMemo, useState } from "react";
import { CssBaseline, PaletteMode, ThemeProvider } from "@mui/material";
import { useCustomTheme } from "./theme/useCustomTheme";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import MainLayout from "./layouts/MainLayout";
import HomePage from "./pages/HomePage";
import MenuPage from "./pages/MenuPage";
import AboutPage from "./pages/AboutPage";
import ContactPage from "./pages/ContactPage";
import Custom404Page from "./pages/404";
export const ColorModeContext = createContext({
  toggleColorMode: () => {},
});

const App = () => {
  const [mode, setMode] = useState<PaletteMode>("dark");
  useEffect(() => {
    if (typeof window !== "undefined") {
      const localMode = sessionStorage.getItem("mode");
      if (localMode) {
        setMode(localMode as PaletteMode);
      } else {
        sessionStorage.setItem("mode", mode);
      }
    }
  }, [mode]);

  const colorMode = useMemo(
    () => ({
      toggleColorMode: () => {
        setMode((prevMode) => (prevMode === "light" ? "dark" : "light"));
        sessionStorage.setItem("mode", "");
      },
    }),
    []
  );
  const router = createBrowserRouter([
    {
      path: "/",
      element: <MainLayout />,
      errorElement: <Custom404Page />,
      children: [
        {
          path: "/",
          element: <HomePage />,
        },
        {
          path: "menu",
          element: <MenuPage />,
        },
        {
          path: "about",
          element: <AboutPage />,
        },
        {
          path: "contact",
          element: <ContactPage />,
        },
      ],
    },
  ]);

  const theme = useCustomTheme(mode);
  return (
    <div className="App">
      <ColorModeContext.Provider value={colorMode}>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <RouterProvider router={router} />
        </ThemeProvider>
      </ColorModeContext.Provider>
    </div>
  );
};
export default App;
