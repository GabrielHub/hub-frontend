import React, { useContext, useEffect, useCallback } from 'react';
import { AuthContext } from 'services';
import { useNavigate } from 'react-router-dom';
import { useSnackbar } from 'notistack';
import { Button, TextField, Grid, Paper, Typography, Box } from '@mui/material';

export function Login() {
  const { user, signIn } = useContext(AuthContext);
  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      navigate('/');
    }
  }, [user, navigate]);

  const handleLogin = useCallback(
    async (e) => {
      e.preventDefault();
      const { email, password } = e.target.elements;
      try {
        await signIn(email.value, password.value);
      } catch (error) {
        enqueueSnackbar('Error signing in, please try again', { variant: 'error' });
      }
    },
    [enqueueSnackbar, signIn]
  );

  return (
    <Box display="flex" justifyContent="center" alignItems="center" style={{ minHeight: '80vh' }}>
      <Paper elevation={3} style={{ padding: '50px' }}>
        <Grid container direction="column" spacing={2}>
          <Grid item>
            <Typography variant="h5" gutterBottom>
              Login
            </Typography>
          </Grid>
          <form onSubmit={handleLogin}>
            <Box marginBottom={2}>
              <TextField
                name="email"
                type="email"
                label="Email"
                variant="outlined"
                required
                fullWidth
              />
            </Box>
            <Box marginBottom={2}>
              <TextField
                name="password"
                type="password"
                label="Password"
                variant="outlined"
                required
                fullWidth
              />
            </Box>
            <Box marginBottom={2}>
              <Button type="submit" variant="contained" color="primary" fullWidth>
                Login
              </Button>
            </Box>
          </form>
        </Grid>
      </Paper>
    </Box>
  );
}

export default {};
