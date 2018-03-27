import React from 'react';
import { GridList, GridTile } from 'material-ui/GridList';
import Paper from 'material-ui/Paper';
import RaisedButton from 'material-ui/RaisedButton';
import Dialog from 'material-ui/Dialog';

class UserClosedTicketDetail extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      header: '',
      image:'',
      description:'',
      id:'',
      name:'',
      status:'',
      addModel:false
    }
  }

  ShowModel = (ticketData) => (e) => {
    this.setState({
       header: ticketData.header,
       name:ticketData.name,
       description:ticketData.description,
       status:ticketData.status,
       _id:ticketData._id,
       image:ticketData.image,
       addModel:true 
    })
  }

closeModel = () => {
    this.setState({ addModel: false })
}

  render() {
    const { _id, addModel, image, header, description, status } = this.state;
    const { data, index } = this.props;
    const titleData="Ticket ID :  "+_id;
    const closeImg = {cursor:'pointer', float:'right', marginTop: '5px', width: '30px'};

    return (
      <div>
        <div className="col-lg-3 col-md-3 col-sm-4  text-center padding" key={index}>
          <div className="card" onClick={this.ShowModel(data)}>
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
              <textarea name="description" value={description} disabled={true} />
            </GridTile>
          </GridList>
          <GridTile >
            <div className="text-center padding">
            <RaisedButton label="the ticket was closed" secondary={true} />
            </div>
          </GridTile >
        </Dialog>
      </div>
    );
  }

}

export default UserClosedTicketDetail;