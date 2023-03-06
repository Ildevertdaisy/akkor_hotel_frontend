
import React from "react";
import ReactDOM  from "react-dom/client";

import {
  BrowserRouter, 
  Routes, 
  Route
} from "react-router-dom";

import './index.css';
import App from './App';

import Hotel from './pages/Hotel';
import User from './pages/User';
import Login from './pages/Login';
import Register from './pages/Register';

import {AuthProvider} from './context/AuthProvider';

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
    <React.StrictMode>
      <AuthProvider>
        <BrowserRouter>
             <Routes>
                <Route path="/" element={<App/>}/>
                <Route path="hotel/:id" element={<Hotel/>}/>
                <Route path="user/:id" element={<User/>}/>
                <Route path="login" element={<Login/>}/>
                <Route path="register" element={<Register/>}/>
                <Route path="*" element={
                <main id="section-404">
                        <img src={"image-404.jpg"}/>
                        <button>Go back</button>
                </main>
              }/>
             </Routes>
        </BrowserRouter>
      </AuthProvider>
    </React.StrictMode>
);