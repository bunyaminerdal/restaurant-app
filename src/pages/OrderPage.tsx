import React from "react";
import { Box, Container, Link, Typography } from "@mui/material";

const OrderPage = () => {
  return (
    <Container sx={{ height: "100%" }}>
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        height="100%"
        flexDirection="column"
      >
        <Typography>Your Ordered Foods are on the way!</Typography>
        <Typography>
          it would be nice if you paid, but you can't do it right now!
        </Typography>
        <Link href="/" underline="hover">
          Go to Home
        </Link>
      </Box>
    </Container>
  );
};

export default OrderPage;
