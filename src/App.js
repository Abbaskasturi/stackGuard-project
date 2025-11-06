import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Home from './components/Home';
import Protecter from './components/Protecter';
import SignupPage from './components/SignupPage';

const App = () => (
  <BrowserRouter>
  <Routes>
    <Route path='/Sign-Up' element={<SignupPage/>}/>
    <Route path ='/Configuration' element ={<Protecter/>} />
    <Route path='/' element ={<Home/>}/>
  </Routes>
  </BrowserRouter>
)

export default App; 