import React from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { Tabs, Tab } from 'material-ui/Tabs';
import axios from 'axios';
import UserOpenedTicket from './User/UserOpenedTicket.jsx';
import UserClosedTicket from './User/UserClosedTicket.jsx';
import Logout from './Logout.jsx';
import {Url} from './js/Api.js';

class ShowTicket extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            opentickets:[],
            closedtickets:[]
        }
    }

    componentWillMount(){
        let data={};
        data.token=localStorage.getItem("User");
        if(data.token){
            let authOptions = {
                method: 'post',
                url: Url+'showticket',
                data:data,
                headers: {
                    'Content-Type': 'application/json'
                },
                json: true
              };
            axios(authOptions)
            .then((response)=>{
                let stateCopy = this.state;
                if(response.data.length<=0){
                    alert("there is no ticket please click add button to create tickets");
                }
                for(let i=0;i<response.data.length;i++){
                    if(response.data[i].status==='false'){
                        stateCopy.opentickets.push(response.data[i])
                    } else {
                        stateCopy.closedtickets.push(response.data[i])
                    }
                    
                }
                this.setState(stateCopy)
            })
        }
        else{
            this.props.history.push("/login")
        }
        
    }

    
    render = () => {
 
        const { opentickets, closedtickets } = this.state;
        const style={fontSize:'20px'}
        
        return (
            <div>
                <Logout name="User"/>
                <MuiThemeProvider>
                    <Tabs >
                        <Tab label="opened ticket" style={style}>
                            <UserOpenedTicket data={opentickets}/>
                        </Tab>
                        <Tab label="closed ticket" style={style}>
                            <UserClosedTicket data={closedtickets}/>
                        </Tab>
                    </Tabs>
                </MuiThemeProvider>
            </div >
        );
    }
}


export default ShowTicket; 