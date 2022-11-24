import React from 'react';
import { Link } from "react-router-dom";
import { Helmet } from 'react-helmet';

function TestPages() {         

    return (
      <div>
        <Helmet>
          <title>Halaman Test</title>
          <meta name="description" content="Halaman Test" />
        </Helmet>
        <div className="card" style={{width: '18rem'}}>
            <div className="card-body">
                <h5 className="card-title">Test Page</h5>
            <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>                
            <Link to="/">Go to the home page</Link>
            </div>
        </div>
    </div>
    );    
}

export default TestPages;