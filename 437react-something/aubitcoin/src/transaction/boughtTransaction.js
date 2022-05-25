import { Box, Typography } from "@mui/material";

export default function BoughtTransaction({
  Item,
  Code,
  Date,
  Receiver,
  Amount,
})

{
  return (
    <Box className="TransactionBox" display={"flex"} flexDirection="row">

    <img  width={100} height={100} className="circ" src={require("./ourCircle.png")} />

    <Box sx={{marginLeft: "1rem"}} display={"flex"} flexDirection="column">

      <Typography
        sx={{
            fontSize: 18,
          fontFamily: "Arial",
          fontWeight: "bolder",
          color: "white",
        }}
      >
        {Item}
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
          color: "#f3c317",
        }}
      >
        To: {Receiver}
      </Typography>
      <Typography
        sx={{
            fontSize: 12,
          fontFamily: "Arial",
          fontWeight: "bolder",
          color: "#1a8926",
        }}
      >
        Amount: +{Amount}
      </Typography>

      </Box>
    </Box>
  );
}
