import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter,Routes,Route } from 'react-router-dom';
import Signup from './pages/Signup';
import Login from './pages/Login';
import Home from './pages/Home';
import MainPage from './pages/MainPage'
import Orders from './pages/Orders';
import Profile from './pages/Profile';
import Cart from './pages/Cart';
import PlaceOrder from './pages/PlaceOrder'
import MyCrops from './pages/MyCrops';
import AddCrops from './pages/AddCrops';
import AllBookings from './pages/AllBookings';
const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <>
   <BrowserRouter>
   <Routes>
    <Route path='/' element={<Login/>}> </Route>
    <Route path='/signup' element={<Signup/>}></Route>
     <Route path="/mainpage" element={<MainPage />}>
          <Route  index element={<Home/>}/>
          <Route path="home" element={<Home />} />
          <Route path="mycrops" element={<MyCrops/>} />
          <Route path="orders" element={<Orders />} />
          <Route path="profile" element={<Profile />} />
          <Route path='addcrops' element={<AddCrops/>}></Route>
          <Route path='allbookings' element={<AllBookings/>}></Route>
       </Route> 
      <Route path="cart" element={<Cart/>}></Route>  
      <Route path='place' element={<PlaceOrder/>}></Route> 
   </Routes>
   </BrowserRouter>
  </>
);


reportWebVitals();
