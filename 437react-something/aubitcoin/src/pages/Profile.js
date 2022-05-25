import "../App.css";
import React, { useState } from "react";
import { getUserToken, saveUserToken, clearUserToken } from "../localStorage";
import HomeIcon from "@mui/icons-material/Home";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import SearchIcon from "@mui/icons-material/Search";
import LoginIcon from "@mui/icons-material/Login";
import {
  BrowserRouter,
  Navigate,
  Route,
  Routes,
  useNavigate,
  Redirect,
} from "react-router-dom";
import {
  IconButton,
  Typography,
  Box,
  List,
  ListItem,
  Avatar,
  Icon,
} from "@mui/material";
import LoginDialog from "../UserCredentialsDialog/LoginDialog";
import RegisterDialog from "../UserCredentialsDialog/RegisterDialog";
import LogoutIcon from "@mui/icons-material/Logout";
import BoughtTransaction from "../transaction/boughtTransaction";
import SoldTransaction from "../transaction/soldTransaction";
import { SERVER_URL } from "../App";

function Profile() {
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
  let [userName, setUserName] = useState(null);
  let [userBalance, setUserBalance] = useState(0);
  let [userInitial, setUserInitial] = useState(null);

  function get_credentials() {
    if (userToken) {
      return fetch(`${SERVER_URL}/credentials`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          token: userToken,
        }),
      })
        .then((response) => response.json())
        .then((body) => {
          setUserId(body.user_id);
          setUserName(body.user_name);
          setUserInitial(body.user_initial);
          setUserBalance(body.balance);
        });
    }
  }

  const navigate = useNavigate();

  function Gotoprofile() {
    navigate("/profile", { replace: true });
  }

  function Gotohome() {
    navigate("/", { replace: true });
  }

  function Gotocart() {
    navigate("/cart", { replace: true });
  }

  function Gotosearch() {
    navigate("/search", { replace: true });
  }

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
        setUserName(body.user_name);
        setUserInitial(body.user_initial);
        setUserBalance(body.balance);
      });
  }

  function createUser(user_id, username, password, aubEmail) {
    return fetch(`${SERVER_URL}/signUp`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        user_id: user_id,
        user_name: username,
        password: password,
        email: aubEmail,
      }),
    }).then((response) => login(user_id, password));
  }

  function logout() {
    setUserToken(null);
    clearUserToken();
    Gotohome();
  }

  get_credentials();

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

      <RegisterDialog
        open={States.USER_CREATION === authState}
        title={"REGISTER"}
        onClose={() => setAuthState(States.PENDING)}
        submitText={"Register"}
        onSubmit={createUser}
      />
      <Box display="flex" flexDirection="row">
        <Box className="navbar">
          <List className="navbar-li">
            <ListItem>
              <IconButton onClick={Gotoprofile}>
                <Icon style={{ width: 40, height: 40 }}>
                  <img className="logoIm white-icon" src="./abc.png"/>
                </Icon>
              </IconButton>
            </ListItem>
            <ListItem>
              <IconButton onClick={Gotohome}>
                <HomeIcon
                  className="navbar-icon"
                  sx={{ color: "#f3c317", fontSize: 40 }}
                />
              </IconButton>
            </ListItem>
            <ListItem>
              <IconButton onClick={Gotocart}>
                <ShoppingCartIcon
                  className="navbar-icon"
                  sx={{ color: "#f3c317", fontSize: 40 }}
                />
              </IconButton>
            </ListItem>
            <ListItem>
              <IconButton onClick={Gotosearch}>
                <SearchIcon
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
          <img
            className="bubbles"
            src={require("../graphics/bubbles.png")}
          ></img>

          {userToken !== null ? (
            <div>
              <Box display="flex" flexDirection="column">
                <Box className="avatarBox" display="flex" flexDirection="row">
                  <Avatar
                    sx={{
                      width: 100,
                      height: 100,
                      fontSize: 40,
                      backgroundColor: "#F3C317",
                    }}
                  >
                    {userInitial}
                  </Avatar>
                  <Box display="flex" flexDirection="column">
                    <Typography
                      sx={{
                        fontFamily: "Arial",
                        fontWeight: "bolder",
                        color: "white",
                        marginLeft: 1,
                      }}
                      className="avatarBox-text"
                    >
                      {userName}
                    </Typography>
                    <Typography
                      sx={{
                        fontFamily: "Arial",
                        fontWeight: "bolder",
                        color: "white",
                        marginLeft: 1,
                      }}
                      className="avatarBox-text"
                    >
                      {userId}
                    </Typography>
                  </Box>
                </Box>
                <Box className="balanceBox" display="flex" flexDirection="row">
                  <img className="balanceIm" src="./abc.png" />
                  <Typography
                    sx={{
                      fontFamily: "Arial",
                      fontWeight: "bolder",
                      color: "white",
                    }}
                  >
                    {userBalance} ABC
                  </Typography>
                </Box>
              </Box>

              <div className="tabs">
                <input
                  type="radio"
                  className="tabs__radio"
                  name="tabs-example"
                  id="tab1"
                  checked
                />
                <label htmlFor="tab1" className="tabs__label">
                  BOUGHT
                </label>
                <div className="tabs__content">
                  <List>
                    <ListItem>
                      <BoughtTransaction
                        Item={"Pencil"}
                        Date={"02-02-02"}
                        Amount={"1.0"}
                        Receiver={"Sam"}
                        Code={"12343"}
                      ></BoughtTransaction>
                    </ListItem>
                    <ListItem>
                      <BoughtTransaction
                        Item={"Pencil"}
                        Date={"02-02-02"}
                        Amount={"1.0"}
                        Receiver={"Sam"}
                        Code={"12343"}
                      ></BoughtTransaction>
                    </ListItem>
                    <ListItem>
                      <BoughtTransaction
                        Item={"Pencil"}
                        Date={"02-02-02"}
                        Amount={"1.0"}
                        Receiver={"Sam"}
                        Code={"12343"}
                      ></BoughtTransaction>
                    </ListItem>
                    <ListItem>
                      <BoughtTransaction
                        Item={"Pencil"}
                        Date={"02-02-02"}
                        Amount={"1.0"}
                        Receiver={"Sam"}
                        Code={"12343"}
                      ></BoughtTransaction>
                    </ListItem>
                    <ListItem>
                      <BoughtTransaction
                        Item={"Pencil"}
                        Date={"02-02-02"}
                        Amount={"1.0"}
                        Receiver={"Sam"}
                        Code={"12343"}
                      ></BoughtTransaction>
                    </ListItem>
                  </List>
                </div>

                <input
                  type="radio"
                  className="tabs__radio"
                  name="tabs-example"
                  id="tab2"
                />
                <label htmlFor="tab2" className="tabs__label">
                  SOLD
                </label>
                <div className="tabs__content">
                  <List>
                    <ListItem>
                      <SoldTransaction
                        Shop={"T-Mabouta"}
                        Date={"02-02-02"}
                        Amount={"1.0"}
                        Sender={"Sam"}
                        Code={"12343"}
                      ></SoldTransaction>
                    </ListItem>
                    <ListItem>
                      <SoldTransaction
                        Shop={"T-Mabouta"}
                        Date={"02-02-02"}
                        Amount={"1.0"}
                        Sender={"Sam"}
                        Code={"12343"}
                      ></SoldTransaction>
                    </ListItem>
                    <ListItem>
                      <SoldTransaction
                        Shop={"T-Mabouta"}
                        Date={"02-02-02"}
                        Amount={"1.0"}
                        Sender={"Sam"}
                        Code={"12343"}
                      ></SoldTransaction>
                    </ListItem>
                    <ListItem>
                      <SoldTransaction
                        Shop={"T-Mabouta"}
                        Date={"02-02-02"}
                        Amount={"1.0"}
                        Sender={"Sam"}
                        Code={"12343"}
                      ></SoldTransaction>
                    </ListItem>
                    <ListItem>
                      <SoldTransaction
                        Shop={"T-Mabouta"}
                        Date={"02-02-02"}
                        Amount={"1.0"}
                        Sender={"Sam"}
                        Code={"12343"}
                      ></SoldTransaction>
                    </ListItem>
                  </List>
                </div>
              </div>
            </div>
          ) : (
            <div></div>
          )}
        </Box>
      </Box>
    </div>
  );
}

export default Profile;
