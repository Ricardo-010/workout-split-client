import { useState } from "react";
import { useAuth } from "../hooks/authProvider";
import { TextField, Button, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { login } from "../services/authService";

/**
 * This component renders the login form.
 *
 * @returns {ReactNode} A React element that renders a login form.
 */
export default function LoginForm() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const auth = useAuth();

  /**
   * Handles the login form submission.
   *
   * Attempts to login the user using the provided email and password.
   * If the credentials are authenticated a token is returned and the authentication context is updated with the token.
   * The user is then navigated to the home page.
   *
   * If an error occurs, it sets the error state to display an error message, provided by the server and if no error message is provided by the server,
   * a default message is displayed.
   *
   * @param {FormEvent} event - The form submission.
   * @returns {Promise<Object>} Object - success message, token OR error message.
   */
  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      const response = await login(email, password);
      if (response.data) {
        setError("");
        auth.setToken(response.data.token);
        navigate("/home");
      } else {
        setError(response.data);
      }
    } catch (err) {
      setError(
        err.response.data
          ? err.response.data
          : "Something went wrong please try again."
      );
      console.error("Error occured while trying to login. Error: ", err);
    }
  };

  return (
    <form onSubmit={handleLogin}>
      <TextField
        margin="normal"
        required
        fullWidth
        label="Email"
        name="email"
        type="email"
        autoComplete="username"
        autoFocus
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <TextField
        margin="normal"
        required
        fullWidth
        name="password"
        label="Password"
        type="password"
        autoComplete="current-password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      {error && (
        <Typography color="error" variant="body2">
          {error}
        </Typography>
      )}
      <Button
        type="submit"
        fullWidth
        variant="contained"
        className="login-button"
        sx={{ margin: "14px 0" }}
      >
        Login
      </Button>
    </form>
  );
}
