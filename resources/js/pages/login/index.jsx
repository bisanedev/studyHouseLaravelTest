import React from 'react';
import { Link } from "react-router-dom";
import { Helmet } from 'react-helmet';

class PageLogin extends React.Component{

    constructor(props) {
        super(props); 
        this.state = {  

        }        
    }

    componentDidMount() {     

    }

    render() {
        return (
        <div>
            <Helmet>
                <title>Halaman Login</title>
                <meta name="description" content="Halaman Login" />
            </Helmet>
            <section>
                <h1>Halaman Login</h1>
                <Link to="/">Go to Main Page</Link>
            </section>
        </div>
        )
    }
 /* ------- script -------*/

 /* ------- end of script -------*/ 
}

export default PageLogin;