import { useState } from "react";
import { useAuth } from "../hooks/authProvider";
import { TextField, Button, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { register } from "../services/authService";

/**
 * This component renders the registration form.
 *
 * @returns {ReactNode} A React element that renders a registration form.
 */
export default function RegisterForm() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [confirmEmail, setConfirmEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");

  const auth = useAuth();

  /**
   * Validates that the provided emails match.
   *
   * @returns {Boolean} True - matched emails. False - emails don't match.
   */
  const validEmail = () => {
    if (email === confirmEmail) {
      setError("");
      return true;
    }
    setError("Emails do not match.");
    return false;
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
   * Handles the registration form submission.
   *
   * Attempts to register the user using the provided email and password.
   * If the details provided can be registered, a token is returned (indicating successful registration) the authentication
   * context is updated with the token.
   * The user is then navigated to the home page.
   *
   * If an error occurs, it sets the error state to display an error message, provided by the server and if no error message is provided by the server,
   * a default message is displayed.
   *
   * @param {FormEvent} event - The form submission.
   * @returns {Promise<Object>} Object - success message, token OR error message.
   */
  const handleRegister = async (event) => {
    event.preventDefault();
    try {
      if (validEmail() && validPassword()) {
        const response = await register(email, password);
        if (response.data) {
          setError("");
          auth.setToken(response.data.token);
          navigate("/home");
        } else {
          setError(response.data.error);
        }
      }
    } catch (err) {
      setError(
        err.response.data
          ? err.response.data
          : "Something went wrong please try again."
      );
      console.error(
        "Error occured while trying to register account. Error: ",
        err
      );
    }
  };

  return (
    <form onSubmit={handleRegister}>
      <TextField
        margin="normal"
        required
        fullWidth
        type="email"
        name="email"
        label="Email"
        autoFocus
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <TextField
        margin="normal"
        required
        fullWidth
        type="email"
        name="confirm-email"
        label="Confirm email"
        value={confirmEmail}
        onChange={(e) => setConfirmEmail(e.target.value)}
      />
      <TextField
        margin="normal"
        required
        fullWidth
        type="password"
        name="password"
        label="Password"
        autoComplete="new-password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <TextField
        margin="normal"
        required
        fullWidth
        type="password"
        name="confirm-password"
        label="Confirm password"
        autoComplete="new-password"
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
      />
      {error && (
        <Typography color="error" variant="body2">
          {error}
        </Typography>
      )}
      <Button type="submit" fullWidth variant="contained" sx={{ p: "14px 0" }}>
        Register
      </Button>
    </form>
  );
}
