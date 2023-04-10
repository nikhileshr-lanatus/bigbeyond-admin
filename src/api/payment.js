import axios from "axios";

export const getAllPaymentData = async (data, token) => {
  try {
    const res = await axios.post("get-admin-payment", data, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return res;
  } catch (err) {
    return err.response;
  }
};

export const getAllPaymentRequests = async (token) => {
  try {
    const res = await axios.get("get-products-payment-pending-for-artist", {
      headers: { Authorization: `Bearer ${token}` },
    });
    return res;
  } catch (err) {
    return err.response;
  }
};


export const createPaymentForArtistUsingStripe = async (data, token) => {
  try {
    const respose = await axios.post("/create-artist-payment", data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return respose;
  } catch (err) {
    return err.response;
  }
};

export const updateArtistPaymentStatusForOrderData = async (data, token) => {
  try {
    const updateRes = await axios.post(
      "update-artist-payment-status-for-orders",
      data,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    return updateRes;
  } catch (err) {
    console.log(err);
  }
};