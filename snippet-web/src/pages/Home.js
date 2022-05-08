import axios from 'axios';
import moment from 'moment';
import React, { useEffect, useState } from 'react'
import { ListGroup, ListGroupItem } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { POSTS } from '../constants/endpoints';

export const Home = () => {

  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get(POSTS).then(response => {
      setPosts(response.data);
      setLoading(false);
    }).catch(error => {
      setLoading(false);
    });
  }, [])

  return (
    <div className='mt-3 mb-5'>
      

      <ListGroup variant='flush'>
        <ListGroupItem>
          <h4 className='mb-3'>Últimos posts públicos</h4>
        </ListGroupItem>
        {posts && posts.map(post => (
          <ListGroupItem key={post.postId}>
            <div className='pt-10'>
              <span className='mr-10'><i className='fa-solid fa-book-bookmark icon-color'></i></span>
              <Link to={`/post/${post.postId}`}>{post.title}</Link>
            </div>
            <div className='ml-23 pb-10'>
              <small className='text-muted'>
                <span>{post.user.firstName} {post.user.lastName}</span> · Creado {moment(post.createdAt).fromNow()}
              </small>
            </div>
          </ListGroupItem>
        ))}
      </ListGroup>

    </div>
  )
}

