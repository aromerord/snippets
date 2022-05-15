import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { isObjectEmpty } from '../helpers/helpers';
import validator from 'validator';
import { loginAction, registerAction } from '../actions/authAction';

import {
    Box,
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    TextField
} from '@mui/material';

export const RegisterDialog = (props) => {

    const { openRegister, setOpenRegister } = props;
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

    const handleClose = () => {
        setOpenRegister(false);
        setEmail('');
        setPassword('');
        setErrors({});
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        let errors = {}

        if (validator.isEmpty(firstName)) {
            errors.firstName = 'El nombre no puede estar vacío.';
        }
        if (validator.isEmpty(lastName)) {
            errors.lastName = 'Los apellidos no pueden estar vacios.';
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
                setLastName('');
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
        <Dialog fullWidth maxWidth='xs' open={openRegister} onClose={handleClose}>
            <DialogTitle>Crear cuenta</DialogTitle>
            <DialogContent >
                <Box>
                    <TextField
                        className='mt-3'
                        fullWidth
                        size="small"
                        label="Nombre"
                        variant="outlined"
                        helperText={errors?.firstName}
                        error={errors?.firstName}
                        value={firstName}
                        onChange={e => setFirstName(e.target.value)} />
                </Box>
                <Box sx={{ mt: 2 }}>
                    <TextField
                        className='mt-3'
                        fullWidth
                        size="small"
                        label="Apellidos"
                        variant="outlined"
                        helperText={errors?.lastName}
                        error={errors?.lastName}
                        value={lastName}
                        onChange={e => setLastName(e.target.value)} />
                </Box>
                <Box sx={{ mt: 2 }}>
                    <TextField
                        className='mt-3'
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
                        className='mt-3'
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