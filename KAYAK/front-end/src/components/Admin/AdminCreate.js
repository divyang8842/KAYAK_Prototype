import React, {Component} from 'react';
import * as API from '../../api/Admin/AdminUserAPI';
import * as API2 from '../../api/SigninSignup-API';
import ReactDOM from 'react-dom';
import FormErrors from "../FormErrors";
import 'w3-css/w3.css';
import Login from '../Login';

class AdminCreate extends Component {
  state={
    firstname:'',
    lastname:'',
    email:'',
    pass:'',
    userEmail:'',
    message:'',
    formErrors1: {firstname: '',lastname: '',email: '', password: '',userEmail:''},
    emailValid: false,
    passwordValid: false,
    formValid: false,
    type:false,
    firstNameValid:false,
    lastNameValid:false,
    checkUsername:false

  };

  componentWillMount(){
          this.setState({formErrors1: {firstname: '',lastname: '',email: '', password: '',userEmail:''},
          emailValid: false,passwordValid: false,
          formValid: false,firstNameValid:false,
          lastNameValid:false,checkUsername:false,type:false});
        };

newAdmin = (user) => {
          console.log("CHECK: "+user.firstname);
            API.newadmin(user)
                .then((output) => {
                    if (output === 0) {
                        console.log("Failed new admin");
                    } else {
                        console.log("Success new admin");
                        ReactDOM.findDOMNode(this.refs.fn).value = "";
                        ReactDOM.findDOMNode(this.refs.ln).value = "";
                        ReactDOM.findDOMNode(this.refs.em).value = "";
                        ReactDOM.findDOMNode(this.refs.pwd).value = "";
                        this.setState({message:'New admin created'});
                    }
                });
        };

  validateField1(fieldName, value) {
      let fieldValidationErrors = this.state.formErrors1;
      let emailValid = this.state.emailValid;
      let checkUsername = this.state.checkUsername;
      let passwordValid = this.state.passwordValid;
      let firstNameValid=this.state.firstNameValid;
      let lastNameValid=this.state.lastNameValid;
      switch(fieldName) {
        case 'firstname':
            firstNameValid = value.length !== 0;
            fieldValidationErrors.firstname = firstNameValid ? '': ' is required';
            break;
        case 'lastname':
            lastNameValid = value.length !== 0 ;
            fieldValidationErrors.lastname = lastNameValid ? '': ' is required';
            break;
          case 'email':
              emailValid = value.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i);
              console.log("EMAIL STATE IN API:==== "+emailValid);
              fieldValidationErrors.email = emailValid ? '' : ' is invalid';
              break;
          case 'password':
              passwordValid = value.length >= 3;
              fieldValidationErrors.password = passwordValid ? '': ' is too short';
              break;
         case 'check':
          var x={uname:value}

          API2.checkuser(x)
              .then((output) => {
                checkUsername= output===1;
                fieldValidationErrors.userEmail = checkUsername ? '': ' already exists';
                console.log("USER STATE IN API:==== "+checkUsername);
                this.setState({checkUsername:checkUsername});
              });
              this.setState({checkUsername:checkUsername});
              break;
          default:
              break;
      }

      this.setState({formErrors1: fieldValidationErrors,
        firstNameValid:firstNameValid,
        lastNameValid:lastNameValid,
          emailValid: emailValid,
          passwordValid: passwordValid,

      }, this.validateForm1);

  }

  validateForm1() {
    console.log("USER STATE IN VALIDATE:==== "+this.state.checkUsername+this.state.firstNameValid+this.state.lastNameValid + this.state.emailValid + this.state.passwordValid);
      this.setState({formValid: this.state.checkUsername &&this.state.firstNameValid && this.state.lastNameValid && this.state.emailValid && this.state.passwordValid});
  }

  errorClass(error) {
      return(error.length === 0 ? '' : 'has-error');
  }




    render() {
        return (
          <div>
          {this.props.user==='true' ? (
          <div>
          <div id="fh5co-page">
          <div className="container">
            <div className="row">
<h3>Create Admin</h3>
<form>
    <div className="row">
    <div className="col-xxs-12 col-xs-6 mt">
    <div className="input-field">
    <label>First Name:</label>
    <input type="text" ref="fn" className="form-control" onChange={(event)=>{const name="firstname"
                                                          const value=event.target.value
                                                          this.setState({firstname: event.target.value,
                                                          type:true},() => { this.validateField1(name, value) });}} required/>
    </div>
    </div>

    <div className="col-xxs-12 col-xs-6 mt">
    <div className="input-field">
    <label>Last Name:</label>
    <input type="text" ref="ln" className="form-control" onChange={(event)=>{const name="lastname"
                                                    const value=event.target.value
                                                    this.setState({lastname: event.target.value,
                                                      type:true},() => { this.validateField1(name, value) });}} required/>
     </div>
    </div>

    <div className="col-xxs-12 col-xs-6 mt">
    <div className="input-field">
    <div className={'form-group ${this.errorClass(this.state.formErrors1.email)}'}>
    <label>Email:</label>
    <input type="text" ref="em" className="form-control" onChange={(event) => {
        const name="email"
        const value=event.target.value
        this.setState({
            email: event.target.value,
            type:true }, () => { this.validateField1(name, value)});}} onInput={(event)=>{const name="check"
                              const value=event.target.value
                              this.setState({email: event.target.value,type:true}, () => { this.validateField1(name, value) });}} required/>
  </div>
</div>
</div>
<div className="col-xxs-12 col-xs-6 mt">
<div className="input-field">
<div className={'form-group ${this.errorClass(this.state.formErrors1.password)}'}>
  <label>Password:</label>
  <input type="password" ref="pwd" className="form-control" onChange={(event)=>{const name="password"
                            const value=event.target.value
                                this.setState({pass: event.target.value,type:true}, () => { this.validateField1(name, value) });}} required/>
    </div>
</div>
</div>

<div className="col-xs-12">
<button type="button" disabled={!this.state.formValid} className="btn btn-primary btn-block" value="Submit" onClick={() => this.newAdmin(this.state)}>Submit</button>
</div>

</div>
</form>
<FormErrors formErrors={this.state.formErrors1} />
<font color="red">{this.state.message}</font>
</div>
</div>
</div>
</div>):(<Login handleLogged={this.props.handleLogged} handleNotLogged={this.props.handleNotLogged}/>)}
</div>
);}}


export default AdminCreate;
