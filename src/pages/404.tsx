import { Box, Container, Link, Typography } from "@mui/material";
import React from "react";

const Custom404Page = () => {
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
          <Typography>Oops Shomething went wrong!</Typography>
          <Link href="/" underline="hover">
            Go to Home
          </Link>
        </Box>
      </Container>
    </div>
  );
};

export default Custom404Page;
