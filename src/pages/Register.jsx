import { Container, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import RegisterForm from "../modules/auth/components/register-form-component";

/**
 * This component renders the registration page.
 *
 * @returns {ReactNode} A React element that renders the registration page.
 */
const RegisterPage = () => {
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
          Welcome to
        </Typography>
        <Typography
          variant="h6"
          align="center"
          sx={{
            fontStyle: "normal",
            fontWeight: 700,
            letterSpacing: ".3rem",
            textDecoration: "none",
          }}
        >
          Workout Split
        </Typography>
        <RegisterForm />
        <Typography variant="body1" align="center" color="primary">
          <Link to="/login">Login to account.</Link>
        </Typography>
      </Container>
    </Container>
  );
};

export default RegisterPage;
