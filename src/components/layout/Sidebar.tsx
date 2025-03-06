"use client";

import { useState } from "react";
import {
  Drawer,
  List,
  ListItem,
  ListItemText,
  IconButton,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import Link from "next/link";
import { useMediaQuery } from "@mui/material";
import { useTheme } from "@mui/material/styles";

const drawerWidth = 240;

const pages = [
  { name: "Stores", path: "/stores" },
  { name: "SKUs", path: "/skus" },
  { name: "Planning", path: "/planning" },
  { name: "Charts", path: "/charts" },
];

export default function Sidebar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  const toggleDrawer = () => {
    setMobileOpen(!mobileOpen);
  };

  return (
    <>
      {isMobile && (
        <IconButton
          onClick={toggleDrawer}
          sx={{ position: "absolute", top: 10, left: 10 }}>
          <MenuIcon />
        </IconButton>
      )}

      <Drawer
        variant={isMobile ? "temporary" : "permanent"}
        open={isMobile ? mobileOpen : true}
        onClose={toggleDrawer}
        sx={{
          width: isMobile ? "auto" : drawerWidth,
          flexShrink: 0,
          [`& .MuiDrawer-paper`]: {
            width: drawerWidth,
            boxSizing: "border-box",
            top: isMobile ? 0 : 64, // Stick below navbar on desktop
            height: isMobile ? "100vh" : "calc(100vh - 64px)",
          },
        }}>
        <List>
          {pages.map((page) => (
            <ListItem
              key={page.name}
              component={Link}
              href={page.path}
              onClick={isMobile ? toggleDrawer : undefined}>
              <ListItemText primary={page.name} />
            </ListItem>
          ))}
        </List>
      </Drawer>
    </>
  );
}
