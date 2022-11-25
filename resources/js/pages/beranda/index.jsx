import React from 'react';
import { Helmet } from 'react-helmet';
import Button from 'react-bootstrap/Button';
import { Link } from "react-router-dom";
import axios from 'axios';
import DeleteDialog from '../../components/dialog/delete';

function PageBeranda(props) {
  const timer = React.useRef(null);
  const [data, setData] = React.useState([]);
  const [showDelete, setShowDelete] = React.useState(false);
  const [pickData, setPickData] = React.useState([]);
  const navigate = props.navigate;

  React.useEffect(() => {    
    fetchData();
    /*--- unload timer ---*/
    return () => clearInterval(timer.current);
  }, []);


  /*--- Fetch Data timer agar sempat load token header bearer ---*/
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

  /*--- add Modal ---*/
  const addModal = () => {
    console.log("add")
  }

  /*--- Edit Modal ---*/
  const editModal = () => {
    console.log("edit")
  }

  /*--- Delete Modal ---*/
  const deleteModal = () => {
    console.log("delete")
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
        <Button variant="primary" onClick={() => addModal()}>Tambah Kategori</Button>
      </div>
    </div>
    <div className="row">
      {data.length > 0 && data.map((value,k) => (          
        <div key={k} className="col-xl-3 col-sm-6 col-12 mb-4">
          <div className="card">
            <div style={{position:"absolute",right:10,top:0}}>
              <button type="button" className="btn-close" aria-label="Close" onClick={() => {setShowDelete(true);setPickData(value)}}/>
            </div>
            <div style={{position:"absolute",left:10,bottom:10}}>
              <button type="button" className="btn btn-outline-primary btn-sm" onClick={() => editModal()}>edit</button>
            </div>
            <div className="card-body">
              <div className="d-flex justify-content-between p-3">               
                <div className="text-center col-12">
                  <h3>{value.nama}</h3>
                  <Link className="mb-0" style={{fontSize: 12}} to={"/catatan/kategori/"+value.id}>Lihat Catatan</Link>
                </div>
              </div>
            </div>
          </div>
        </div> 
      ))} 
    </div>
    <DeleteDialog show={showDelete} 
      title="Hapus" subtitle={"Yakin hapus Kategori "+pickData.nama+" ?"} 
      close={() => setShowDelete(false)} 
      onClick={() => console.log("hapus")}
    />
    </> 
  );
}

export default PageBeranda;