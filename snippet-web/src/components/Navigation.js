import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom'
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  IconButton,
  Menu,
  MenuItem
} from '@mui/material';
import WifiChannelIcon from '@mui/icons-material/WifiChannel';
import { Box } from '@mui/system';
import { logoutAction } from '../actions/authAction';
import MenuIcon from '@mui/icons-material/Menu';

export const Navigation = () => {

  const login = useSelector(state => state.auth.login);
  const user = useSelector(state => state.auth.user);
  const dispatch = useDispatch();
  const [openUserMenu, setOpenUserMenu] = useState(null);
  const [openMenu, setOpenMenu] = useState(null);

  return (
    <AppBar>
      <Toolbar>

        <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
          <IconButton component={Link} to="/" className='cw'>
            <WifiChannelIcon />
          </IconButton>
          <Typography variant="h6" component="div" style={{ marginTop: '3px' }}>
            Snippets
          </Typography>
        </Box>

        <Box sx={{ flexGrow: 1, ml: 2, marginTop: '5px', display: { xs: 'none', md: 'flex' } }}>
          <Button component={Link} to="/" className='cw'>Home</Button>
          {login &&
            <Button component={Link} to="/posts" className='cw'>Posts</Button>}
        </Box>

        <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
          <IconButton color="inherit" onClick={(e) => setOpenMenu(e.currentTarget)} sx={{ p: 0 }}>
            <MenuIcon />
          </IconButton>
          <Menu
            sx={{ mt: '45px' }}
            keepMounted
            anchorEl={openMenu}
            anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
            transformOrigin={{ vertical: 'top', horizontal: 'right' }}
            open={Boolean(openMenu)}
            onClose={() => setOpenMenu(null)}>
            <MenuItem component={Link} to="/">
              <Typography textAlign="center" onClick={() => setOpenMenu(null)}>Home</Typography>
            </MenuItem>
            <MenuItem component={Link} to="/posts" onClick={() => setOpenMenu(null)}>
              <Typography textAlign="center">Posts</Typography>
            </MenuItem>
          </Menu>
        </Box>

        <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
          <IconButton component={Link} to="/" className='cw'>
            <WifiChannelIcon />
          </IconButton>
          <Typography variant="h6" component="div" style={{ marginTop: '3px' }}>
            Snippets
          </Typography>
        </Box>

        {!login ?
          <Box >
            <Button className='cw' component={Link} to="/login">Acceder</Button>
            <Button className='cw' component={Link} to="/registro">Registrarse</Button>
          </Box>
          :
          <Box sx={{ flexGrow: 0 }} >
            <Button className='cw' onClick={(e) => setOpenUserMenu(e.currentTarget)} sx={{ p: 0 }}>
              {user.sub}
            </Button>
            <Menu
              sx={{ mt: '45px' }}
              keepMounted
              anchorEl={openUserMenu}
              anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
              transformOrigin={{ vertical: 'top', horizontal: 'right' }}
              open={Boolean(openUserMenu)}
              onClose={() => setOpenUserMenu(null)}>
              <MenuItem onClick={() => {
                dispatch(logoutAction());
                setOpenUserMenu(null);
              }}>
                <Typography textAlign="center">Cerrar sesión</Typography>
              </MenuItem>
            </Menu>
          </Box>}

      </Toolbar>
    </AppBar>
  )
}
