import React from 'react';
import axios from 'axios';
import { Url } from './js/Api.js';
import Header from './Header.jsx';

class LogIn extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      password: '',
      showModel:false
    };
  }

  componentWillMount(){
    if (localStorage.getItem("Admin")) {
      this.props.history.push("/adminshowticket");
    }
    else if (localStorage.getItem("User")) {
      this.props.history.push("/showticket");
    }
  }

  handleclick = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  submit = () => {
    var data = this.state;
    this.setState({showModel:true})
    if (data.name == '' && data.password=='') {
      alert("plaese fill the form");
    }
    else if(data.name == ''){
      alert("plaese enter username");
    }
    else if (data.password == '') {
      alert("please enter password");
    }
    else {
      var authOptions = {
        method: 'post',
        url: Url + 'signin',
        data: data,
        headers: {
          'Content-Type': 'application/json'
        },
        json: true
      };
      axios(authOptions)
        .then((response) => {
          if (response.data.status == 200) {
            if ("Admin" === response.data.name) {
              localStorage.setItem("Admin", response.data.token);
              this.props.history.push("/adminshowticket");
            }
            else {
              localStorage.setItem("User", response.data.token);
              this.props.history.push("/showticket");
            }
          }
          else {
            alert(response.data.message);
          }
        })
        .catch((error) => {
          alert(error);
        });
    }
  }
  
  signup = () => {
    this.props.history.push("/signup");
  }

  render = () => {
    return (
      <div className="home">
        <div>
          <Header login="true"/>
        </div>
        <div className="col-lg-6 col-md-6 col-sm-6 col-xs-8 col-lg-offset-3 col-md-offset-3 col-sm-offset-3 col-xs-offset-2">
          <form>
          <div className="form-group pt">
            <h2 className="text-center">Login Form</h2>
            <label className="pt">Username <span>*</span></label>
            <input type="text" name="name" className="form-control pt" onChange={this.handleclick} />
            <label className="pt">Password <span>*</span></label>
            <input type="password" name="password" className="form-control pt" onChange={this.handleclick} />
            <div className="pt text-center">
              <button className="btn btn-primary pt align-button" onClick={this.submit}>LogIn</button>
            </div>
          </div>
          </form>
        </div>
      </div>
    );
  }
}


export default LogIn;