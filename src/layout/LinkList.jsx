import React from "react";
import { NavLink } from "react-router-dom";
import { Typography } from "@mui/material";

const LinkList = ({ page, textColor }) => {
  return (
    <NavLink
      to={page.path}
      style={{
        textDecoration: "none",
        marginTop: "0px",
      }}
    >
      <Typography
        variant="h6"
        sx={{
          color: textColor,
          marginLeft: { xs: "0", md: "0.5rem" },
          textTransform: { xs: "capitalize", md: "uppercase" },
          fontSize: "13px",
          fontWeight: "500",
          // fontWeight: "bold",
        }}
        component="h6"
      >
        {page.title}
      </Typography>
    </NavLink>
    
  );
};

export default LinkList;
