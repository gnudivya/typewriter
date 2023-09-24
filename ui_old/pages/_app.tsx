import "@/styles/globals.css";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import {
  Box,
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Button,
  Drawer,
  Divider,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import MailIcon from "@mui/icons-material/Mail";
import KeyboardIcon from "@mui/icons-material/Keyboard";
import type { AppProps } from "next/app";
import { useState } from "react";
import { useRouter } from "next/router";
import HomeIcon from "@mui/icons-material/Home";
type Anchor = "top" | "left" | "bottom" | "right";
import HeadphonesIcon from "@mui/icons-material/Headphones";

export default function App({ Component, pageProps }: AppProps) {
  const [openLeftNav, setOpenLeftNav] = useState(false);
  const router = useRouter();
  const list = (anchor: Anchor) => (
    <Box
      sx={{ width: anchor === "top" || anchor === "bottom" ? "auto" : 250 }}
      role="presentation"
      onClick={() => setOpenLeftNav(false)}
      onKeyDown={() => setOpenLeftNav(false)}
    >
      <List>
        <ListItem disablePadding onClick={() => router.push("/")}>
          <ListItemButton>
            <ListItemIcon>
              <HomeIcon />
            </ListItemIcon>
            <ListItemText primary={"Home"} />
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding onClick={() => router.push("/typewriting")}>
          <ListItemButton>
            <ListItemIcon>
              <KeyboardIcon />
            </ListItemIcon>
            <ListItemText primary={"Type Writing"} />
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding onClick={() => router.push("/listening/ct")}>
          <ListItemButton>
            <ListItemIcon>
              <HeadphonesIcon />
            </ListItemIcon>
            <ListItemText primary={"Listening"} />
          </ListItemButton>
        </ListItem>
      </List>
      {/* <List>
        {["Inbox", "Starred", "Send email", "Drafts"].map((text, index) => (
          <ListItem key={text} disablePadding>
            <ListItemButton>
              <ListItemIcon>
                {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List> */}
      <Divider />
      {/* <List>
        {["All mail", "Trash", "Spam"].map((text, index) => (
          <ListItem key={text} disablePadding>
            <ListItemButton>
              <ListItemIcon>
                {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List> */}
    </Box>
  );

  return (
    <>
      <Box
        width={"100vw"}
        height={"100vh"}
        display={"flex"}
        flexDirection={"column"}
      >
        <Box>
          <AppBar position="static">
            <Toolbar>
              <IconButton
                onClick={() => setOpenLeftNav(true)}
                size="large"
                edge="start"
                color="inherit"
                aria-label="menu"
                sx={{ mr: 2 }}
              >
                <MenuIcon />
              </IconButton>
              <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                Divya House
              </Typography>
              <Button color="inherit">Login</Button>
            </Toolbar>
          </AppBar>
        </Box>
        <Box flexGrow={1} overflow={"auto"}>
          <Component {...pageProps} />
        </Box>
      </Box>
      <Drawer
        anchor={"left"}
        open={openLeftNav}
        onClose={() => setOpenLeftNav(false)}
      >
        {list("left")}
      </Drawer>
    </>
  );
}
