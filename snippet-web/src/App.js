import { Routes, Route } from 'react-router-dom';
import { Navigation } from './components/Navigation';
import { checkForToken } from './helpers/helpers';
import { ProtectedRoute } from './components/ProtectedRoute';
import moment from 'moment';
import 'moment/locale/es';
import Container from '@mui/material/Container';
import { Home } from './pages/Home';
import { UserPosts } from './pages/UserPosts';
import { PostDetail } from './pages/PostDetail';

moment.locale('es');

checkForToken();

function App() {
  return (
    <>
      <Navigation />
      <Container className='mt-80'>
      <Routes>
        <Route exact path='/' element={<Home />}></Route>
        <Route exact path='/post/:id' element={<PostDetail />}></Route>
        <Route exact path='/posts' element={<ProtectedRoute component={UserPosts} />}></Route>
      </Routes>
      </Container>
    </>
  );
}

export default App;
