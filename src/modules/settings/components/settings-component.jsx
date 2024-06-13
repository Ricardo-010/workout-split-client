import { useState, useEffect } from "react";
import {
  Box,
  Typography,
  Divider,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  Button,
  TextField,
} from "@mui/material";
import { jwtDecode } from "jwt-decode";
import { useAuth } from "../../auth/hooks/authProvider";
import { useNavigate } from "react-router-dom";
import { deleteAccount, updatePassword } from "../../auth/services/authService";

/**
 * This component renders the settings.
 *
 * @returns {ReactNode} A React element that renders the settings.
 */
export default function Settings() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [userId, setUserId] = useState("");
  const [changingPassword, setChangingPassword] = useState(false);
  const auth = useAuth();

  // An effect that is used to decode the token to get the users email address to display in the settings and to get the user id.
  useEffect(() => {
    const decodedToken = jwtDecode(auth.token);
    setEmail(decodedToken.email);
    setUserId(decodedToken.userId);
  }, [auth.token, userId]);

  /**
   * Handles navigating back to the home page.
   */
  const handleBack = () => {
    navigate("/home");
  };

  /**
   * Handles deleting the users account.
   *
   * Uses the authentication service to delete the user.
   *
   * Updates the users token.
   */
  const handleAccountDeletion = async () => {
    try {
      await deleteAccount(userId);
      auth.setToken("");
    } catch (err) {
      console.error(
        "Error occured while trying to delete account. Error: ",
        err
      );
    }
  };

  /**
   * Validates that the provided passwords match.
   *
   * @returns {Boolean} True - matched passwords. False - passwords don't match.
   */
  const validPassword = () => {
    if (password === confirmPassword) {
      setError("");
      return true;
    }
    setError("Passwords do not match.");
    return false;
  };

  /**
   * Handles updating the user's password.
   *
   * Sets an error if the passwords don't match or if an error occurs.
   */
  const handlePasswordChange = async () => {
    if (validPassword()) {
      setError("");
      try {
        await updatePassword(userId, password);
        setChangingPassword(false);
      } catch (err) {
        setError(
          err.response?.data
            ? err.response?.data
            : "Something went wrong please try again."
        );
        console.error(
          "Error occured while trying to update password. Error: ",
          err
        );
      }
    } else {
      setError("The passwords need to match.");
    }
  };

  return (
    <>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          mx: 1,
        }}
      >
        <Typography variant="h4" sx={{ mb: 3 }}>
          Settings
        </Typography>
        <Button
          edge="end"
          variant="contained"
          sx={{ ml: 1, flexGrow: 0, display: { xs: "flex" } }}
          color="error"
          onClick={handleBack}
        >
          &nbsp;&nbsp;&nbsp;Back&nbsp;&nbsp;&nbsp;
        </Button>
      </Box>

      <Typography variant="h6" sx={{ mx: 1 }}>
        User Profile
      </Typography>
      <Divider sx={{ mb: 2 }} />
      <List>
        <ListItem>
          <ListItemText primary="Email" secondary={email} />
        </ListItem>
        <ListItem>
          {changingPassword ? (
            <>
              <Box>
                <Box sx={{ display: "flex", flexDirection: "column" }}>
                  <TextField
                    required
                    type="password"
                    name="password"
                    label="Password"
                    autoComplete="new-password"
                    variant="standard"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <TextField
                    required
                    type="password"
                    name="confirm-password"
                    label="Confirm password"
                    autoComplete="new-password"
                    variant="standard"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                  />
                </Box>
                {error && (
                  <Typography color="error" variant="body2">
                    {error}
                  </Typography>
                )}
                <Button
                  variant="contained"
                  color="secondary"
                  onClick={handlePasswordChange}
                  sx={{ mt: 1 }}
                >
                  Update Password
                </Button>
              </Box>
            </>
          ) : (
            <>
              <ListItemText primary="Change Password" />
              <ListItemSecondaryAction>
                <Button
                  variant="contained"
                  color="secondary"
                  onClick={() => setChangingPassword(true)}
                >
                  Change
                </Button>
              </ListItemSecondaryAction>
            </>
          )}
        </ListItem>
      </List>

      <Typography variant="h6" sx={{ mt: 4, mx: 1 }}>
        Account Management
      </Typography>
      <Divider sx={{ mb: 2 }} />
      <List>
        <ListItem>
          <ListItemText primary="Logout" />
          <ListItemSecondaryAction>
            <Button variant="contained" onClick={auth.logout}>
              Logout
            </Button>
          </ListItemSecondaryAction>
        </ListItem>
        <ListItem>
          <ListItemText primary="Delete Account" />
          <ListItemSecondaryAction>
            <Button
              edge="end"
              variant="contained"
              color="error"
              name="delete-account"
              onClick={handleAccountDeletion}
            >
              Delete&nbsp;
            </Button>
          </ListItemSecondaryAction>
        </ListItem>
      </List>
    </>
  );
}
