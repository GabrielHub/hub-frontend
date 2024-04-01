import React, { useState, useContext } from 'react';
import { Link, Outlet, useNavigate } from 'react-router-dom';
import {
  Button,
  Grid,
  Typography,
  CircularProgress,
  Box,
  IconButton,
  Drawer,
  List,
  ListItemButton,
  Hidden,
  Menu,
  MenuItem,
  Collapse,
  ListItemText
} from '@mui/material';
import { ExpandLess, ExpandMore } from '@mui/icons-material';
import { blueGrey } from '@mui/material/colors';
import MenuIcon from '@mui/icons-material/Menu';
import { THEME_COLORS } from 'constants';
import { AuthContext } from 'services';
import logo512 from '../../images/logo512.png';
import { navConfig } from './constants';

export function Navbar() {
  const navigate = useNavigate();
  const { user, logout, loading } = useContext(AuthContext);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [openCollapse, setOpenCollapse] = useState(false);

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

  const toggleDrawer = (open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }
    setDrawerOpen(open);
  };

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleCollapse = () => {
    setOpenCollapse(!openCollapse);
  };

  const renderNavDesktopLinks = () =>
    navConfig.map((route) => {
      if (route.children) {
        return (
          <div key={route.path}>
            <Button
              variant="text"
              aria-controls="simple-menu"
              aria-haspopup="true"
              onClick={handleClick}>
              <Typography
                variant="h6"
                component="div"
                sx={{ flexGrow: 1, mr: 2, color: THEME_COLORS.DARK }}
                align="center"
                gutterBottom>
                {route.title}
              </Typography>
            </Button>
            <Menu
              id="simple-menu"
              anchorEl={anchorEl}
              keepMounted
              open={Boolean(anchorEl)}
              onClose={handleClose}>
              {route.children.map((child) => (
                <MenuItem key={child.path} onClick={handleClose} component={Link} to={child.path}>
                  {child.title}
                </MenuItem>
              ))}
            </Menu>
          </div>
        );
      }
      return (
        <Link key={route.path} to={route.path} style={{ textDecoration: 'none' }}>
          <Typography
            variant="h6"
            component="div"
            sx={{ flexGrow: 1, mr: 2, color: THEME_COLORS.DARK }}
            align="center"
            gutterBottom>
            {route.title}
          </Typography>
        </Link>
      );
    });

  const renderNavMobileLinks = () =>
    navConfig.map((route) => {
      if (route.children) {
        return (
          <div key={route.path}>
            <ListItemButton sx={{ display: 'flex', alignItems: 'center' }} onClick={handleCollapse}>
              <Typography
                variant="h6"
                component="div"
                sx={{
                  flexGrow: 1,
                  color: THEME_COLORS.LIGHT
                }}
                align="center">
                {route.title}
                {openCollapse ? <ExpandLess /> : <ExpandMore />}
              </Typography>
            </ListItemButton>
            <Collapse in={openCollapse} timeout="auto" unmountOnExit>
              <List component="div" disablePadding>
                {route.children.map((child) => (
                  <ListItemButton key={child.path} onClick={() => navigate(child.path)}>
                    <ListItemText primary={child.title} />
                  </ListItemButton>
                ))}
              </List>
            </Collapse>
          </div>
        );
      }
      return (
        <ListItemButton key={route.path} onClick={() => navigate(route.path)}>
          <Typography
            variant="h6"
            component="div"
            sx={{ flexGrow: 1, mr: 2, color: THEME_COLORS.LIGHT }}
            align="center"
            gutterBottom>
            {route.title}
          </Typography>
        </ListItemButton>
      );
    });

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
        <Hidden mdUp>
          <IconButton
            sx={{ marginRight: 1 }}
            edge="end"
            color="inherit"
            aria-label="menu"
            onClick={toggleDrawer(true)}>
            <MenuIcon />
          </IconButton>
        </Hidden>
        <Hidden mdDown>{renderNavDesktopLinks()}</Hidden>
      </Grid>
      <Drawer anchor="right" open={drawerOpen} onClose={toggleDrawer(false)}>
        <Box
          sx={{
            width: 250,
            height: '100%',
            bgcolor: blueGrey[700],
            color: 'white'
          }}>
          <List>{renderNavMobileLinks()}</List>
        </Box>
      </Drawer>
      <Outlet />
    </>
  );
}

export default {};
