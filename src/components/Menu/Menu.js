import React from 'react';
import { AppBar, Toolbar, Button, Box } from '@mui/material';
import { Link } from 'react-router-dom';

function Menu() {
  return (
    <AppBar position="static">
      <Toolbar>
        <Box sx={{ flexGrow: 1 }}>
          <Button color="inherit" component={Link} to="/">
            Home
          </Button>
          <Button color="inherit" component={Link} to="/login">
            Login
          </Button>
          <Button color="inherit" component={Link} to="/register">
            Registrar
          </Button>
          <Button color="inherit" component={Link} to="/campanha">
            Campanha
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
}

export default Menu;
