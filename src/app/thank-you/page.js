"use client";

import { Box, Button, Typography } from "@mui/material";
import { useRouter } from "next/navigation";

const ThankYou = () => {
  const router = useRouter();

  const backHandler = () => {
    router.push("/");
  };

  return (
    <Box sx={{ textAlign: "center", marginTop: 4 }}>
      <Typography variant="h4" color="primary">
        Thank you for your submission!
      </Typography>
      <Box sx={{ display: "flex", justifyContent: "center" }}>
        <Button
          variant="contained"
          color="primary"
          sx={{ mt: 2 }}
          onClick={backHandler}
        >
          Back To Home
        </Button>
      </Box>
    </Box>
  );
};

export default ThankYou;
