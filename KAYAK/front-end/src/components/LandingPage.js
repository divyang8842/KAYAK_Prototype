import React, {Component} from 'react';
import {withRouter } from 'react-router-dom';



class LandingPage extends Component {


    render() {
        return (

            <div id="fh5co-wrapper">
                <div id="fh5co-page">
                    <header id="fh5co-header-section" className="sticky-banner">
                        <div className="container">
                            <div className="nav-header">
                                <a href="#" className="js-fh5co-nav-toggle fh5co-nav-toggle dark"><i /></a>
                                <h1 id="fh5co-logo"><a href="index.html"><i className="icon-airplane" />Travel</a></h1>
                                {/* START #fh5co-menu-wrap */}
                                <nav id="fh5co-menu-wrap" role="navigation">
                                    <ul className="sf-menu" id="fh5co-primary-menu">
                                        <li className="active"><a href="index.html">Home</a></li>
                                        <li>
                                            <a href="vacation.html" className="fh5co-sub-ddown">Vacations</a>
                                            <ul className="fh5co-sub-menu">
                                                <li><a href="#">Family</a></li>
                                                <li><a href="#">CSS3 &amp; HTML5</a></li>
                                                <li><a href="#">Angular JS</a></li>
                                                <li><a href="#">Node JS</a></li>
                                                <li><a href="#">Django &amp; Python</a></li>
                                            </ul>
                                        </li>
                                        <li><a href="flight.html">Flights</a></li>
                                        <li><a href="hotel.html">Hotel</a></li>
                                        <li><a href="car.html">Car</a></li>
                                        <li><a href="blog.html">Blog</a></li>
                                        <li><a href="contact.html">Contact</a></li>
                                    </ul>
                                </nav>
                            </div>
                        </div>
                    </header>
                    {/* end:header-top */}
                    <div className="fh5co-hero">
                        <div className="fh5co-overlay" />
                        <div className="fh5co-cover" data-stellar-background-ratio="0.5" style={{backgroundImage: 'url(images/cover_bg_1.jpg)'}}>
                            <div className="desc">
                                <div className="container">
                                    <div className="row">
                                        <div className="col-sm-5 col-md-5">
                                            <div className="tabulation animate-box">
                                                {/* Nav tabs */}
                                                <ul className="nav nav-tabs" role="tablist">
                                                    <li role="presentation" className="active">
                                                        <a href="#flights" aria-controls="flights" role="tab" data-toggle="tab">Flights</a>
                                                    </li>
                                                    <li role="presentation">
                                                        <a href="#hotels" aria-controls="hotels" role="tab" data-toggle="tab">Hotels</a>
                                                    </li>
                                                    <li role="presentation">
                                                        <a href="#packages" aria-controls="packages" role="tab" data-toggle="tab">Packages</a>
                                                    </li>
                                                </ul>
                                                {/* Tab panes */}
                                                <div className="tab-content">
                                                    <div role="tabpanel" className="tab-pane active" id="flights">
                                                        <div className="row">
                                                            <div className="col-xxs-12 col-xs-6 mt">
                                                                <div className="input-field">
                                                                    <label htmlFor="from">From:</label>
                                                                    <input type="text" className="form-control" id="from-place" placeholder="Los Angeles, USA" />
                                                                </div>
                                                            </div>
                                                            <div className="col-xxs-12 col-xs-6 mt">
                                                                <div className="input-field">
                                                                    <label htmlFor="from">To:</label>
                                                                    <input type="text" className="form-control" id="to-place" placeholder="Tokyo, Japan" />
                                                                </div>
                                                            </div>
                                                            <div className="col-xxs-12 col-xs-6 mt alternate">
                                                                <div className="input-field">
                                                                    <label htmlFor="date-start">Check In:</label>
                                                                    <input type="text" className="form-control" id="date-start" placeholder="mm/dd/yyyy" />
                                                                </div>
                                                            </div>
                                                            <div className="col-xxs-12 col-xs-6 mt alternate">
                                                                <div className="input-field">
                                                                    <label htmlFor="date-end">Check Out:</label>
                                                                    <input type="text" className="form-control" id="date-end" placeholder="mm/dd/yyyy" />
                                                                </div>
                                                            </div>
                                                            <div className="col-sm-12 mt">
                                                                <section>
                                                                    <label htmlFor="class">Class:</label>
                                                                    <select className="cs-select cs-skin-border">
                                                                        <option value disabled selected>Economy</option>
                                                                        <option value="economy">Economy</option>
                                                                        <option value="first">First</option>
                                                                        <option value="business">Business</option>
                                                                    </select>
                                                                </section>
                                                            </div>
                                                            <div className="col-xxs-12 col-xs-6 mt">
                                                                <section>
                                                                    <label htmlFor="class">Adult:</label>
                                                                    <select className="cs-select cs-skin-border">
                                                                        <option value disabled selected>1</option>
                                                                        <option value={1}>1</option>
                                                                        <option value={2}>2</option>
                                                                        <option value={3}>3</option>
                                                                        <option value={4}>4</option>
                                                                    </select>
                                                                </section>
                                                            </div>
                                                            <div className="col-xxs-12 col-xs-6 mt">
                                                                <section>
                                                                    <label htmlFor="class">Children:</label>
                                                                    <select className="cs-select cs-skin-border">
                                                                        <option value disabled selected>1</option>
                                                                        <option value={1}>1</option>
                                                                        <option value={2}>2</option>
                                                                        <option value={3}>3</option>
                                                                        <option value={4}>4</option>
                                                                    </select>
                                                                </section>
                                                            </div>
                                                            <div className="col-xs-12">
                                                                <input type="submit" className="btn btn-primary btn-block" defaultValue="Search Flight" />
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div role="tabpanel" className="tab-pane" id="hotels">
                                                        <div className="row">
                                                            <div className="col-xxs-12 col-xs-12 mt">
                                                                <div className="input-field">
                                                                    <label htmlFor="from">City:</label>
                                                                    <input type="text" className="form-control" id="from-place" placeholder="Los Angeles, USA" />
                                                                </div>
                                                            </div>
                                                            <div className="col-xxs-12 col-xs-6 mt alternate">
                                                                <div className="input-field">
                                                                    <label htmlFor="date-start">Return:</label>
                                                                    <input type="text" className="form-control" id="date-start" placeholder="mm/dd/yyyy" />
                                                                </div>
                                                            </div>
                                                            <div className="col-xxs-12 col-xs-6 mt alternate">
                                                                <div className="input-field">
                                                                    <label htmlFor="date-end">Check Out:</label>
                                                                    <input type="text" className="form-control" id="date-end" placeholder="mm/dd/yyyy" />
                                                                </div>
                                                            </div>
                                                            <div className="col-sm-12 mt">
                                                                <section>
                                                                    <label htmlFor="class">Rooms:</label>
                                                                    <select className="cs-select cs-skin-border">
                                                                        <option value disabled selected>1</option>
                                                                        <option value="economy">1</option>
                                                                        <option value="first">2</option>
                                                                        <option value="business">3</option>
                                                                    </select>
                                                                </section>
                                                            </div>
                                                            <div className="col-xxs-12 col-xs-6 mt">
                                                                <section>
                                                                    <label htmlFor="class">Adult:</label>
                                                                    <select className="cs-select cs-skin-border">
                                                                        <option value disabled selected>1</option>
                                                                        <option value={1}>1</option>
                                                                        <option value={2}>2</option>
                                                                        <option value={3}>3</option>
                                                                        <option value={4}>4</option>
                                                                    </select>
                                                                </section>
                                                            </div>
                                                            <div className="col-xxs-12 col-xs-6 mt">
                                                                <section>
                                                                    <label htmlFor="class">Children:</label>
                                                                    <select className="cs-select cs-skin-border">
                                                                        <option value disabled selected>1</option>
                                                                        <option value={1}>1</option>
                                                                        <option value={2}>2</option>
                                                                        <option value={3}>3</option>
                                                                        <option value={4}>4</option>
                                                                    </select>
                                                                </section>
                                                            </div>
                                                            <div className="col-xs-12">
                                                                <input type="submit" className="btn btn-primary btn-block" defaultValue="Search Hotel" />
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div role="tabpanel" className="tab-pane" id="packages">
                                                        <div className="row">
                                                            <div className="col-xxs-12 col-xs-6 mt">
                                                                <div className="input-field">
                                                                    <label htmlFor="from">City:</label>
                                                                    <input type="text" className="form-control" id="from-place" placeholder="Los Angeles, USA" />
                                                                </div>
                                                            </div>
                                                            <div className="col-xxs-12 col-xs-6 mt">
                                                                <div className="input-field">
                                                                    <label htmlFor="from">Destination:</label>
                                                                    <input type="text" className="form-control" id="to-place" placeholder="Tokyo, Japan" />
                                                                </div>
                                                            </div>
                                                            <div className="col-xxs-12 col-xs-6 mt alternate">
                                                                <div className="input-field">
                                                                    <label htmlFor="date-start">Departs:</label>
                                                                    <input type="text" className="form-control" id="date-start" placeholder="mm/dd/yyyy" />
                                                                </div>
                                                            </div>
                                                            <div className="col-xxs-12 col-xs-6 mt alternate">
                                                                <div className="input-field">
                                                                    <label htmlFor="date-end">Return:</label>
                                                                    <input type="text" className="form-control" id="date-end" placeholder="mm/dd/yyyy" />
                                                                </div>
                                                            </div>
                                                            <div className="col-sm-12 mt">
                                                                <section>
                                                                    <label htmlFor="class">Rooms:</label>
                                                                    <select className="cs-select cs-skin-border">
                                                                        <option value disabled selected>1</option>
                                                                        <option value="economy">1</option>
                                                                        <option value="first">2</option>
                                                                        <option value="business">3</option>
                                                                    </select>
                                                                </section>
                                                            </div>
                                                            <div className="col-xxs-12 col-xs-6 mt">
                                                                <section>
                                                                    <label htmlFor="class">Adult:</label>
                                                                    <select className="cs-select cs-skin-border">
                                                                        <option value disabled selected>1</option>
                                                                        <option value={1}>1</option>
                                                                        <option value={2}>2</option>
                                                                        <option value={3}>3</option>
                                                                        <option value={4}>4</option>
                                                                    </select>
                                                                </section>
                                                            </div>
                                                            <div className="col-xxs-12 col-xs-6 mt">
                                                                <section>
                                                                    <label htmlFor="class">Children:</label>
                                                                    <select className="cs-select cs-skin-border">
                                                                        <option value disabled selected>1</option>
                                                                        <option value={1}>1</option>
                                                                        <option value={2}>2</option>
                                                                        <option value={3}>3</option>
                                                                        <option value={4}>4</option>
                                                                    </select>
                                                                </section>
                                                            </div>
                                                            <div className="col-xs-12">
                                                                <input type="submit" className="btn btn-primary btn-block" defaultValue="Search Packages" />
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="desc2 animate-box">
                                            <div className="col-sm-7 col-sm-push-1 col-md-7 col-md-push-1">
                                                <p>HandCrafted by <a href="http://frehtml5.co/" target="_blank" className="fh5co-site-name">FreeHTML5.co</a></p>
                                                <h2>Exclusive Limited Time Offer</h2>
                                                <h3>Fly to Hong Kong via Los Angeles, USA</h3>
                                                <span className="price">$599</span>
                                                {/* <p><a class="btn btn-primary btn-lg" href="#">Get Started</a></p> */}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div id="fh5co-tours" className="fh5co-section-gray">
                        <div className="container">
                            <div className="row">
                                <div className="col-md-8 col-md-offset-2 text-center heading-section animate-box">
                                    <h3>Hot Tours</h3>
                                    <p>Far far away, behind the word mountains, far from the countries Vokalia and Consonantia, there live the blind texts.</p>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-md-4 col-sm-6 fh5co-tours animate-box" data-animate-effect="fadeIn">
                                    <div href="#"><img src="../images/place-1.jpg" alt="Free HTML5 Website Template by FreeHTML5.co" className="img-responsive" />
                                        <div className="desc">
                                            <span />
                                            <h3>New York</h3>
                                            <span>3 nights + Flight 5*Hotel</span>
                                            <span className="price">$1,000</span>
                                            <a className="btn btn-primary btn-outline" href="#">Book Now <i className="icon-arrow-right22" /></a>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-md-4 col-sm-6 fh5co-tours animate-box" data-animate-effect="fadeIn">
                                    <div href="#"><img src="../images/place-2.jpg" alt="Free HTML5 Website Template by FreeHTML5.co" className="img-responsive" />
                                        <div className="desc">
                                            <span />
                                            <h3>Philippines</h3>
                                            <span>4 nights + Flight 5*Hotel</span>
                                            <span className="price">$1,000</span>
                                            <a className="btn btn-primary btn-outline" href="#">Book Now <i className="icon-arrow-right22" /></a>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-md-4 col-sm-6 fh5co-tours animate-box" data-animate-effect="fadeIn">
                                    <div href="#"><img src="../images/place-3.jpg" alt="Free HTML5 Website Template by FreeHTML5.co" className="img-responsive" />
                                        <div className="desc">
                                            <span />
                                            <h3>Hongkong</h3>
                                            <span>2 nights + Flight 4*Hotel</span>
                                            <span className="price">$1,000</span>
                                            <a className="btn btn-primary btn-outline" href="#">Book Now <i className="icon-arrow-right22" /></a>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-md-12 text-center animate-box">
                                    <p><a className="btn btn-primary btn-outline btn-lg" href="#">See All Offers <i className="icon-arrow-right22" /></a></p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div id="fh5co-features">
                        <div className="container">
                            <div className="row">
                                <div className="col-md-4 animate-box">
                                    <div className="feature-left">
                    <span className="icon">
                      <i className="icon-hotairballoon" />
                    </span>
                                        <div className="feature-copy">
                                            <h3>Family Travel</h3>
                                            <p>Facilis ipsum reprehenderit nemo molestias. Aut cum mollitia reprehenderit.</p>
                                            <p><a href="#">Learn More</a></p>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-md-4 animate-box">
                                    <div className="feature-left">
                    <span className="icon">
                      <i className="icon-search" />
                    </span>
                                        <div className="feature-copy">
                                            <h3>Travel Plans</h3>
                                            <p>Facilis ipsum reprehenderit nemo molestias. Aut cum mollitia reprehenderit.</p>
                                            <p><a href="#">Learn More</a></p>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-md-4 animate-box">
                                    <div className="feature-left">
                    <span className="icon">
                      <i className="icon-wallet" />
                    </span>
                                        <div className="feature-copy">
                                            <h3>Honeymoon</h3>
                                            <p>Facilis ipsum reprehenderit nemo molestias. Aut cum mollitia reprehenderit.</p>
                                            <p><a href="#">Learn More</a></p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-md-4 animate-box">
                                    <div className="feature-left">
                    <span className="icon">
                      <i className="icon-wine" />
                    </span>
                                        <div className="feature-copy">
                                            <h3>Business Travel</h3>
                                            <p>Facilis ipsum reprehenderit nemo molestias. Aut cum mollitia reprehenderit.</p>
                                            <p><a href="#">Learn More</a></p>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-md-4 animate-box">
                                    <div className="feature-left">
                    <span className="icon">
                      <i className="icon-genius" />
                    </span>
                                        <div className="feature-copy">
                                            <h3>Solo Travel</h3>
                                            <p>Facilis ipsum reprehenderit nemo molestias. Aut cum mollitia reprehenderit.</p>
                                            <p><a href="#">Learn More</a></p>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-md-4 animate-box">
                                    <div className="feature-left">
                    <span className="icon">
                      <i className="icon-chat" />
                    </span>
                                        <div className="feature-copy">
                                            <h3>Explorer</h3>
                                            <p>Facilis ipsum reprehenderit nemo molestias. Aut cum mollitia reprehenderit.</p>
                                            <p><a href="#">Learn More</a></p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div id="fh5co-destination">
                        <div className="tour-fluid">
                            <div className="row">
                                <div className="col-md-12">
                                    <ul id="fh5co-destination-list" className="animate-box">
                                        <li className="one-forth text-center" style={{backgroundImage: 'url(images/place-1.jpg)'}}>
                                            <a href="#">
                                                <div className="case-studies-summary">
                                                    <h2>Los Angeles</h2>
                                                </div>
                                            </a>
                                        </li>
                                        <li className="one-forth text-center" style={{backgroundImage: 'url(images/place-2.jpg)'}}>
                                            <a href="#">
                                                <div className="case-studies-summary">
                                                    <h2>Hongkong</h2>
                                                </div>
                                            </a>
                                        </li>
                                        <li className="one-forth text-center" style={{backgroundImage: 'url(images/place-3.jpg)'}}>
                                            <a href="#">
                                                <div className="case-studies-summary">
                                                    <h2>Italy</h2>
                                                </div>
                                            </a>
                                        </li>
                                        <li className="one-forth text-center" style={{backgroundImage: 'url(images/place-4.jpg)'}}>
                                            <a href="#">
                                                <div className="case-studies-summary">
                                                    <h2>Philippines</h2>
                                                </div>
                                            </a>
                                        </li>
                                        <li className="one-forth text-center" style={{backgroundImage: 'url(images/place-5.jpg)'}}>
                                            <a href="#">
                                                <div className="case-studies-summary">
                                                    <h2>Japan</h2>
                                                </div>
                                            </a>
                                        </li>
                                        <li className="one-half text-center">
                                            <div className="title-bg">
                                                <div className="case-studies-summary">
                                                    <h2>Most Popular Destinations</h2>
                                                    <span><a href="#">View All Destinations</a></span>
                                                </div>
                                            </div>
                                        </li>
                                        <li className="one-forth text-center" style={{backgroundImage: 'url(images/place-6.jpg)'}}>
                                            <a href="#">
                                                <div className="case-studies-summary">
                                                    <h2>Paris</h2>
                                                </div>
                                            </a>
                                        </li>
                                        <li className="one-forth text-center" style={{backgroundImage: 'url(images/place-7.jpg)'}}>
                                            <a href="#">
                                                <div className="case-studies-summary">
                                                    <h2>Singapore</h2>
                                                </div>
                                            </a>
                                        </li>
                                        <li className="one-forth text-center" style={{backgroundImage: 'url(images/place-8.jpg)'}}>
                                            <a href="#">
                                                <div className="case-studies-summary">
                                                    <h2>Madagascar</h2>
                                                </div>
                                            </a>
                                        </li>
                                        <li className="one-forth text-center" style={{backgroundImage: 'url(images/place-9.jpg)'}}>
                                            <a href="#">
                                                <div className="case-studies-summary">
                                                    <h2>Egypt</h2>
                                                </div>
                                            </a>
                                        </li>
                                        <li className="one-forth text-center" style={{backgroundImage: 'url(images/place-10.jpg)'}}>
                                            <a href="#">
                                                <div className="case-studies-summary">
                                                    <h2>Indonesia</h2>
                                                </div>
                                            </a>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div id="fh5co-blog-section" className="fh5co-section-gray">
                        <div className="container">
                            <div className="row">
                                <div className="col-md-8 col-md-offset-2 text-center heading-section animate-box">
                                    <h3>Recent From Blog</h3>
                                    <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Velit est facilis maiores, perspiciatis accusamus asperiores sint consequuntur debitis.</p>
                                </div>
                            </div>
                        </div>
                        <div className="container">
                            <div className="row row-bottom-padded-md">
                                <div className="col-lg-4 col-md-4 col-sm-6">
                                    <div className="fh5co-blog animate-box">
                                        <a href="#"><img className="img-responsive" src="images/place-1.jpg" alt /></a>
                                        <div className="blog-text">
                                            <div className="prod-title">
                                                <h3><a href="#">30% Discount to Travel All Around the World</a></h3>
                                                <span className="posted_by">Sep. 15th</span>
                                                <span className="comment"><a href>21<i className="icon-bubble2" /></a></span>
                                                <p>Far far away, behind the word mountains, far from the countries Vokalia and Consonantia, there live the blind texts.</p>
                                                <p><a href="#">Learn More...</a></p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-lg-4 col-md-4 col-sm-6">
                                    <div className="fh5co-blog animate-box">
                                        <a href="#"><img className="img-responsive" src="images/place-2.jpg" alt /></a>
                                        <div className="blog-text">
                                            <div className="prod-title">
                                                <h3><a href="#">Planning for Vacation</a></h3>
                                                <span className="posted_by">Sep. 15th</span>
                                                <span className="comment"><a href>21<i className="icon-bubble2" /></a></span>
                                                <p>Far far away, behind the word mountains, far from the countries Vokalia and Consonantia, there live the blind texts.</p>
                                                <p><a href="#">Learn More...</a></p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="clearfix visible-sm-block" />
                                <div className="col-lg-4 col-md-4 col-sm-6">
                                    <div className="fh5co-blog animate-box">
                                        <a href="#"><img className="img-responsive" src="../images/place-3.jpg" alt /></a>
                                        <div className="blog-text">
                                            <div className="prod-title">
                                                <h3><a href="#">Visit Tokyo Japan</a></h3>
                                                <span className="posted_by">Sep. 15th</span>
                                                <span className="comment"><a href>21<i className="icon-bubble2" /></a></span>
                                                <p>Far far away, behind the word mountains, far from the countries Vokalia and Consonantia, there live the blind texts.</p>
                                                <p><a href="#">Learn More...</a></p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="clearfix visible-md-block" />
                            </div>
                            <div className="col-md-12 text-center animate-box">
                                <p><a className="btn btn-primary btn-outline btn-lg" href="#">See All Post <i className="icon-arrow-right22" /></a></p>
                            </div>
                        </div>
                    </div>
                    {/* fh5co-blog-section */}
                    <div id="fh5co-testimonial" style={{backgroundImage: 'url(images/img_bg_1.jpg)'}}>
                        <div className="container">
                            <div className="row animate-box">
                                <div className="col-md-8 col-md-offset-2 text-center fh5co-heading">
                                    <h2>Happy Clients</h2>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-md-4">
                                    <div className="box-testimony animate-box">
                                        <blockquote>
                                            <span className="quote"><span><i className="icon-quotes-right" /></span></span>
                                            <p>“Far far away, behind the word mountains, far from the countries Vokalia and Consonantia, there live the blind texts. Separated they live in Bookmarksgrove right at the coast of the Semantics, a large language ocean.”</p>
                                        </blockquote>
                                        <p className="author">John Doe, CEO <a href="http://freehtml5.co/" target="_blank">FREEHTML5.co</a> <span className="subtext">Creative Director</span></p>
                                    </div>
                                </div>
                                <div className="col-md-4">
                                    <div className="box-testimony animate-box">
                                        <blockquote>
                                            <span className="quote"><span><i className="icon-quotes-right" /></span></span>
                                            <p>“Far far away, behind the word mountains, far from the countries Vokalia and Consonantia, there live the blind texts.”</p>
                                        </blockquote>
                                        <p className="author">John Doe, CEO <a href="http://freehtml5.co/" target="_blank">FREEHTML5.co</a> <span className="subtext">Creative Director</span></p>
                                    </div>
                                </div>
                                <div className="col-md-4">
                                    <div className="box-testimony animate-box">
                                        <blockquote>
                                            <span className="quote"><span><i className="icon-quotes-right" /></span></span>
                                            <p>“Far far away, behind the word mountains, far from the countries Vokalia and Consonantia, there live the blind texts. Separated they live in Bookmarksgrove right at the coast of the Semantics, a large language ocean.”</p>
                                        </blockquote>
                                        <p className="author">John Doe, Founder <a href="#">FREEHTML5.co</a> <span className="subtext">Creative Director</span></p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <footer>
                        <div id="footer">
                            <div className="container">
                                <div className="row row-bottom-padded-md">
                                    <div className="col-md-2 col-sm-2 col-xs-12 fh5co-footer-link">
                                        <h3>About Travel</h3>
                                        <p>Far far away, behind the word mountains, far from the countries Vokalia and Consonantia, there live the blind texts.</p>
                                    </div>
                                    <div className="col-md-2 col-sm-2 col-xs-12 fh5co-footer-link">
                                        <h3>Top Flights Routes</h3>
                                        <ul>
                                            <li><a href="#">Manila flights</a></li>
                                            <li><a href="#">Dubai flights</a></li>
                                            <li><a href="#">Bangkok flights</a></li>
                                            <li><a href="#">Tokyo Flight</a></li>
                                            <li><a href="#">New York Flights</a></li>
                                        </ul>
                                    </div>
                                    <div className="col-md-2 col-sm-2 col-xs-12 fh5co-footer-link">
                                        <h3>Top Hotels</h3>
                                        <ul>
                                            <li><a href="#">Boracay Hotel</a></li>
                                            <li><a href="#">Dubai Hotel</a></li>
                                            <li><a href="#">Singapore Hotel</a></li>
                                            <li><a href="#">Manila Hotel</a></li>
                                        </ul>
                                    </div>
                                    <div className="col-md-2 col-sm-2 col-xs-12 fh5co-footer-link">
                                        <h3>Interest</h3>
                                        <ul>
                                            <li><a href="#">Beaches</a></li>
                                            <li><a href="#">Family Travel</a></li>
                                            <li><a href="#">Budget Travel</a></li>
                                            <li><a href="#">Food &amp; Drink</a></li>
                                            <li><a href="#">Honeymoon and Romance</a></li>
                                        </ul>
                                    </div>
                                    <div className="col-md-2 col-sm-2 col-xs-12 fh5co-footer-link">
                                        <h3>Best Places</h3>
                                        <ul>
                                            <li><a href="#">Boracay Beach</a></li>
                                            <li><a href="#">Dubai</a></li>
                                            <li><a href="#">Singapore</a></li>
                                            <li><a href="#">Hongkong</a></li>
                                        </ul>
                                    </div>
                                    <div className="col-md-2 col-sm-2 col-xs-12 fh5co-footer-link">
                                        <h3>Affordable</h3>
                                        <ul>
                                            <li><a href="#">Food &amp; Drink</a></li>
                                            <li><a href="#">Fare Flights</a></li>
                                        </ul>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-md-6 col-md-offset-3 text-center">
                                        <p className="fh5co-social-icons">
                                            <a href="#"><i className="icon-twitter2" /></a>
                                            <a href="#"><i className="icon-facebook2" /></a>
                                            <a href="#"><i className="icon-instagram" /></a>
                                            <a href="#"><i className="icon-dribbble2" /></a>
                                            <a href="#"><i className="icon-youtube" /></a>
                                        </p>
                                        <p>Copyright 2016 Free Html5 <a href="#">Module</a>. All Rights Reserved. <br />Made with <i className="icon-heart3" /> by <a href="http://freehtml5.co/" target="_blank">Freehtml5.co</a> / Demo Images: <a href="https://unsplash.com/" target="_blank">Unsplash</a></p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </footer>
                </div>
                {/* END fh5co-page */}
            </div>
        );
    }





}

export default withRouter (LandingPage);