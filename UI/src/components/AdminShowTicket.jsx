import React from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { Tabs, Tab } from 'material-ui/Tabs';
import axios from 'axios';
import AdminOpenedTicket from './Admin/AdminOpenedTicket.jsx';
import AdminClosedTicket from './Admin/AdminClosedTicket.jsx';
import Header from './Header.jsx';
import Logout from './Logout.jsx';
import {Url} from './js/Api.js';

class AdminShowTicket extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            opentickets: [],
            closedtickets: []
        }
    }

    componentWillMount(){
        var data = {};
        data.token = localStorage.getItem("Admin");
        if (data.token) {
            var authOptions = {
                method: 'post',
                url: Url+'showticket',
                data: data,
                headers: {
                    'Content-Type': 'application/json'
                },
                json: true
            };
            axios(authOptions)
                .then((response) => {
                    let stateCopy = this.state;
                    for (let i = 0; i < response.data.length; i++) {
                        if (response.data[i].status === 'false') {
                            stateCopy.opentickets.push(response.data[i])
                        } else {
                            stateCopy.closedtickets.push(response.data[i])
                        }

                    }
                    this.setState(stateCopy)
                })
        }
        else {
            this.props.history.push("/login")
        }

    }


    render = () => {
        const { opentickets, closedtickets } = this.state;
        const style={fontSize:'20px'}

        return (
            <div>
                <Logout name="Admin"/>
                <MuiThemeProvider>
                        <div className="margin-top">
                            <Tabs>
                                <Tab label="opened ticket" style={style}>
                                    <AdminOpenedTicket data={opentickets} />
                                </Tab>
                                <Tab label="closed ticket" style={style}>
                                    <AdminClosedTicket data={closedtickets} />
                                </Tab>
                            </Tabs>
                        </div>
                </MuiThemeProvider>
            </div >
        );
    }
}


export default AdminShowTicket; 