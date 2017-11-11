import React, {Component} from 'react';
import * as API from '../api/SigninSignup-API';
import ReactDOM from 'react-dom';
import Search from './Home';

class Login extends Component {

  state={
    firstname:'',
    lastname:'',
    email:'',
    pass:'',

    user:'',
    messageLogin:'false',
    message:'',
    username:'',
    password:''
  };


     handleLogin = (input) => {
          console.log(input.loginemail);
            API.login(input)
                .then((output) => {
                    if (output === 0) {
                      console.log("OUPUT= "+output);
                      this.setState({islogged: 'false', message:"Invalid credentials. Login again." });
                        console.log("Wrong login: "+this.state.islogged);
                    } else {
                      this.setState({messageLogin: 'true', user: output, message:"Login Failed."});

                        console.log("Success login= "+output.uid);
                        this.props.handleLogged(output.uid);
                    }
                });
        };

        handleSignup = (user) => {
          console.log("CHECK: "+user.firstname);
            API.signup(user)
                .then((output) => {
                    if (output === 0) {
                        console.log("Failed signup");
                    } else {
                        console.log("Success signup");
                    }
                });
        };
      /*<input type="submit" className="btn btn-primary btn-block" value="Submit" />
      <input type="submit" className="btn btn-primary btn-block" value="Submit" onClick={() => this.handleSignup(this.state)}/>
      <button type="button" className="btn btn-primary btn-block" value="Submit" onClick={() => this.handleSignup(this.state)}>Submit</button>
//<button type="button" className="btn btn-primary btn-block" value="Submit" onClick={() => this.handleLogin(this.state)}>Submit</button>*/
        componentWillMount(){
                this.setState({username:'',password:'',message:''});
              };

    render() {
        return (
          <div>
            {this.state.messageLogin==='false' ? (
<div id="fh5co-wrapper">
<div id="fh5co-page">

<div className="fh5co-hero">
  <div className="fh5co-overlay"></div>
  <div className="fh5co-cover" data-stellar-background-ratio="0.5" style={{backgroundImage: "url(../public/images/cover_bg_1.jpg)"}}>

    <div className="desc">
      <div className="container">
        <div className="row">
        <div className="col-sm-5 col-md-5">
          <div className="tabulation animate-box">
            <div className="tab-content">
            <h3 style={{color:"rgba(0, 0, 0, 0.5)"}}>SIGN UP</h3>

            <form>
          <div className="row">
          <div className="col-xxs-12 col-xs-6 mt">
            <div className="input-field">
              <label>First Name:</label>
              <input type="text" ref="fn" className="form-control" onChange={(event)=>{
                                           this.setState({firstname: event.target.value});}}/>
            </div>
          </div>
          <div className="col-xxs-12 col-xs-6 mt">
            <div className="input-field">
              <label>Last Name:</label>
              <input type="text" ref="ln" className="form-control" onChange={(event)=>{
                                           this.setState({lastname: event.target.value});}}/>
            </div>
          </div>
            <div className="col-xxs-12 col-xs-6 mt">
              <div className="input-field">
                <label>Email:</label>
                <input type="text" ref="em" className="form-control" onChange={(event)=>{
                                             this.setState({email: event.target.value});}}/>
              </div>
            </div>
            <div className="col-xxs-12 col-xs-6 mt">
              <div className="input-field">
                <label>Password:</label>
                <input type="password" ref="pwd" className="w3-input" onChange={(event)=>{
                                              this.setState({pass: event.target.value});}}/>
              </div>
            </div>

            <div className="col-xs-12">
<input type="submit" className="btn btn-primary btn-block" value="Submit" onClick={() => this.handleSignup(this.state)}/>
            </div>
          </div>
          </form>

        </div>
      </div>
    </div>

    <div className="col-sm-2 col-md-2"></div>

    <div className="col-sm-5 col-md-5">
            <div className="tabulation animate-box">
              <div className="tab-content">
              <h3 style={{color:"rgba(0, 0, 0, 0.5)"}}>SIGN IN</h3>
              <form>
                <div className="row">
                  <div className="col-xxs-12 col-xs-6 mt">
                    <div className="input-field">

                      <label>Email:</label>
                      <input type="text" className="form-control" onChange={(event)=>{
                                                   this.setState({username: event.target.value});}}/>
                    </div>
                  </div>
                  <div className="col-xxs-12 col-xs-6 mt">
                    <div className="input-field">
                      <label>Password:</label>
                      <input type="password" className="form-control" onChange={(event)=>{
                                                    this.setState({password: event.target.value});}}/>
                    </div>
                  </div><font color="red">{this.state.message}</font>
                  <div className="col-xs-12">
                  <button type="button" className="btn btn-primary btn-block" value="Submit" onClick={() => this.handleLogin(this.state)}>Submit</button>
                  </div>
                </div>
                </form>

                </div>
              </div>
              </div>


        </div>
        </div>

    </div>
  </div>
</div>

</div>
</div>) :(<Search/>)}
</div>
        );
    }
}

export default Login;
