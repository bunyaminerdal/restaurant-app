import { Grid } from "@mui/material";
import React from "react";
import { Outlet } from "react-router-dom";
import Footer from "../components/layout/Footer";
import Navbar from "../components/layout/Navbar";

const MainLayout = () => {
  return (
    <Grid
      display="flex"
      height="100vh"
      flexDirection="column"
      //   sx={{ backgroundColor: "white" }}
    >
      <Grid item xs={12} height="70px">
        <Navbar />
      </Grid>
      <Grid item xs={12} height="calc(100vh - 120px)">
        <Outlet />
      </Grid>
      <Grid item xs={12} height="50px">
        <Footer />
      </Grid>
    </Grid>
  );
};

export default MainLayout;
