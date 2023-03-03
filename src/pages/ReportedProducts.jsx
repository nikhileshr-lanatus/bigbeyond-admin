import React, { useState, useEffect } from "react";
import { DataGrid } from "@mui/x-data-grid";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Typography,
} from "@mui/material";
// import { GridActionsCellItem } from "@mui/x-data-grid";

import { useAuthContext } from "../context/AuthContextProvider";
import { getAllArtistUsers } from "../api/users";
import { captureError } from "../api/captureError";
import { getAllPaymentData } from "../api/payment";

const ReportedProducts = () => {
  const [paymentsData, setpaymentsData] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedPayment, setselectedPayment] = useState();

  const { authToken } = useAuthContext();

  useEffect(() => {
    //get all the artist data for admin
    const getPaymentDataOnFirstLoad = () => {
      getAllArtistUsers(authToken)
        .then((getAdminUserRes) => {
          if (getAdminUserRes?.status === 200) {
            setpaymentsData(getAdminUserRes.data);
          }
        })
        .catch((getAdminUserErrorRes) => {
          captureError(getAdminUserErrorRes.data, authToken);
        });
    };

    const getPaymentData = (token) => {
      getAllPaymentData({ count: 20 }, token)
        .then((allPaymentRes) => {
          // console.log({ allPaymentRes });
          setpaymentsData(allPaymentRes.data.data);
        })
        .catch((allPaymentErr) => {
          console.log({ allPaymentErr });
        });
    };

    authToken && getPaymentDataOnFirstLoad();

    authToken && getPaymentData(authToken);
  }, [authToken]);


  const columns = [
    {
      field: "id",
      headerName: "ID",
      width: 60,
      headerClassName: "super-app-theme--header",
    },
    {
      field: "net",
      headerName: "Net",
      headerClassName: "super-app-theme--header",
      width: 120,
    },
    {
      field: "fee",
      headerName: "Fees",
      headerClassName: "super-app-theme--header",
      width: 120,
    },
    {
      field: "amount",
      headerName: "Amount",
      headerClassName: "super-app-theme--header",
      width: 120,
    },
    {
      field: "status",
      headerName: "Status",
      headerClassName: "super-app-theme--header",
      width: 170,
      sortable: false,
    },
    {
      field: "currency",
      headerName: "Currency",
      headerClassName: "super-app-theme--header",
      width: 140,
      sortable: false,
    },
    {
      field: "created",
      headerName: "Created On",
      headerClassName: "super-app-theme--header",
      width: 140,
    },
  ];

  return (
    <>
      <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
        <DialogTitle>
          <b>Reported Products</b>
        </DialogTitle>
        <DialogContent>
          <hr />
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
              <b>{selectedPayment?.userName}</b>
            </p>
            <p>Email</p>
            <p>
              <b style={{ cursor: "pointer" }}>
                <a href={`mailto:${selectedPayment?.email}`} rel="noreferrer">
                  {" "}
                  {selectedPayment?.email}
                </a>
              </b>
            </p>
            <p>Description</p>
            <p>
              <b>{selectedPayment?.bioData}</b>
            </p>
            <p>Name</p>
            <p>
              <b>{selectedPayment?.name}</b>
            </p>
            <p>Total Followers</p>
            <p>
              <b>{selectedPayment?.totalFollowers}</b>
            </p>
            <p>Instagram</p>
            <p>
              <a
                href={selectedPayment?.instagramUrl}
                target="_blank"
                rel="noreferrer"
              >
                <b>{selectedPayment?.instagramUrl}</b>
              </a>
            </p>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => {
              setOpenDialog(false);
              setselectedPayment();
            }}
            variant="outlined"
            color="primary"
          >
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
      <>
        <>
          <h1 style={{ marginLeft: '4.5rem'}} > Reported Products </h1>
        </>
        {paymentsData ? (
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
                rows={paymentsData.map((item, index) => ({
                  ...item,
                  id: index + 1,
                  created: `${new Date(item.created * 1000).getDate()}-${
                    new Date(item.created * 1000).getMonth() + 1
                  }-${new Date(item.created * 1000).getFullYear()}`,
                }))}
                columns={columns}
                experimentalFeatures={{ newEditingApi: true }}
              />
            </Box>
          </Box>
        ) : (
          <Typography>No data found</Typography>
        )}
      </>
    </>
  );
};

export default ReportedProducts;
