import React , {useState,useEffect} from 'react';
import {Navigate,useParams,useNavigate  } from "react-router-dom";
import axios from 'axios';

function PrivateRoute(props) {    
    const authData = window.localStorage.getItem('userToken');         
    const params = useParams();   
    const navigate = useNavigate();
  
    useEffect(() => {
      axios.defaults.headers.common['Authorization'] = 'Bearer ' + authData;
    },[]);
  
    return authData ? (
      <div className="wrapper">                
        <div id="main" className="main"> 
          <props.komponen authData={authData} params={params} navigate={navigate} />
        </div>        
      </div>          
    ):(
      <Navigate to="/admin/login" />
    )  
}

export default PrivateRoute;