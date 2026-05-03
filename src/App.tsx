import './styles/global.css'
import './styles/theme.css'

import { BrowserRouter, Routes, Route } from 'react-router-dom';

import { Header } from './components/Header'
import { Footer } from './components/Footer';

import { Home } from './pages/Home'
import { Login } from './pages/Login'
import { Register } from './pages/Register'




export function App() {
  return (
    <>
      <BrowserRouter>
        <Header/>
        <Routes>
          <Route path='/'         element={<Home />}/>
          <Route path='/login'    element={<Login />}/>
          <Route path='/register' element={<Register />}/>
        </Routes>
        <Footer/>
      </BrowserRouter>
    </>
  );
}
