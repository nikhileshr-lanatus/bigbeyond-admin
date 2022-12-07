import React, {
  useEffect,
  createContext,
  useContext,
  useState,
  useCallback,
} from "react";
import { getUserData } from "../api/users";
import { useNavigate } from "react-router-dom";
import { useSnackbar } from "notistack";

const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  // const [library, setAuthLibrary] = useState();
  // const [account, setAuthAccount] = useState();
  const [currentUser, setCurrentUser] = useState();
  // const [signer, setSigner] = useState();
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();

  const showSnackBarNotification = useCallback(
    (variant, message, durationInMiliSeconds) => {
      if (variant && message && durationInMiliSeconds) {
        enqueueSnackbar(message, {
          variant: variant,
          autoHideDuration: durationInMiliSeconds,
        });
      }
    },
    [enqueueSnackbar]
  );

  // const bigBeyondContract = useCallback(() => {
  //   if (library && account) {
  //     return getBeyondContract(library, account);
  //   }
  // }, [account, library]);

  // const bigBeyondParentContract = useCallback(() => {
  //   if (library && account) {
  //     return getParentBigBeyondContract(library, account);
  //   }
  // }, [account, library]);

  // const connectMultipleWallet = async (web3Modal) => {
  //   try {
  //     const provider = await web3Modal.connect();
  //     let accountData;
  //     const libraryData = new ethers.providers.Web3Provider(provider);

  //     const accounts = await libraryData.listAccounts();

  //     setAuthLibrary(libraryData);

  //     if (accounts) {
  //       localStorage.setItem("user-wallet", account[0]);
  //       setAuthAccount(accounts[0]);
  //       accountData = accounts[0];

  //       const sign = libraryData.getSigner();
  //       setSigner(sign);
  //     }
  //     // console.log("return from connect multiple wallet user-wallet");
  //     // console.log({ provider, libraryData, accountData });
  //     return { provider, library: libraryData, account: accountData };
  //   } catch (err) {
  //     console.log(err);
  //   }
  // };

  const [expiresAt, setExpiresAt] = useState(localStorage.getItem("expiresAt"));

  const [authToken, setAuthToken] = useState(
    Boolean(expiresAt) && new Date().getTime() < expiresAt
      ? localStorage.getItem("auth-token") || ""
      : ""
  );

  useEffect(() => {
    const intervalFunction = setInterval(() => {
      const currentTime = Date.now();
      const expireTime = localStorage.getItem("expiresAt");
      // console.log({ expireTime, currentTime });
      if (expireTime && currentTime < parseInt(expireTime)) {
        const msg = `Your session will end in ${Math.ceil(
          (parseInt(expireTime) - currentTime) / (60 * 1000)
        )} minutes`;

        showSnackBarNotification("info", msg, 2000);
      } else if (currentTime > parseInt(expireTime)) {
        localStorage.removeItem("auth-token");
        localStorage.removeItem("expiresAt");
        showSnackBarNotification("info", "Please Login to continue", 2000);
        navigate("/sign-in");
      }
    }, 5 * 60 * 1000);
    return () => clearInterval(intervalFunction);
  }, [showSnackBarNotification, navigate]);

  // useEffect(() => {
  //   if (!window.ethereum) {
  //     // Nothing to do here... no ethereum provider found
  //     return;
  //   }
  //   const accountWasChanged = (accounts) => {
  //     setAuthAccount(accounts[0]);
  //     // console.log("accountWasChanged");
  //   };
  //   const getAndSetAccount = async () => {
  //     const changedAccounts = await window.ethereum.request({
  //       method: "eth_requestAccounts",
  //     });
  //     setAuthAccount(changedAccounts[0]);
  //     // console.log("getAndSetAccount");
  //   };
  //   const clearAccount = () => {
  //     setAuthAccount(undefined);
  //     // console.log("clearAccount");
  //   };

  //   try {
  //     window.ethereum.on("accountsChanged", accountWasChanged);
  //     window.ethereum.on("connect", getAndSetAccount);
  //     window.ethereum.on("disconnect", clearAccount);
  //     window.ethereum.request({ method: "eth_requestAccounts" }).then(
  //       (accounts) => {
  //         // console.log("accounts", accounts);
  //         // No need to set account here, it will be set by the event listener
  //       },
  //       (error) => {
  //         // Handle any UI for errors here, e.g. network error, rejected request, etc.
  //         // Set state as needed
  //       }
  //     );

  //     return () => {
  //       // Return function of a non-async useEffect will clean up on component leaving screen, or from re-reneder to due dependency change
  //       window.ethereum.removeListener("accountsChanged", accountWasChanged);
  //       window.ethereum.removeListener("connect", getAndSetAccount);
  //       window.ethereum.removeListener("disconnect", clearAccount);
  //     };
  //   } catch (erorrInLogicToConnectWallet) {
  //     console.log({ erorrInLogicToConnectWallet });
  //   }
  // }, [account]);

  useEffect(() => {
    const setUserData = async () => {
      try {
        localStorage.getItem("auth-token") &&
          setAuthToken(localStorage.getItem("auth-token"));
        if (localStorage.getItem("auth-token")) {
          getUserData(localStorage.getItem("auth-token")).then((getUserRes) => {
            if (getUserRes.status === 200) {
              setCurrentUser(getUserRes.data);
            } else {
              userDataClenaUpOnLogout();
              showSnackBarNotification(
                "info",
                "Please Login to continue",
                2000
              );
              navigate("/sign-in");
            }
          });
        }
      } catch (err) {
        console.log({ err });
      }
    };
    if (!currentUser) {
      setUserData();
    }
  }, [currentUser, showSnackBarNotification, navigate]);

  useEffect(() => {
    if (authToken) {
      localStorage.setItem("auth-token", authToken);

      const newExpiresAt = new Date().getTime() + 2 * 60 * 60 * 1000;
      setExpiresAt(newExpiresAt);
      localStorage.setItem("expiresAt", newExpiresAt);
    }
  }, [authToken]);

  // useEffect(() => {
  //   if (!currentUser) {
  //     setCurrentUser(JSON.parse(localStorage.getItem("current-user")));
  //   }
  // }, [currentUser]);

  // const closingCode = () => {
  //   // do something...
  //   userDataClenaUpOnLogout();
  //   return null;
  // };
  // window.onbeforeunload = closingCode;

  const authTokenChangeHandler = (newAuthToken) => {
    setAuthToken(newAuthToken);
  };

  const userDataClenaUpOnLogout = () => {
    localStorage.removeItem("auth-token");
    localStorage.removeItem("walletconnect");
    localStorage.removeItem("current-user");
    localStorage.removeItem("expiresAt");
    localStorage.removeItem("user-wallet");
    // setAuthToken(undefined);
    // setAuthLibrary(undefined);
    // setAuthAccount(undefined);
    setCurrentUser(undefined);
    setExpiresAt(undefined);
    // setSigner(undefined);
  };

  return (
    <AuthContext.Provider
      value={{
        authToken,
        setAuthToken: authTokenChangeHandler,
        // bigBeyondContract,
        // bigBeyondParentContract,
        // library,
        // setAuthLibrary,
        // account,
        // setAuthAccount,
        // connectMultipleWallet,
        currentUser,
        setCurrentUser,
        expiresAt,
        setExpiresAt,
        // signer,
        userDataClenaUpOnLogout,
        navigate,
        showSnackBarNotification,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuthContext must be used within a AuthContextProvider");
  }
  return context;
};
