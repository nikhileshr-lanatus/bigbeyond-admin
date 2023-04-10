import { Box } from "@mui/system";
import React from "react";
const HomePage = () => {
  return (
    <React.Fragment>
      <Box
        sx={{
          margin: "1rem auto 80rem",
        }}
      >
        <h1 style={{ textAlign: "center" }}>
          {" "}
          This is Dashboard for admin users{" "}
        </h1>
      </Box>
    </React.Fragment>
  );
};

export default HomePage;
