import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import { useAuth } from "../../auth/hooks/authProvider";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

/**
 * This component renders the apps header.
 *
 * @returns {ReactNode} A React element that renders a header.
 */
export default function Header() {
  const navigate = useNavigate();
  const [showUserMenu, setShowUserMenu] = useState(null);
  const auth = useAuth();

  /**
   * Handles showing the user menu.
   *
   * @param {ClickEvent} event - The mouse event that triggers opening the user menu.
   */
  const handleOpenUserMenu = (event) => {
    setShowUserMenu(event.currentTarget);
  };

  /**
   * Handles closing the user menu.
   */
  const handleCloseUserMenu = () => {
    setShowUserMenu(null);
  };

  /**
   * Handles navigating to the settings page.
   */
  const handleSettingsNavigation = () => {
    navigate("/settings");
  };

  /**
   * Handles navigating to the home page.
   */
  const handleHomeNavigation = () => {
    navigate("/home");
  };

  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Typography
            variant="h6"
            noWrap
            component="a"
            onClick={handleHomeNavigation}
            sx={{
              mr: 2,
              display: { xs: "flex" },
              fontFamily: "Pacifico, cursive",
              fontStyle: "normal",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
              cursor: "pointer",
            }}
          >
            WS
          </Typography>
          <Typography
            variant="h6"
            noWrap
            component="a"
            onClick={handleHomeNavigation}
            sx={{
              mr: 2,
              flexGrow: 1,
              display: { xs: "flex" },
              fontStyle: "normal",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
              cursor: "pointer",
            }}
          >
            Workout Split
          </Typography>

          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} name="user-menu" sx={{ p: 0 }}>
                <Avatar src="/broken-image.jpg" />
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: "45px" }}
              id="menu-appbar"
              anchorEl={showUserMenu}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={Boolean(showUserMenu)}
              onClose={handleCloseUserMenu}
            >
              <MenuItem onClick={handleSettingsNavigation} type="button">
                <Typography textAlign="center" name="settings">Settings</Typography>
              </MenuItem>
              <MenuItem onClick={auth.logout} type="button">
                <Typography textAlign="center" name="logout">Logout</Typography>
              </MenuItem>
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
