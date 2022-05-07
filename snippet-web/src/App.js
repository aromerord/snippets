import { Routes, Route } from "react-router-dom";
import { Container } from "react-bootstrap";
import { Navigation } from "./components/Navigation";
import { checkForToken } from "./helpers/helpers";
import { ProtectedRoute } from "./components/ProtectedRoute";
import moment from 'moment';
import "moment/locale/es";
import { Login } from "./pages/Login";
import { Home } from "./pages/Home";
import { Register } from "./pages/Register";
import { Posts } from "./pages/Posts";
import { Post } from "./pages/Post";

moment.locale('es');

checkForToken();

function App() {
  return (
    <>
      <Navigation />
      <Container>
        <Routes>
          <Route exact path="/" element={<Home />}></Route>
          <Route exact path="/login" element={<Login />}></Route>
          <Route exact path="/registro" element={<Register />}></Route>
          <Route exact path="/post/:id" element={<Post />}></Route>
          <Route exact path="/posts" element={<ProtectedRoute component={Posts}/>}></Route>
        </Routes>
      </Container>
    </>
  );
}

export default App;
