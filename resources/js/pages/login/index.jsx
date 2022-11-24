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
            <div className="content">
            <div className="container">
            <div className="row">
                <div className="col-md-6">
                    <img src="images/undraw_remotely_2j6y.svg" alt="Image" className="img-fluid"/>
                </div>
                <div className="col-md-6 contents">
                <div className="row justify-content-center">
                    <div className="col-md-8">
                    <div className="mb-4">
                    <h3>Sign In</h3>
                    <p className="mb-4">Aplikasi Catat Mencatat</p>
                    </div>
                    <form action="#" method="post">
                    <div className="form-group first">
                        <label for="email">Email</label>
                        <input type="email" className="form-control" id="username"/>

                    </div>
                    <div className="form-group last mb-4">
                        <label for="password">Password</label>
                        <input type="password" className="form-control" id="password"/>                        
                    </div>                    
                    <input type="submit" value="Log In" className="btn btn-block btn-primary"/>
                    </form>
                    </div>
                </div>                
                </div>                
            </div>
            </div>
            </div>
        )
    }
 /* ------- script -------*/

 /* ------- end of script -------*/ 
}

export default PageLogin;