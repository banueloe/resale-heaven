import { Grid, Typography, Button } from "@mui/material";

const AuthError = () => {
  return (
    <Grid container>
      <Grid container alignItems="center" justify="center" direction="column">
        <Typography variant="h4" mt={16} mb={8}>
          You are not logged in. Please try logging in again or contact app
          administrators for help.
        </Typography>
        <Button href="/" variant="contained">
          Try again
        </Button>
      </Grid>
    </Grid>
  );
};

export default AuthError;
