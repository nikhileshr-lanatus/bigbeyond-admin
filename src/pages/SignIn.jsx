import React from "react";
import {
  Card,
  Button,
  Input,
  CardContent,
  Box,
  InputAdornment,
  IconButton,
  Typography,
} from "@mui/material";
import { useState } from "react";
import { userLogin } from "../api/users";
import { useAuthContext } from "../context/AuthContextProvider";
import VisibilityIcon from "@mui/icons-material/Visibility";

import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";

const SignIn = () => {
  const { setAuthToken, setCurrentUser, navigate, showSnackBarNotification } =
    useAuthContext();
  const [user, setUser] = useState();
  const [showPassword, setShowPassword] = useState({
    password: "",
    showPassword: false,
  });

  const handleSignIn = async (event) => {
    event.preventDefault();
    try {
      const res = await userLogin(user);
      if (res?.statusText === "OK") {
        // console.log("sign In successfully with status 200 ok");
        setAuthToken(res.data.token);
        setCurrentUser(res.data.userData);
        navigate("/admin/dashboard");
        showSnackBarNotification(
          "success",
          "Logged in Successfully...!!!",
          2000
        );
      } else {
        showSnackBarNotification("info", "Invalid Credentials for Admin", 2000);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const handleClickShowPassword = () => {
    setShowPassword({
      ...showPassword,
      showPassword: !showPassword.showPassword,
    });
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleUserNameChange = (event) => {
    setUser({ ...user, name: event.target.value });
  };

  const handlePasswordChange = (event) => {
    setUser({ ...user, password: event.target.value });
  };

  return (
    <React.Fragment>
      <Box
        sx={{
          width: "100%",
          border: "1px solid black",
          display: "flex",
          justifyContent: "center",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Box
          sx={{
            width: { xs: "90%", sm: "50%", md: "40%", lg: "25%" },
          }}
        >
          <Card
            sx={{
              padding: { xs: "0.2rem", md: "1rem" },
              marginY: "2rem",
              boxShadow: "0.5rem 1rem 0.5rem  #c9c9c9",
              border: "1px solid #0f0f0f",
            }}
          >
            <Box sx={{ marginBottom: "3rem" }}>
              <Typography sx={{ fontSize: "2rem", fontWeight: "bold" }}>
                Let's sign you in.
              </Typography>
            </Box>
            <CardContent
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                // width: "100%",
                padding: "0rem",
                boxShadow: "none",
              }}
            >
              <form
                style={{
                  width: "100%",
                  boxSizing: "border-box",
                }}
              >
                <Input
                  margin="normal"
                  variant="filled"
                  placeholder="Email OR Username* "
                  size="larger"
                  type="email"
                  onChange={handleUserNameChange}
                  required
                  fullWidth
                  sx={{
                    // backgroundColor: "rgba(0, 0, 0, 0.06)",
                    padding: ".8rem",
                  }}
                />
                <Input
                  margin="normal"
                  variant="filled"
                  placeholder="Password*"
                  type={showPassword.showPassword ? "text" : "password"}
                  size="larger"
                  onChange={handlePasswordChange}
                  required
                  fullWidth
                  sx={{
                    // backgroundColor: "rgba(0, 0, 0, 0.06)",
                    padding: ".8rem",
                    marginTop: "1rem",
                  }}
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        onClick={handleClickShowPassword}
                        onMouseDown={handleMouseDownPassword}
                      >
                        {!showPassword.showPassword ? (
                          <VisibilityIcon />
                        ) : (
                          <VisibilityOffIcon />
                        )}
                      </IconButton>
                    </InputAdornment>
                  }
                />{" "}
                <br />
                <Button
                  fullWidth
                  variant="contained"
                  type="submit"
                  onClick={handleSignIn}
                >
                  Login
                </Button>
              </form>
            </CardContent>
          </Card>
        </Box>
      </Box>
    </React.Fragment>
  );
};

export default SignIn;
