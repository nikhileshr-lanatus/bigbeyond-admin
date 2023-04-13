import React, { useState, useEffect } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { Box, CircularProgress, Typography } from "@mui/material";
// import { GridActionsCellItem } from "@mui/x-data-grid";

import { useAuthContext } from "../context/AuthContextProvider";
import { getAllReportedProduct } from "../api/reportProduct";

const ReportedProducts = () => {
  const [reportedData, setReportedData] = useState([]);
  const [loading, setLoading] = useState(false);

  const { authToken } = useAuthContext();

  useEffect(() => {
    const getReportData = (token) => {
      setLoading(true);
      getAllReportedProduct(token)
        .then((res) => {
          setReportedData(res.data);
          setLoading(false);
        })
        .catch((allReportProduct) => {
          console.log({ allReportProduct });
          setLoading(false);
        });
    };
    authToken && getReportData(authToken);
  }, [authToken]);
  const columns = [
    {
      field: "id",
      headerName: "ID",
      headerClassName: "super-app-theme--header",
    },
    {
      field: "productsId",
      headerName: "Product ID",
      headerClassName: "super-app-theme--header",
    },
    {
      field: "productName",
      headerName: "Product Name",
      headerClassName: "super-app-theme--header",
      flex: 0.4,
    },
    {
      field: "userName",
      headerName: "Artist Name",
      headerClassName: "super-app-theme--header",
      flex: 0.2,
    },
    {
      field: "createdDate",
      headerName: "Created Date",
      headerClassName: "super-app-theme--header",
      flex: 0.2,
    },
    {
      field: "description",
      headerName: "Description",
      headerClassName: "super-app-theme--header",
      flex: 1,
    },
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
      <>
        <Box sx={{ width: "100%", display: "flex", justifyContent: "center" }}>
          <h1 style={{ width: "90%" }}> Reported Products</h1>
        </Box>
      </>
      {reportedData?.length > 0 ? (
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
              rows={reportedData.map((item, index) => ({
                ...item,
                productName: item.products.name,
                userName: item.products.users.userName,
                id: index + 1,
                createdDate: `${new Date(item.createdDate).getDate()}-${new Date(item.createdDate).getMonth() + 1
                  }-${new Date(item.createdDate).getFullYear()}`,
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
  );
};

export default ReportedProducts;
