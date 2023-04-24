import React from "react";
import { useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { Button, CircularProgress, Typography, Box } from "@mui/material";
import {
  createPaymentForArtistUsingStripe,
  getAllPaymentRequests,
  getAllStripePaymentDetails,
  updateArtistPaymentStatusForOrderData,
} from "../api/payment";
import { useEffect } from "react";
import { useAuthContext } from "../context/AuthContextProvider";
import EyeOpen from "../assets/svgs/EyeOpen";
import PaymentCalculationDialog from "./PaymentModelView";
import { Check, Refresh } from "@mui/icons-material";

const PaymentRequests = () => {
  const [paymentsData, setPaymentsData] = useState([]);
  const [paymentModalData, setPaymentModalData] = useState();
  const [loading, setLoading] = useState(false);
  const { showSnackBarNotification, authToken } = useAuthContext();
  const [open, setOpen] = useState(false);
  const [loadingData, setLoadingData] = useState(false);

  const columns = [
    {
      field: "id",
      headerName: "Product ID",
      width: 80,
      headerClassName: "super-app-theme--header",
    },
    {
      field: "fullName",
      headerName: "Artist Name",
      headerClassName: "super-app-theme--header",
      width: 120,
      flex: 1,
    },
    {
      field: "name",
      headerName: "Product Name",
      headerClassName: "super-app-theme--header",
      width: 120,
      flex: 1,
    },
    {
      field: "amount",
      headerName: "Price",
      headerClassName: "super-app-theme--header",
      maxWidth: 100,
    },
    {
      field: "payableAmount",
      headerName: "Payable Amount",
      headerClassName: "super-app-theme--header",
      width: 100,
    },
    {
      field: "isPaymentRequested",
      headerName: "Status",
      headerClassName: "super-app-theme--header",
      width: 100,

      renderCell: (params) => (
        <Typography
          variant="body2"
          style={{
            color: !params.row.isPaymentRequested ? "green" : "red",
          }}
          width={100}
        >
          {params.row.isPaymentRequested ? "Unpaid" : "Paid"}
        </Typography>
      ),
    },
    {
      field: "paymentType",
      headerName: "Currency",
      headerClassName: "super-app-theme--header",
      width: 100,
      sortable: false,
    },
    {
      field: "paymentRequestedDate",
      headerName: "Last Requested On",
      headerClassName: "super-app-theme--header",
      width: 170,
    },
    {
      field: "view",
      headerName: "View",
      headerClassName: "super-app-theme--header",
      width: 50,
      sortable: false,
      renderCell: (params) => {
        return (
          <Typography
            onClick={() => {
              setPaymentModalData(params.row);
              setOpen(true);
            }}
            align="center"
            width="100%"
            display={"flex"}
            justifyContent={"center"}
            sx={{
              cursor: "pointer",
              color: "gray",
              ":hover": { color: "black" },
            }}
            alignItems={"center"}
            height={"100%"}
          >
            <EyeOpen />
          </Typography>
        );
      },
    },
    {
      field: "pay",
      headerName: "Pay",
      headerClassName: "super-app-theme--header",
      width: 50,
      sortable: false,
      renderCell: (params) => {
        return (
          (params?.row?.isPaymentRequested &&
            params?.row?.payableAmount &&
            (loading[params.row.id] ? (
              <Typography
                width={100}
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  cursor: "pointer",
                }}
                align="center"
              >
                <CircularProgress size={20} />
              </Typography>
            ) : (
              <Button
                onClick={async () => {
                  payTheArtist(params.row);
                }}
                variant="contained"
                sx={{
                  width: "2rem",
                  height: "2rem",
                  padding: "0",
                  minWidth: "unset",
                  borderRadius: "50%",
                  border: "1px solid black",
                  fontSize: "0.7rem",
                }}
              >
                Pay
                {/* <AttachMoneyIcon /> */}
              </Button>
            ))) || (
            <Typography
              width={100}
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                color: "#daa520",
                cursor: "pointer",
                ":hover": {},
              }}
            >
              <Check />
            </Typography>
          )
        );
      },
    },
    {
      field: "date",
      headerName: "Last Paid On",
      headerClassName: "super-app-theme--header",
      width: 170,
    },
  ];

  function handleViewClick(product) {
    if (product.productOrder?.length > 0) {
      const orders = product.productOrder;
      const totalOrders = orders.length;
      const totalQty = orders.reduce((prev, cur) => prev + cur.quantity, 0);

      const deliveredOrdersWithArtistNotPaid = orders?.filter(
        (o) => o.isArtistPaid === false && o.deliveryStatus === "delivered"
      );

      const deliveredOrdersQuantityWithArtistNotPaid =
        deliveredOrdersWithArtistNotPaid.reduce(
          (prev, cur) => prev + cur.quantity,
          0
        );

      const amountToPay =
        orders[0].amount * deliveredOrdersQuantityWithArtistNotPaid;
      const artistCommission = product?.users?.commissionPercent
        ? product?.users?.commissionPercent
        : 5;
      const payableAmount = (amountToPay * (100 - artistCommission)) / 100;

      const tempPaymentModataData = {
        totalOrders,
        totalQty,
        dueOrders: deliveredOrdersWithArtistNotPaid.length,
        dueOrdersList: deliveredOrdersWithArtistNotPaid,
        dueQty: deliveredOrdersQuantityWithArtistNotPaid,
        amount: orders[0].amount * deliveredOrdersQuantityWithArtistNotPaid,
        dueAmount: amountToPay,
        paymentType: product?.paymentType?.name,
        artistCommission: `${artistCommission}%`,
        payableAmount: `$ ${payableAmount}`,
      };
      return tempPaymentModataData;
    }
  }

  const payTheArtist = async (data) => {
    setPaymentModalData(data);
    if (data.paymentType === "USD") {
      const apiData = {
        amount: data?.payableAmount?.split(" ")[1],
        artistId: data.artistId,
        productId: data.id,
        productName: data.name,
        metadata: {
          productId: data.id,
          email: data.email,
          productName: data.name,
          amount: data?.payableAmount?.split(" ")[1],
        },
        currency: "usd",
      };
      setLoading({ ...loading, [data.id]: true });
      try {
        let a = await payArtistApiStripeCallOnPayNow(apiData, data);
        if (a) {
          const tempPaymentData = paymentsData.map((item) => {
            if (item.id === data.id) {
              return {
                ...item,
                isPaymentRequested: false,
                payableAmount: "$ 0",
                date: new Date().toLocaleString(),
              };
            }
            return item;
          });
          setPaymentsData(tempPaymentData);
        }
      } catch (error) {
        showSnackBarNotification("error", error.message, 1500);
      }
    } else if (data.paymentType === "ETH") {
      // payArtistInEthViaWallet();
      //once payment is success ful call markArtistPaidForOrders()
    } else {
      showSnackBarNotification("success", "Invalid payment type found", 2000);
    }
    setLoading({ ...loading, [data.id]: false });
  };

  const payArtistApiStripeCallOnPayNow = async (data, allData) => {
    try {
      const createPayment = await createPaymentForArtistUsingStripe(
        data,
        authToken
      );
      if (createPayment.status === 200) {
        showSnackBarNotification("success", "Payment done for artist", 5000);
        await markArtistPaidForOrders(allData?.dueOrdersList);
        return true;
      } else {
        throw new Error(
          `Some Issue on Stripe side message: ${createPayment?.data?.msg} `
        );
      }
    } catch (error) {
      showSnackBarNotification("info", error.message, 5000);
      throw new Error("Some Issue on Stripe side");
    }
  };

  const markArtistPaidForOrders = async (data) => {
    // const updatePayStatus = await
    updateArtistPaymentStatusForOrderData(data, authToken)
      .then(async (response) => {
        if (response.status === 204) {
          showSnackBarNotification(
            "success",
            "Payment status updated for artist",
            5000
          );
        }
      })
      .catch((error) => {
        showSnackBarNotification("error", error.message, 5000);
      });
  };

  const getPayments = async () => {
    setLoadingData(true);
    let tempPaymentData = {};
    let res = await getAllStripePaymentDetails(authToken);
    const temp1 = res.data.map((i) => {
      const productId = i?.comments.split(" ");
      return {
        paymentReceiverId: i?.paymentReceiverId,
        date: i?.createdDate,
        productId: !isNaN(Number(productId[productId.length - 1]))
          ? Number(productId[productId.length - 1])
          : null,
      };
    });
    tempPaymentData = temp1;

    res = await getAllPaymentRequests(authToken);
    const loadingTemp = {};
    const temp = res?.data.map((item) => {
      const b = item?.users;
      loadingTemp[item.id] = false;
      const artistId = b?.id;
      delete b.id;
      let a = handleViewClick(item);
      delete a?.id;
      const date = tempPaymentData
        ?.filter((i) => i.productId === item.id)
        .sort((b, a) => new Date(a.date) - new Date(b.date))[0]?.date;
      const requestedDate = item?.paymentRequestedDate
        ? new Date(item?.paymentRequestedDate).toLocaleString()
        : "";
      return {
        ...item,
        paymentRequestedDate: requestedDate,
        artistId: artistId,
        paymentType: item?.paymentType?.name,
        ...a,
        ...b,
        amount: item?.price,
        fullName: b.fullName ? b.fullName : "unknown",
        date: date ? new Date(date).toLocaleString() : "",
      };
    });
    setPaymentsData(temp);
    setLoading(loadingTemp);
    setLoadingData(false);
  };

  useEffect(() => {
    getPayments();
  }, []);

  if (loadingData) {
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
      <PaymentCalculationDialog
        loading={loading}
        open={open}
        onClose={() => setOpen(false)}
        paymentObj={paymentModalData}
        onClickCancel={() => setOpen(false)}
      />
      <>
        <Box display="flex" justifyContent="center">
          <Box
            sx={{
              width: "90%",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginLeft: "0.3rem",
            }}
          >
            <h1> Payment Requests</h1>
            <Button
              sx={{
                color: "black",
                textTransform: "capitalize",
                fontWeight: "bold",
                ":hover": {
                  backgroundColor: "#fff",
                  color: "#daa520",
                  fontWeight: "bold",
                },
              }}
              startIcon={<Refresh style={{ cursor: "pointer" }} />}
              onClick={() => getPayments()}
            >
              Refresh
            </Button>
          </Box>
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
              rows={paymentsData?.map((item, index) => ({
                ...item,
                key: index,
                amount: `$ ${item.amount}`,
                created: `${new Date(item.created * 1000).getDate()} -${
                  new Date(item.created * 1000).getMonth() + 1
                } -${new Date(item.created * 1000).getFullYear()} `,
              }))}
              disableSelectionOnClick
              isRowSelectable={false}
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

export default PaymentRequests;
