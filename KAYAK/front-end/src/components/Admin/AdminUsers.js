import React, {Component} from 'react';
import * as API from '../../api/Admin/AdminUserAPI';
import * as API2 from '../../api/SigninSignup-API';
import ReactDOM from 'react-dom';
import FormErrors from "../FormErrors";
import 'w3-css/w3.css';
import Login from '../Login';

class AdminUsers extends Component {
  state={
    users:[],
    updateID:'',
    updateType:'',

  };

getUsers=()=>{
  var u=[];
  this.setState({ users: [],visible:false });
    API.listusers()
        .then((data) => {
            if (data) {
              console.log("USERS CHECK: "+data);
              for(var i=0;i<data.length;i++){
              u = this.state.users.concat(data[i]);
              this.setState({ users: u });
            }}
           else {
                console.log("Error");
            }
        });
};

componentWillMount(){
this.getUsers();
}

deleteUser= (id) => {
  var x={userid:id};
    API.deleteuser(x)
        .then((output) => {
            if (output === 1) {
              this.getUsers();
                console.log("Deleted");
            } else {
                console.log("Not deleted");
            }
        });
};

showComp(id) {
  this.setState({updateID:id,visible: !this.state.visible});
}



    render() {
        return (
          <div>
          {this.props.user==='true' ? (
          <div>
          <div id="fh5co-page">
          <div className="container">
            <div className="row">

<h3 style={{fontWeight:"bold"}}>ALL USERS</h3>
<div>
<ul className="w3-ul">
<li>
<div className="col-xs-3 col-xxs-3 mt" style={{fontWeight:"bold"}}>Name</div>
<div className="col-xs-3 col-xxs-3 mt" style={{fontWeight:"bold"}}>Email</div>
<div className="col-xs-6 col-xxs-6 mt" style={{fontWeight:"bold"}}>Action</div>
</li></ul></div>
            {this.state.users.map(f => {
              return (
                <div  key={Math.random()}>
                <ul className="w3-ul">
                <li>
                <div className="col-xs-3 col-xxs-3 mt">{f.fname} {f.lname}</div>
                <div className="col-xs-3 col-xxs-3 mt">{f.emailid}</div>
                <div className="col-xs-6 col-xxs-6 mt">
                <button onClick={()=> this.showComp(f.user_id)}>Update</button>&nbsp;
                <button onClick={()=> this.deleteUser(f.user_id)}>Remove</button></div>
              </li></ul></div>
              )})}
              <div>
                {
                  this.state.visible
                    ? <Updateuser id={this.state.updateID} display={this.getUsers}/>
                    : null
                }
              </div>

      </div>
</div>
</div>
</div>):(<Login handleLogged={this.props.handleLogged} handleNotLogged={this.props.handleNotLogged}/>)}
</div>
);}}





class Updateuser extends Component {

state={    user:'',
    firstname:'',
    lastname:'',
    add:'',
    state:'',
    city:'',
    zip:'',
    phone:'',
    card:'',
    password:'',

    formErrors: {email:'',password:'',firstname: '',lastname: '',addr: '',city:'',state:'',phone:'',credit:'',zip:''},
    type:false,
    firstNameValid:false,
    lastNameValid:false,
    passwordValid: false,
    addrValid:false,
    cityValid:false,
    stateValid:false,
    phoneValid:false,
    creditValid:false,
    zipValid:false,
    formValid: false,
uid:this.props.id
};



componentWillMount(){
  this.setState({formErrors: {firstname: '',lastname: '',address: '',city:'',state:'',phone:'',credit:'',zip:'',userEmail:''},
  emailValid: true,
  passwordValid: true,
  formValid: true,
  firstNameValid:true,
  lastNameValid:true,
  addrValid:true,
  cityValid:true,
  stateValid:true,
  phoneValid:true,
  zipValid:true,
  creditValid:true,
  type:false});
var x={uid:this.state.uid};
    API2.details(x)
        .then((data) => {
            if (data) {
              this.setState({uid:data.user_id,firstname:data.fname,
                  lastname:data.lname,
                  add:data.address,
                  state:data.state,
                  city:data.city,
                  zip:data.zip_code,
                  phone:data.phoneno,
                  card:data.credit_card,
                email:data.emailid });
            }
           else {
                console.log("Error");
            }
        });
}


validateField(fieldName, value) {
    let fieldValidationErrors = this.state.formErrors;
    let firstNameValid=this.state.firstNameValid;
    let checkUsername = this.state.checkUsername;
    let lastNameValid=this.state.lastNameValid;
    let addrValid=this.state.addrValid;
    let cityValid=this.state.cityValid;
    let stateValid=this.state.stateValid;
    let zipValid=this.state.zipValid;
    let phoneValid=this.state.phoneValid;
    let creditValid=this.state.creditValid;

    switch(fieldName) {
      case 'firstname':
          firstNameValid = value.length !== 0;
          fieldValidationErrors.firstname = firstNameValid ? '': ' is required';
          break;
      case 'lastname':
          lastNameValid = value.length !== 0 ;
          fieldValidationErrors.lastname = lastNameValid ? '': ' is required';
          break;
      case 'address':
              addrValid = value.length !== 0;
              fieldValidationErrors.address = addrValid ? '': ' is required';
              break;
      case 'city':
              cityValid = value.length !== 0 ;
              fieldValidationErrors.city = cityValid ? '': ' is required';
              break;
      case 'state':
                  stateValid = value.length !== 0;
                  fieldValidationErrors.state = stateValid ? '': ' is required';
                  break;
      case 'zip':
                  zipValid = value.length !== 0 && value.length ===5 && value.match('^[0-9]+$');
                  fieldValidationErrors.zip = zipValid ? '': ' is invalid';
                  break;
      case 'phone':
                  phoneValid = value.length !== 0 && value.length ===10 && value.match('^[0-9]+$');
                  fieldValidationErrors.phone = phoneValid ? '': ' is invalid';
                  break;
      case 'credit':
                  creditValid = value.length !== 0 && value.length ===16 && value.match('^[0-9]+$') ;
                  fieldValidationErrors.credit = creditValid ? '': ' is invalid';
                  break;
        default:
            break;
    }
    this.setState({formErrors: fieldValidationErrors,
        firstNameValid: firstNameValid,
        lastNameValid: lastNameValid,
        addrValid: addrValid,
        cityValid: cityValid,
        stateValid: stateValid,
        zipValid: zipValid,
        phoneValid: phoneValid,
        creditValid: creditValid
    }, this.validateForm);
}

validateForm() {
    this.setState({formValid: this.state.firstNameValid && this.state.lastNameValid && this.state.addrValid && this.state.cityValid &&this.state.stateValid && this.state.zipValid && this.state.creditValid && this.state.phoneValid});
}

handleDetails = (details) => {
console.log("CHECK: "+details.email);
            API2.update(details)
                .then((output) => {
                    if (output === 0) {
                        console.log("Failed update");
                    } else {
                        console.log("Success update");
                        this.props.display();
                    }
                });
        };

