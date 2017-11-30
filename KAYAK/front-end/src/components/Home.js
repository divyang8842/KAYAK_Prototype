import React, {Component} from 'react';
import { Route, Link,Switch } from 'react-router-dom';
import Login from './Login';
import Signup from './Signup';
import Search from './Search';
import Account from './Account';
import HotelsHome from './Hotels/HotelsHome';
import FlightsHome from './Flights/FlightsHome';
import CarHome from './Cars/CarHome';
import CarBooking from './Cars/CarBooking';
import Hotel from './Admin/Hotel';
import Car from './Admin/Car';
import AdminUsers from './Admin/AdminUsers';
import AdminCreate from './Admin/AdminCreate';
import Analytics from './Admin/Analytics';
import Flight from './Admin/Flight';
import Flightbooking from './Flights/FlightBooking';
import HotelBooking from './Hotels/HotelBooking';
import Dialog from 'react-bootstrap-dialog';

import * as API from '../api/SigninSignup-API';
import '../public/css/animate.css';
import '../public/css/bootstrap.css';
import '../public/css/magnific-popup.css';
import '../public/css/superfish.css';
import '../public/css/bootstrap-datepicker.min.css';
import '../public/css/magnific-popup.css';
import '../public/css/cs-select.css';
import '../public/css/cs-skin-border.css';
import '../public/css/style.css';

class Home extends Component {

  state={
    islogged:'false',
    uid:'',
    isAdmin:false,
    firstname:'',
    type:''
  };

  logged = (id,ty,name) => {
    //this.refs.closeButton.click();
    this.setState({islogged:'true',uid:id,firstname:name,type:ty});
    if(ty==1)
    this.setState({isAdmin:true});
    console.log("Logged: "+this.state.islogged);

  };

  isNotlogged=()=>{
    this.setState({islogged:'false',uid:'',firstname:'',name:''});
  }

