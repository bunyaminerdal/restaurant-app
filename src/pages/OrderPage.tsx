import React from "react";
import { Box, Container, Link, Typography } from "@mui/material";

const OrderPage = () => {
  return (
    <div>
      <Container>
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          minHeight="100vh"
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
    </div>
  );
};

export default OrderPage;
