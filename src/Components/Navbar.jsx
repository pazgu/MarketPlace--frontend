
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import MenuIcon from '@mui/icons-material/Menu';
import { Link } from 'react-router-dom';
import { useState } from 'react';

const Navbar = () => {
  const [anchorEl, setAnchorEl] = useState(null);

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          <Link to="/" style={{ color: 'inherit', textDecoration: 'none' }}>
            My Marketplace
          </Link>
        </Typography>
        <div>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
            onClick={handleMenu}
          >
            <MenuIcon />
          </IconButton>
          <Menu
            id="menu-appbar"
            anchorEl={anchorEl}
            anchorOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
            keepMounted
            transformOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
            open={Boolean(anchorEl)}
            onClose={handleClose}
          >
            <MenuItem onClick={handleClose}>
              <Link to="/" style={{ color: 'inherit', textDecoration: 'none' }}>Homepage</Link>
            </MenuItem>
            <MenuItem onClick={handleClose}>
              <Link to="/products" style={{ color: 'inherit', textDecoration: 'none' }}>Products</Link>
            </MenuItem>
            <MenuItem onClick={handleClose}>
              <Link to="/myproducts" style={{ color: 'inherit', textDecoration: 'none' }}>My Products</Link>
            </MenuItem>
            <MenuItem onClick={handleClose}>
              <Link to="/login" style={{ color: 'inherit', textDecoration: 'none' }}>Login</Link>
            </MenuItem>
            <MenuItem onClick={handleClose}>
              <Link to="/register" style={{ color: 'inherit', textDecoration: 'none' }}>Register</Link>
            </MenuItem>
          </Menu>
        </div>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;