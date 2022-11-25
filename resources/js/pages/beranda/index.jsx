import React from 'react';
import { Helmet } from 'react-helmet';
import Button from 'react-bootstrap/Button';
import { Link } from "react-router-dom";
import axios from 'axios';

function PageBeranda(props) {
  const timer = React.useRef(null);
  const [data, setData] = React.useState([]);
  const navigate = props.navigate;

  React.useEffect(() => {    
    fetchData();
    return () => clearInterval(timer.current);
  }, []);

  const fetchData = () => {
   timer.current = setTimeout(() => {
      axios.get(
        window.location.origin + "/api/kategori?nocache="+Date.now()
      ).then(response => {  
        setData(response.data.message);
      }).catch(error => {
        console.log(error.response.status);
        if(error.response.status == 401){                             
          logout();
        }
      });
    }, 300);
  }

  /*--- Logout ---*/
  const logout = () => {   
      window.localStorage.clear();
      delete axios.defaults.headers.common['Authorization'];     
      navigate("/login", { replace: true });
  }

  return (    
    <>
    <Helmet>
      <title>Kategori</title>
    </Helmet>
    <div className="row justify-content-between mt-4 mb-3">
      <div className="col-4 ">
        <h2 className="text-uppercase">Kategori</h2>
      </div>
      <div className="col-4 text-end">
        <Button variant="primary">Tambah Kategori</Button>
      </div>
    </div>
    <div className="row">
      {data.length > 0 && data.map((value,k) => (          
        <div key={k} className="col-xl-3 col-sm-6 col-12 mb-4">
          <div className="card">
            <div className="card-body">
              <div className="d-flex justify-content-between p-3">
                <div className="align-self-center">
                  <i className="fas fa-pencil-alt text-info fa-3x"></i>
                </div>
                <div className="text-center col-12">
                  <h3>{value.nama}</h3>
                  <Link className="mb-0" to={"/catatan/kategori/"+value.id}>Lihat Catatan</Link>
                </div>
              </div>
            </div>
          </div>
        </div> 
      ))} 
    </div>
    </> 
  );
}

export default PageBeranda;