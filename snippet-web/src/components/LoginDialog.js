import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { isObjectEmpty } from '../helpers/helpers';
import validator from 'validator';
import { loginAction } from '../actions/authAction';
import { Box } from '@mui/system';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField
} from '@mui/material';

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

  /**
   * Login de usuarios
   */
  const handleSubmit = () => {

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

  /**
   * Cierra el dialog del login y limpia las variables
   */
     const handleClose = () => {
      setOpenLogin(false);
      setEmail('');
      setPassword('');
      setErrors({});
    };

  return (

    <Dialog fullWidth scroll='paper' maxWidth='xs' open={openLogin} onClose={handleClose}>
      <DialogTitle>Identificarse</DialogTitle>
      <DialogContent>

        <Box sx={{ mt: 1 }}>
          <TextField
            fullWidth
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
        <Button variant="contained" onClick={handleSubmit}>Acceder</Button>
      </DialogActions>
    </Dialog>

  )
}
