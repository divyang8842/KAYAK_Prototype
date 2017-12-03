import React, {Component} from 'react';
import * as API from '../api/SigninSignup-API';

import ReactDOM from 'react-dom';
import Login from './Login';
import FormErrors from "./FormErrors";
import * as APIimage from '../api/fileOperation';
import TextField from 'material-ui/TextField';
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
    card:'',
    email:'',
    password:'',
    userEmail:'',
    visible:false,
    visible1:false,
    srcdata:'',

    formErrors: {email:'',password:'',firstname: '',lastname: '',addr: '',city:'',state:'',phone:'',credit:'',zip:'',userEmail:''},
    type:false,
    firstNameValid:false,
    lastNameValid:false,
    emailValid: false,
    passwordValid: false,
    addrValid:false,
    cityValid:false,
    stateValid:false,
    phoneValid:false,
    creditValid:false,
    zipValid:false,
    formValid: false,
    checkUsername:false
  };

  changePwd() {
    this.setState({visible: !this.state.visible,visible1: false});
  }

  changeUsername() {
    this.setState({visible1: !this.state.visible1,visible: false});
  }



componentWillMount(){
  this.handleFileFetch();
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
  //checkUsername:true,
  type:false});

  var x={uid:this.props.id},details=[];

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
                  card:data.credit_card,
                email:data.emailid });
            }
           else {
                console.log("Error");
            }
        });
}


deleteAcc= (id) => {
  var x={userid:id};
    API.deleteaccount(x)
        .then((output) => {
            if (output === 1) {
                console.log("Deleted");
                alert("Account deleted. Please logout");
                this.props.handleNotLogged();
            } else {
                console.log("Not deleted");
            }
        });
};

handleFileUpload = (event) => {
    const payload = new FormData();
    payload.append('avatar', event.target.files[0]);
    payload.append('type',"user");
    payload.append('id',this.props.id);
    APIimage.uploadFile(payload)
        .then((response) => {
            if (response.status == 201) {
                this.setState({
                    srcdata:"data:image/jpeg;base64,"+response.data
                });
            }
        });
};


handleFileFetch= (event) => {
    const payload = {'type':"user",'id':this.props.id};
    APIimage.getFile(payload)
        .then((response) => {
            if (response.status == 201) {
              if(response.image!==''){
                this.setState({
                    srcdata:"data:image/jpeg;base64,"+response.image
                });}
                else {

                }
            }
        });

};


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
    let emailValid=this.state.emailValid;

    switch(fieldName) {
      case 'email':
          emailValid = value.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i);
          fieldValidationErrors.email = emailValid ? '' : ' is invalid';
          break;
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
                  zipValid = value.length !== 0 && ((value.length ===5 && value.match('^[0-9]+$')) || (value.length ===10 && value.match('^\\d{5}(-\\d{4})?$')));

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
      /*case 'check':
                   var x={uname:value}
                   API.checkuser(x)
                       .then((output) => {
                         checkUsername= output===1;
                         fieldValidationErrors.userEmail = checkUsername ? '': ' already exists';
                         console.log("USER STATE IN API:==== "+checkUsername);
                         this.setState({checkUsername:checkUsername});
                       });
                       this.setState({checkUsername:checkUsername});
                   break;*/
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

errorClass(error) {
    return(error.length === 0 ? '' : 'has-error');
}


