import React from 'react';
import { Link, Outlet, useNavigate } from 'react-router-dom';
import { slide as Menu } from 'react-burger-menu';
import { Button, Grid, Typography } from '@mui/material';
import { THEME_COLORS } from 'constants';
import logo512 from '../../images/logo512.png';
import { navConfig, MenuStyles } from './constants';

export function Navbar() {
  const navigate = useNavigate();
  return (
    <>
      <Grid alignItems="center" justifyContent="space-around" container>
        <Grid xs sx={{ padding: 2 }} item>
          <Button sx={{ borderRadius: 28 }} onClick={() => navigate('/hub/')}>
            <Typography
              variant="h4"
              sx={{ mr: 2, display: 'flex', alignItems: 'center', color: THEME_COLORS.DARK }}>
              <img src={logo512} alt="Logo" style={{ width: 50 }} />
              Hub
            </Typography>
          </Button>
        </Grid>
      </Grid>
      <Menu styles={MenuStyles} right>
        {navConfig.map((route) => (
          <Link key={route.path} to={route.path} style={{ textDecoration: 'none' }}>
            <Typography
              variant="h6"
              component="div"
              sx={{ flexGrow: 1, mr: 2, color: THEME_COLORS.LIGHT }}
              align="center"
              gutterBottom>
              {route.title}
            </Typography>
          </Link>
        ))}
      </Menu>
      <Outlet />
    </>
  );
}

export default {};
