import React from 'react';
import Header from './Header.jsx';

class Home extends React.Component {

    render() {
        return (
            <div >
                <div>
                   <Header/>
                </div>
               <div className="body-image">
                    <img className="admin-image" src="./image/careers.jpg" />
                </div>
            </div>
        );
    }
}

export default Home;