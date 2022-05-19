import axios from 'axios';
import moment from 'moment';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { POSTS } from '../constants/endpoints';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { ghcolors } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { downloadFile } from '../helpers/helpers';
import { Card, Grid, CardContent, IconButton, Typography } from '@mui/material';
import DownloadIcon from '@mui/icons-material/Download';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';

export const PostDetail = () => {

  const { id } = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get(`${POSTS}/${id}`).then(response => {
      setPost(response.data);
      setLoading(false);
    }).catch(error => {
      setLoading(false);
      navigate('/');
    });
  }, []);

  return (
    <div className='mt-3 mb-5'>
      {post &&
        (<>
          <Grid container>
            <Grid item xs={10}>
              <Typography variant="h5" component="div">
                {post.title}
              </Typography>
              <Typography sx={{ fontSize: 14, mb: 2 }} color="text.secondary" gutterBottom>
                {post.user.firstName} {post.user?.lastName} · Creado {moment(post.createdAt).fromNow()}
              </Typography>
            </Grid>
            <Grid item xs={2} sx={{ pb: 2,pt:2, display: 'flex', justifyContent: 'flex-end' }}>

              <IconButton color="primary" variant="contained" size="small" onClick={() => downloadFile(post.postId, post.content)}>
                <DownloadIcon />
              </IconButton>

              <CopyToClipboard
                text={post.content}
                onCopy={() => {
                  console.log('copiado')
                }}>
                <IconButton color="primary" size="small"> <ContentCopyIcon /> </IconButton>
              </CopyToClipboard>

            </Grid>
          </Grid>

          <Card>
            <CardContent style={{ 'padding': '0px' }}>
              <SyntaxHighlighter showLineNumbers variant="contained" customStyle={{ 'border': 'none' }} style={ghcolors} language='java'>
                {post.content}
              </SyntaxHighlighter>
            </CardContent>
          </Card>
        </>)}


    </div>
  )
}
