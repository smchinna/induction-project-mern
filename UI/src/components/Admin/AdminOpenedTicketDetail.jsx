import React from 'react';
import { GridList, GridTile } from 'material-ui/GridList';
import RaisedButton from 'material-ui/RaisedButton';
import Dialog from 'material-ui/Dialog';
import axios from 'axios';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import {Url} from '../js/Api.js';

class AdminOpenedTicketDetail extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      header: '',
      image: '',
      description: '',
      _id: '',
      name: '',
      status: '',
      addModel: false
    }
  }

  openModel = (ticketData) => (e) => {
      this.setState({
        header: ticketData.header,
        name: ticketData.name,
        description: ticketData.description,
        status: ticketData.status,
        _id: ticketData._id,
        image: ticketData.image,
        addModel: true
      })
  }

  closeModel = () => {
    this.setState({ addModel: false })
  }

  changeData = (event,index,value)  => {
    this.setState({ status: value })
  }

  update = () => {
    let data = {};
    data._id = this.state._id;
    data.status = this.state.status;
    var authOptions = {
      method: 'post',
      url: Url+'update',
      data: data,
      headers: {
        'Content-Type': 'application/json'
      },
      json: true
    };
    axios(authOptions)
      .then((response) => {
        if (response.status === 200) {
          alert(response.data)
          window.location.reload();
        }
        else {

        }
      })
      .catch((error) => {
        alert(error);
      })
  }

  render = () => {
    
    const { _id, addModel, image, header, description, status } = this.state;
    const { data, index } = this.props;
    const titleData="Ticket ID :  "+_id;
    const closeImg = {cursor:'pointer', float:'right', marginTop: '5px', width: '30px'};

    return (
      <div>
        <div className="col-lg-3 col-md-3 col-sm-4  text-center padding" key={index}>
          <div className="card" onClick={this.openModel(data)}>
            <div className="card-header">
              {data.header}
            </div>
            <img className="card-img-top" src={data.image} alt="no-image" />
            <div className="card-block">
              {data.description}
            </div>
          </div>
        </div>
        <Dialog
          title={
            <div>
                 {titleData}
                <img src='https://d30y9cdsu7xlg0.cloudfront.net/png/53504-200.png' style={closeImg} onClick={this.closeModel}/>
            </div>
        }
          modal={false}
          open={addModel}
          onRequestClose={this.closeModel}
        >
          <GridList cols={2}>
            <GridTile>
              <div className="image-margin">
              <div className="image">
                <img className="card-img-top" src={image} alt="no selection" />
              </div>
              </div>
            </GridTile>
            <GridTile>
              <h4>Header</h4>
              <textarea name="header" value={header} disabled={true}/>
            </GridTile>
          </GridList>
          <GridList cols={1}>
            <GridTile >
              <h4>Description</h4>
              <textarea name="description" value={description} disabled={true}/>
            </GridTile>
          </GridList>
          <GridTile >
            <div className="text-center padding">
              <h4>Ticket Status </h4>
              <SelectField className="border" value={status} onChange={this.changeData.bind(this)}>
                <MenuItem value="false" label="Opened" primaryText="Opened" />
                <MenuItem value="true" label="Closed" primaryText="closed" />
              </SelectField>
            </div>
            <div className="text-center padding">
              <RaisedButton label="update" secondary={true} onClick={this.update} />
            </div>
          </GridTile >
        </Dialog>
      </div>
    );
  }

}

export default AdminOpenedTicketDetail;