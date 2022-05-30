import React from 'react';
import axios from 'axios';
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Typography
} from '@mui/material'
import { POSTS } from '../constants/endpoints';
import { userPostsAction } from '../actions/userPostsAction';
import { useDispatch } from 'react-redux';
import { useSnackbar } from 'notistack';

export const PostDialog = (props) => {

    const { openPostDialog, setOpenPostDialog, postId } = props;
    const dispatch = useDispatch();
    const { enqueueSnackbar } = useSnackbar();

    /**
     * Eliminar post
     */
    const handleDelete = () => {
        axios.delete(`${POSTS}/${postId}`).then(() => {
            setOpenPostDialog(false);
            // Se recargan los posts
            dispatch(userPostsAction());
            enqueueSnackbar('Post eliminado con éxito', { variant: 'success' });
        }).catch(error => {
            setOpenPostDialog(false);
            enqueueSnackbar('Se ha producido un error en la aplicación', { variant: 'error' });
        });
    }

    /**
     * Cierra el dialog
     */
    const handleClose = () => {
        setOpenPostDialog(false);
    }


    return (
        <Dialog fullWidth maxWidth='xs' open={openPostDialog} onClose={handleClose}>
            <DialogTitle>Eliminar post</DialogTitle>
            <DialogContent>
                <Typography component="div">
                    ¿Está seguro de que desea eliminar el post?
                </Typography>
            </DialogContent>

            <DialogActions>
                <Button onClick={handleClose}>Cancelar</Button>
                <Button variant="contained" onClick={handleDelete}>Aceptar</Button>
            </DialogActions>
        </Dialog>
    )
}