  closeModal=()=>{
      this.refs.closeLogin.click();
      this.refs.closeSignup.click();
  }
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
                  this.isNotlogged();

                } else {
                    console.log("Correct ");
                    localStorage.setItem('userid', output.userid);
                    this.logged(output.userid,output.type,output.firstname);
                }
            });
    }
  }


  handleLogout = () => {
    //this.setState({islogged:'false'});
    console.log("Logout: "+this.state.islogged);
    API.logout()
    .then((status) => {
      if(status === 201){
        this.setState({islogged:'false',isAdmin:false});
        console.log("LOCALSTO: "+localStorage.getItem('userid'));
        localStorage.removeItem('userid');
          console.log('logout success---'+this.state.islogged);
              }
              else {
                console.log('logout called error');
              }
          });
  };

    render() {
        return (
          <div style={{backgroundImage: "url(../public/images/Cover_pic.jpg)"}}>
          <div id="fh5co-wrapper">
      		<div id="fh5co-page">

      		<header id="fh5co-header-section" className="sticky-banner">
      			<div className="container">
      				<div className="nav-header">
              <div><h1 id="fh5co-logo"><a href="http://localhost:3000/">Kayak</a></h1></div>

                        {this.state.isAdmin===false ?<nav id="fh5co-menu-wrap" role="navigation">
      						<ul className="sf-menu" id="fh5co-primary-menu">
                    <li className="active"><Link to='/'>Home</Link></li>
                    <li><Link to='/flightsearch'>Flight</Link></li>
                    <li><Link to='/hotelsearch'>Hotel</Link></li>
                    <li><Link to='/carsearch'>Car</Link></li>
                  {this.state.islogged==='false' ? (<li><Link to='' onClick={e => e.preventDefault()}>My Account</Link> <ul className="fh5co-sub-menu"><li><button type="button" style={{color:"#F78536",background:"white"}} className="btn btn-primary" data-toggle="modal" data-target="#loginModal">Sign in</button></li>
                                                                                                                                                       <li><button type="button" style={{color:"#F78536",background:"white"}} className="btn btn-primary" data-toggle="modal" data-target="#signupModal">Sign up</button></li></ul></li>)
                  : (<li><Link to='' onClick={e => e.preventDefault()}>{this.state.firstname}</Link> <ul className="fh5co-sub-menu"><li><Link to='/account'>My Account</Link></li><li><Link to='/' onClick={this.handleLogout}>Logout</Link></li></ul></li>)}
                  </ul>
      					</nav>:<nav id="fh5co-menu-wrap" role="navigation">
                            <ul className="sf-menu" id="fh5co-primary-menu">
                                <li className="active"><Link to='/'>AdminHome</Link></li>
                                <li><Link to='/flight'>Flight</Link></li>
                                <li><Link to='/hotel'>Hotel</Link></li>
                                <li><Link to='/car'>Car</Link></li>
                                <li><Link to='/analytics'>Analytics</Link></li>
                                <li><Link to='' onClick={e => e.preventDefault()}>Manage</Link> <ul className="fh5co-sub-menu"><li><Link to='/AdminUsers'>Users</Link></li><li><Link to='/AdminCreate'>Admin</Link></li></ul></li>
                                {this.state.islogged==='false' ? (<li><Link to='' onClick={e => e.preventDefault()}>My Account</Link> <ul className="fh5co-sub-menu"><li><button type="button" style={{color:"#F78536",background:"white"}} className="btn btn-primary" data-toggle="modal" data-target="#loginModal">Sign in</button></li>
                                                                                                                                                                     <li><button type="button" style={{color:"#F78536",background:"white"}} className="btn btn-primary" data-toggle="modal" data-target="#signupModal">Sign up</button></li></ul></li>)
                                    : (<li><Link to='' onClick={e => e.preventDefault()}>Admin</Link> <ul className="fh5co-sub-menu"><li><Link to='/account'>My Account</Link></li><li><Link to='/' onClick={this.handleLogout}>Logout</Link></li></ul></li>)}
                            </ul>
                        </nav>}
      				</div>
      			</div>
      		</header>

         <Switch>
          <Route exact path="/" component={Search}/>
          <Route exact path="/flightsearch" component={() => <Search temp={1}/>}/>
          <Route exact path="/carsearch" component={() => <Search temp={3}/>}/>
           <Route exact path="/hotelsearch" component={() => <Search temp={2}/>}/>

          <Route exact path="/Hotels" component={() => <HotelsHome/>}/>
          <Route exact path="/hotelsbooking" component={() => <HotelBooking/>}/>
          <Route exact path="/flights" component={() => <FlightsHome/>}/>
           <Route exact path="/flightsbooking" component={() => <Flightbooking/>}/>
             <Route exact path="/cars" component={() => <CarHome/>}/>
          {this.state.islogged==='false' ? (<Route exact path="/login" component={() => <Login handleLogged={this.logged} handleNotLogged={this.isNotlogged}/>}/>):(<Route exact path="/login" component={Search}/>)}
          <Route exact path="/account" component={() => <Account user={this.state.islogged} id={this.state.uid} handleLogged={this.logged} handleNotLogged={this.isNotlogged}/>}/>
          <Route exact path="/hotel" component={() => <Hotel/>}/>
             <Route exact path="/car" component={() => <Car/>}/>
             <Route exact path="/carsbooking" component={() => <CarBooking/>}/>
             <Route exact path="/flight" component={() => <Flight/>}/>
             <Route exact path="/AdminUsers" component={() => <AdminUsers user={this.state.islogged} handleLogged={this.logged} handleNotLogged={this.isNotlogged}/>}/>
             <Route exact path="/AdminCreate" component={() => <AdminCreate user={this.state.islogged} handleLogged={this.logged} handleNotLogged={this.isNotlogged}/>}/>
             <Route exact path="/analytics" component={() => <Analytics/>}/>
         </Switch>

         <div className="modal fade" id="loginModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLongTitle" aria-hidden="true">
           <div className="modal-dialog" role="document">
             <div className="modal-content">
               <div className="modal-header">
                 <button type="button" ref="closeLogin" className="close" data-dismiss="modal" aria-label="Close">
                   <span aria-hidden="true">&times;</span>
                 </button>
               </div>
               <div className="modal-body">
                <Login handleClose={this.closeModal} handleLogged={this.logged} handleNotLogged={this.isNotlogged}/>
               </div>
             </div>
           </div>
         </div>

         <div className="modal fade" id="signupModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLongTitle" aria-hidden="true">
           <div className="modal-dialog" role="document">
             <div className="modal-content">
               <div className="modal-header">
                 <button type="button" ref="closeSignup" className="close" data-dismiss="modal" aria-label="Close">
                   <span aria-hidden="true">&times;</span>
                 </button>
               </div>
               <div className="modal-body">
                <Signup handleClose={this.closeModal}/>
               </div>
             </div>
           </div>
         </div>


          </div>
        </div>
</div>


        );
    }
}

export default Home;