handleDetails = (details) => {
//console.log("CHECK: "+details.email);
            API.update(details)
                .then((output) => {
                    if (output === 0) {
                        console.log("Failed update");
                    } else {
                        console.log("Success update");
                        alert("Data updated");
                    }
                });
        };

    render() {
        return (
          <div>
          {this.props.user==='true' ? (
<div>
          <div id="fh5co-page">
          <div className="container">
            <div className="row">
  <br/>
            <img ref={"base64img"} style={{display: 'block', width: 100, height: 100}} alt={"Please select image"} src={this.state.srcdata}></img>
            <TextField
                className={'fileupload'}
                type="file"
                name="mypic"
                onChange={this.handleFileUpload}/>
            <br/><br/>
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
              <input type="text" maxLength="10" value={this.state.zip} className="form-control" onChange={(event)=>{const name="zip"
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
                  </div>
                  <div className="col-xxs-12 col-xs-12 mt"></div>
                  <div className="col-xxs-12 col-xs-12 mt"></div>

                  <div className="col-xxs-12 col-xs-6 mt">
                  <div className="input-field">
                  <label>Email:</label>
                  <input type="text" ref="em" value={this.state.email} className="form-control" readonly/>

              </div>
            </div>

<div className="col-xxs-12 col-xs-12 mt"></div>
<div className="col-xxs-12 col-xs-12 mt">
<div className="col-xxs-12 col-xs-3 mt"><button type="button" className="btn btn-primary btn-block" value="Change Username" onClick={() => this.changeUsername()}>Update Email</button></div>
<div className="col-xxs-12 col-xs-3 mt"><button type="button" className="btn btn-primary btn-block" value="Change Password" onClick={() => this.changePwd()}>Change Password</button></div>
<div className="col-xxs-12 col-xs-3 mt"><button type="button" className="btn btn-primary btn-block" value="Delete Account" onClick={() => this.deleteAcc(this.state.uid)}>Delete Account</button></div>
</div>
<div className="col-xxs-12 col-xs-12 mt"></div>

                  </div>
                  </form>
                  <div>
                    {
                      this.state.visible1
                        ? <Changeusername id={this.state.uid}/>
                        : null
                    }
                  </div>
                  <div>
                    {
                      this.state.visible
                        ? <Changepassword id={this.state.uid}/>
                        : null
                    }
                  </div>
      </div>
</div>
</div>
</div>):null}
</div>
);}}

class Changepassword extends Component {
  state={
    password:'',
    formErrors: {password: ''},
    validPassword:false
  };

  handlePassword = (pwd) => {
              API.updatePwd(pwd)
                  .then((output) => {
                      if (output === 0) {
                          console.log("Failed pwd update");
                      } else {
                          console.log("Success pwd update");
                          alert("Password updated");
                      }
                  });
          };

  validateField(fieldName, value) {
    let fieldValidationErrors = this.state.formErrors;
      let passwordValid = this.state.passwordValid;
      switch(fieldName) {
          case 'password':
              passwordValid = value.length >= 3;
              fieldValidationErrors.password = passwordValid ? '': ' is too short';
              break;
          default:
              break;
      }
      this.setState({formErrors: fieldValidationErrors,
          passwordValid: passwordValid,
      }, this.validateForm);
  }

  validateForm() {
      this.setState({formValid: this.state.passwordValid});
  }

  render() {
console.log("ID: "+this.props.id);
      return (
        <div>
        <div id="fh5co-page">
        <div className="container">
          <div className="row">
          <form>
          <div className="row">

          <div className="col-xxs-12 col-xs-4 mt">
          <div className="input-field">
            <label>New Password:</label>
            <input type="password" ref="pwd" className="form-control" onChange={(event)=>{const name="password"
                                      const value=event.target.value
                                          this.setState({password: event.target.value,type:true}, () => { this.validateField(name, value) });}} required/>
<FormErrors formErrors={this.state.formErrors} />
          </div>
          </div>
          <br/><br/><br/><br/>
          <div className="col-xxs-12 col-xs-12 mt"></div>
                <div className="col-xxs-3 col-xs-3 mt">
                <button type="button" disabled={!this.state.formValid} className="btn btn-primary btn-block" value="Submit" onClick={() => this.handlePassword(this.state)}>Submit</button>
                </div>
                </div>
                </form>
        </div>
        </div>
        </div>
</div>
);}}


class Changeusername extends Component {
  state={
    email:'',
    formErrors: {email: ''},
    emailValid:false,
    checkUsername:false
  };

  handleEmail = (em) => {
              API.updateEmail(em)
                  .then((output) => {
                      if (output === 0) {
                          console.log("Failed email update");
                      } else {
                          console.log("Success email update");
                          alert("Email updated");
                      }
                  });
          };

  validateField(fieldName, value) {
    let fieldValidationErrors = this.state.formErrors;
      let emailValid = this.state.emailValid;
      let checkUsername = this.state.checkUsername;
      switch(fieldName) {
        case 'email':
            emailValid = value.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i);
            fieldValidationErrors.email = emailValid ? '' : ' is invalid';
            break;
        case 'check':
             var x={uname:value}
             API.checkuser(x)
                 .then((output) => {
                   checkUsername= output===1;
                   fieldValidationErrors.userEmail = checkUsername ? '': ' already exists';
                   this.setState({checkUsername:checkUsername});
                 });
                 this.setState({checkUsername:!checkUsername});
                 break;
          default:
              break;
      }
      this.setState({formErrors: fieldValidationErrors,
          emailValid: emailValid,
      }, this.validateForm);
  }

  validateForm() {
    console.log("Email check2: "+this.state.checkUsername);
      this.setState({formValid: this.state.emailValid && this.state.checkUsername===false});
  }

  render() {
console.log("ID: "+this.props.id);
      return (
        <div>
        <div id="fh5co-page">
        <div className="container">
          <div className="row">
          <form>
          <div className="row">
          <div className="col-xxs-12 col-xs-6 mt">
          <div className="input-field">
          <label>Email:</label>
          <input type="text" ref="em" className="form-control" onChange={(event) => {
              const name="email"
              const value=event.target.value
              this.setState({
                  email: event.target.value,
                  type:true }, () => { this.validateField(name, value)});}} onInput={(event)=>{const name="check"
                                    const value=event.target.value
                                    this.setState({email: event.target.value,type:true}, () => { this.validateField(name, value) });}} required/>
<FormErrors formErrors={this.state.formErrors} />
          </div>
          </div>

          <br/><br/><br/><br/>

          <div className="col-xxs-12 col-xs-12 mt"></div>
                <div className="col-xxs-3 col-xs-3 mt">
                <button type="button" disabled={!this.state.formValid} className="btn btn-primary btn-block" value="Submit" onClick={() => this.handleEmail(this.state)}>Submit</button>
          </div>

        </div>
        </form>
        </div>
        </div>
        </div>
</div>
);}}

export default Account;
