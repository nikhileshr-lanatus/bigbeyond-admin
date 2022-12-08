import React, { useState, useEffect, useRef } from "react";
import { DataGrid } from "@mui/x-data-grid";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Typography,
} from "@mui/material";
import { GridActionsCellItem } from "@mui/x-data-grid";

import { useAuthContext } from "../context/AuthContextProvider";
import { getAllArtistUsers, approveArtistUser } from "../api/users";
import { captureError } from "../api/captureError";
import EditIcon from "../assets/svgs/EditIcon";
import EyeOpen from "../assets/svgs/EyeOpen";
import DownloadIcon from "../assets/svgs/DownloadIcon";

import { getArtistWorkData } from "../api/artistWorks";

const ApproveArtists = () => {
  const [artistUserData, setArtistUserData] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedArtist, setselectedArtist] = useState();

  const { authToken, showSnackBarNotification } = useAuthContext();
  const commission = useRef();

  const approveArtist = () => {
    const artistData = {
      artistId: selectedArtist?.id,
      commissionPercent: commission.current.commissionInput.value,
    };
    approveArtistUser(artistData, authToken)
      .then((approvedArtistRes) => {
        if (approvedArtistRes?.status === 200) {
          showSnackBarNotification("success", "Artist is now approved", 2000);
          getArtistData();
          setOpenDialog(false);
        } else {
          showSnackBarNotification(
            "info",
            "Please check approval status after some time",
            2000
          );
        }
      })
      .catch((approvedArtistErr) => {
        showSnackBarNotification("info", "Something went wrong", 2000);
      });
  };

  const getArtistData = () => {
    getAllArtistUsers(authToken)
      .then((getAdminUserRes) => {
        if (getAdminUserRes?.status === 200) {
          setArtistUserData(getAdminUserRes.data);
        } else {
          showSnackBarNotification("info", "Please Login to continue", 2000);
        }
      })
      .catch((getAdminUserErrorRes) => {
        captureError(getAdminUserErrorRes.data, authToken);
      });
  };

  useEffect(() => {
    //get all the artist data for admin
    const getArtistDataOnFirstLoad = () => {
      getAllArtistUsers(authToken)
        .then((getAdminUserRes) => {
          if (getAdminUserRes?.status === 200) {
            setArtistUserData(getAdminUserRes.data);
          } else {
            showSnackBarNotification("info", "Please Login to continue", 2000);
          }
        })
        .catch((getAdminUserErrorRes) => {
          captureError(getAdminUserErrorRes.data, authToken);
        });
    };

    authToken && getArtistDataOnFirstLoad();
  }, [authToken, showSnackBarNotification]);

  useEffect(() => {
    if (selectedArtist) {
      getArtistWorkData({ artistId: selectedArtist?.id }, authToken).then(
        (getArtistWorkRes) => {
          let imageData = [];
          for (let i = 0; i < getArtistWorkRes?.data?.length; i++) {
            imageData.push(getArtistWorkRes?.data[i]?.imageUrl);
          }
          setselectedArtist({ ...selectedArtist, imageData: imageData });
          // setArtistUserData({ ...artistUserData, getArtistWorkRes });
        }
      );
    }
  }, [openDialog]);

  const handleViewClick = (row) => (event) => {
    event.stopPropagation();
    setselectedArtist(row);
    setOpenDialog(true);
  };

  const columns = [
    {
      field: "userName",
      headerName: "Username",
      headerClassName: "super-app-theme--header",
      width: 100,
    },
    {
      field: "email",
      headerName: "Email",
      headerClassName: "super-app-theme--header",
      width: 170,
    },
    {
      field: "fullName",
      headerName: "Name",
      headerClassName: "super-app-theme--header",
      width: 100,
    },
    {
      field: "isEmailVerified",
      headerName: "Email Verified",
      headerClassName: "super-app-theme--header",
      width: 150,
    },

    {
      field: "view",
      headerName: "Approval",
      headerClassName: "super-app-theme--header",
      width: 100,
      renderCell: ({ row }) => (
        <strong>
          <GridActionsCellItem
            //   icon={<VisibilityIcon />}

            icon={row?.isApprovedArtist ? <EyeOpen /> : <EditIcon />}
            label="View"
            onClick={handleViewClick(row)}
            color="inherit"
          />
        </strong>
      ),
    },
  ];

  return (
    <>
      <Dialog
        open={openDialog}
        onClose={() => {
          setselectedArtist();
          setOpenDialog(false);
        }}
        maxWidth="lg"
        fullWidth={true}
      >
        <DialogTitle>
          <b>Artist Details</b>
        </DialogTitle>
        <DialogContent>
          <hr style={{ background: "lightgray" }} />
          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: "1rem",
            }}
          >
            <Box>
              <Box
                className="username"
                sx={{
                  display: "grid",
                  gridTemplateColumns: "1fr 2fr",
                  gap: "1rem",
                  "& a": {
                    color: "black",
                    textDecoration: "none",
                    cursor: "pointer",
                  },
                }}
              >
                <p>Username:</p>
                <p>
                  <b>{selectedArtist?.userName}</b>
                </p>
                <p>Email</p>
                <p>
                  <b style={{ cursor: "pointer" }}>
                    <a
                      href={`mailto:${selectedArtist?.email}`}
                      rel="noreferrer"
                    >
                      {" "}
                      {selectedArtist?.email}
                    </a>
                  </b>
                </p>
                <p>Commissoin % </p>

                <p>
                  <form ref={commission}>
                    <TextField
                      name="commissionInput"
                      sx={{ width: "100%" }}
                      defaultValue={selectedArtist?.commissionPercent}
                      variant="standard"
                      type="number"
                      inputProps={{
                        min: 1,
                        max: 100,
                        maxLength: 2,
                      }}
                      disabled={selectedArtist?.isApprovedArtist}
                      onInput={(e) => {
                        e.target.value = Math.max(0, parseInt(e.target.value))
                          .toString()
                          .slice(0, 2);
                      }}
                    />
                  </form>
                </p>
                <p>Description</p>
                <p>
                  <b>{selectedArtist?.bioData}</b>
                </p>
                <p>Name</p>
                <p>
                  <b>{selectedArtist?.name}</b>
                </p>
                <p>Total Followers</p>
                <p>
                  <b>{selectedArtist?.totalFollowers}</b>
                </p>
                <p>Instagram</p>
                <p>
                  <a
                    href={selectedArtist?.instagramUrl}
                    target="_blank"
                    rel="noreferrer"
                  >
                    <b>{selectedArtist?.instagramUrl}</b>
                  </a>
                </p>
                <p>Twitter</p>
                <p>
                  <a
                    href={selectedArtist?.twitterUrl}
                    target="_blank"
                    rel="noreferrer"
                  >
                    <b>{selectedArtist?.twitterUrl}</b>
                  </a>
                </p>
                <p>Website</p>
                <p>
                  <a
                    href={selectedArtist?.websiteUrl}
                    target="_blank"
                    rel="noreferrer"
                  >
                    <b>{selectedArtist?.websiteUrl}</b>
                  </a>
                </p>
              </Box>
            </Box>
            <Box
              sx={{ borderLeft: "1px solid lightgray", paddingLeft: "1rem" }}
            >
              <Typography
                sx={{
                  marginBottom: "1rem",
                  fontWeight: "bold",
                }}
              >
                Work Uploaded By Artist:
              </Typography>
              <Box
                sx={{
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr",
                  gap: "1rem",
                }}
              >
                {console.log({ selectedArtist })}
                {selectedArtist?.imageData?.map((image) => {
                  return (
                    <Box sx={{ position: "relative" }}>
                      <Box
                        sx={{
                          width: "100%",
                          // height: "5rem",
                          aspectRatio: "1/1",
                          backgroundImage: `url(${image})`,
                          backgroundPosition: "center",
                          backgroundSize: "cover",
                        }}
                      ></Box>
                      <a
                        href={image}
                        download
                        style={{
                          color: "#131313",
                          position: "absolute",
                          right: "0rem",
                          top: "0rem",
                          padding: ".5rem",
                        }}
                      >
                        <DownloadIcon width="1.3rem" />
                      </a>
                    </Box>
                  );
                })}
              </Box>
            </Box>
          </Box>
        </DialogContent>
        <DialogActions>
          {!selectedArtist?.isApprovedArtist && (
            <Button
              sx={{
                borderRadius: "0",
                background: "#131313",
                color: "whitesmoke",
              }}
              variant="contained"
              color="primary"
              onClick={approveArtist}
              disabled={selectedArtist?.isApprovedArtist}
            >
              Approve
            </Button>
          )}
          <Button
            onClick={() => {
              setOpenDialog(false);
              setselectedArtist();
            }}
            variant="outlined"
            color="primary"
          >
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
      <>
        {artistUserData ? (
          <Box display="flex" justifyContent="center">
            <Box
              sx={{
                height: 475,
                width: "90%",

                "& .super-app-theme--header": {
                  backgroundColor: "#555555",
                  color: "white",
                },
              }}
            >
              <DataGrid
                editMode="row"
                rows={artistUserData.map((item) => ({
                  ...item,
                }))}
                // onRowClick={handleRowClick}
                columns={columns}
                experimentalFeatures={{ newEditingApi: true }}
              />
            </Box>
          </Box>
        ) : (
          <Typography>No artists found</Typography>
        )}
      </>
    </>
  );
};

export default ApproveArtists;
