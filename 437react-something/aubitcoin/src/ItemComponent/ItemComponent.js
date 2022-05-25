import "./ItemComponent.css";
import { Box, Button, Typography } from "@mui/material";
import React, { useState } from "react";
import AddToCart from "./AddToCart/AddToCart";

export default function ItemComponent({
  ItemPrice,
  ItemName,
  ItemDescription,
  ImageSrc,
  ItemShop,
}) {
  const OpenStates = {
    OPEN: "OPEN",
    CLOSE: "CLOSE",
  };

  let [openState, setOpenState] = useState(OpenStates.CLOSE);

  return (
    <Box className="ItemBox" display={"flex"} flexDirection="row">
      <AddToCart
        ImageSrc={ImageSrc}
        ItemDescription={ItemDescription}
        ItemShop={ItemShop}
        ItemPrice={ItemPrice}
        ItemName={ItemName}
        open={openState == OpenStates.OPEN}
        onClose={() => setOpenState(OpenStates.CLOSE)}
      />
      <Box sx={{ marginLeft: "1rem" }} display={"flex"} flexDirection="column">
        <Typography
          sx={{
            fontSize: 12,
            fontFamily: "Arial",
            fontWeight: "bolder",
            color: "white",
          }}
        >
          {ItemName}
        </Typography>
        <Typography
          sx={{
            fontSize: 12,
            fontFamily: "Arial",
            fontWeight: "bolder",
            color: "#808080",
          }}
        >
          {ItemDescription}
        </Typography>
        <Typography
          sx={{
            fontSize: 12,
            fontFamily: "Arial",
            fontWeight: "bolder",
            color: "#f3c317",
          }}
        >
          Price: {ItemPrice} ABC
        </Typography>

        <Button
          onClick={() => setOpenState(OpenStates.OPEN)}
          sx={{
            backgroundColor: "#1a8926",
            width: "50%",
            color: "white",
            height: "2rem",
          }}
        >
          View Item
        </Button>
      </Box>

      <img width={100} height={100} className="circ" src={ImageSrc} />
    </Box>
  );
}
