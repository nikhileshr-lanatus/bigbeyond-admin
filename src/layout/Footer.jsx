import React from "react";
import { Box } from "@mui/material";
import market_place_logo from "../assets/images/market_place_logo.png";
import InstagramIcon from "@mui/icons-material/Instagram";
import TwitterIcon from "@mui/icons-material/Twitter";

const Footer = () => {
  return (
    <>
      <Box
        sx={{
          backgroundColor: "whitesmoke",
          position: "relative",
          display: "flex",
          flexDirection:"column",
        //   boxSizing: "border-box",
        }}
      >
        <Box sx={{ display: "flex", justifyContent: "flex-start" }}>
          <img src={market_place_logo} alt="" />
        </Box>
        <Box
          sx={{
            display: "flex",
            justifyContent: "flex-start",
            "& div": {
              height: "2rem",
              width: "2rem",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              margin: "1rem",
              borderRadius: "50%",
              border: "1px solid #555555",
              boxSizing: "border-box",
            },
            "& :hover": {
              cursor: "pointer",
              background: "#DAA520",
              transition: ".3s",
              border: "none",
              "& path": {
                fill: "white",
                border: "none",
              },
            },
            "& path": {
              fill: "#555555",
            },
          }}
        >
          <Box>
            <a href="https://www.instagram.com/bigbeyondio/?hl=en" target="_blank" rel="noreferrer">
              <InstagramIcon />
            </a>
          </Box>
          <Box>
            <a href="https://twitter.com/bigbeyondio?s=11&t=VZD0seHqIqk3nX171l4Xew" target="_blank" rel="noreferrer">
              <TwitterIcon />
            </a>
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default Footer;
