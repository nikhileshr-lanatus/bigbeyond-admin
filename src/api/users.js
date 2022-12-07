import axios from "axios";

export const updateUserData = async (data, token) => {
  try {
    const editProfileRes = await axios.put("/edit-profile", data, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "multipart/form-data",
      },
    });
    return editProfileRes;
  } catch (err) {
    return err.response;
  }
};

export const getUserData = async (token) => {
  try {
    const userData = await axios.get("/get-user", {
      headers: { Authorization: `Bearer ${token}` },
    });
    return userData;
  } catch (err) {
    return err.response;
  }
};

export const userLogin = async (data) => {
  try {
    const userData = await axios.post("sign-in", data);
    return userData;
  } catch (err) {
    return err.response;
  }
};

export const userLogout = async (token) => {
  try {
    const userData = await axios.get("logout", {
      headers: { Authorization: `Bearer ${token}` },
    });

    return userData;
  } catch (err) {
    return err.response;
  }
};

export const userSignUp = async (data) => {
  try {
    const userData = await axios.post("sign-up", data);
    return userData;
  } catch (err) {
    return err.response;
  }
};

export const getUserAddressData = async (token) => {
  try {
    const userAddressData = await axios.get("/api/get-user-address", {
      headers: { Authorization: `Bearer ${token}` },
    });
    return userAddressData;
  } catch (err) {
    return err.response;
  }
};

export const userAddressDataAdd = async (data) => {
  try {
    const userAddressData = await axios.post("/api/add-user-address", data);
    return userAddressData;
  } catch (err) {
    return err.response;
  }
};

export const verifyEmailForUser = async (data) => {
  try {
    const res = await axios.post("verify-user-email", data);
    return res;
  } catch (err) {
    return err.response;
  }
};

export const reVerifyEmailForUser = async (data) => {
  try {
    const res = await axios.post("resend-verification-email", data);
    return res;
  } catch (err) {
    return err.response;
  }
};

export const getAllArtists = async (token) => {
  try {
    const res = await axios.get("get-all-artists", {
      headers: { Authorization: `Bearer ${token}` },
    });
    return res;
  } catch (err) {
    return err.response;
  }
};

export const getAllWishlistItems = async (token) => {
  try {
    const wishlistData = await axios.get("/get-user-wishlist", {
      headers: { Authorization: `Bearer ${token}` },
    });
    return wishlistData;
  } catch (err) {
    return err.response;
  }
};

export const createStripeAccountForArtist = async (data, token) => {
  try {
    const res = await axios.post("create-stripe-account-for-artist", data, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return res;
  } catch (err) {
    return err.response;
  }
};

export const getAllAdminUsers = async (token) => {
  try {
    const res = await axios.get("get-all-admin-user", {
      headers: { Authorization: `Bearer ${token}` },
    });
    return res;
  } catch (err) {
    return err.response;
  }
};

export const getAllArtistUsers = async (token) => {
  try {
    const res = await axios.get("get-all-artists", {
      headers: { Authorization: `Bearer ${token}` },
    });
    return res;
  } catch (err) {
    return err.response;
  }
};

export const approveArtistUser = async (data, token) => {
  try {
    const res = await axios.post("approve-artist-user", data, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return res;
  } catch (err) {
    return err.response;
  }
};
