import React, {Component} from 'react';
import * as API from '../api/SigninSignup-API';
import ReactDOM from 'react-dom';
import Search from './Home';

class Account extends Component {

  state={
    user:'',
    firstname:'',
    lastname:'',
    add:'',
    state:'',
    city:'',
    zip:'',
    phone:'',
    card:''
  };

componentWillMount(){
  var x={uid:this.props.id.user_id},details=[];
    API.details(x)
        .then((data) => {
            if (data) {
              this.setState({uid:data.user_id,firstname:data.fname,
                  lastname:data.lname,
                  add:data.address,
                  state:data.state,
                  city:data.city,
                  zip:data.zip_code,
                  phone:data.phoneno,
                  card:data.credit_card });
            }
           else {
                console.log("File not listed");
            }
        });

}

handleDetails = (details) => {
console.log("CHECK: "+details.add);
            API.update(details)
                .then((output) => {
                    if (output === 0) {
                        console.log("Failed update");
                    } else {
                        console.log("Success update");
                    }
                });
        };

    render() {
        return (
          <div>
          <div id="fh5co-wrapper">
          <div id="fh5co-page">
          <div className="container">
            <div className="row">


            <form>
            <div className="row">
            <div className="col-xxs-12 col-xs-6 mt">
            <div className="input-field">
              <label>First Name:</label>
              <input type="text" value={this.state.firstname} className="form-control" onChange={(event)=>{
                                           this.setState({firstname: event.target.value});}}/>
            </div>
            </div>
            <div className="col-xxs-12 col-xs-6 mt">
            <div className="input-field">
              <label>Last Name:</label>
              <input type="text" value={this.state.lastname} className="form-control" onChange={(event)=>{
                                           this.setState({lastname: event.target.value});}}/>
            </div>
            </div>
            <div className="col-xxs-12 col-xs-6 mt">
            <div className="input-field">
              <label>Address:</label>
              <input type="text" value={this.state.add} className="form-control" onChange={(event)=>{
                                           this.setState({add: event.target.value});}}/>
            </div>
            </div>
            <div className="col-xxs-12 col-xs-6 mt">
            <div className="input-field">
              <label>City:</label>
              <input type="text" value={this.state.city} className="form-control" onChange={(event)=>{
                                           this.setState({city: event.target.value});}}/>
            </div>
            </div>

            <div className="col-xxs-12 col-xs-6 mt">
            <div className="input-field">
              <label>State:</label>
              <input type="text" value={this.state.state} className="form-control" onChange={(event)=>{
                                           this.setState({state: event.target.value});}}/>
            </div>
            </div>

            <div className="col-xxs-12 col-xs-6 mt">
            <div className="input-field">
              <label>Zip:</label>
              <input type="text" value={this.state.zip} className="form-control" onChange={(event)=>{
                                           this.setState({zip: event.target.value});}}/>
            </div>
            </div>

            <div className="col-xxs-12 col-xs-6 mt">
            <div className="input-field">
              <label>Phone:</label>
              <input type="text" value={this.state.phone} className="form-control" onChange={(event)=>{
                                           this.setState({phone: event.target.value});}}/>
            </div>
            </div>
            <div className="col-xxs-12 col-xs-6 mt">
            <div className="input-field">
              <label>Credit Card:</label>
              <input type="text" value={this.state.card} className="form-control" onChange={(event)=>{
                                           this.setState({card: event.target.value});}}/>
            </div>
            </div>
            <div className="col-xs-5"></div>
            <div className="col-xs-2">
            <button type="button" className="btn btn-primary btn-block" value="Submit" onClick={() => this.handleDetails(this.state)}>Submit</button>
            </div>
            </div>
            </form>
            </div>
            </div>
            </div>
            </div>


</div>
        );
    }
}

export default Account;
