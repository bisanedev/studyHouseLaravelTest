import React from 'react';
import { Link } from "react-router-dom";
import { Helmet } from 'react-helmet';

function HelloWorlds() {         

    return (
      <div>
        <Helmet>
            <title>Halaman Utaman</title>
            <meta name="description" content="Halaman Utaman" />
        </Helmet>
        <section>
          <h1>Halaman Utaman</h1>
          <ul>
            <li><Link to="/test">Go to the test page</Link></li>
            <li><Link to="/admin">Go to the Admin page</Link></li>        
          </ul>
        </section>
      </div>
    );    
}

export default HelloWorlds;