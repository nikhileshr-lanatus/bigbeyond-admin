import axios from "axios";

export const getArtistWorkData = async (data, token) => {
  try {
    const CartRes = await axios.post("get-artistWorks", data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return CartRes;
  } catch (err) {
    return err.response;
  }
};
