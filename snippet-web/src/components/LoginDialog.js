import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { isObjectEmpty } from '../helpers/helpers';
import validator from 'validator';
import { loginAction } from '../actions/authAction';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField
} from '@mui/material';
import { Box } from '@mui/system';

export const LoginDialog = (props) => {

  const { openLogin, setOpenLogin } = props;
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


  const handleClose = () => {
    setOpenLogin(false);
    setEmail('');
    setPassword('');
    setErrors({});
  };

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
        .then(response => {

          handleClose();

        })
        .catch(error => {
          errors.auth = 'Los datos del usuario no son correctos.';
          setErrors(errors);
        });

    } else {
      setErrors(errors);
    }

  }

  return (

    <Dialog fullWidth scroll='paper' maxWidth='xs' open={openLogin} onClose={handleClose}>
      <DialogTitle>Iniciar sesión</DialogTitle>
      <DialogContent>

        <Box>
          <TextField
            fullWidth
            size="small"
            label="Email"
            variant="outlined"
            helperText={errors?.email}
            error={errors?.email}
            value={email}
            onChange={e => setEmail(e.target.value)} />
        </Box>

        <Box sx={{ mt: 2 }}>
          <TextField
            fullWidth
            size="small"
            label="Contraseña"
            variant="outlined"
            helperText={errors?.password}
            error={errors?.password}
            value={password}
            onChange={e => setPassword(e.target.value)} />
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancelar</Button>
        <Button onClick={handleSubmit}>Aceptar</Button>
      </DialogActions>
    </Dialog>

  )
}