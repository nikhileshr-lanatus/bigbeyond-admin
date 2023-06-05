import React, { useState, useEffect } from "react";
import { DataGrid } from "@mui/x-data-grid";
import {
    Box,
    Button,
    CircularProgress,
    Typography,
} from "@mui/material";
import { useAuthContext } from "../context/AuthContextProvider";
import { getAllOrdersData, getAllPaymentData } from "../api/payment";

const Orders = () => {
    const [paymentsData, setPaymentsData] = useState([]);
    const [loading, setLoading] = useState(false)

    const { authToken } = useAuthContext();

    useEffect(() => {
        const getPaymentData = (token) => {
            getAllOrdersData({ count: 1000 }, token)
                .then((allPaymentRes) => {
                    // console.log({ allPaymentRes });
                    setPaymentsData(allPaymentRes.data);
                    setLoading(false)
                })
                .catch((allPaymentErr) => {
                    console.log({ allPaymentErr });
                    setLoading(false)
                });
        };
        authToken && getPaymentData(authToken);
    }, [authToken]);

    console.log(paymentsData)

    const columns = [
        {
            field: "id",
            headerName: "ID",
            width: 80,
            headerClassName: "super-app-theme--header",
        },
        {
            field: "productName",
            headerName: "Product Name",
            headerClassName: "super-app-theme--header",
            width: 180,
            flex: 1,
        },
        {
            field: "quantity",
            headerName: "Quantity",
            headerClassName: "super-app-theme--header",
            width: 180,

        },

        {
            field: "trackingId",
            headerName: "Tracking Id",
            headerClassName: "super-app-theme--header",
            width: 180,
        },
        {
            field: "trackingUrl",
            headerName: "Tracking URL",
            headerClassName: "super-app-theme--header",
            width: 100,
            sortable: false,
        },
        {
            field: "deliveryProofUrl",
            headerName: "Delivery Proof",
            headerClassName: "super-app-theme--header",
            width: 150,
            sortable: false,
            renderCell: (params) => {
                console.log({ params })
                return (
                    params.row.deliveryProofUrl ? <Button
                        width={100}
                        variant="contained"
                        href={params.row.deliveryProofUrl}
                    >
                        Show Proof
                    </Button> : "-"
                )
            },
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

            <Box sx={{ width: "100%", display: "flex", justifyContent: "center" }}>
                <h1 style={{ width: "90%" }}> Orders</h1>
            </Box>


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
                                productName: item.products.name,
                                trackingId: item.trackingId || "-",
                                trackingUrl: item.trackingUrl || "-",
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

export default Orders;
