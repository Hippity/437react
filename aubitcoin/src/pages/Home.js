import "../App.css";
import "../alilce.css";
import React, { useState } from "react";
import { getUserToken, saveUserToken, clearUserToken } from "../localStorage";
import HomeIcon from "@mui/icons-material/Home";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import SearchIcon from "@mui/icons-material/Search";
import LoginIcon from "@mui/icons-material/Login";
import { BrowserRouter, Route, Routes, useNavigate } from "react-router-dom";
import AliceCarousel from "react-alice-carousel";
import {
  IconButton,
  Typography,
  Box,
  List,
  ListItem,
  Icon,
} from "@mui/material";
import LoginDialog from "../UserCredentialsDialog/LoginDialog";
import RegisterDialog from "../UserCredentialsDialog/RegisterDialog";
import LogoutIcon from "@mui/icons-material/Logout";
import { SERVER_URL } from "../App";
import ShopComponent from "../ShopComponent/ShopComponent";
import ItemComponent from "../ItemComponent/ItemComponent";

function Home() {
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

  function logout() {
    setUserToken(null);
    clearUserToken();
  }

  const Pages = {
    PROFILE: "PROFILE",
    HOME: "HOME",
    CART: "CART",
    SEARCH: "SEARCH",
  };

  const States = {
    PENDING: "PENDING",
    USER_CREATION: "USER_CREATION",
    USER_LOG_IN: "USER_LOG_IN",
    USER_AUTHENTICATED: "USER_AUTHENTICATED",
    HOME: "HOME",
  };

  let [userToken, setUserToken] = useState(getUserToken());
  let [authState, setAuthState] = useState(States.PENDING);
  let [pageState, setpageState] = useState(Pages.Home);
  let [userId, setUserId] = useState(null);
  let [userName, setUserName] = useState(null);
  let [userBalance, setUserBalance] = useState(0);
  let [userInitial, setUserInitial] = useState(null);

  const AnImage = require("../shop.png");
  const AnotherIm = require("../batata.png");

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

  const items = [
    <ShopComponent ImageSrc={AnImage} Name={"Community Shop"} />,
    <ShopComponent ImageSrc={AnImage} Name={"Community Shop"} />,
    <ShopComponent ImageSrc={AnImage} Name={"Community Shop"} />,
    <ShopComponent ImageSrc={AnImage} Name={"Community Shop"} />,
    <ShopComponent ImageSrc={AnImage} Name={"Community Shop"} />,
    <ShopComponent ImageSrc={AnImage} Name={"Community Shop"} />,
  ];


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
          setUserBalance(body.balance);
        });
    }
  }

  get_credentials()

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
        onCreateNew={() => setAuthState(States.USER_LOG_IN)}
        onSubmit={createUser}
      />
      <Box display="flex" flexDirection="row">
        <Box className="navbar">
          <List className="navbar-li">
            <ListItem>
              <IconButton onClick={userToken !== null ? (Gotoprofile) : (() => setAuthState(States.USER_LOG_IN))}>
                <Icon style={{ width: 40, height: 40 }}>
                  <img className="logoIm white-icon-hover" src="./abc.png" />
                </Icon>
              </IconButton>
            </ListItem>
            <ListItem>
              <IconButton onClick={Gotohome}>
                <HomeIcon
                  className="navbar-icon"
                  sx={{ color: "white", fontSize: 40 }}
                />
              </IconButton>
            </ListItem>
            <ListItem>
              <IconButton onClick={userToken !== null ? (Gotocart) : (() => setAuthState(States.USER_LOG_IN))}>
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
          <AliceCarousel
            disableButtonsControls={"true"}
            className="Carousel"
            mouseTracking
            items={items}
          />

          <Box display="flex" flexDirection="column">
          {userToken !== null ? (
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
            </Box>):(undefined)}
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
              Meal of the Day
            </label>
            <div className="tabs__content">
              <List>
                <ListItem>
                  <ItemComponent
                    ItemName={"Batata Harra"}
                    ItemDescription={
                      "Potatoes in herbs and spicy sauce. Lebanse speciallty"
                    }
                    ItemPrice={1.5}
                    ImageSrc={AnotherIm}
                    ItemShop={"T-Marbouta"}
                  />
                </ListItem>
                <ListItem>
                  <ItemComponent
                    ItemName={"Batata Harra"}
                    ItemDescription={
                      "Potatoes in herbs and spicy sauce. Lebanse speciallty"
                    }
                    ItemPrice={1.5}
                    ImageSrc={AnotherIm}
                    ItemShop={"T-Marbouta"}
                  />
                </ListItem>

                <ListItem>
                  <ItemComponent
                    ItemName={"Batata Harra"}
                    ItemDescription={
                      "Potatoes in herbs and spicy sauce. Lebanse speciallty"
                    }
                    ItemPrice={1.5}
                    ItemShop={"T-Marbouta"}
                    ImageSrc={AnotherIm}
                  />
                </ListItem>

                <ListItem>
                  <ItemComponent
                    ItemName={"Batata Harra"}
                    ItemDescription={
                      "Potatoes in herbs and spicy sauce. Lebanse speciallty"
                    }
                    ItemPrice={1.5}
                    ItemShop={"T-Marbouta"}
                    ImageSrc={AnotherIm}
                  />
                </ListItem>

                <ListItem>
                  <ItemComponent
                    ItemName={"Batata Harra"}
                    ItemDescription={
                      "Potatoes in herbs and spicy sauce. Lebanse speciallty"
                    }
                    ItemPrice={1.5}
                    ItemShop={"T-Marbouta"}
                    ImageSrc={AnotherIm}
                  />
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
              Mezza
            </label>
            <div className="tabs__content">
              <List>
                <ListItem>
                  <ItemComponent
                    ItemName={"Batata Harra"}
                    ItemDescription={
                      "Potatoes in herbs and spicy sauce. Lebanse speciallty"
                    }
                    ItemPrice={1.5}
                    ItemShop={"T-Marbouta"}
                    ImageSrc={AnotherIm}
                  />
                </ListItem>
                <ListItem>
                  <ItemComponent
                    ItemName={"Batata Harra"}
                    ItemDescription={
                      "Potatoes in herbs and spicy sauce. Lebanse speciallty"
                    }
                    ItemPrice={1.5}
                    ItemShop={"T-Marbouta"}
                    ImageSrc={AnotherIm}
                  />
                </ListItem>
              </List>
            </div>

            <input
              type="radio"
              className="tabs__radio"
              name="tabs-example"
              id="tab3"
            />
            <label htmlFor="tab3" className="tabs__label">
              Sanwiches
            </label>
            <div className="tabs__content">
              <List>
                <ListItem>
                  <ItemComponent
                    ItemName={"Batata Harra"}
                    ItemDescription={
                      "Potatoes in herbs and spicy sauce. Lebanse speciallty"
                    }
                    ItemPrice={1.5}
                    ItemShop={"T-Marbouta"}
                    ImageSrc={AnotherIm}
                  />
                </ListItem>
                <ListItem>
                  <ItemComponent
                    ItemName={"Batata Harra"}
                    ItemDescription={
                      "Potatoes in herbs and spicy sauce. Lebanse speciallty"
                    }
                    ItemPrice={1.5}
                    ItemShop={"T-Marbouta"}
                    ImageSrc={AnotherIm}
                  />
                </ListItem>
              </List>
            </div>
          </div>
        </Box>
      </Box>
    </div>
  );
}
export default Home;
