import { Box, IconButton, Icon, Button, Typography } from "@mui/material";
import { fontSize } from "@mui/system";

export default function SoldTransaction({ Shop, Code, Date, Amount }) {
  return (
    <Box className="TransactionBox" display={"flex"} flexDirection="row">
      <img
        width={100}
        height={100}
        className="circ"
        src={require("./ourCircle.png")}
      />

      <Box sx={{ marginLeft: "1rem" }} display={"flex"} flexDirection="column">
        <Typography
          sx={{
            fontSize: 18,
            fontFamily: "Arial",
            fontWeight: "bolder",
            color: "white",
          }}
        >
          {Shop}
        </Typography>
        <Typography
          sx={{
            fontSize: 12,
            fontFamily: "Arial",
            fontWeight: "bolder",
            color: "#f3c317",
          }}
        >
          Code: {Code}
        </Typography>
        <Typography
          sx={{
            fontSize: 12,
            fontFamily: "Arial",
            fontWeight: "bolder",
            color: "#f3c317",
          }}
        >
          Date: {Date}
        </Typography>
        <Typography
          sx={{
            fontSize: 12,
            fontFamily: "Arial",
            fontWeight: "bolder",
            color: "#891a1a",
          }}
        >
          Amount: -{Amount}
        </Typography>
      </Box>
    </Box>
  );
}
