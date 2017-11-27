import React, {Component} from 'react';
import { Route, Link,Switch } from 'react-router-dom';
import Login from './Login';
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
import Flightbooking from './Flights/FlightBooking'

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
    firstname:''
  };

  logged = (id,type,name) => {
    this.setState({islogged:'true',uid:id,firstname:name});
    if(type==1)
    this.setState({isAdmin:true});
    console.log("Logged: "+this.state.islogged);

  };

  isNotlogged=()=>{
    console.log("ANJANA CHECK ");
    this.setState({islogged:'false',uid:'',firstname:'',name:''});
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
      					<a href="#" className="js-fh5co-nav-toggle fh5co-nav-toggle dark"><i></i></a>
      					<h1 id="fh5co-logo"><a href="index.html"><i className="icon-airplane"></i>Kayak</a></h1>
                        {this.state.isAdmin===false ?<nav id="fh5co-menu-wrap" role="navigation">
      						<ul className="sf-menu" id="fh5co-primary-menu">
                    <li className="active"><Link to='/'>Home</Link></li>
                    <li><Link to='/login'>Flight</Link></li>
                    <li><Link to='/login'>Car</Link></li>
                    <li><Link to='/login'>Hotel</Link></li>
                  {this.state.islogged==='false' ? (<li><Link to='/login'>Login | Signup</Link></li>)
                  : (<li><Link to='' onClick={e => e.preventDefault()}>{this.state.firstname}</Link> <ul className="fh5co-sub-menu"><li><Link to='/account'>My Account</Link></li><li><Link to='/' onClick={this.handleLogout}>Logout</Link></li></ul></li>)}
      						</ul>
      					</nav>:<nav id="fh5co-menu-wrap" role="navigation">
                            <ul className="sf-menu" id="fh5co-primary-menu">
                                <li className="active"><Link to='/'>AdminHome</Link></li>
                                <li><Link to='/flight'>Flight</Link></li>
                                <li><Link to='/car'>Car</Link></li>
                                <li><Link to='/hotel'>Hotel</Link></li>
                                <li><Link to='/analytics'>Analytics</Link></li>
                                <li><Link to='' onClick={e => e.preventDefault()}>Manage</Link> <ul className="fh5co-sub-menu"><li><Link to='/AdminUsers'>Users</Link></li><li><Link to='/AdminCreate'>Admin</Link></li></ul></li>
                                {this.state.islogged==='false' ? (<li><Link to='/login'>Login | Signup</Link></li>)
                                    : (<li><Link to='' onClick={e => e.preventDefault()}>Admin</Link> <ul className="fh5co-sub-menu"><li><Link to='/account'>My Account</Link></li><li><Link to='/' onClick={this.handleLogout}>Logout</Link></li></ul></li>)}
                            </ul>
                        </nav>}

      				</div>
      			</div>
      		</header>

         <Switch>
          <Route exact path="/" component={Search}/>
          <Route exact path="/Hotels" component={() => <HotelsHome/>}/>
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


          </div>
        </div>
</div>


        );
    }
}

export default Home;
