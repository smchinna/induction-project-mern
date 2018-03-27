import React from 'react';
import ReactDOM from 'react-dom';
import SignUp from './components/SignUp.jsx';
import { BrowserRouter, Route } from 'react-router-dom';
import LogIn from './components/LogIn.jsx';
import UserShowTicket from './components/UserShowTicket.jsx';
import AdminShowTicket from './components/AdminShowTicket.jsx';
import Home from './components/Home.jsx';

ReactDOM.render(
<BrowserRouter >
    <div>
        <Route  exact path="/" component={Home} />
        <Route  path="/showticket" component={UserShowTicket} />
        <Route  path="/adminshowticket" component={AdminShowTicket} />
        <Route  path="/login" component={LogIn} />
        <Route  path="/signup" component={SignUp}/>
    </div>                   
</BrowserRouter>, document.getElementById('app'));