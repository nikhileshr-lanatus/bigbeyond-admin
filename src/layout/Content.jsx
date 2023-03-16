import { Routes, Route, Navigate } from "react-router-dom";

import PageNotFound from "../pages/PageNotFound";
// import Blogs from "../pages/Blogs";
import { Box } from "@mui/material";
import Header from "./Header";
// import Footer from "./Footer";
import HomePage from "../pages/HomePage";
import SignIn from "../pages/SignIn";
// import SignUp from "../pages/SignUp";
import ComingSoon from "./ComingSoon";
import CreateAdmin from "../pages/CreateAdmin";
import { useAuthContext } from "../context/AuthContextProvider";
import ApproveArtists from "../pages/ApproveArtists";
import ViewPayments from "../pages/ViewPayments";
import ReportedProducts from "../pages/ReportedProducts";

const Content = () => {
  const { currentUser } = useAuthContext();
  return (
    <>
      <Box
        sx={{
          minHeight: "100vh",
          maxWidth: "100vw",
          display: "flex",
          flexDirection: "column",
          // justifyContent: "space-between",
        }}
      >
        <Box sx={{ marginBottom: "3rem" }}>
          <Header />
        </Box>
        <Box>
          <Routes>
            <Route
              path="/"
              element={
                currentUser ? (
                  <Navigate to="/dashboard" />
                ) : (
                  <Navigate to="/sign-in" />
                )
              }
            />
            <Route path="/admin/dashboard" element={<HomePage />} />
            <Route path="/admin/create-admin-user" element={<CreateAdmin />} />
            <Route
              path="/admin/approve-artist-user"
              element={<ApproveArtists />}
            />
            <Route path="/admin/see-all-payments" element={<ViewPayments />} />
            <Route
              path="/admin/check-delivery-status"
              element={<ComingSoon />}
            />
            <Route path="/admin/configure-a-collab" element={<ComingSoon />} />
            <Route
              path="/admin/reported-products"
              element={<ReportedProducts />}
            />

            <Route path="/sign-in" element={<SignIn />} />
            {/* <Route path="/admin/approve-product-request" element={<ComingSoon />}/> */}
            {/* <Route path="/sign-up" element={<SignUp />} /> */}
            {/* <Route path="/blogs" element={<Blogs />} /> */}
            <Route exact path="*" element={<PageNotFound />} />
          </Routes>
        </Box>
      </Box>
    </>
  );
};

export default Content;
