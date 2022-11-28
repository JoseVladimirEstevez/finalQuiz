import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import Play from './Play';
import Leaderboard from './Leaderboard';
import Result from './Result';
import SelectCategory from './SelectCategory';
import { BrowserRouter, Routes, Route } from "react-router-dom";


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
    <Routes>
      
        <Route index element={<App />}></Route>
        <Route path='/selectCategory' element={<SelectCategory />}></Route>
        <Route path='/play' element={<Play /> }> </Route>
        <Route path='/result' element={ <Result />}></Route>
        <Route path='/leaderboard' element={<Leaderboard />}></Route>
      
    </Routes>
    </BrowserRouter>


{/*<Routes>
      <Route path='/' element={<Navbar/>}>
        <Route index element={<App />}></Route>
        <Route path='/instructions' element={<Instructions />}></Route>
        <Route path='/task1' element={<RequestMaker />}></Route>
        <Route path='/task2' element={ <Basket />}></Route>
        <Route path='/task3' element={<ColorPicker />}></Route>
      </Route>
    </Routes>
*/} 
  </React.StrictMode>
);
