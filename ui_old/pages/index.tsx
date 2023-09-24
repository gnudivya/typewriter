import Image from "next/image";
import { Inter } from "next/font/google";
import { Box, Button, Typography } from "@mui/material";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <>
      <Box
        height={"100%"}
        flexGrow={1}
        display={"flex"}
        alignItems={"center"}
        justifyContent={"center"}
      >
        <Box>
          <Typography align="center">Welcome</Typography>
          <Typography align="center">
            Open left navigation and choose your page
          </Typography>
        </Box>
      </Box>
    </>
  );
}
