import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import MoviesList from './component/Movies_List';
import MoviesDetail from './component/Movie_Detail';
import 'bootstrap/dist/css/bootstrap.min.css';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import './style.css'

function App() {
  return (
    <div className="App">
      
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<MoviesList />} />
            <Route path="/detail/:id" element={<MoviesDetail />} />
          </Routes>
        </BrowserRouter>
    </div>
  );
}

export default App;
