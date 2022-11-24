import React from 'react';
import {BrowserRouter,Routes,Route,Navigate} from "react-router-dom";
/* Component */
//import PrivateRoute from './components/privateRouter';
/* Pages */
import HelloWorlds from './pages/helloWorld';
import TestPages from './pages/test';
//import PageLogin from './pages/login';
//import PageAdmin from './pages/admin';
/* error pages */
import Page404 from './pages/other/404';

export default function RouterApp() {    
    return (
    <BrowserRouter>
        <Routes>
            <Route path="/" element={<HelloWorlds />}/>
            <Route path="/test" element={<TestPages />}/>
            {/* 404 page */}             
            <Route path="*" element={<Page404 />}/>      
        </Routes>
    </BrowserRouter> 
    );
}

function CheckAuth() {
    const authData = window.localStorage.getItem('userToken');
    return authData ? <Navigate to="/admin/dashboard" /> : <Navigate to="/admin/login" />;
};