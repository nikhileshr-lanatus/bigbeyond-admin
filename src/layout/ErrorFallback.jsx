import { Box, Typography } from "@mui/material";

import { useEffect } from "react";

function ErrorFallback() {
  const reload = () => {
    window.location.href = "/";
  };

  useEffect(() => {
    setTimeout(() => {
      reload();
    }, 10000);
  }, []);

  return (
    <Typography>
      <hr />
      <Box sx={{ alignContent: "center", margin: "10px 5vw" }}>
        <h1>Something went wrong</h1>
        <h2>please reload the page</h2>
      </Box>
    </Typography>
  );
}

export default ErrorFallback;
