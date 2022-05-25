import { Box, Button, Typography } from "@mui/material";
import "./ShopComponent.css";

export default function ShopComponent({ ImageSrc, Name }) {
  return (
    <Box className="shopBox">
      <div className="shopName">{Name}</div>
      <img className="shopIm" src={ImageSrc} />
    </Box>
  );
}
