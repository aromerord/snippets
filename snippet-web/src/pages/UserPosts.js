import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import moment from 'moment';
import {
  Paper,
  Table,
  TableRow,
  TableContainer,
  TableCell,
  TableHead,
  TableBody,
  TableFooter,
  TablePagination,
  Typography,
  Button,
  IconButton,
  Grid
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { PostDialog } from '../components/PostDialog';
import { useSelector, useDispatch } from 'react-redux';
import { userPostsAction } from '../actions/userPostsAction';
import { useSnackbar } from 'notistack';
import { NoPosts } from '../components/NoPosts';

export const UserPosts = (props) => {

  const { enqueueSnackbar } = useSnackbar();
  const dispatch = useDispatch();
  const fetched = useSelector(state => state.posts?.fetched);
  const posts = useSelector(state => state.userPosts?.posts);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [openPostDialog, setOpenPostDialog] = useState(false);
  const [postId, setPostId] = useState();

  useEffect(() => {
    function getUserPosts() {
      if (!fetched) {
        try {
          dispatch(userPostsAction());
        } catch (e) {
          enqueueSnackbar('Se ha producido un error en la aplicación', { variant: 'error' });
        }
      }
    }
    getUserPosts()
  }, []);

  /**
   * Abre el dialog para eliminar un post
   */
  const handleDelete = (id) => {
    setPostId(id);
    setOpenPostDialog(true);
  }

  /**
   * Gestiona la paginación de la tabla
   */
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  /**
   * Gestiona la paginación de la tabla
   */
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <>
      <Grid container sx={{ marginBottom: '10px' }}>
        <Grid item xs={8}>
          <Typography variant="h5" component="div">
            Posts
          </Typography>

        </Grid>
        <Grid item xs={4} sx={{ display: "flex", justifyContent: "flex-end" }}>
          <Button component={Link} to={`/nuevo-post`} variant="contained" color="primary" style={{ paddingTop: '8px' }}>
            Nuevo post
          </Button>
        </Grid>
      </Grid>
      {posts && posts.length > 0 ?
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Nombre</TableCell>
                <TableCell>Lenguaje</TableCell>
                <TableCell>Tipo</TableCell>
                <TableCell>Fecha</TableCell>
                <TableCell>Acciones</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {posts.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((post) => (
                  <TableRow key={post.postId}>
                    <TableCell style={{ width: '30%' }}> {post.title} </TableCell>
                    <TableCell> {post.language} </TableCell>
                    <TableCell> {post.exposure === 'public' ? 'Público' : 'Privado'} </TableCell>
                    <TableCell>{moment(post.createdAt).format('DD/MM/yy')}</TableCell>
                    <TableCell>
                      <IconButton size='sm' color="error" onClick={() => handleDelete(post.postId)}>
                        <DeleteIcon />
                      </IconButton>
                      <IconButton component={Link} to={`/editar-post/${post.postId}`} size='sm' color="success">
                        <EditIcon />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>

            <TableFooter>
              <TableRow>
                <TablePagination
                  rowsPerPageOptions={[5, 10, 25]}
                  count={posts.length}
                  rowsPerPage={rowsPerPage}
                  page={page}
                  onPageChange={handleChangePage}
                  onRowsPerPageChange={handleChangeRowsPerPage}
                  SelectProps={{
                    inputProps: {
                      'aria-label': 'Elementos',
                    },
                    native: true,
                  }}
                />
              </TableRow>
            </TableFooter>
          </Table>
        </TableContainer> :
        <NoPosts />}

      <PostDialog
        postId={postId}
        openPostDialog={openPostDialog}
        setOpenPostDialog={setOpenPostDialog} />
    </>
  )
}
