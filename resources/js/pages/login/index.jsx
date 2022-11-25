import React from 'react';
import { Helmet } from 'react-helmet';
import axios from 'axios';
import {Navigate,useNavigate} from "react-router-dom";
import { ToastContainer ,toast } from 'react-toastify';

const FIELD_NAMES = {
    EMAIL: 'email',
    PASSWORD: 'password'
}

function PageLogin(props) {
  const [hasLogin, setHasLogin] = React.useState(false);
  const [formValues, changeFormValues] = React.useState({
    [FIELD_NAMES.EMAIL]: '',
    [FIELD_NAMES.PASSWORD]: ''
  })
  const navigate = useNavigate();

  const handleInputChange = fieldName => e => {
    const fieldValue = e.target.value
    changeFormValues(prevState => ({
      ...prevState,
      [fieldName]: fieldValue
    }))
  }

  React.useEffect(() => {
    const data = window.localStorage.getItem('userToken');
    if (data){
      setHasLogin(true);
    }
  }, []);

  const SubmitLogin = () => {
    var formData = new FormData();
    formData.append('email', formValues[FIELD_NAMES.EMAIL]);
    formData.append('password', formValues[FIELD_NAMES.PASSWORD]);    
    axios({
      method: 'post',
      url: '/api/login',
      data: formData
    }).then(response => {                 
      //console.log(response.data);
      window.localStorage.setItem("userData", JSON.stringify(response.data.user));          
      window.localStorage.setItem("userToken", response.data.authorisation.token); 
      navigate("/");
    }).catch(error => {
      if(error.response.data.message.email){   
        toast.error(error.response.data.message.email.toString());        
      }
      else if(error.response.data.message.password){   
        toast.error(error.response.data.message.password.toString());
      }
      else{
        toast.error(error.response.data.message);
      }
      //console.log(error.response.data.message); 
    });    
  }

  //redirect if user is login already
  if(hasLogin){return <Navigate to={"/"} />;}

  return (   
    <section className="text-center" style={{paddingTop:40,paddingBottom:40,marginTop:80}}>
    <Helmet>
          <title>Login</title>
    </Helmet>
    <main className="form-signin w-100 m-auto">
        <img className="mb-4" src="https://getbootstrap.com/docs/5.2/assets/brand/bootstrap-logo.svg" alt="" width="72" height="57"/>
        <h1 className="h3 mb-3 fw-normal">Please sign in</h1>

        <div className="form-floating">
        <input type="email" className="form-control" name={FIELD_NAMES.EMAIL} value={formValues[FIELD_NAMES.EMAIL]} onChange={handleInputChange(FIELD_NAMES.EMAIL)} placeholder="name@example.com"/>
        <label for="floatingInput">Email address</label>
        </div>
        <div className="form-floating">
        <input type="password" className="form-control" name={FIELD_NAMES.PASSWORD} value={formValues[FIELD_NAMES.PASSWORD]}  onChange={handleInputChange(FIELD_NAMES.PASSWORD)} placeholder="Password"/>
        <label for="floatingPassword">Password</label>
        </div>
        <button className="w-100 btn btn-lg btn-primary" type="submit" onClick={() => SubmitLogin()}>Sign in</button>
        <p className="mt-5 mb-3 text-muted">© 2017–2022</p>
    </main>
    <ToastContainer hideProgressBar={true} autoClose={2000}/>
    </section>
  );
}

export default PageLogin;