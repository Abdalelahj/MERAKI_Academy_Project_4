import React, { useState, useContext, useEffect } from "react";
import axios from "axios";
import { sharedInfoContext } from "../../App";
import { Link, useNavigate } from "react-router-dom";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import TravelExploreIcon from "@mui/icons-material/TravelExplore";
import { grey } from "@mui/material/colors";
import { googleLogout } from '@react-oauth/google';
const Navbar = () => {
  const navigate = useNavigate();
  const { info, logged, setLogged, setToken, setInfo, token } =
    useContext(sharedInfoContext);
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const iSlogged = localStorage.getItem("logged");

  useEffect(() => {
    if (!iSlogged) {
      return;
    }
    axios
      .get(`http://localhost:5000/info`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((result) => {
        setInfo(result.data.secretInfo[0].userId);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [iSlogged]);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleLogOut = () => {
    axios
      .delete(`http://localhost:5000/info/dlt`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((result) => {
        console.log(result);
      })
      .catch((err) => {
        console.log(err);
      });
    setToken(null);
    setLogged(false);
    localStorage.clear();
    navigate("/");
    setInfo("");
    googleLogout();
  };

  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <TravelExploreIcon
            sx={{ display: { xs: "none", md: "flex" }, mr: 1 }}
          />
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="/"
            sx={{
              flexGrow: 0.02,
              mr: 2,
              display: { xs: "none", md: "flex" },
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            سفرني
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{ display: { xs: "block", md: "none" } }}
            >
              <MenuItem onClick={handleCloseNavMenu}>
                <Typography
                  sx={{ textAlign: "center" }}
                  onClick={() => {
                    navigate("/about");
                  }}
                >
                  About
                </Typography>
              </MenuItem>
              <MenuItem onClick={handleCloseNavMenu}>
                <Typography
                  sx={{ textAlign: "center" }}
                  onClick={() => {
                    navigate("/contact");
                  }}
                >
                  Contact Us
                </Typography>
              </MenuItem>
            </Menu>
          </Box>
          <TravelExploreIcon
            sx={{
              display: { xs: "flex", md: "none" },
              mr: 1,
              color: grey[300],
              fontSize: "2.5em",
            }}
          />
          <Typography
            variant="h5"
            noWrap
            component="a"
            href="/"
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
            سفرّني
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            <Button
              onClick={() => {
                navigate("/about");
              }}
              sx={{ my: 2, color: "white", display: "block" }}
            >
              About
            </Button>
            <Button
              onClick={() => {
                navigate("/contact");
              }}
              sx={{ my: 2, color: "white", display: "block" }}
            >
              Contact Us
            </Button>
          </Box>
          <Button
            onClick={() => {
              navigate("/");
            }}
            sx={{ my: 2, color: "white", display: "block" }}
          >
            Home
          </Button>
          {logged ? (
            <Box sx={{ flexGrow: 0.1 }}>
              <Tooltip title="Open settings">
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                  <Avatar alt="Remy Sharp" src={info.image} />
                </IconButton>
              </Tooltip>
              <Menu
                sx={{ mt: "45px" }}
                id="menu-appbar"
                anchorEl={anchorElUser}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
              >
                <MenuItem onClick={handleCloseUserMenu}>
                  <Typography
                    sx={{ textAlign: "center" }}
                    onClick={() => {
                      navigate("/profile");
                    }}
                  >
                    Profile
                  </Typography>
                </MenuItem>
                <MenuItem onClick={handleCloseUserMenu}>
                  <Typography
                    sx={{ textAlign: "center" }}
                    onClick={handleLogOut}
                  >
                    logout
                  </Typography>
                </MenuItem>
              </Menu>
            </Box>
          ) : (
            <>
              {" "}
              <Button
                onClick={() => {
                  navigate("/login");
                }}
                sx={{ my: 2, color: "white", display: "block" }}
              >
                Login
              </Button>
              <Button
                onClick={() => {
                  navigate("/register");
                }}
                sx={{ my: 2, color: "white", display: "block", flexGrow: 0.04 }}
              >
                Sign Up
              </Button>
            </>
          )}
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Navbar;
