import { useAuth0 } from "@auth0/auth0-react";
import { 
  Button, 
  AppBar, 
  Toolbar, 
  Typography, 
  Container, 
  CircularProgress 
} from "@mui/material";
import ProfilePage from "./ProfilePage";

const AuthWrapper: React.FC = () => {
  const { 
    isAuthenticated, 
    isLoading, 
    loginWithRedirect, 
    logout, 
    user 
  } = useAuth0();

  if (isLoading) {
    return (
      <Container sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
        <CircularProgress />
      </Container>
    );
  }

  if (!isAuthenticated) {
    return (
      <Container sx={{ textAlign: "center", mt: 4 }}>
        <Button 
          variant="contained" 
          onClick={() => loginWithRedirect()}
          sx={{ px: 4, py: 1.5 }}
        >
          Login
        </Button>
      </Container>
    );
  }

  return (
    <>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            Profile Management
          </Typography>
          <Typography sx={{ mr: 2 }}>Welcome, {user?.name}</Typography>
          <Button
            color="inherit"
            onClick={() => logout({ logoutParams: { returnTo: window.location.origin } })}
          >
            Logout
          </Button>
        </Toolbar>
      </AppBar>
      <Container maxWidth="md" sx={{ py: 4 }}>
        <ProfilePage />
      </Container>
    </>
  );
};

export default AuthWrapper;