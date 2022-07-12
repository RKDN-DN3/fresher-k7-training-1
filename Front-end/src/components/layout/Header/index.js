import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import AdbIcon from "@mui/icons-material/Adb";
import { Link } from "react-router-dom";
import styles from "./Header.module.scss";
import MenuUser from "../../MenuUser";

const pages = [
  { title: "Home", path: "/" },
  { title: "History", path: "/history" },
];

const Header = () => {
  const isLogin = localStorage.getItem("isLogin");
  const userName =
    localStorage.getItem("userName") !== null
      ? localStorage.getItem("userName")
      : "";

  return (
    <AppBar position="static" className={styles.container}>
      <Container maxWidth="md">
        <Toolbar disableGutters>
          <AdbIcon sx={{ display: { xs: "none", md: "flex" }, mr: 1 }} />
          <Link to="/">
            <Typography
              variant="h6"
              noWrap
              sx={{
                mr: 2,
                display: { xs: "none", md: "flex" },
                fontFamily: "monospace",
                fontWeight: 700,
                letterSpacing: ".3rem",
                color: "inherit",
                textDecoration: "none",
              }}
            >
              TODO
            </Typography>
          </Link>
          <Typography
            variant="h5"
            noWrap
            component="a"
            href=""
            sx={{
              mr: 2,
              display: { xs: "flex", md: "none" },
              flexGrow: 1,
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            LOGO
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            {isLogin === "true" &&
              pages.map((item, i) => (
                <Link to={item.path}
                  key={i}
                >
                  <Button

                    style={{ my: 2, color: "white", display: "block" }}
                  >
                    {item.title}
                  </Button>
                </Link>

              ))}
          </Box>
          <Box sx={{ flexGrow: 0, display: { xs: "none", md: "flex", alignItems: 'center' } }}>
            <div style={{ "color": "#fffff" }}>{`Hello: ${userName}!`}</div>
            <MenuUser />
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};
export default Header;
