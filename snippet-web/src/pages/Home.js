import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { Link } from 'react-router-dom';
import { POSTS } from '../constants/endpoints';
import moment from 'moment';
import {
  Paper,
  Table,
  TableRow,
  TableContainer,
  TableCell,
  TableBody,
  TableFooter,
  TablePagination,
  Typography,
  TableHead,
  IconButton
} from '@mui/material';
import { useSnackbar } from 'notistack';
import VisibilityIcon from '@mui/icons-material/Visibility';

export const Home = () => {

  const { enqueueSnackbar } = useSnackbar();

  const [posts, setPosts] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  useEffect(() => {
    axios.get(POSTS).then(response => {
      setPosts(response.data);
    }).catch(error => {
      enqueueSnackbar('Se ha producido un error en la aplicación', { variant: 'error' });
    });
  }, [])

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <>
      <Typography sx={{ mb: 2 }} variant="h5" component="div">
        Posts públicos
      </Typography>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Nombre</TableCell>
              <TableCell>Lenguaje</TableCell>
              <TableCell>Autor</TableCell>
              <TableCell>Fecha</TableCell>
              <TableCell>Acciones</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {posts.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((post) => (
                <TableRow key={post.postId}>
                  <TableCell style={{width: '30%'}}> {post.title} </TableCell>
                  <TableCell> {post.language} </TableCell>
                  <TableCell> {post.user.firstName} {post?.user?.lastName} </TableCell>
                  <TableCell> {moment(post.createdAt).format('DD/MM/yy')} </TableCell>
                  <TableCell>
                    <IconButton component={Link} to={`/post/${post.postId}`} size='sm' color="primary">
                      <VisibilityIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>

          <TableFooter>
            <TableRow>
              <TablePagination
                rowsPerPageOptions={[10, 25]}
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

    </>
  )
}