  render() {
      return (
        <div>
        <div id="fh5co-page">
        <div className="container">
          <div className="row">


          <form>
          <FormErrors formErrors={this.state.formErrors} />
          <div className="row">
          <div className="col-xxs-12 col-xs-6 mt">
          <div className="input-field">
            <label>First Name:</label>
            <input type="text" value={this.state.firstname} className="form-control" onChange={(event)=>{const name="firstname"
                                                                  const value=event.target.value
                                         this.setState({firstname: event.target.value,
                                         type:true}, () => { this.validateField(name, value)});}}/>
          </div>
          </div>
          <div className="col-xxs-12 col-xs-6 mt">
          <div className="input-field">
            <label>Last Name:</label>
            <input type="text" value={this.state.lastname} className="form-control" onChange={(event)=>{const name="lastname"
                                                                  const value=event.target.value
                                         this.setState({lastname: event.target.value,
                                         type:true}, () => { this.validateField(name, value)});}}/>
          </div>
          </div>
          <div className="col-xxs-12 col-xs-6 mt">
          <div className="input-field">
            <label>Address:</label>
            <input type="text" value={this.state.add} className="form-control" onChange={(event)=>{const name="address"
                                                                  const value=event.target.value
                                         this.setState({add: event.target.value,
                                         type:true}, () => { this.validateField(name, value)});}}/>
          </div>
          </div>
          <div className="col-xxs-12 col-xs-6 mt">
          <div className="input-field">
            <label>City:</label>
            <input type="text" value={this.state.city} className="form-control" onChange={(event)=>{const name="city"
                                                                  const value=event.target.value
                                         this.setState({city: event.target.value,
                                         type:true}, () => { this.validateField(name, value)});}}/>
          </div>
          </div>

          <div className="col-xxs-12 col-xs-6 mt">
          <div className="input-field">
            <label>State:</label>
            <input type="text" value={this.state.state} className="form-control" onChange={(event)=>{const name="state"
                                                                  const value=event.target.value
                                         this.setState({state: event.target.value,
                                         type:true}, () => { this.validateField(name, value)});}}/>
          </div>
          </div>

          <div className="col-xxs-12 col-xs-6 mt">
          <div className="input-field">
            <label>Zip:</label>
            <input type="text" maxLength="5" value={this.state.zip} className="form-control" onChange={(event)=>{const name="zip"
                                                                  const value=event.target.value
                                         this.setState({zip: event.target.value,
                                         type:true}, () => { this.validateField(name, value)});}}/>
          </div>
          </div>

          <div className="col-xxs-12 col-xs-6 mt">
          <div className="input-field">
            <label>Phone:</label>
            <input type="text" maxLength="10" value={this.state.phone} className="form-control" onChange={(event)=>{const name="phone"
                                                                  const value=event.target.value
                                         this.setState({phone: event.target.value,
                                         type:true}, () => { this.validateField(name, value)});}}/>
          </div>
          </div>
          <div className="col-xxs-12 col-xs-6 mt">
          <div className="input-field">
            <label>Credit Card:</label>
            <input type="text" maxLength="16" value={this.state.card} className="form-control" onChange={(event)=>{const name="credit"
                                                                  const value=event.target.value
                                         this.setState({card: event.target.value,
                                         type:true}, () => { this.validateField(name, value)});}}/>
          </div>
          </div>
                <div className="col-xxs-12 col-xs-12 mt"></div>
                <div className="col-xs-2">
                <button type="button" disabled={!this.state.formValid} className="btn btn-primary btn-block" value="Submit" onClick={() => this.handleDetails(this.state)}>Submit</button>
</div><div className="col-xs-2">
                <button type="button" className="btn btn-primary btn-block" value="Cancel" onClick={() => this.props.display()}>Cancel</button>
                </div>

                </div>
                </form>

    </div>
</div>
</div>
</div>

);}}






export default AdminUsers;
