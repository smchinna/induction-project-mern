import React from 'react';
import { withRouter } from 'react-router';

class Header extends React.Component {
    constructor(props){
        super(props);
        this.state={
            login:false,
            signup:false
        }
    }

    componentWillMount(){
        if(this.props.login){
            this.setState({login:true})
        }
        if(this.props.signup){
        this.setState({signup:true})
        }
    }

    render (){
        const { history } = this.props;
        const { login, signup } = this.state;
        return (
            <div>
                <div className="header">
                    <div className="col-lg-1 col-md-1 col-sm-1 col-xs-1 admin">
                        <img className="admin-image" src="./image/tudip.png" 
                         onClick={()=>{history.push("/")}}
                         />
                    </div>
                    <div className="col-lg-9 col-md-9 col-sm-9 col-xs-9 office-text">
                        Office Administration
                    </div>
                    <div className="col-lg-2 col-md-2 col-sm-2 col-xs-2">
                        <div className="col-lg-6 col-md-6 col-sm-6 col-xs-6">
                        <button type="button" className="btn btn-default" 
                            onClick={()=>{history.push("/login")}} disabled={login}>
                            Login</button>
                        </div>
                        <div className="col-lg-6 col-md-6 col-sm-6 col-xs-6">
                        <button type="button" className="btn btn-default"
                         onClick={()=>{history.push("/signup")}} disabled={signup}>
                         Signup</button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default withRouter(Header);