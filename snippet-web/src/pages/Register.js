import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { isObjectEmpty } from '../helpers/helpers';
import validator from 'validator';
import { loginAction, registerAction } from '../actions/authAction';
import { Link } from "react-router-dom";
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

export const Register = () => {

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
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
   * Registro de usuarios. Tras el registro, se hace login
   */
  const handleRegister = (e) => {

    e.preventDefault();

    let errors = {}

    if (validator.isEmpty(firstName)) {
      errors.firstName = 'El nombre no puede estar vacío.';
    }
    if (validator.isEmpty(lastName)) {
      errors.lastName = 'Los apellidos no pueden estar vacíos.';
    }
    if (!validator.isEmail(email)) {
      errors.email = 'El email no es válido.';
    }
    if (validator.isEmpty(password)) {
      errors.password = 'La contraseña no puede estar vacía.';
    }
    if (!validator.isLength(password, { min: 8, max: 30 })) {
      errors.password = 'La contraseña debe tener entre 8 y 30 caracteres.';
    }

    if (isObjectEmpty(errors)) {

      const user = {
        firstName: firstName,
        lastName: lastName,
        email: email,
        password: password
      }

      dispatch(registerAction(user)).then(response => {

        // Se hace login del usuario registrado
        const user = {
          email: email,
          password: password
        }

        dispatch(loginAction(user));

        setErrors({});
        setFirstName('');
        setPassword('');
        setEmail('');


      }).catch(error => {
        errors.register = error.response.data.message;
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
          Crear cuenta
        </Typography>
        <Box component="form" noValidate onSubmit={handleRegister} sx={{ mt: 3 }}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                required
                type="text"
                name="firstName"
                label="Nombre"
                variant="outlined"
                helperText={errors?.firstName}
                error={!!errors?.firstName}
                value={firstName}
                onChange={e => setFirstName(e.target.value)} />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                required
                type="text"
                name="lastName"
                label="Apellidos"
                variant="outlined"
                helperText={errors?.lastName}
                error={!!errors?.lastName}
                value={lastName}
                onChange={e => setLastName(e.target.value)} />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                required
                type="email"
                name="email"
                label="Email"
                variant="outlined"
                helperText={errors?.email}
                error={!!errors?.email}
                value={email}
                onChange={e => setEmail(e.target.value)} />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                required
                name="password"
                type="password"
                label="Contraseña"
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
            Registrarse
          </Button>
          <Grid container justifyContent="flex-end">
            <Grid item>
            <Link to="/login">¿Tienes una cuenta? Inicia sesión</Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  )
}
