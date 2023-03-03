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
