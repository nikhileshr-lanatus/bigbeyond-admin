import * as React from "react";
import Box from "@mui/material/Box";
import SwipeableDrawer from "@mui/material/SwipeableDrawer";
import Button from "@mui/material/Button";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import MailIcon from "@mui/icons-material/Mail";
import MenuIcon from "@mui/icons-material/Menu";
import { useAuthContext } from "../context/AuthContextProvider";

export default function LeftNavbar(props) {
  const [state, setState] = React.useState({
    left: true,
  });

  const { navigate, authToken } = useAuthContext();

  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event &&
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

  const list = (anchor) => (
    <Box
      sx={{ width: anchor === "top" || anchor === "bottom" ? "auto" : 250 }}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <List>
        <ListItem key={"logo"} disablePadding>
          <ListItemButton
            onClick={() => navigate("/admin/dashboard")}
          >
            <ListItemIcon></ListItemIcon>
            <ListItemText
              primary={
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width={50}
                    // height={30}
                    viewBox="0 0 37 30"
                    fill="none"
                  >
                    <path
                      d="M11.8438 0C12.6126 0 13.254 0.000141188 13.9213 0.000282377V3.5331C12.1294 3.5331 10.2963 3.53268 8.76718 3.53268C6.26631 3.77072 4.36125 5.86384 4.36125 8.37784C4.36125 11.0671 6.52906 13.2394 9.21828 13.2452H13.9213V16.755H9.22859C6.53527 16.755 4.36125 18.9291 4.36111 21.6224C4.36111 24.1356 6.2649 26.2281 8.76492 26.4673H16.7449V0.000988319H27.7957C32.4078 0.0145424 36.1485 3.7662 36.1485 8.37826C36.1485 10.9798 34.9395 13.4215 32.9004 15.0006C34.9393 16.5796 36.1485 19.0213 36.1485 21.6229C36.1485 26.0018 32.766 29.6482 28.3993 29.9764C28.1904 29.9922 27.9808 30 27.7713 30H23.0786V26.4676H28.2348C30.7347 26.2284 32.6387 24.1359 32.6387 21.6227C32.6387 18.9294 30.4645 16.7554 27.7712 16.7554C26.0778 16.7554 24.5841 16.755 23.0786 16.755V13.2449C24.7139 13.2449 26.3867 13.2453 27.7816 13.2453C30.4708 13.2395 32.6387 11.0672 32.6387 8.37798C32.6387 5.86398 30.7336 3.77086 28.2327 3.53282H20.2549V29.9999H8.79838V29.9867C8.73245 29.9833 8.66651 29.9805 8.60072 29.9756C4.23404 29.6476 0.85144 26.0013 0.85144 21.6223C0.85144 19.0208 2.06058 16.5791 4.09949 15C2.06058 13.4209 0.85144 10.9792 0.85144 8.3777C0.85144 3.76564 4.59223 0.0139777 9.20416 0.000423565H9.20515C9.94286 0 10.6766 0 11.4132 0H11.8438Z"
                      fill="#DAA520"
                    />
                  </svg>
                </Box>
              }
            />
          </ListItemButton>
        </ListItem>
        {props?.navigationList &&
          props?.navigationList?.map((element, index) => (
            <ListItem key={element.title} disablePadding>
              <ListItemButton>
                <ListItemIcon>
                  {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                </ListItemIcon>
                <ListItemText
                  primary={element.title}
                  onClick={() => {
                    navigate(element.path);
                  }}
                />
              </ListItemButton>
            </ListItem>
          ))}
      </List>
      <Divider />
    </Box>
  );

  return (
    <div>
      {authToken &&
        ["left"].map((anchor) => (
          <React.Fragment key={anchor}>
            <Button onClick={toggleDrawer(anchor, true)}>
              <MenuIcon />
            </Button>
            <SwipeableDrawer
              anchor={anchor}
              open={state[anchor]}
              onClose={toggleDrawer(anchor, false)}
              onOpen={toggleDrawer(anchor, true)}
            >
              {list(anchor)}
            </SwipeableDrawer>
          </React.Fragment>
        ))}
    </div>
  );
}
