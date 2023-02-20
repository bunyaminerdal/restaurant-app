import { Box, Container, Link, Typography } from "@mui/material";
import React from "react";

const Footer = () => {
  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      height="100%"
    >
      <Typography variant="body2" color="text.secondary" align="center">
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
