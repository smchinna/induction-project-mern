import React from 'react';
import axios from 'axios';
import { Url } from './js/Api.js';
import Header from './Header.jsx';

class SignUp extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            name: '',
            email: '',
            phone_no: '',
            password: ''
        }
    }    

    changeData = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    validatePhone = (input) => {
        let phoneno = /^\d{10}$/; 
        if(phoneno.test(input)){
            if(input==="0000000000"){
                return false;
            }
            else{
                return true;
            }
        }
        else{
            return false;
        }
    }

    
    submit = (e) => {
        let data = this.state;
        if (data.name == '' && data.password == '' && data.email == '' && data.phone_no == '') {
            alert('please fill the details');
        }
        else if (data.name == '') {
            alert("please fill username");
        }
        else if (data.email == '') {
            alert("please fill email");
        }
        else if (data.phone_no == '') {
            alert("please fill phone-no");
        }
        else if (data.password == '') {
            alert("please fill password");
        }
        else{
            if(this.validateEmail(data.email)){
                if(this.validatePhone(data.phone_no)){
                    let authOptions = {
                        method: 'post',
                        url: Url + 'signup',
                        data: data,
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        json: true
                    };
                    axios(authOptions)
                        .then((response) => {
                            alert(response.data.message);
                            if(response.data.status==200){
                                this.props.history.push("/login");
                            }
                            else{
                                console.log(response.data.status)
                            }
                        })
                        .catch(function (error) {
                            alert(error);
                        });
                }
                else{
                    alert("invalid phone no")
                }
            }
            else{
                alert("invalid email id")
            }
        }
    }

    validateEmail = (mail) => { 
        if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(mail)){  
                    return true;  
            } 
            else{
                return;
            }  
    }  

    render = () => {
        return (
            <div className="home">
                <div>
                    <Header signup="true"/>
                </div>
                <div className="col-lg-6 col-md-6 col-sm-6 col-xs-8 col-lg-offset-3 col-md-offset-3 col-sm-offset-3 col-xs-offset-2">
                <form>
                    <div className="form-group pt">
                        <h2 className="text-center">Signup Form </h2>
                        <label className="pt">Username <span>*</span></label>
                        <input type="text" name="name" className="form-control pt" onChange={this.changeData} placeholder="Pick a name"/>
                        <label className="pt">Email <span>*</span></label>
                        <input type="email" name="email" className="form-control pt" onChange={this.changeData} placeholder="you@example.com" />
                        <label className="pt">Phone-No <span>*</span></label>
                        <input type="phone" name="phone_no" className="form-control pt" onChange={this.changeData} placeholder="10 digit numbers only"/>
                        <label className="pt">Password <span>*</span></label>
                        <input type="password" name="password" className="form-control pt" onChange={this.changeData} placeholder="password"/>
                        <div className="pt text-center">
                            <button type="button" className="btn btn-primary pt align-button" onClick={this.submit}>Submit</button>
                        </div>
                    </div>
                </form>
                </div>
            </div>
        );
    }
}

export default SignUp;