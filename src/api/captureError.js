import axios from "axios";

export const captureError = async (data, token) => {
  try {
    const editProfileRes = await axios.post("/capture-admin-error", data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return editProfileRes;
  } catch (err) {
    return err.response;
  }
};
