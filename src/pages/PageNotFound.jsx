import { Box, Typography } from "@mui/material";
import React from "react";

const PageNotFound = () => {
  return (
    <>
      <Typography>
        <hr />
        <Box
          sx={{
            alignContent: "center",
            margin: "10px 5vw",
            textAlign: "center",
          }}
        >
          <h1>Page not found.</h1>
          <h2> It seems the page you are trying to reach is not found</h2>
        </Box>
      </Typography>
    </>
  );
};

export default PageNotFound;
