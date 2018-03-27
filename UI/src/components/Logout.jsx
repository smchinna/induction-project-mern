import React from 'react';
import { withRouter } from 'react-router';

class Logout extends React.Component {

    logout = () => {
        localStorage.removeItem(this.props.name);
        this.props.history.push("/login")
    }

    render = () => {
        const { history } = this.props;

        return (
            <div>
                <div className="header">
                    <div className="col-lg-1 col-md-1 col-sm-1 col-xs-1 admin">
                        <img className="admin-image" src="./image/admin.png" 
                         onClick={()=>{history.push("/")}}
                         />
                    </div>
                    <div className="col-lg-10 col-md-10 col-sm-10 col-xs-10 office-text">
                        Office Administration
                    </div>
                    <div className="col-lg-1 col-md-1 col-sm-1 col-xs-1">
                        <div className="col-lg-6 col-md-6 col-sm-6 col-xs-6">
                            <button type="button" className="btn btn-default"
                            onClick={this.logout}>
                            Logout</button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default withRouter(Logout);