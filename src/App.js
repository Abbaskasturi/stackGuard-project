import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Home from './components/Home';
import Protecter from './components/Protecter';
import SignupPage from './components/SignupPage';

const App = () => (
  <BrowserRouter>
  <Routes>
    <Route path='/signup' element={<SignupPage/>}/>
    <Route path ='/protectKey' element ={<Protecter/>} />
    <Route path='/' element ={<Home/>}/>
  </Routes>
  </BrowserRouter>
)

export default App; 