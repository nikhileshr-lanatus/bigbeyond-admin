import "./App.css";
import Content from "./layout/Content";
import ScrollToTop from "./layout/ScrollToTop";
import ErrorFallback from "./layout/ErrorFallback";
import React from "react";
import axios from "axios";
import { ErrorBoundary } from "react-error-boundary";
import { BrowserRouter } from "react-router-dom";
import { SnackbarProvider } from "notistack";
import { AuthContextProvider } from "./context/AuthContextProvider";
import Theme from "./layout/Theme";

axios.defaults.baseURL = `${process.env.REACT_APP_API_BASE_URL}`;

function App() {
  return (
    <React.Fragment>
      <BrowserRouter>
        <Theme>
          <ErrorBoundary FallbackComponent={ErrorFallback}>
            <ScrollToTop />
            <SnackbarProvider hideIconVariant={false} maxSnack={3}>
              <AuthContextProvider>
                <Content />
              </AuthContextProvider>
            </SnackbarProvider>
          </ErrorBoundary>
        </Theme>
      </BrowserRouter>
    </React.Fragment>
  );
}

export default App;
