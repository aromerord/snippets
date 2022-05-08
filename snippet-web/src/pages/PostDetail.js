import axios from 'axios';
import moment from 'moment';
import React, { useEffect, useState } from 'react'
import { Button, Card, Row, Col } from 'react-bootstrap';
import { useNavigate, useParams } from 'react-router-dom'
import { POSTS } from '../constants/endpoints';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';

import { ghcolors } from 'react-syntax-highlighter/dist/esm/styles/prism';

// holiTheme

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
          <Card className='mt-3'>
            <Card.Header>
              <Row>
                <Col sm={8}>
                  <h5 style={{ 'marginBottom': '0.2rem' }}>{post.title}</h5>
                  <small className='text-muted'>
                    {post.user.firstName} {post.user.lastName} · Creado {moment(post.createdAt).fromNow()}
                  </small>
                </Col>
                <Col sm={4} className='text-end'>
                  <Button variant='link' size='sm' className='mr-5' onClick={() => { }}><i className='fa-solid fa-download'></i></Button>
                  <Button variant='link' size='sm' onClick={() => { }}><i className='fa-solid fa-copy'></i></Button>
                </Col>
              </Row>
            </Card.Header>
            <Card.Body style={{ 'padding': '0px' }}>
              <SyntaxHighlighter showLineNumbers customStyle={{ 'border': 'none' }} style={ghcolors} language='java'>
                {post.content}
              </SyntaxHighlighter>
            </Card.Body>
          </Card>
        </>)}
    </div>
  )
}
