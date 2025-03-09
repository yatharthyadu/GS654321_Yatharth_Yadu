"use client";

import { useState } from "react";
import {
  Drawer,
  List,
  ListItem,
  ListItemText,
  IconButton,
  ListItemIcon,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import StoreIcon from "@mui/icons-material/Store";
import InventoryIcon from "@mui/icons-material/Inventory";
import EventNoteIcon from "@mui/icons-material/EventNote";
import Link from "next/link";
import { useMediaQuery } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { usePathname } from "next/navigation";

const drawerWidth = 240;

const pages = [
  { name: "Stores", path: "/stores", icon: <StoreIcon /> },
  { name: "SKUs", path: "/skus", icon: <InventoryIcon /> },
  { name: "Planning", path: "/planning", icon: <EventNoteIcon /> },
];

export default function Sidebar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const pathname = usePathname();

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
            position: "fixed",
            top: { xs: 0, md: 64 },
            height: { xs: "100%", md: "calc(100% - 64px)" },
            borderRight: "1px solid rgba(0, 0, 0, 0.12)",
          },
        }}>
        <List
          sx={{
            color: "#00000",
            marginTop: { xs: "64px", md: 0 },
          }}>
          {pages.map((page) => (
            <ListItem
              key={page.name}
              component={Link}
              href={page.path}
              sx={{
                color: "#000000",
                backgroundColor:
                  pathname === page.path ? "#e3f2fd" : "transparent",
                "&:hover": {
                  backgroundColor:
                    pathname === page.path ? "#bbdefb" : "#f5f5f5",
                },
              }}
              onClick={isMobile ? toggleDrawer : undefined}>
              <ListItemIcon sx={{ color: "#000000" }}>{page.icon}</ListItemIcon>
              <ListItemText primary={page.name} />
            </ListItem>
          ))}
        </List>
      </Drawer>
    </>
  );
}
