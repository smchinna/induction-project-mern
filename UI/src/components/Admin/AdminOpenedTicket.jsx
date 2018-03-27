import React from 'react';
import AdminOpenedTicketDetail from './AdminOpenedTicketDetail.jsx';
import RaisedButton from 'material-ui/RaisedButton';

class AdminOpenedTicket extends React.Component {
    constructor(props){
        super(props);
        this.state={
            data:this.props.data,
            start:0,
            pageData:[],
            prev:true,
            next:true
        }
    }
    
    componentWillReceiveProps(){
        let arr=[];
        let number=this.props.data.length-1;
        if(number-8>0){
            for(let j=number;j>number-8;j--){
                arr.push(this.props.data[j])
            }
            this.setState({next:false});
        }
        else{
            for(let j=number;j>=0;j--){
                arr.push(this.props.data[j])
            }
            this.setState({next:true});
        }
        this.setState({pageData:arr,start:number-8});
    }

  
    prevPageData = () => {
        let arr=[];
        if(this.state.start+8<this.state.data.length-1){
            for(let j=this.state.start+8;j>this.state.start;j--){
                arr.push(this.props.data[j])
            }
            this.setState({pageData:arr});
            this.setState({start:this.state.start+8,next:false})
        }
        else{
            for(let j=this.state.data.length-1;j>this.state.start;j--){
                arr.push(this.props.data[j])
            }
            this.setState({pageData:arr});
            this.setState({start:this.state.data.length-1,next:false,prev:true})
        }
    }

    nextPageData = () => {
        let arr=[];
        if(this.state.start-8>=0){
            for(let j=this.state.start;j>this.state.start-8;j--){
                arr.push(this.props.data[j])
            }
            this.setState({pageData:arr});
            this.setState({start:this.state.start-8,prev:false});
        }
        else{
            for(let j=this.state.start;j>=0;j--){
                arr.push(this.props.data[j])
            }
            this.setState({pageData:arr});
            this.setState({start:this.state.start,next:true,prev:false})
        }
    }
    
    homePageData = () => {
        let arr=[];
        this.setState({prev:true});
        let number=this.props.data.length-1;
        if(number-8>0){
            for(let j=number;j>number-8;j--){
                arr.push(this.props.data[j])
            }
            this.setState({next:false});
        }
        else{
            for(let j=number;j>=0;j--){
                arr.push(this.props.data[j])
            }
            this.setState({next:true});
        }
        this.setState({pageData:arr,start:number-8});
    }

    render = () => {
        const { next, prev, pageData } = this.state;
        const showTicket = pageData.map((element, i) => {
            return (<div key={i}>
                        <AdminOpenedTicketDetail data={element} index={i} />
                    </div>
                );
            })
            
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
            </div>
        );
    }
}

export default AdminOpenedTicket;