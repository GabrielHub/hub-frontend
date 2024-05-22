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
import { AuthContext } from 'services';
import { navConfig } from './constants';

export function Navbar() {
  const navigate = useNavigate();
  const { user, logout, loading } = useContext(AuthContext);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState({});
  const [openCollapse, setOpenCollapse] = useState({});

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

  const handleClick = (path, event) => {
    setAnchorEl((prev) => ({ ...prev, [path]: event.currentTarget }));
  };

  const handleClose = (path) => {
    setAnchorEl((prev) => ({ ...prev, [path]: null }));
  };

  const handleCollapse = (path) => {
    setOpenCollapse((prev) => ({ ...prev, [path]: !prev[path] }));
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
              onClick={(event) => handleClick(route.path, event)}>
              <Typography
                variant="h6"
                component="div"
                sx={{ flexGrow: 1, mr: 2, color: 'black' }}
                align="center"
                gutterBottom>
                {route.title}
              </Typography>
            </Button>
            <Menu
              id="simple-menu"
              anchorEl={anchorEl[route.path]}
              keepMounted
              open={Boolean(anchorEl[route.path])}
              onClose={() => handleClose(route.path)}>
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
            sx={{ flexGrow: 1, mr: 2, color: 'black' }}
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
            <ListItemButton
              sx={{ display: 'flex', alignItems: 'center' }}
              onClick={() => handleCollapse(route.path)}>
              <Typography
                variant="h6"
                component="div"
                sx={{
                  flexGrow: 1,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center', // Add this line
                  width: '100%'
                }}
                align="center">
                {route.title}
                {openCollapse[route.path] ? <ExpandLess /> : <ExpandMore />}
              </Typography>
            </ListItemButton>
            <Collapse in={openCollapse[route.path]} timeout="auto" unmountOnExit>
              <List component="div" sx={{ border: '1px solid white' }} disablePadding>
                {route.children.map((child) => (
                  <ListItemButton key={child.path} onClick={() => navigate(child.path)}>
                    <ListItemText primary={<Typography align="center">{child.title}</Typography>} />
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
            sx={{ flexGrow: 1, color: 'white', mr: 2 }}
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
          <Button sx={{ borderRadius: 28, textDecoration: 'none' }} onClick={() => navigate('/')}>
            <Typography
              variant="h4"
              sx={{
                border: '4px solid black',
                display: 'flex',
                alignItems: 'center',
                color: 'black',
                px: '2px',
                mr: '2px'
              }}>
              <strong>BREAD2</strong>
            </Typography>
            <Typography
              variant="h4"
              sx={{
                mr: 1,
                display: 'flex',
                alignItems: 'center',
                backgroundImage: `linear-gradient(to right, #B5EAD7, #C7CEEA, #D291BC, #FFDAC1, #E2F0CB, #9ACDFA, #B4CFEC)`,
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                pr: 1
              }}>
              Basket
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
