import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Typography,
  // Menu,
  // MenuItem,
  // IconButton,
} from "@mui/material";
// import MenuIcon from "@mui/icons-material/Menu";
// import LinkList from "./LinkList";
// import LeftNewNavbar from "./LeftNewNavbar";
import Popover from "@mui/material/Popover";
// import { Link } from "react-router-dom";
import { useAuthContext } from "../context/AuthContextProvider";
import LeftNavbar from "./LeftNavbar";

const Header = () => {
  // const [anchorElNav, setAnchorElNav] = useState(null);
  // const handleOpenNavMenu = (event) => {
  //   setAnchorElNav(event.currentTarget);
  // };
  // const handleCloseNavMenu = () => {
  //   setAnchorElNav(null);
  // };
  const [popoverAnchorElement, setPopoverAnchorElement] = useState(null);
  const { currentUser, userDataClenaUpOnLogout, navigate, authToken } =
    useAuthContext();
  const [pages, setPages] = useState([]);

  useEffect(() => {
    const getPages = () => {
      if (currentUser?.isApprovedAdmin) {
        return [
          { title: "Home", path: "/admin/dashboard" },
          // { title: "Admin", path: "/admin/create-admin-user" },
          { title: "Artists", path: "/admin/approve-artist-user" },
          { title: "Payments", path: "/admin/see-all-payments" },
          // { title: "Delivery", path: "/admin/check-delivery-status" },
          // { title: "Collab", path: "/admin/configure-a-collab" },
          { title: "Reported Product", path: "/admin/reported-products" },
        ];
      } else {
        return [];
      }
    };
    setPages(getPages());
  }, [currentUser]);

  const open = Boolean(popoverAnchorElement);

  const handlePopoverOpen = (event) => {
    setPopoverAnchorElement(event.currentTarget);
  };

  const handlePopoverClose = () => {
    setPopoverAnchorElement(null);
  };

  const logoutUser = async () => {
    userDataClenaUpOnLogout();
    navigate("/sign-in");
  };

  const getAccountIcon = () => {
    if (localStorage.getItem("auth-token")) {
      return (
        <>
          <Box sx={{ width: "50%" }}>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-evenly",
                width: "100%",
              }}
            ></Box>
          </Box>
          <Box sx={{ width: "50%" }}>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-evenly",
                width: "100%",
              }}
            >
              <Box
                onClick={handlePopoverOpen}
                sx={{
                  "& :hover": {
                    cursor: "pointer",
                  },
                  marginX: "1rem",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  // width={25}
                  height={25}
                  viewBox="0 0 25 24"
                  fill="none"
                >
                  <path
                    d="M12.5018 5.14307C11.6541 5.14307 10.8255 5.39442 10.1208 5.86534C9.41598 6.33626 8.86667 7.0056 8.5423 7.78871C8.21792 8.57182 8.13305 9.43353 8.29842 10.2649C8.46378 11.0962 8.87196 11.8599 9.47132 12.4592C10.0707 13.0586 10.8343 13.4668 11.6657 13.6321C12.497 13.7975 13.3587 13.7126 14.1419 13.3883C14.925 13.0639 15.5943 12.5146 16.0652 11.8098C16.5361 11.105 16.7875 10.2764 16.7875 9.42878C16.7875 8.29214 16.336 7.20205 15.5322 6.39832C14.7285 5.5946 13.6384 5.14307 12.5018 5.14307ZM12.5018 12.0002C11.9932 12.0002 11.496 11.8494 11.0732 11.5668C10.6503 11.2843 10.3207 10.8827 10.1261 10.4128C9.93146 9.94296 9.88054 9.42593 9.97976 8.92712C10.079 8.42831 10.3239 7.97013 10.6835 7.6105C11.0431 7.25088 11.5013 7.00598 12.0001 6.90676C12.4989 6.80754 13.016 6.85846 13.4858 7.05309C13.9557 7.24771 14.3573 7.5773 14.6398 8.00017C14.9224 8.42304 15.0732 8.9202 15.0732 9.42878C15.0724 10.1105 14.8013 10.7641 14.3192 11.2462C13.8371 11.7283 13.1835 11.9994 12.5018 12.0002Z"
                    fill="black"
                  />
                  <path
                    d="M12.5 0C10.1266 0 7.80655 0.703788 5.83316 2.02236C3.85977 3.34094 2.3217 5.21508 1.41345 7.4078C0.505199 9.60051 0.267559 12.0133 0.730582 14.3411C1.1936 16.6689 2.33649 18.807 4.01472 20.4853C5.69295 22.1635 7.83115 23.3064 10.1589 23.7694C12.4867 24.2324 14.8995 23.9948 17.0922 23.0865C19.2849 22.1783 21.1591 20.6402 22.4776 18.6668C23.7962 16.6934 24.5 14.3734 24.5 12C24.4964 8.8185 23.231 5.76834 20.9813 3.51868C18.7317 1.26902 15.6815 0.00358448 12.5 0ZM7.35715 20.8941V19.7143C7.3579 19.0325 7.62905 18.3789 8.11113 17.8968C8.5932 17.4148 9.24682 17.1436 9.92858 17.1429H15.0714C15.7532 17.1436 16.4068 17.4148 16.8889 17.8968C17.371 18.3789 17.6421 19.0325 17.6429 19.7143V20.8941C16.0821 21.8055 14.3073 22.2857 12.5 22.2857C10.6927 22.2857 8.91786 21.8055 7.35715 20.8941ZM19.3507 19.6507C19.3337 18.5263 18.8756 17.4537 18.0751 16.6639C17.2746 15.8741 16.1959 15.4305 15.0714 15.4286H9.92858C8.80409 15.4305 7.72537 15.8741 6.92491 16.6639C6.12445 17.4537 5.66633 18.5263 5.64929 19.6507C4.09492 18.2628 2.99877 16.4354 2.50601 14.4107C2.01324 12.3859 2.14709 10.2593 2.88984 8.31228C3.63259 6.36529 4.94919 4.68983 6.66532 3.50774C8.38145 2.32566 10.4162 1.69271 12.5 1.69271C14.5839 1.69271 16.6186 2.32566 18.3347 3.50774C20.0508 4.68983 21.3674 6.36529 22.1102 8.31228C22.8529 10.2593 22.9868 12.3859 22.494 14.4107C22.0012 16.4354 20.9051 18.2628 19.3507 19.6507Z"
                    fill="black"
                  />
                </svg>
                <Typography sx={{ fontSize: ".8rem" }}>Profile</Typography>
              </Box>
            </Box>
            <Box>
              <Popover
                // {...bindPopover(popupState)}
                anchorEl={popoverAnchorElement}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                open={open}
                onClose={handlePopoverClose}
                sx={{ marginX: "1rem", marginTop: "4rem" }}
              >
                <Box
                  sx={{
                    padding: ".5rem",
                    width: "20rem",
                    "& p": {
                      display: "flex",
                      alignItems: "center",
                      fontWeight: "500",
                      color: "#555555",
                      paddingY: "0.5rem",
                      // paddingBottom: "0",
                      ":hover": {
                        color: "#131313",
                        "& svg": {
                          fill: "#131313",
                        },
                      },
                    },
                    "& svg": {
                      marginRight: "1rem !important",
                      fill: "#555555",
                      ":hover": {
                        fill: "red",
                      },
                    },
                  }}
                >
                  <Typography
                    onClick={() => {
                      logoutUser();
                      handlePopoverClose();
                    }}
                    sx={{
                      p: 1,

                      "&:hover": { cursor: "pointer" },
                    }}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width={18}
                      height={18}
                      viewBox="0 0 18 18"
                      fill="none"
                    >
                      <path
                        d="M8.57736 0.666016C10.6462 0.666016 12.3334 2.32435 12.3334 4.36602V8.35768H7.24621C6.88162 8.35768 6.59335 8.64102 6.59335 8.99935C6.59335 9.34935 6.88162 9.64102 7.24621 9.64102H12.3334V13.6243C12.3334 15.666 10.6462 17.3327 8.5604 17.3327H4.43128C2.35401 17.3327 0.666748 15.6743 0.666748 13.6327V4.37435C0.666748 2.32435 2.36248 0.666016 4.43976 0.666016H8.57736ZM14.4502 6.12452C14.7002 5.86618 15.1086 5.86618 15.3586 6.11618L17.7919 8.54118C17.9169 8.66618 17.9836 8.82452 17.9836 8.99952C17.9836 9.16618 17.9169 9.33285 17.7919 9.44952L15.3586 11.8745C15.2336 11.9995 15.0669 12.0662 14.9086 12.0662C14.7419 12.0662 14.5752 11.9995 14.4502 11.8745C14.2002 11.6245 14.2002 11.2162 14.4502 10.9662L15.7836 9.64118H12.3336V8.35785H15.7836L14.4502 7.03285C14.2002 6.78285 14.2002 6.37452 14.4502 6.12452Z"
                        fill="#555555"
                      />
                    </svg>
                    Sign Out
                  </Typography>
                </Box>
              </Popover>
            </Box>
          </Box>
        </>
      );
    }
  };

  return (
    <>
      <Box
        sx={{
          // paddingX: "2rem",
          display: "flex",
          justifyContent: "space-around",
          width: "100vw",
          background: "white",
          height: "5rem",
          boxShadow: "0px 2px 20px rgba(0, 0, 0, 0.08)",
        }}
      >
        <Box
          sx={{
            marginTop: "1.5rem",
          }}
        >
          {authToken && <LeftNavbar navigationList={pages} />}
          {/* <LeftNewNavbar/> */}
        </Box>
        {/* Big Beyond Logo Starts */}

        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width={50}
            // height={30}
            viewBox="0 0 37 30"
            fill="none"
          >
            <path
              d="M11.8438 0C12.6126 0 13.254 0.000141188 13.9213 0.000282377V3.5331C12.1294 3.5331 10.2963 3.53268 8.76718 3.53268C6.26631 3.77072 4.36125 5.86384 4.36125 8.37784C4.36125 11.0671 6.52906 13.2394 9.21828 13.2452H13.9213V16.755H9.22859C6.53527 16.755 4.36125 18.9291 4.36111 21.6224C4.36111 24.1356 6.2649 26.2281 8.76492 26.4673H16.7449V0.000988319H27.7957C32.4078 0.0145424 36.1485 3.7662 36.1485 8.37826C36.1485 10.9798 34.9395 13.4215 32.9004 15.0006C34.9393 16.5796 36.1485 19.0213 36.1485 21.6229C36.1485 26.0018 32.766 29.6482 28.3993 29.9764C28.1904 29.9922 27.9808 30 27.7713 30H23.0786V26.4676H28.2348C30.7347 26.2284 32.6387 24.1359 32.6387 21.6227C32.6387 18.9294 30.4645 16.7554 27.7712 16.7554C26.0778 16.7554 24.5841 16.755 23.0786 16.755V13.2449C24.7139 13.2449 26.3867 13.2453 27.7816 13.2453C30.4708 13.2395 32.6387 11.0672 32.6387 8.37798C32.6387 5.86398 30.7336 3.77086 28.2327 3.53282H20.2549V29.9999H8.79838V29.9867C8.73245 29.9833 8.66651 29.9805 8.60072 29.9756C4.23404 29.6476 0.85144 26.0013 0.85144 21.6223C0.85144 19.0208 2.06058 16.5791 4.09949 15C2.06058 13.4209 0.85144 10.9792 0.85144 8.3777C0.85144 3.76564 4.59223 0.0139777 9.20416 0.000423565H9.20515C9.94286 0 10.6766 0 11.4132 0H11.8438Z"
              fill="#DAA520"
            />
          </svg>
        </Box>
        {/* Big Beyond Logo ends */}
        <Box sx={{ display: "flex", width: "100%" }}>
          {/* Nav Links Starts */}
          {/* <Box
            sx={{
              display: "flex",
              height: "max-content",
              alignItems: "center",
              justifyContent: "space-around",
              marginTop: "auto",
              marginBottom: "auto",
              paddingX: "1rem",
              flex: "1",
            }}
          >
            <Box
              sx={{
                display: { xs: "none", md: "flex" },
                justifyContent: "space-evenly",
                width: "100%",
              }}
            >
              {pages?.map((page, i) => {
                return (
                  <LinkList
                    key={i}
                    textColor={"black"}
                    page={page}
                    sx={{ fontSize: "2.3rem" }}
                  />
                );
              })}
            </Box>
          </Box> */}
          {/* Nav Links Ends */}
          {/* Button Component Starts */}
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              flex: "1",
            }}
          >
            <Box
              sx={{
                width: "100%",
                display: "flex",
                justifyContent: "flex-end",
                alignItems: "center",
                // justifyContent: "space-evenly",
                // flex: "1",
              }}
            >
              {currentUser ? (
                <Box
                  sx={{
                    display: "flex",
                    marginLeft: "1rem",
                    marginRight: "3rem",
                  }}
                >
                  {getAccountIcon()}
                </Box>
              ) : (
                <Button
                  variant="contained"
                  sx={{
                    backgroundColor: "#131313",
                    color: "white",
                    borderRadius: "0",
                    marginLeft: "1rem",
                    border: "1px solid #131313",
                    marginRight: "3rem",
                    ":hover": {
                      background: "whitesmoke",
                      color: "#131313",
                      boxShadow: "none",
                    },
                  }}
                  onClick={() => navigate("/sign-in")}
                >
                  Sign In
                </Button>
              )}
            </Box>
            {/* <Box
              sx={{
                display: { xs: "flex", md: "none" },
              }}
            >
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleOpenNavMenu}
                color="inherit"
                sx={{
                  marginRight: "1.5rem",
                }}
              >
                <MenuIcon />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorElNav}
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "left",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                open={Boolean(anchorElNav)}
                onClose={handleCloseNavMenu}
              >
                {pages?.map((page, i) => (
                  <MenuItem key={i} onClick={handleCloseNavMenu}>
                    <LinkList
                      sx={{ fontSize: "30px" }}
                      page={page}
                      textColor={"black"}
                    />
                  </MenuItem>
                ))}
              </Menu>
            </Box> */}
          </Box>
        </Box>
        {/* Button Component Ends */}
      </Box>
    </>
  );
};

export default Header;
