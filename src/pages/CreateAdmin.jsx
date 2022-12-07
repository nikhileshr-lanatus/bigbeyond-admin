import React from "react";
import { useEffect, useState } from "react";
import { captureError } from "../api/captureError";
import { getAllAdminUsers } from "../api/users";
import { useAuthContext } from "../context/AuthContextProvider";
import { DataGrid } from "@mui/x-data-grid";
import { Box } from "@mui/system";
import { Button, Typography } from "@mui/material";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import SignUp from "./SignUp";

const CreateAdmin = () => {
  const [adminUserData, setAdminUserData] = useState([]);
  const { authToken, showSnackBarNotification } = useAuthContext();
  const [open, setOpen] = React.useState(false);

  const handleDialogOpenClick = () => {
    setOpen(true);
  };

  const handleDialogCloseClick = () => {
    setOpen(false);
  };

  const handleDialogCloseAndReloadClick = () => {
    setOpen(false);
    getAllAdminUsers(authToken)
        .then((getAdminUserRes) => {
          if (getAdminUserRes?.status === 200) {
            setAdminUserData(getAdminUserRes.data);
          } else {
            showSnackBarNotification("info", "Please Login to continue", 2000);
          }
        })
        .catch((getAdminUserErrorRes) => {
          captureError(getAdminUserErrorRes.data, authToken);
        });
  };

  useEffect(() => {
    console.log("useEffect to get admin data for approval");

    authToken &&
      getAllAdminUsers(authToken)
        .then((getAdminUserRes) => {
          if (getAdminUserRes?.status === 200) {
            setAdminUserData(getAdminUserRes.data);
          } else {
            showSnackBarNotification("info", "Please Login to continue", 2000);
          }
        })
        .catch((getAdminUserErrorRes) => {
          captureError(getAdminUserErrorRes.data, authToken);
        });
  }, [showSnackBarNotification, setAdminUserData, authToken]);

  // console.log(adminUserData);

  const columns = [
    { field: "userName", headerName: "Username", width: 120 },
    { field: "email", headerName: "Email", width: 170 },
    { field: "fullName", headerName: "Name", width: 100 },
    // { field: 'bioData', headerName: 'bioData', width: 150 },
    // { field: 'instagramUrl', headerName: 'instagramUrl', width: 150 },
    // { field: 'isApprovedArtist', headerName: 'isApprovedArtist', width: 150 },
    { field: "isEmailVerified", headerName: "Email Verified", width: 150 },
    // { field: "type", headerName: "Type", width: 150 },
    // { field: 'email', headerName: 'email', width: 150 },
  ];

  return (
    <>
      <Box sx={{ marginLeft: "2rem" }}>
        <Dialog open={open} onClose={handleDialogCloseClick}>
          <DialogTitle sx={{ fontSize: "1.5rem"}}><b>Add admin</b></DialogTitle>
          <DialogContent>
            <DialogContentText>
              To add a admin please add the following necessary field for the
              admin and please inform the admin to verify the email.
            </DialogContentText>
            <SignUp closeDialog={handleDialogCloseAndReloadClick} />
          </DialogContent>
          <DialogActions>
            <Button
              sx={{
                background: "#131313",
                color: "white",
                borderRadius: "0",
                marginTop: "1rem",
                marginBottom: "1rem",
                border: "2px solid transparent",
                ":hover": {
                  background: "white",
                  color: "#131313",
                  border: "2px solid black",
                  boxSizing: "border-box",
                },
              }}
              onClick={handleDialogCloseClick}
            >
              <Typography sx={{ fontWeight: "600", fontSize: ".9rem" }}>
                cancel
              </Typography>
            </Button>
          </DialogActions>
        </Dialog>
        <Button
          sx={{
            background: "#131313",
            color: "white",
            // padding: "1rem 1rem",
            borderRadius: "0",
            marginTop: "1rem",
            marginBottom: "1rem",
            border: "2px solid transparent",
            ":hover": {
              background: "white",
              color: "#131313",
              border: "2px solid black",
              boxSizing: "border-box",
            },
          }}
          onClick={handleDialogOpenClick}
        >
          <Typography sx={{ fontWeight: "600", fontSize: ".9rem" }}>
            Create a admin
          </Typography>
        </Button>
        <div
          style={{
            height: 450,
            width: "90%",
            display: "flex",
            alignContent: "center",
          }}
        >
          <DataGrid rows={adminUserData} columns={columns} />
        </div>
      </Box>
    </>
  );
};

export default CreateAdmin;
