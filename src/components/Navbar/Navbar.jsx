import React, { useContext } from 'react';
import { Link, Outlet, useNavigate } from 'react-router-dom';
import { slide as Menu } from 'react-burger-menu';
import { Button, Grid, Typography, CircularProgress, Box } from '@mui/material';
import { THEME_COLORS } from 'constants';
import { AuthContext } from 'services';
import logo512 from '../../images/logo512.png';
import { navConfig, MenuStyles } from './constants';

export function Navbar() {
  const navigate = useNavigate();
  const { user, logout, loading } = useContext(AuthContext);

  const handleSignOut = async () => {
    await logout();
    navigate('/');
  };

  const renderAuthButton = () => {
    if (loading) {
      return <CircularProgress />;
    }
    if (user) {
      return <Button onClick={handleSignOut}>Logout</Button>;
    }
    return <Box />;
  };

  return (
    <>
      <Grid container justifyContent="flex-start" alignItems="center">
        <Grid item xs={2} sx={{ padding: 2 }}>
          <Button sx={{ borderRadius: 28 }} onClick={() => navigate('/')}>
            <Typography
              variant="h4"
              sx={{ mr: 2, display: 'flex', alignItems: 'center', color: THEME_COLORS.DARK }}>
              <img src={logo512} alt="Logo" style={{ width: 50 }} />
              Hub
            </Typography>
          </Button>
        </Grid>
        <Grid xs item>
          {renderAuthButton()}
        </Grid>
      </Grid>
      <Menu styles={MenuStyles} right>
        <Grid container>
          {navConfig.map((route) => (
            <Grid key={route.path} xs={12} item>
              <Link to={route.path} style={{ textDecoration: 'none' }}>
                <Typography
                  variant="h6"
                  component="div"
                  sx={{ flexGrow: 1, mr: 2, color: THEME_COLORS.LIGHT }}
                  align="center"
                  gutterBottom>
                  {route.title}
                </Typography>
              </Link>
            </Grid>
          ))}
        </Grid>
      </Menu>
      <Outlet />
    </>
  );
}

export default {};
