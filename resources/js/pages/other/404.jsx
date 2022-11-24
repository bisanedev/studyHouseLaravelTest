import React from 'react';
import { Link } from "react-router-dom";

function Page404() {     

    return (
      <section>
          <h1>404 not Found</h1>
          <Link to="/">Go to the home page</Link>
      </section>
    );    
}

export default Page404;