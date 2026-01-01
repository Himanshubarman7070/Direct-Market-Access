import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter,Routes,Route } from 'react-router-dom';
import Signup from './pages/Signup';
import Login from './pages/Login';
import Home from './pages/Home';


const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <>
   <BrowserRouter>
   <Routes>
    <Route path='/' element={<Login/>}> </Route>
    <Route path='/Signup' element={<Signup/>}></Route>
    <Route path='/Home' element={<Home/>}></Route>
   </Routes>
   </BrowserRouter>
  </>
);


reportWebVitals();
