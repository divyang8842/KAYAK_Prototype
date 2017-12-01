import React, {Component} from 'react';
import * as API from '../api/SigninSignup-API';
import ReactDOM from 'react-dom';
import Search from './Home';
import FormErrors from "./FormErrors";
import * as UserTracking from '../api/UserTracking';

class Signup extends Component {
  state={
    firstname:'',
    lastname:'',
    email:'',
    pass:'',
    userEmail:'',
    messageSignup:'',

    formErrors1: {firstname: '',lastname: '',email: '', password: '',userEmail:''},
    emailValid: false,
    passwordValid: false,
    formValid: false,
    type:false,
    firstNameValid:false,
    lastNameValid:false,
    checkUsername:false
  };

componentDidMount()
{
  if(localStorage.getItem('userid')){
  var currentUser={id:localStorage.getItem('userid')};
  localStorage.removeItem('userid');
      API.checkLogged(currentUser)
          .then((output) => {
            console.log("CHECK THIS: "+output.status);
              if (output.status === "501") {
                console.log("Incorrect");
                this.props.handleNotLogged();

              } else {
                  console.log("Correct ");
                  localStorage.setItem('userid', output.userid);
                  this.props.handleLogged(output.userid,output.type,output.firstname);
              }
          });
  }
}
  componentWillMount(){
          this.setState({username:'',password:'',message:'',
          formErrors: {email: '', password: ''},
          formErrors1: {firstname: '',lastname: '',email: '', password: '',userEmail:''},
          emailValid: false,
          passwordValid: false,
          formValid: false,
          firstNameValid:false,
          lastNameValid:false,
          checkUsername:false,
          type:false});
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
              //console.log("EMAIL STATE IN API:==== "+emailValid);
              fieldValidationErrors.email = emailValid ? '' : ' is invalid';
              break;
          case 'password':
              passwordValid = value.length >= 3;
              fieldValidationErrors.password = passwordValid ? '': ' is too short';
              break;
         case 'check':
          var x={uname:value}

          API.checkuser(x)
              .then((output) => {
                checkUsername= output===1;
                fieldValidationErrors.userEmail = checkUsername ? '': ' already exists';
                //console.log("USER STATE IN API:==== "+checkUsername);
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
    //console.log("USER STATE IN VALIDATE:==== "+this.state.checkUsername+this.state.firstNameValid+this.state.lastNameValid + this.state.emailValid + this.state.passwordValid);
      this.setState({formValid1: this.state.checkUsername &&this.state.firstNameValid && this.state.lastNameValid && this.state.emailValid && this.state.passwordValid});
  }

  errorClass(error) {
      return(error.length === 0 ? '' : 'has-error');
  }


handleSignup = (user) => {
            API.signup(user)
                .then((output) => {
                    if (output === 0) {
                        console.log("Failed signup");
                        this.setState({messageSignup:"Signup failed!"});
                    } else {
                        console.log("Success signup");
                        var tracking_object = {};
                        tracking_object.current_page = "SIGNUP_PAGE";
                        tracking_object.previous_page = "SEARCH_PAGE";
                        tracking_object.user_id = "jay";
                        tracking_object.session_id = "1";

                        UserTracking.userTracking(tracking_object)
                            .then((status) => {
                                console.log("Tracking status:" + status);


                            });
                        ReactDOM.findDOMNode(this.refs.fn).value = "";
                        ReactDOM.findDOMNode(this.refs.ln).value = "";
                        ReactDOM.findDOMNode(this.refs.em).value = "";
                        ReactDOM.findDOMNode(this.refs.pwd).value = "";
                        this.props.handleClose();
                        alert("Signup successful");
                    }
                });
        };

    render() {
        return (
          <div>
                <h3 style={{color:"rgba(0, 0, 0, 0.5)"}}>SIGN UP</h3>
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

                <button type="button" disabled={!this.state.formValid1} className="btn btn-primary btn-block" value="Submit" onClick={() => this.handleSignup(this.state)}>Submit</button>

                </div>
                </div>
                </form>
                <FormErrors formErrors={this.state.formErrors1} />

</div>
        );
    }
}
export default Signup;
