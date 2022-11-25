import React from 'react';
import { Helmet } from 'react-helmet';
import Button from 'react-bootstrap/Button';
import { Link } from "react-router-dom";
import axios from 'axios';
import DeleteDialog from '../../components/dialog/delete';
import {AddModal,EditModal} from '../../components/modal';
import { toast } from 'react-toastify';

const FIELD_NAMES = {
  NAMA: 'nama'  
}

function PageCatat(props) {
  const timer = React.useRef(null);
  /*--- all data ---*/
  const [data, setData] = React.useState([]);
  const [formValues, changeFormValues] = React.useState({
    [FIELD_NAMES.NAMA]: ''
  })
  /*--- modal state ---*/
  const [showCreate, setShowCreate] = React.useState(false);
  const [showEdit, setShowEdit] = React.useState(false);  
  const [showDelete, setShowDelete] = React.useState(false);  
  /*--- single pick data ---*/
  const [pickData, setPickData] = React.useState([]);
  /*--- props navigate ---*/
  const navigate = props.navigate;
  const kategoriID = props.params.kategoriID;
  /*--- componentdidmount ---*/
  React.useEffect(() => { 

    timer.current = setTimeout(() => { 
      fetchData(kategoriID);
    }, 300); 
    
     /*--- componentWillUnmount ---*/
    return () => clearInterval(timer.current);
  }, []);

  const handleInputChange = fieldName => e => {
    const fieldValue = e.target.value
    changeFormValues(prevState => ({
      ...prevState,
      [fieldName]: fieldValue
    }))
  }

  const handleInputChangeEdit = (e) => {
    const fieldName = e.target.name;
    const fieldValue = e.target.value;    
    setPickData(prevState => ({
      ...prevState,
      [fieldName]: fieldValue
    }))
  }  

  /*--- Fetch Data timer agar sempat load token header bearer ---*/
  const fetchData = (id) => {    
    axios.get(
      window.location.origin + "/api/catatan/kategori/"+id+"?nocache="+Date.now()
    ).then(response => {  
      setData(response.data.message);
    }).catch(error => {
        console.log(error.response.status);
        if(error.response.status == 401){                             
          logout();
        }
    });    
  }

  /*--- Create Request ---*/
  const CreateRequest = () => {
    var formData = new FormData();      
    formData.append('nama', formValues[FIELD_NAMES.NAMA]); 
    axios({
      method: 'post',
      url: '/api/kategori',
      data: formData
    }).then(response => {                       
      toast.success(response.data.message);
      setShowCreate(false);
      changeFormValues({[FIELD_NAMES.NAMA]: ''})
      fetchData();
    }).catch(error => {
      if(error.response.status == 401){                             
        logout();
      }      
    });
  }

  /*--- Edit Request ---*/
  const EditRequest = () => {
    var formData = new FormData();
    formData.append('id', pickData.id);     
    formData.append('nama', pickData.nama); 
    axios({
      method: 'patch',
      url: '/api/kategori',
      data: formData
    }).then(response => {                       
      toast.success(response.data.message);
      setShowEdit(false);
      fetchData();
    }).catch(error => {
      if(error.response.status == 401){                             
        logout();
      }      
    });
  }

  /*--- Delete Request ---*/
  const deleteRequest = () => {
    var formData = new FormData();
    formData.append('id', pickData.id);     
    axios({
      method: 'delete',
      url: '/api/kategori',
      data: formData
    }).then(response => {                       
      toast.success(response.data.message);
      setShowDelete(false);
      fetchData();
    }).catch(error => {
      if(error.response.status == 401){                             
        logout();
      }      
    });
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
      <title>Catatan</title>
    </Helmet>
    <div className="row justify-content-between mt-4 mb-3">
      <div className="col-4" style={{display:"flex"}}>
        <Link to="/" className="btn btn-secondary btn-sm" style={{height: 32}}>Back</Link>
        <h2 className="text-uppercase" style={{marginLeft:5}}>Catatan</h2>
      </div>
      <div className="col-4 text-end">
        <Button variant="primary" onClick={() => setShowCreate(true)}>Tambah Catatan</Button>
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
              <button type="button" className="btn btn-outline-primary btn-sm" onClick={() => {setShowEdit(true);setPickData(value)}}>edit</button>
            </div>
            <div className="card-body">
              <div className="d-flex justify-content-between p-3">               
                <div className="text-center col-12">
                  <h3>{value.title}</h3>
                  <p>{value.text}</p>
                </div>
              </div>
            </div>
          </div>
        </div> 
      ))} 
    </div>
    <AddModal show={showCreate}
          height="200px"
          width="400px" 
          title="Menambahkan Catatan" 
          close={() => setShowCreate(false)}        
          onClick={() => CreateRequest()}
    >

    <div className="form-floating mb-2 p-2">
      <input type="text" className="form-control" placeholder="Judul" name={FIELD_NAMES.NAMA} value={formValues[FIELD_NAMES.NAMA]} onChange={handleInputChange(FIELD_NAMES.NAMA)} />
      <label>Judul</label>
    </div>

    </AddModal>
    <EditModal show={showEdit}
          height="200px"
          width="400px" 
          title="Edit Catatan" 
          close={() => setShowEdit(false)}        
          onClick={() => EditRequest()}
    >

    <div className="form-floating mb-2 p-2">
      <input type="text" value={pickData.nama} className="form-control" placeholder="Judul" name="nama" onChange={e => handleInputChangeEdit(e)} />
      <label>Judul</label>
    </div>

    </EditModal>
    <DeleteDialog show={showDelete} 
      title="Hapus" subtitle={"Yakin hapus Catatan "+pickData.nama+" ?"} 
      close={() => setShowDelete(false)} 
      onClick={() => deleteRequest()}
    />
    </> 
  );
}

export default PageCatat;