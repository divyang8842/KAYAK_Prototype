import React, {Component} from 'react';
import { Route, Link,Switch } from 'react-router-dom';
import Login from './Login';
import Search from './Search';
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
    islogged:'false'
  };

    render() {
        return (
          <div>
          <div id="fh5co-wrapper">
      		<div id="fh5co-page">

      		<header id="fh5co-header-section" className="sticky-banner">
      			<div className="container">
      				<div className="nav-header">
      					<a href="#" className="js-fh5co-nav-toggle fh5co-nav-toggle dark"><i></i></a>
      					<h1 id="fh5co-logo"><a href="index.html"><i className="icon-airplane"></i>Kayak</a></h1>
      					<nav id="fh5co-menu-wrap" role="navigation">
      						<ul className="sf-menu" id="fh5co-primary-menu">
                    <li className="active"><Link to='/'>Home</Link></li>
                    <li><Link to='/login'>Flight</Link></li>
                    <li><Link to='/login'>Car</Link></li>
                    <li><Link to='/login'>Hotel</Link></li>
                  {this.state.islogged==='false' ? (<li><Link to='/login'>Login | Signup</Link></li>)
                  : (<li><Link to='/login'>Logout</Link></li>)}
      						</ul>
      					</nav>

      				</div>
      			</div>
      		</header>

          <Switch>
          <Route exact path="/" component={Search}/>
          <Route exact path="/login" component={() => <Login/>}/>
          </Switch>

          </div>
        </div>
</div>
        );
    }
}

export default Home;
