import "../App.css";
import React, { useState } from "react";
import { getUserToken, saveUserToken, clearUserToken } from "../localStorage";
import { BrowserRouter, Route, Routes, useNavigate } from "react-router-dom";
import AnalyticsIcon from "@mui/icons-material/Analytics";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import LoginIcon from "@mui/icons-material/Login";
import {
  IconButton,
  Box,
  List,
  ListItem,
  Icon,
  Typography,
} from "@mui/material";
import LogoutIcon from "@mui/icons-material/Logout";
import { SERVER_URL } from "../App";
import LoginDialog from "../UserCredentialsDialog/LoginDialog";

function AdminHome() {
  const navigate = useNavigate();

  function GoToAdminHome() {
    navigate("/adminhome", { replace: true });
  }

  function GoToAdminAdd() {
    navigate("/adminadd", { replace: true });
  }

  function GoToAdminData() {
    navigate("/admindata", { replace: true });
  }
  function logout() {
    setUserToken(null);
    clearUserToken();
  }

  const States = {
    PENDING: "PENDING",
    USER_CREATION: "USER_CREATION",
    USER_LOG_IN: "USER_LOG_IN",
    USER_AUTHENTICATED: "USER_AUTHENTICATED",
    HOME: "HOME",
  };

  let [userToken, setUserToken] = useState(getUserToken());
  let [authState, setAuthState] = useState(States.PENDING);
  let [userId, setUserId] = useState(null);

  function login(user_id, password) {
    return fetch(`${SERVER_URL}/authentication`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        user_id: user_id,
        password: password,
      }),
    })
      .then((response) => response.json())
      .then((body) => {
        setAuthState(States.USER_AUTHENTICATED);
        setUserToken(body.token);
        saveUserToken(body.token);
        setUserId(user_id);
      });
  }

  return (
    <div className="App">

    <LoginDialog
      open={States.USER_LOG_IN === authState}
      title={"LOGIN"}
      onClose={() => setAuthState(States.PENDING)}
      submitText={"Login"}
      onCreateNew={() => setAuthState(States.USER_CREATION)}
      onSubmit={login}
    />

      <Box display="flex" flexDirection="row">
        <Box className="navbar">
          <List className="navbar-li">
            <ListItem>
              <IconButton onClick={GoToAdminHome}>
                <Icon style={{ width: 40, height: 40 }}>
                  <img className="logoIm white-icon" src="./abc.png" />
                </Icon>
              </IconButton>
            </ListItem>
            <ListItem>
              <IconButton onClick={userToken !== null ? (GoToAdminAdd) : (() => setAuthState(States.USER_LOG_IN))}>
                <AddCircleIcon
                  className="navbar-icon"
                  sx={{ color: "#f3c317", fontSize: 40 }}
                />
              </IconButton>
            </ListItem>
            <ListItem>
              <IconButton onClick={userToken !== null ? (GoToAdminData) : (() => setAuthState(States.USER_LOG_IN))}>
                <AnalyticsIcon
                  className="navbar-icon"
                  sx={{ color: "#f3c317", fontSize: 40 }}
                />
              </IconButton>
            </ListItem>
            <ListItem className="last">
              {userToken !== null ? (
                <IconButton onClick={logout}>
                  <LogoutIcon
                    className="navbar-icon"
                    sx={{ color: "#f3c317", fontSize: 40 }}
                  />
                </IconButton>
              ) : (
                <IconButton onClick={() => setAuthState(States.USER_LOG_IN)}>
                  <LoginIcon
                    className="navbar-icon"
                    sx={{ color: "#f3c317", fontSize: 40 }}
                  />
                </IconButton>
              )}
            </ListItem>
          </List>
        </Box>

        <Box className="mainContent">
          <img className="bubbles" src={require("../graphics/bubbles.png")} />
          <Typography
            sx={{
              color: "white",
              fontWeight: "bolder",
              marginLeft: "5rem",
              marginTop: "5rem",
            }}
            variant="h4"
          >
            Welcome Admin
          </Typography>
        </Box>
      </Box>
    </div>
  );
}
export default AdminHome;
