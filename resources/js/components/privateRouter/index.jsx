import React , {useState,useEffect} from 'react';
import {Navigate,useParams,useNavigate  } from "react-router-dom";
import axios from 'axios';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';

function PrivateRoute(props) {    
    const authToken = window.localStorage.getItem('userToken');  
    const authData = JSON.parse(window.localStorage.getItem('userData')); 
    //const [hasLogin, setHasLogin] = useState(false);      
    const params = useParams();   
    const navigate = useNavigate();
  
    useEffect(() => {
      axios.defaults.headers.common['Authorization'] = 'Bearer ' + authToken;
    },[]);
  
    const logOut = () => {
      window.localStorage.removeItem('userToken');
      delete axios.defaults.headers.common['Authorization'];    
      navigate('/login');
    }

    return authToken ? (
    <>
    <Navbar bg="light" expand="lg">
      <Container>
        <Navbar.Brand href="https://getbootstrap.com/docs/5.2">
          <img src="https://getbootstrap.com/docs/5.2/assets/brand/bootstrap-logo.svg" alt="Logo" style={{width:30,height:24}} className="d-inline-block align-text-top"/>
          <span style={{marginLeft:10,fontSize:23}}>Bootstrap v5.2</span>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav" className="justify-content-end">
          <Nav>            
            <NavDropdown title={authData.nama} id="basic-nav-dropdown">
              <NavDropdown.Item>{authData.email}</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item onClick={() => logOut()}>
                Logout
              </NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar> 
    <Container>
      <props.komponen authToken={authToken} authData={authData} params={params} navigate={navigate} />
    </Container>
    </>          
    ):(
      <Navigate to="/login" />
    )  
}

export default PrivateRoute;