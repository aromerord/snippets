import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
  Button,
  FormControl,
  FormControlLabel,
  FormHelperText,
  Grid,
  InputLabel,
  MenuItem,
  Radio,
  RadioGroup,
  Select,
  TextField,
  Typography
} from '@mui/material'
import { isObjectEmpty } from '../helpers/helpers';
import validator from 'validator';
import { useNavigate, useParams } from 'react-router-dom';
import { POSTS } from '../constants/endpoints';
import { useSnackbar } from 'notistack';
import { useDispatch } from 'react-redux';

export const PostForm = () => {

  const navigate = useNavigate();
  const { id } = useParams();
  const { enqueueSnackbar } = useSnackbar();
  const dispatch = useDispatch();

  const [post, setPost] = useState();
  const [title, setTitle] = useState('');
  const [language, setLanguage] = useState('');
  const [exposure, setExposure] = useState('public');
  const [content, setContent] = useState('');
  const [errors, setErrors] = useState({});

  /**
   * Obtiene el post a actualizar 
   */
  useEffect(() => {
    if (id) {
      axios.get(`${POSTS}/${id}`).then(response => {
        setPost(response.data)
        setTitle(response.data.title);
        setLanguage(response.data.language);
        setContent(response.data.content);
        setExposure(response.data.exposure);
      }).catch(error => {
        enqueueSnackbar('Se ha producido un error en la aplicación', { variant: 'error' });
        navigate('/');
      });
    }
  }, []);


  /**
   * Gestiona el onSubmit del formulario para crear o actualizar post
   */
  const handleOnSubmit = (e) => {
    e.preventDefault();

    let errors = {}

    if (validator.isEmpty(title)) {
      errors.title = 'El título no puede estar vacío.';
    }
    if (validator.isEmpty(language)) {
      errors.language = 'El lenguaje no puede estar vacío.';
    }
    if (validator.isEmpty(content)) {
      errors.content = 'El contenido no puede estar vacío.';
    }

    if (isObjectEmpty(errors)) {
      if (id) {
        updatePost();
      } else {
        savePost();
      }
    } else {
      setErrors(errors);
    }

  }

  /**
   * Crear post
   */
  const savePost = () => {
    const currentPost = {
      'title': title,
      'language': language,
      'exposure': exposure,
      'content': content
    }
    axios.post(`${POSTS}`, currentPost).then(response => {
      setTitle(response.data.title);
      setLanguage(response.data.language);
      setContent(response.data.content);
      setExposure(response.data.exposure);
      enqueueSnackbar('Post creado con éxito', { variant: 'success' }); // error, warning, info
      navigate('/posts');

    }).catch(error => {
      enqueueSnackbar('Se ha producido un error en la aplicación', { variant: 'error' });
      navigate('/posts');
    });

  }

  /**
   * Actualizar post
   */
  const updatePost = () => {
    const currentPost = {
      'id': post.id,
      'postId': post.postId,
      'title': title,
      'language': language,
      'exposure': exposure,
      'content': content
    }

    axios.put(`${POSTS}`, currentPost).then(response => {
      setTitle(response.data.title);
      setLanguage(response.data.language);
      setContent(response.data.content);
      setExposure(response.data.exposure);
      enqueueSnackbar('Post actualizado con éxito', { variant: 'success' }); // error, warning, info
      navigate('/posts');

    }).catch(error => {
      enqueueSnackbar('Se ha producido un error en la aplicación', { variant: 'error' });
      navigate('/posts');
    });
  }

  return (
    <>
      <Grid container spacing={2} sx={{ display: 'flex', justifyContent: 'center' }}>
        <Grid item xs={12} sm={10}>
          <Typography sx={{ mb: 2 }} variant="h5">
            {id ? 'Actualizar post' : 'Nuevo post'}
          </Typography>
          <form onSubmit={handleOnSubmit}>
            <Grid container spacing={2}>

              <Grid item xs={12} sm={12}>
                <TextField
                  fullWidth
                  label="Título"
                  variant="outlined"
                  name='title'
                  helperText={errors?.title}
                  error={errors?.title}
                  value={title}
                  onChange={e => setTitle(e.target.value)} />
              </Grid>

              <Grid item xs={12} sm={6}>
                <FormControl fullWidth error={errors?.language}>
                  <InputLabel id="simple-select-label">Lenguaje</InputLabel>
                  <Select
                    labelId="simple-select-label"
                    variant="outlined"
                    label="Lenguaje"
                    fullWidth
                    name="language"
                    value={language}
                    onChange={e => setLanguage(e.target.value)}
                  >
                    <MenuItem value={'Java'}>Java</MenuItem>
                    <MenuItem value={'JavaScript'}>JavaScript</MenuItem>
                    <MenuItem value={'PHP'}>PHP</MenuItem>
                  </Select>
                  <FormHelperText>{errors?.language}</FormHelperText>
                </FormControl>
              </Grid>

              <Grid item xs={12} sm={6} sx={{ mt: 1, display: 'flex', justifyContent: 'center' }}>
                <RadioGroup
                  row
                  value={exposure}
                  onChange={e => setExposure(e.target.value)}>
                  <FormControlLabel value="public" control={<Radio />} label="Público" />
                  <FormControlLabel value="private" control={<Radio />} label="Privado" />
                </RadioGroup>
              </Grid>

              <Grid item xs={12} sm={12}>
                <TextField
                  fullWidth
                  label="Contenido"
                  multiline
                  rows={10}
                  variant="outlined"
                  name='content'
                  helperText={errors?.content}
                  error={errors?.content}
                  value={content}
                  onChange={e => setContent(e.target.value)} />
              </Grid>

              <Grid item xs={12} sx={{ display: "flex", justifyContent: "flex-end" }}>
                <Button sx={{ mr: 2 }} onClick={() => navigate('/posts')}>
                  Cancelar
                </Button>
                <Button variant="contained" type='submit' color="primary" >
                  Guardar
                </Button>
              </Grid>
            </Grid>
          </form>
        </Grid>
      </Grid>
    </>
  )
}
