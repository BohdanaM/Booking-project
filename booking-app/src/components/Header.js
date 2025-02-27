import React, { useState } from "react";
import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Menu,
  MenuItem,
  Box,
} from "@mui/material/index.js";
import MenuIcon from "@mui/icons-material/Menu";
import { Link } from "react-router-dom";
import useMediaQuery from "@mui/material/useMediaQuery/index.js";

const Header = () => {
  const isMobile = useMediaQuery("(max-width:600px)");
  const [anchorEl, setAnchorEl] = useState(null);

  const handleMenuOpen = (event) => setAnchorEl(event.currentTarget);
  const handleMenuClose = () => setAnchorEl(null);

  return (
    <AppBar position="static" sx={{ backgroundColor: "#1976d2" }}>
      <Toolbar>
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          Booking
        </Typography>
        {isMobile ? (
          <>
            <IconButton edge="start" color="inherit" onClick={handleMenuOpen}>
              <MenuIcon />
            </IconButton>
            <Menu
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={handleMenuClose}
            >
              <MenuItem onClick={handleMenuClose} component={Link} to="/">
                Home
              </MenuItem>
              <MenuItem onClick={handleMenuClose} component={Link} to="/about">
                About
              </MenuItem>
              <MenuItem onClick={handleMenuClose} component={Link} to="/hotels">
                Hotels
              </MenuItem>
            </Menu>
          </>
        ) : (
          <Box sx={{ display: "flex", gap: 3 }}>
            <Typography
              variant="h6"
              component={Link}
              to="/"
              sx={{ color: "#fff", textDecoration: "none" }}
            >
              Home
            </Typography>
            <Typography
              variant="h6"
              component={Link}
              to="/about"
              sx={{ color: "#fff", textDecoration: "none" }}
            >
              About
            </Typography>
            <Typography
              variant="h6"
              component={Link}
              to="/hotels"
              sx={{ color: "#fff", textDecoration: "none" }}
            >
              Hotels
            </Typography>
          </Box>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Header;
