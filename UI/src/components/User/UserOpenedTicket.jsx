import React from 'react';
import { GridList, GridTile } from 'material-ui/GridList';
import RaisedButton from 'material-ui/RaisedButton';
import Dialog from 'material-ui/Dialog';
import axios from 'axios';
import ReactFileReader from 'react-file-reader';
import UserOpenedTicketDetail from './UserOpenedTicketDetail.jsx';
import { Url } from '../js/Api.js';
import { Image } from '../js/Image.js';

class UserOpenedTicket extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            addModel: false,
            setImage: '',
            header: '',
            description: '',
            data: this.props.data,
            start: 0,
            pageData: [],
            prev: true,
            next: true,
            message: ''
        }
    }
    
    changeState = (key, value) => (e) =>{
        this.setState({ [key]: value })
    }

    convertImage = (files) =>  {
        this.setState({ setImage: files.base64 })
    }

    changeData = (e) => {
        this.setState({ [e.target.name]: e.target.value });
    }

    upload = () => {
        var data = {};
        if (this.state.setImage == '') {
            data.image = Image;
        }
        else {
            data.image = this.state.setImage;
        }
        data.header = this.state.header;
        data.token = localStorage.getItem("User");
        data.description = this.state.description;
        data.status = "false";
        if (data.header == '') {
            alert("please fill header");
        }
        else if (data.description == '') {
            alert("please fill description");
        }
        else {
            var authOptions = {
                method: 'post',
                url: Url + 'upload',
                data: data,
                headers: {
                    'Content-Type': 'application/json'
                },
                json: true
            };
            axios(authOptions)
                .then((response) => {
                    if (response.status === 200) {
                        alert(response.data);
                        window.location.reload();
                    }
                    else {
                        alert(response.status)
                    }
                })
                .catch((error) => {
                    alert(error)
                })
        }
    }

    componentWillReceiveProps() {
        let arr = [];
        if (this.props.data.length <= 0) {
            this.setState({ message: "There is no ticket!!!" })
        }
        let number = this.props.data.length - 1;
        if (number - 8 > 0) {
            for (let j = number; j > number - 8; j--) {
                arr.push(this.props.data[j])
            }
            this.setState({ next: false });
        }
        else {
            for (let j = number; j >= 0; j--) {
                arr.push(this.props.data[j]);
            }
            this.setState({ next: true });
        }
        this.setState({ 
            pageData: arr, 
            start: number - 8 
        });
    }

    homePageData = () => {
        let arr = [];
        this.setState({ prev: true });
        let number = this.props.data.length - 1;
        if (number - 8 > 0) {
            for (let j = number; j > number - 8; j--) {
                arr.push(this.props.data[j])
            }
            this.setState({ next: false });
        }
        else {
            for (let j = number; j >= 0; j--) {
                arr.push(this.props.data[j])
            }
            this.setState({ next: true });
        }
        this.setState({ 
            pageData: arr, 
            start: number - 8 
        });
    }

    prevPageData = () => {
        let arr = [];
        if (this.state.start + 8 < this.state.data.length - 1) {
            for (let j = this.state.start + 8; j > this.state.start; j--) {
                arr.push(this.props.data[j])
            }
            this.setState({ 
                start: this.state.start + 8,
                next: false,
                pageData: arr
            })
        }
        else {
            for (let j = this.state.data.length - 1; j > this.state.start; j--) {
                arr.push(this.props.data[j])
            }
            this.setState({ 
                start: this.state.data.length - 1,
                next: false, 
                prev: true,
                pageData: arr
            })
        }
    }

    nextPageData = () => {
        let arr = [];
        if (this.state.start - 8 >= 0) {
            for (let j = this.state.start; j > this.state.start - 8; j--) {
                arr.push(this.props.data[j])
            }
            this.setState({ 
                start: this.state.start - 8, 
                prev: false,
                pageData: arr
            });
        }
        else {
            for (let j = this.state.start; j >= 0; j--) {
                arr.push(this.props.data[j])
            }
            this.setState({ 
                start: this.state.start, 
                next: true,
                prev: false,
                pageData: arr })
        }
    }

    render() {
        const { addModel, setImage, message, prev, next, pageData } = this.state;
        const showTicket = pageData.map((element, i) => {
            return (
                <div key={i}>
                    <UserOpenedTicketDetail data={element} index={i} />
                </div>
            );
        })
        const closeImg = { cursor: 'pointer', float: 'right', marginTop: '5px', width: '30px' };

        return (
            <div>
                <div className="row paginate-margin">
                    <div className="col-lg-4 col-md-4 col-sm-4 col-xs-4 col-lg-offset-4 col-md-offset-4 col-sm-offset-4 col-xs-offset-4">
                        <div className="col-lg-4 col-md-4 col-sm-4 col-xs-4">
                            <RaisedButton label="prev" disabled={prev} secondary={true} onClick={this.prevPageData} />
                        </div>
                        <div className="col-lg-4 col-md-4 col-sm-4 col-xs-4">
                            <RaisedButton label="home" secondary={true} onClick={this.homePageData} />
                        </div>
                        <div className="col-lg-4 col-md-4 col-sm-4 col-xs-4">
                            <RaisedButton label="next" disabled={next} secondary={true} onClick={this.nextPageData} />
                        </div>
                    </div>
                </div>

                <div className="row">
                    {showTicket}
                </div>
                <div className="row text-center paginate-margin">
                    <h3><span>{message}</span></h3>
                </div>

                <div className="row margin">
                    <div className="col-lg-4 col-md-4 col-sm-4 col-xs-4 col-lg-offset-4 col-md-offset-4 col-sm-offset-4 col-xs-offset-4">
                        <div className="col-lg-4 col-md-4 col-sm-4 col-xs-4 col-lg-offset-4 col-md-offset-4 col-sm-offset-4 col-xs-offset-4">
                            <RaisedButton
                                label="Add"
                                secondary={true} onClick={this.changeState('addModel',true)} />
                        </div>
                    </div>
                </div>
                <Dialog
                    title={
                        <div>
                            Ticket Creation
                            <img src='https://d30y9cdsu7xlg0.cloudfront.net/png/53504-200.png' style={closeImg} onClick={this.changeState('addModel',false)} />
                        </div>
                    }
                    modal={false}
                    open={addModel}
                    onRequestClose={this.changeState('addModel',false)}
                >
                    <GridList cols={2}>
                        <GridTile>
                            <div className="read-file">
                                <ReactFileReader handleFiles={this.convertImage} base64={true}>
                                    <button className='btn'>Upload Image</button>
                                </ReactFileReader>
                            </div>
                            <div className="image">
                                <img className="card-img-top" src={setImage} alt="no selection" />
                            </div>
                        </GridTile>
                        <GridTile>
                            <h4>Header <span>*</span></h4>
                            <textarea name="header" onChange={this.changeData}  />
                        </GridTile>
                    </GridList>
                    <GridList cols={1}>
                        <GridTile >
                            <h4>Description <span>*</span></h4>
                            <textarea name="description" onChange={this.changeData} />
                        </GridTile>
                    </GridList>
                    <GridTile >
                        <div className="text-center pt">
                            <RaisedButton label="upload" primary={true} onClick={this.upload} />
                        </div>
                    </GridTile >
                </Dialog>
            </div>
        );
    }
}

export default UserOpenedTicket;
