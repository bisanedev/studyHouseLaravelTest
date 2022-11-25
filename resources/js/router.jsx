import React from 'react';
import {BrowserRouter,Routes,Route,Navigate} from "react-router-dom";
/* Component */
import PrivateRoute from './components/privateRouter';
/* Pages */
import HelloWorlds from './pages/helloWorld';
import TestPages from './pages/test';
import PageLogin from './pages/login';
import PageBeranda from './pages/beranda';
/* error pages */
import Page404 from './pages/other/404';

export default function RouterApp() {    
    return (
    <BrowserRouter>
        <Routes>
            <Route path="/" element={<PrivateRoute komponen={PageBeranda}/>}/>
            <Route path="/test" element={<TestPages />}/>
            <Route path="/login" element={<PageLogin />}/>
            {/* 404 page */}             
            <Route path="*" element={<Page404 />}/>      
        </Routes>
    </BrowserRouter> 
    );
}
