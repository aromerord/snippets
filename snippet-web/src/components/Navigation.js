import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom'
import { AppBar, Toolbar, Typography, Button, IconButton } from '@mui/material';
import WifiChannelIcon from '@mui/icons-material/WifiChannel';
import { Box } from '@mui/system';
import { logoutAction } from '../actions/authAction';

export const Navigation = () => {

  const [openLogin, setOpenLogin] = useState(false);
  const [openRegister, setOpenRegister] = useState(false);
  const login = useSelector(state => state.auth.login);
  // const user = useSelector(state => state.auth.user);
  const dispatch = useDispatch();

  return (
    <AppBar>
      <Toolbar>
        <IconButton component={Link} to="/" className='cw'>
          <WifiChannelIcon />
        </IconButton>
        <Typography variant="h6" component="div" >
          Snippets
        </Typography>
        <Box sx={{ flexGrow: 1, ml: 2, marginTop: '5px' }}>
          <Button component={Link} to="/" className='cw'>Home</Button>
          {login &&
            <Button component={Link} to="/posts" className='cw'>Posts</Button>}
        </Box>
        <Box sx={{ marginTop: '5px' }}>
          {!login ?
            <>
              <Button className='cw' component={Link} to="/login">Acceder</Button>
              <Button className='cw' component={Link} to="/registro">Registrarse</Button>
            </> :
            <Button className='cw' onClick={() => dispatch(logoutAction())}>Cerrar sesión</Button>}
        </Box>
      </Toolbar>
    </AppBar>
  )
}
