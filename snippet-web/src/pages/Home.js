import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import { POSTS } from '../constants/endpoints';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { TableFooter, TablePagination, Typography } from '@mui/material';
import moment from 'moment';

export const Home = () => {

  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  useEffect(() => {
    axios.get(POSTS).then(response => {
      setPosts(response.data);
      setLoading(false);
    }).catch(error => {
      setLoading(false);
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
      <Typography sx={{ mb:2 }}  variant="h5" component="div">
        Últimos posts públicos
      </Typography>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableBody>
            {posts.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((post) => (
                <TableRow key={post.postId}>
                  <TableCell component="th" scope="row">
                    <Link to={`/post/${post.postId}`}>{post.title}</Link>
                    <Typography sx={{ fontSize: 14, mt: 1 }} color="text.secondary">
                      <span>{post.user.firstName} {post.user.lastName}</span> · Creado {moment(post.createdAt).fromNow()}
                    </Typography>

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

    </>
  )
}

