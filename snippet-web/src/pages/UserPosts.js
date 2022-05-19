import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { Link } from 'react-router-dom';
import { POSTS_BY_USER } from '../constants/endpoints';
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
  Grid,
  Snackbar
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { PostDialog } from '../components/PostDialog';

export const UserPosts = (props) => {

  const [posts, setPosts] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [openPostDialog, setOpenPostDialog] = useState(false);
  const [postId, setPostId] = useState();

  useEffect(() => {
    findAllPostsByUser();
  }, []);


  const findAllPostsByUser = () => {
    axios.get(POSTS_BY_USER).then(response => {
      setPosts(response.data);
    }).catch(error => {

    });
  }

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleDelete = (id) => {
    console.log('id', id)
    setPostId(id);
    setOpenPostDialog(true);
  }

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

      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Nombre</TableCell>
              <TableCell>Fecha</TableCell>
              <TableCell>Acciones</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {posts.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((post) => (
                <TableRow key={post.postId}>
                  <TableCell component="th" scope="row">
                    {post.title}
                  </TableCell>
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
      </TableContainer>

      <PostDialog
        postId={postId}
        openPostDialog={openPostDialog}
        setOpenPostDialog={setOpenPostDialog}
        findAllPostsByUser={findAllPostsByUser} />
    </>
  )
}
