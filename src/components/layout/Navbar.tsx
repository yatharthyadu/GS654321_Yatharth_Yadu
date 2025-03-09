"use client";

import { AppBar, Toolbar, IconButton, Box } from "@mui/material";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import Image from "next/image";

export default function Navbar() {
  return (
    <AppBar
      sx={{
        color: "white",
        backgroundColor: "#fff",
        zIndex: (theme) => theme.zIndex.drawer + 1,
      }}
      position="fixed">
      <Toolbar>
        <Box sx={{ flexGrow: 1, display: "flex", alignItems: "center" }}>
          <Box sx={{ width: 150, height: "auto", position: "relative" }}>
            <Image
              src="/assets/logo.svg"
              alt="GSynergy Logo"
              width={300}
              height={120}
              style={{ width: "100%", height: "auto" }}
              priority
            />
          </Box>
        </Box>

        <IconButton color="inherit">
          <AccountCircleIcon fontSize="large" sx={{ color: "#000000" }} />
        </IconButton>
      </Toolbar>
    </AppBar>
  );
}
