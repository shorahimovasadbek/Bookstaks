import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import 'bootstrap/dist/css/bootstrap.min.css'
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Login from './components/Login/Login';
import HomeBook from './components/HomeBooks/HomeBook';
import ViewMore from './components/Viewmore/ViewMore';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path='/' element = { <App /> }/>
        <Route path='/login' element = { <Login/>} />
        <Route path='/home' element = {<HomeBook/>}/>
        <Route path='/viewmore' element = {<ViewMore/>}/>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);


