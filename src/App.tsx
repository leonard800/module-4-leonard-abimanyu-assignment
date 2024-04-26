import React from 'react';
import './App.css';
import MultiStepFormPage from './Components/MultiStep';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import LoginPage from './Pages/Login';
import Home from './Pages/Homepage';
import SignInPage from './Pages/SignIn';
import CategoryPage from './Pages/Categories';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home />}></Route>
        <Route path='/login' element={<LoginPage />}></Route>
        <Route path='/signup' element={<SignInPage />}></Route>
        <Route path='/category' element={<CategoryPage />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
