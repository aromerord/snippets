import React, { useEffect, useState } from 'react';
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { isObjectEmpty } from '../helpers/helpers';
import validator from 'validator';
import { loginAction } from '../actions/authAction';
import {
  Box,
  Button,
  Grid,
  Typography,
  Container,
  TextField,
  CssBaseline,
  Avatar
} from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';

export const Login = (props) => {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});
  const dispatch = useDispatch();
  const login = useSelector(state => state.auth.login);
  const navigate = useNavigate();

  useEffect(() => {
    if (login) {
      navigate('/');
    }
  }, [login]);

  /**
   * Login de usuarios
   */
  const handleSubmit = (e) => {

    e.preventDefault();

    let errors = {}

    if (!validator.isEmail(email)) {
      errors.email = 'El email no es válido.';
    }
    if (validator.isEmpty(password)) {
      errors.password = 'La contraseña no puede estar vacía.';
    }

    if (isObjectEmpty(errors)) {

      const user = {
        email: email,
        password: password
      }

      dispatch(loginAction(user))
        .then(() => { })
        .catch(error => {
          errors.auth = 'Los datos del usuario no son correctos.';
          setErrors(errors);
        });

    } else {
      setErrors(errors);
    }

  }

  return (

    <Container component="main" maxWidth="sm">
      <CssBaseline />
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Identificarse
        </Typography>
        <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                required
                label="Email"
                type="email"
                name="email"
                variant="outlined"
                helperText={errors?.email}
                error={!!errors?.email}
                value={email}
                onChange={e => setEmail(e.target.value)} />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                type="password"
                label="Contraseña"
                name="password"
                variant="outlined"
                helperText={errors?.password}
                error={!!errors?.password}
                value={password}
                onChange={e => setPassword(e.target.value)} />
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Acceder
          </Button>
          <Grid container justifyContent="flex-end">
            <Grid item>
              <Link to="/registro">¿No tienes una cuenta? Regístrate</Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
}