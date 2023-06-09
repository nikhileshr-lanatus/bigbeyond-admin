import React, { useState, useEffect } from "react";
import { DataGrid } from "@mui/x-data-grid";
import {
  Box,
  Button,
  CircularProgress,
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
import { stripeCurrencyType } from "../constant";

const ViewPayments = () => {
  const [paymentsData, setpaymentsData] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedPayment, setselectedPayment] = useState();
  const [loading, setLoading] = useState(false)

  const { authToken } = useAuthContext();

  useEffect(() => {
    //get all the artist data for admin
    setLoading(true)
    const getPaymentDataOnFirstLoad = () => {
      getAllArtistUsers(authToken)
        .then((getAdminUserRes) => {
          if (getAdminUserRes?.status === 200) {
            // setpaymentsData(getAdminUserRes.data);
          }
        })
        .catch((getAdminUserErrorRes) => {
          captureError(getAdminUserErrorRes.data, authToken);
        });
    };

    const getPaymentData = (token) => {
      getAllPaymentData({ count: 1000 }, token)
        .then((allPaymentRes) => {
          // console.log({ allPaymentRes });
          setpaymentsData(allPaymentRes.data.data);
          setLoading(false)
        })
        .catch((allPaymentErr) => {
          console.log({ allPaymentErr });
          setLoading(false)
        });
    };

    authToken && getPaymentDataOnFirstLoad();

    authToken && getPaymentData(authToken);
  }, [authToken]);

  // const handleViewClick = (row) => (event) => {
  //   event.stopPropagation();
  //   setselectedPayment(row);
  //   setOpenDialog(true);
  // };

  const columns = [
    {
      field: "id",
      headerName: "ID",
      width: 80,
      headerClassName: "super-app-theme--header",
    },
    {
      field: "amount",
      headerName: "Amount",
      headerClassName: "super-app-theme--header",
      width: 180,
      flex: 1,
    },
    {
      field: "fee",
      headerName: "Fees",
      headerClassName: "super-app-theme--header",
      width: 180,
      flex: 1,
    },

    {
      field: "net",
      headerName: "Net",
      headerClassName: "super-app-theme--header",
      width: 180,
      flex: 1,
    },
    {
      field: "status",
      headerName: "Status",
      headerClassName: "super-app-theme--header",
      width: 100,
      sortable: false,
    },
    {
      field: "currency",
      headerName: "Currency",
      headerClassName: "super-app-theme--header",
      width: 150,
      sortable: false,
    },
    {
      field: "created",
      headerName: "Created On",
      headerClassName: "super-app-theme--header",
      width: 120,
    },

    // {
    //   field: "view",
    //   headerName: "Approval",
    //   headerClassName: "super-app-theme--header",
    //   width: 100,
    //   renderCell: ({ row }) => (
    //     <strong>
    //       <GridActionsCellItem
    //         //   icon={<VisibilityIcon />}

    //         icon={row?.isApprovedArtist ? <EyeOpen /> : <EditIcon />}
    //         label="View"
    //         onClick={handleViewClick(row)}
    //         color="inherit"
    //       />
    //     </strong>
    //   ),
    // },
  ];

  if (loading) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "50vh",
          width: "100vw",
        }}
      >
        <CircularProgress />
      </Box>
    );
  }
  return (
    <>
      <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
        <DialogTitle>
          <b>Payment Details</b>
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
          <Box sx={{ width: "100%", display: "flex", justifyContent: "center" }}>
            <h1 style={{ width: "90%" }}> Payment</h1>
          </Box>
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
                  net: `${item.net / 100}`,
                  fee: `${item.fee / 100}`,
                  amount: `${item.amount / 100}`,
                  status: item.status === "available" ? "Debit" : "Credit",
                  currency: item.currency === stripeCurrencyType ? stripeCurrencyType.toLocaleUpperCase() : "",
                  created: `${new Date(item.created * 1000).getDate()}-${new Date(item.created * 1000).getMonth() + 1
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

export default ViewPayments;
