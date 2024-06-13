import { Container, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import LoginForm from "../modules/auth/components/login-form-component";

/**
 * This component renders the login page.
 *
 * @returns {ReactNode} A React element that renders the login page.
 */
const LoginPage = () => {
  return (
    <Container
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        p: "15px",
        minHeight: "calc(100vh - 30px)",
      }}
    >
      <Container
        component="main"
        maxWidth="xs"
        sx={{
          p: "20px",
          border: "1px solid lightslategrey",
          borderRadius: "8px",
        }}
      >
        <Typography variant="h6" align="center">
          Welcome back to
        </Typography>
        <Typography
          variant="h6"
          align="center"
          sx={{
            fontFamily: "Pacifico, cursive",
            fontStyle: "normal",
            fontWeight: 700,
            letterSpacing: ".3rem",
            textDecoration: "none",
          }}
        >
          WS
        </Typography>
        <LoginForm />
        <Typography variant="body1" align="center" color="primary">
          <Link to="/register">Create an account.</Link>
        </Typography>
      </Container>
    </Container>
  );
};

export default LoginPage;
