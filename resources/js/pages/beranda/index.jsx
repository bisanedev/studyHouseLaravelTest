import React from 'react';
import { Helmet } from 'react-helmet';

function PageBeranda(props) {  
  

  React.useEffect(() => {
    // const data = window.localStorage.getItem('userData');
    // if (data){
    //   setHasLogin(true);
    // }
  }, []);

  return (    
    <>
      <Helmet>
          <title>Beranda</title>
      </Helmet>
      <h1>Heloo ,{props.authData.nama}</h1>
    </> 
  );
}

export default PageBeranda;