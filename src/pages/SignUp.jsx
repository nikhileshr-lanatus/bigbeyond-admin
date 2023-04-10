import React, { useState } from "react";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { userSignUp } from "../api/users";
import { InputAdornment, IconButton } from "@mui/material";

import {
  Card,
  Button,
  Typography,
  CardContent,
  Box,
  // TextField,
  Input,
} from "@mui/material";
import { useAuthContext } from "../context/AuthContextProvider";

const regex = /^\w+([-]?\w+)*@\w+([-]?\w+)*(\.\w{2,3})+$/;

const SignUp = (props) => {
  const [userSignUpData, setUserSignUpData] = useState();

  const [isEmpty, setIsEmpty] = useState();

  const { showSnackBarNotification } = useAuthContext();

  const [showPassword, setShowPassword] = useState({
    password: "",
    confirmPassword: "",
    showPassword: false,
    showConfirmPassword: false,
  });

  const handleClickShowPassword = () => {
    setShowPassword({
      ...showPassword,
      showPassword: !showPassword.showPassword,
    });
  };

  const handleClickShowConfirmPassword = () => {
    setShowPassword({
      ...showPassword,
      showConfirmPassword: !showPassword.showConfirmPassword,
    });
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleSignUp = async (event) => {
    event.preventDefault();
    //   const signUpUser = await
    const isEmailValid = regex.test(userSignUpData.email);
    if (isEmailValid) {
      userSignUp({ ...userSignUpData, isApprovedAdmin: true }).then(
        (userSignUpRes) => {
          if (userSignUpRes?.status === 201) {
            showSnackBarNotification(
              "success",
              "Admin created Successfully...!!!",
              2000
            );
            props.closeDialog();
          } else if (userSignUpRes?.status === 400) {
            showSnackBarNotification(
              "error",
              userSignUpRes?.data?.message
                ? userSignUpRes?.data?.message
                : " Oops... Something went wrong",
              2000
            );
          }
        }
      );
    } else {
      console.log("email is not valid");
    }
  };

  const handleEmailChange = (event) => {
    event.target.value === ""
      ? setIsEmpty({ ...isEmpty, email: true })
      : setIsEmpty(false);
    setUserSignUpData({ ...userSignUpData, email: event.target.value });
  };

  const handleUserNameChange = (event) => {
    setUserSignUpData({ ...userSignUpData, userName: event.target.value });
  };

  const handlePasswordChange = (event) => {
    event.target.value === ""
      ? setIsEmpty({ ...isEmpty, password: true })
      : setIsEmpty(false);
    setUserSignUpData({ ...userSignUpData, password: event.target.value });
  };

  const handleConfirmPasswordChange = (event) => {
    event.target.value === ""
      ? setIsEmpty({ ...isEmpty, confirmPassword: true })
      : setIsEmpty(false);
    setUserSignUpData({
      ...userSignUpData,
      confirmPassword: event.target.value,
    });
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
          marginTop: "1rem",
        }}
      >
        <Box
          sx={{
            width: { xs: "90%", sm: "50%", md: "40%", lg: "30%" },
          }}
        >
          <Card
            sx={{
              margin: "1rem",
              padding: { xs: "0.2rem", md: "1rem" },
              boxShadow: "none",
              background: "transparent",
            }}
          >
            <Box>
              <Typography sx={{ fontSize: "1.5rem", fontWeight: "bold" }}>
                Register a admin
              </Typography>
            </Box>
            <CardContent
              width="30vw"
              sx={{
                "& input, div": {
                  backgroundColor: "transparent",
                  ":hover": {
                    backgroundColor: "transparent",
                  },
                },
                padding: "0",
              }}
            >
              <form>
                <Input
                  error={isEmpty?.email}
                  required
                  id="email"
                  name="email"
                  margin="normal"
                  variant="filled"
                  placeholder="Email"
                  size="large"
                  type="email"
                  onChange={handleEmailChange}
                  fullWidth
                  sx={{
                    marginTop: "2rem",
                  }}
                  helperText={isEmpty?.email ? "Kindly fill this field!" : null}
                />

                <Input
                  id="Username"
                  margin="normal"
                  variant="filled"
                  placeholder="Username"
                  size="large"
                  onChange={handleUserNameChange}
                  required
                  fullWidth
                  sx={{
                    marginTop: "2rem",
                  }}
                />

                <Input
                  id="Password"
                  margin="normal"
                  variant="filled"
                  placeholder="Password"
                  error={isEmpty?.password}
                  type={showPassword.showPassword ? "text" : "password"}
                  size="large"
                  onChange={handlePasswordChange}
                  required
                  fullWidth
                  sx={{
                    marginTop: "2rem",
                  }}
                  helperText={
                    isEmpty?.password ? "Kindly fill this field!" : null
                  }
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
                />
                <Input
                  id="Confirm Password"
                  margin="normal"
                  variant="filled"
                  placeholder="Confirm Password"
                  error={isEmpty?.confirmPassword}
                  type={showPassword.showConfirmPassword ? "text" : "password"}
                  size="large"
                  onChange={handleConfirmPasswordChange}
                  required
                  fullWidth
                  sx={{
                    marginTop: "2rem",
                  }}
                  helperText={
                    isEmpty?.confirmPassword ? "Kindly fill this field!" : null
                  }
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        onClick={handleClickShowConfirmPassword}
                        onMouseDown={handleMouseDownPassword}
                      >
                        {!showPassword.showConfirmPassword ? (
                          <VisibilityIcon />
                        ) : (
                          <VisibilityOffIcon />
                        )}
                      </IconButton>
                    </InputAdornment>
                  }
                />

                <Button
                  fullWidth
                  variant="contained"
                  type="submit"
                  onClick={handleSignUp}
                >
                  Register
                </Button>
              </form>
              {/* <Typography sx={{ textAlign: "center" }}>
                Already have an account?
              </Typography>
              <Box sx={{ width: "100%", boxSizing: "border-box" }}>
                <Button
                  fullWidth
                  variant="contained"
                  type="submit"
                  onClick={() => {
                    navigate("/sign-in");
                  }}
                  sx={{
                    margin: "1rem auto",
                    background: "transparent",
                    color: "#333333",
                    border: "2px solid #333333",
                    padding: ".8rem",
                    borderRadius: "0",
                    ":hover": {
                      border: "2px solid transparent",
                      background: "#000000",
                      color: "#ffffff",
                    },
                  }}
                >
                  Log In
                </Button>
              </Box> */}
            </CardContent>
          </Card>
        </Box>
      </Box>
    </React.Fragment>
  );
};

export default SignUp;
