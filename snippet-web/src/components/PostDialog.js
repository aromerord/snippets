import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Snackbar, Typography } from '@mui/material'
import axios from 'axios';
import React, { useState } from 'react'
import { POSTS } from '../constants/endpoints';

export const PostDialog = (props) => {

    const { openPostDialog, setOpenPostDialog, postId, findAllPostsByUser } = props;

    const handleDelete = () => {
        axios.delete(`${POSTS}/${postId}`).then(() => {
            setOpenPostDialog(false);
            findAllPostsByUser();
        }).catch(error => {
            setOpenPostDialog(false);
        });
    }

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
