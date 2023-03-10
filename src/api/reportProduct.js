import axios from "axios";

export const getAllReportedProduct = async (token) => {
  try {
    const res = await axios.get("get-reported-product", {
      headers: { Authorization: `Bearer ${token}` },
    });
    return res;
  } catch (err) {
    return err.response;
  }
};
