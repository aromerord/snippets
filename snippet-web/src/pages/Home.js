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
      console.log(error)
      setLoading(false);
    });
  }, [])

  return (
    <div className='mt-3 mb-5'>
      <h3 className='mb-3'>Últimos posts públicos</h3>

      <ListGroup variant="flush">
        {posts && posts.map(post => (
          <ListGroupItem key={post.postId}>
            <div>
              <Link to="/">{post.title}</Link>
            </div>
            <p>{post.description}</p>
            <small className="text-muted">
              Creado por {post.user.firstName} {post.user.lastName} {moment(post.createdAt).fromNow()}.
            </small>
          </ListGroupItem>
        ))}
      </ListGroup>

    </div>
  )
}
