import React, {Component} from 'react';
import { Route, Link,Switch } from 'react-router-dom';
import {bindActionCreators} from 'redux';
import * as FlightsAPI from '../api/FlightsAPI';
import * as HotelsAPI from '../api/HotelsAPI';
import * as CarsAPI from '../api/CarsAPI';
import * as UserTracking from '../api/UserTracking';
import {connect} from 'react-redux';
import {getFlights} from '../actions/Flights/Flights';
import {getReturnFlights} from '../actions/Flights/Flights';

import {getCars} from '../actions/Cars/Cars';

import {loadHotels, loadFilteredHotels} from '../actions/Hotels/Hotels';

import '../public/css/bootstrap-datepicker.min.css';
import '../public/css/cs-select.css';
import '../public/css/cs-skin-border.css';

class Search extends Component {

  state={
    Flights:{
      Source:'',
      Destination:'',
      Depart:'',
      Return:'',
      Class:'',
      Adult:''
    },
    Hotels:{
      City:'',
      Checkin:'',
      Checkout:'',
      Rooms:'',
      Guests:''
    },
    Cars:{
      City:'',
        destination:'',
      Pickup:'',
      Dropoff:'',
        different_drop_off:false
    }
  }

  handleHotelSearch(){
    console.log(this.state.Hotels.City);
    // var city = this.state.Hotels.City;
    HotelsAPI.getHotels(this.state.Hotels)
    .then((result) => {
        if(result.results.code == 200){
          this.props.loadHotels(result);
          // this.props.loadFilteredHotels(result);
          this.props.history.push("/Hotels");
        }
    });
  }

  handleFlightSearch(){
      FlightsAPI.getFlights(this.state.Flights)
          .then((output) => {
              var tracking_object={};

              this.props.getFlights(output);

              tracking_object.current_page="FLIGHT_PAGE";
              tracking_object.previous_page="SEARCH_PAGE";
              tracking_object.user_id="jay";
              tracking_object.session_id="1";


              UserTracking.userTracking(tracking_object)
                  .then((status) => {
                  console.log("Tracking status:"+status);


                  });

              if(this.state.Flights.Return !== null)
              {
                    console.log("Please Book Return Ticket also");
                  console.log(this.state.Flights.Return);
                  var return_payload ={};
                  return_payload.Source =this.state.Flights.Destination;
                  return_payload.Destination=this.state.Flights.Source;
                  return_payload.Depart=this.state.Flights.Return;
                  return_payload.Return='';
                  return_payload.Class=this.state.Flights.Class;
                  return_payload.Adult=this.state.Flights.Adult;

                  FlightsAPI.getFlights(return_payload)
                      .then((output) => {

                          this.props.getReturnFlights(output);
                          this.props.history.push("/Flights");

                      });

              }
              else
              {
                  this.props.history.push("/Flights");
              }


          });


  }

    handleCarsSearch(){
        CarsAPI.getCars(this.state.Cars)
            .then((output) => {

                var tracking_object={};
                this.props.getCars(output);

                tracking_object.current_page="CAR_PAGE";
                tracking_object.previous_page="SEARCH_PAGE";
                tracking_object.user_id="jay";
                tracking_object.session_id="1";

                UserTracking.userTracking(tracking_object)
                    .then((status) => {
                        console.log("Tracking status:"+status);
                        });
                this.props.history.push("/Cars");

            });
    }

  render() {
      var blackColor = {
          color: 'black'

      };
      var bgcolor = {
          background:'#c2c8d04f'
      }
      var divStyle = {
          fontSize: 12
        };
      var bgnone = {
          background:'none'
      }
      var mrt = {
          marginTop : 0
      }
      var mrt7 = {
          marginTop : '-7em'
      }

      var mrr1 = {
          marginRight : 10
      }

      return (
        <div>
          <div className="fh5co-hero">
            <div className="fh5co-overlay"></div>
              <div className="fh5co-cover" data-stellar-background-ratio="0.5" style={{backgroundImage: "url(../public/images/Cover_pic.jpg)"}}>

                <div className="desc">


                  <div className="container">
                    <div className="row">
                      <div className="col-sm-12 col-md-12 " style={mrt7}>

                        <div className="tabulation animate-box mbl" style={mrt}>

                            <div style={bgnone} className="col-sm-4 col-md-4">&nbsp;</div>
                            <div className="col-sm-4 col-md-4">
                          <ul className="nav nav-tabs" role="tablist">
                              <li role="presentation">
                                <a href="#flights" aria-controls="flights" role="tab" data-toggle="tab">
                                  <span>  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 20 20"><path d="M16.79 7.83l-3.93 3.93 4.51 7.05.76-.76-1.34-10.22M12.24 3.15L1.62 1.76l-.75.76 7.32 4.69 4.05-4.06"></path><path d="M10.73 11.94l1.3-1.3 4.28-4.28 2.8-2.8s1.54-2.12.46-3.17-3.17.47-3.17.47l-2.62 2.62-4.4 4.4L8 9.24a20 20 0 0 0-2.23 3.2l-4.67-.89L0 12.62l3.79 2.65.92.92L7.41 20l1.07-1.1-.91-4.76a20.06 20.06 0 0 0 3.16-2.2z"></path></svg>
                                    Flights</span></a>
                              </li>
                              <li role="presentation" className="active">
                                <a href="#hotels" aria-controls="hotels" role="tab" data-toggle="tab">
                                     <span><svg xmlns="http://www.w3.org/2000/svg" width="25" height="17" fill="currentColor" viewBox="0 0 25 17"><path d="M2 14.77h21v2H2z"></path><path d="M6 7.07V6a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v1.07h1V6a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v1.07h2V0H4v7.07h2zM21 8.67H4a4.06 4.06 0 0 0-4 4.07v2.43h25v-2.43a4.06 4.06 0 0 0-4-4.07z"></path></svg>
                                   Hotels</span></a>
                              </li>
                              <li role="presentation">
                                <a href="#cars" aria-controls="cars" role="tab" data-toggle="tab"><span><svg xmlns="http://www.w3.org/2000/svg" width="32" height="16" fill="currentColor" viewBox="0 0 32 17"><path d="M10.6 2.77L.61 1.2V0h9.99v2.77"></path><path fill="none" d="M12 1.84v3.33l8.14.11C18.29 3.56 16 1.87 14.72 1.84c-.96-.03-2.72 0-2.72 0z"></path><path d="M31 7.77c-.87-1.6-8.41-2.52-8.41-2.52S17.3.46 14.53 0H6.37h1.5A7.73 7.73 0 0 0 3 1.59a18.47 18.47 0 0 0-3 4.23v3.83c0 3.86 1.55 4.49 2.53 4.52v-.13A3.76 3.76 0 1 1 10 14v.07l9-.01a3.76 3.76 0 0 1 7.52 0h.79a7 7 0 0 0 3.9-.93A28.38 28.38 0 0 0 31 7.77zm-19-2.6V1.84h2.72c1.3 0 3.56 1.72 5.42 3.45z"></path><circle cx="22.71" cy="14.04" r="2.36"></circle><circle cx="6.28" cy="14.04" r="2.36"></circle></svg>
                                    Cars</span></a>
                              </li>
                          </ul>
                            </div>
                            <div className="col-sm-4 col-md-4" ></div>
                        </div>
                            <div className="tabulation animate-box" style={mrt}>
                          <div className="tab-content" style={bgcolor}>
                          <div role="tabpanel" className="tab-pane active" id="flights">
                            <div className="row">
                              <div className="col-xxs-2 col-xs-2 mt">
                                <div className="input-field">
                                 <label>From:</label>
                                  <input type="text"
                                         className="form-control"
                                         id="from-place"
                                         style={blackColor}
                                         placeholder="Los Angeles, USA"
                                         value={this.state.Flights.Source}
                                         onChange={(event) => {
                                             this.setState({
                                                 Flights: {
                                                     ...this.state.Flights,
                                                     Source: event.target.value
                                                 }
                                             });}
                                         }
                                  />
                                </div>
                              </div>
                              <div className="col-xxs-2 col-xs-2 mt">
                                <div className="input-field">
                                 <label>To:</label>
                                  <input type="text"
                                         className="form-control"
                                         id="to-place"
                                         placeholder="Tokyo, Japan"
                                         value={this.state.Flights.Destination}
                                         onChange={(event) => {
                                             this.setState({
                                                 Flights: {
                                                     ...this.state.Flights,
                                                     Destination: event.target.value
                                                 }
                                             });}
                                         }
                                  />
                                </div>
                              </div>
                              <div className="col-xxs-2 col-xs-2 mt alternate " style={mrr1}>
                                <div className="input-field">

                                 <label>Depart:</label>
                                  <input type="date"
                                         className="datecss"
                                         id="date-start"
                                         placeholder="Depart"
                                         value={this.state.Flights.Depart}
                                         onChange={(event) => {
                                             this.setState({
                                                 Flights: {
                                                     ...this.state.Flights,
                                                     Depart: event.target.value
                                                 }
                                             });}
                                         }
                                  />


                                </div>
                              </div>
                              <div className="col-xxs-2 col-xs-2 mt alternate" style={mrr1}>
                                <div className="input-field">
                                 <label>Return:</label>
                                  <input type="date"
                                         className="datecss"
                                         id="date-end"
                                         placeholder="Return"
                                         value={this.state.Flights.Return}
                                         onChange={(event) => {
                                             this.setState({
                                                 Flights: {
                                                     ...this.state.Flights,
                                                     Return: event.target.value
                                                 }
                                             });}
                                         }
                                  />
                                </div>
                              </div>
                              <div className="col-sm-1 mt" >
                                <section>
                                 <label>Class:</label>
                                  <select className="form-control"
                                          style={{border:"none",background:"rgba(0, 0, 0, 0.05)",color:"#F78536",fontWeight:"bold",fontSize:"14px"}}
                                          value={this.state.Flights.Class}
                                          onChange={(event) => {
                                              this.setState({
                                                  Flights: {
                                                      ...this.state.Flights,
                                                      Class: event.target.value
                                                  }
                                              });}
                                          }
                                  >
                                    <option value="" disabled selected>Economy</option>
                                    <option value="economy">Economy</option>
                                    <option value="first">First</option>
                                    <option value="business">Business</option>
                                  </select>
                                </section>
                              </div>
                              <div className="col-xxs-2 col-xs-1 mt">
                                <section>
                                  <label>Adult:</label>
                                  <select className="form-control"
                                          style={{border:"none",background:"rgba(0, 0, 0, 0.05)",color:"#F78536",fontWeight:"bold",fontSize:"14px"}}
                                          value={this.state.Flights.Adult}
                                          onChange={(event) => {
                                              this.setState({
                                                  Flights: {
                                                      ...this.state.Flights,
                                                      Adult: event.target.value
                                                  }
                                              });}
                                          }
                                  >
                                    {/*<option value="" disabled selected={"selected"}>Adult</option>*/}
                                    <option value="1">1</option>
                                    <option value="2">2</option>
                                    <option value="3">3</option>
                                    <option value="4">4</option>
                                  </select>

                                </section>
                              </div>

                              <div className="col-xs-1">
                                  <section>
                                      <label></label>
                                <button className="btn btn-primary btn-block" style={divStyle}
                                  onClick={() => this.handleFlightSearch()}> => </button>
                                  </section>

                              </div>
                            </div>
                          </div>

                          <div role="tabpanel" className="tab-pane" id="hotels">
                            <div className="row">
                              <div className="col-xxs-2 col-xs-2 mt">
                                <div className="input-field">
                                  <label>City:</label>
                                  <input type="text" className="form-control" id="from-place" placeholder="Los Angeles, USA"
                                    onChange={(event) => {
                                        this.setState({
                                            Hotels: {
                                                ...this.state.Hotels,
                                                City: event.target.value
                                            }
                                        });}
                                        }/>
                                </div>
                              </div>
                              <div className="col-xxs-2 col-xs-2 mt alternate"  style={mrr1}>
                                <div className="input-field">
                                  <label>Check In:</label>
                                  <input type="date" className="datecss" id="date-start" placeholder="mm/dd/yyyy"
                                    onChange={(event) => {
                                        this.setState({
                                            Hotels: {
                                                ...this.state.Hotels,
                                                Checkin: event.target.value
                                            }
                                        });}
                                        }/>
                                </div>
                              </div>
                              <div className="col-xxs-2 col-xs-2 mt alternate"  style={mrr1}>
                                <div className="input-field">
                                  <label>Check Out:</label>
                                  <input type="date" className="datecss" id="date-end" placeholder="mm/dd/yyyy"
                                    onChange={(event) => {
                                        this.setState({
                                            Hotels: {
                                                ...this.state.Hotels,
                                                Checkout: event.target.value
                                            }
                                        });}
                                        }/>
                                </div>
                              </div>
                              <div className="col-sm-2 mt">
                                <div className="input-field">
                                  <label>Rooms:</label>
                                  <input type="text" className="form-control" id="rooms" placeholder="Number of Rooms"
                                    onChange={(event) => {
                                        this.setState({
                                            Hotels: {
                                                ...this.state.Hotels,
                                                Rooms: event.target.value
                                            }
                                        });}
                                        }/>
                                </div>
                              </div>
                              <div className="col-xxs-2 col-xs-2 mt">
                                <div className="input-field">
                                <label>Guests:</label>
                                <input type="text" className="form-control" id="guests" placeholder="Number of Guests"
                                  onChange={(event) => {
                                      this.setState({
                                          Hotels: {
                                              ...this.state.Hotels,
                                              Guests: event.target.value
                                          }
                                      });}
                                      }/>
                                </div>
                              </div>
                              <div className="col-xs-1">
                                  <label></label>
                                <button className="btn btn-primary btn-block" style={divStyle}
                                  onClick={() => this.handleHotelSearch()}>=></button>
                              </div>
                            </div>
                          </div>

                          <div role="tabpanel" className="tab-pane" id="cars">
                            <div className="row">
                              <div className="col-xxs-2 col-xs-2 mt">
                                <div className="input-field">
                                  <label>City:</label>
                                  <input type="text"
                                         className="form-control"
                                         id="City"
                                         placeholder="Los Angeles, USA"
                                         onChange={(event) => {
                                             this.setState({
                                                 Cars: {
                                                     ...this.state.Cars,
                                                     City: event.target.value
                                                 }
                                             });}
                                         }/>
                                </div>
                              </div>

                              <div className="col-xxs-2 col-xs-2 mt">
                                <div className="input-field">
                                  <label>Destination:</label>
                                  <input type="text"
                                         className="form-control"
                                         id="destination"
                                         placeholder="Tokyo, Japan"
                                         onChange={(event) => {
                                             this.setState({
                                                 Cars: {
                                                     ...this.state.Cars,
                                                     destination: event.target.value
                                                 }
                                             });}
                                         }/>
                                </div>
                              </div>
                              <div className="col-xxs-2 col-xs-2 mt alternate"  style={mrr1}>
                                <div className="input-field">
                                  <label>Departs:</label>
                                  <input type="date"
                                         className="datecss"
                                         id="Pickup"
                                         placeholder="mm/dd/yyyy"
                                         onChange={(event) => {
                                             this.setState({
                                                 Cars: {
                                                     ...this.state.Cars,
                                                     Pickup: event.target.value
                                                 }
                                             });}
                                         }
                                  />
                                </div>
                              </div>
                              <div className="col-xxs-2 col-xs-2 mt alternate">
                                <div className="input-field">
                                  <label>Return:</label>
                                  <input type="date"
                                         className="datecss"
                                         id="Dropoff"
                                         placeholder="mm/dd/yyyy"
                                         onChange={(event) => {
                                             this.setState({
                                                 Cars: {
                                                     ...this.state.Cars,
                                                     Dropoff: event.target.value
                                                 }
                                             });}
                                         }
                                  />
                                </div>
                              </div>
                                <div className="col-xs-1"></div>
                              <div className="col-xs-1">
                                  <label></label>
                                  <button className="btn btn-primary btn-block" style={divStyle}
                                          onClick={() => this.handleCarsSearch()}>=></button>
                                {/*<input type="submit"
                                       className="btn btn-primary btn-block"
                                       value="Search Cars"
                                       onClick={() => this.handleCarsSearch()}
                                />*/}
                              </div>
                            </div>
                          </div>
                          </div>

                        </div>
                      </div>
                    {/*  <div className="desc2 animate-box">
                        <div className="col-sm-7 col-sm-push-1 col-md-7 col-md-push-1">
                          <p>HandCrafted by <a href="http://frehtml5.co/" target="_blank" className="fh5co-site-name">FreeHTML5.co</a></p>
                          <h2>Exclusive Limited Time Offer</h2>
                          <h3>Fly to Hong Kong via Los Angeles, USA</h3>
                          <span className="price">$599</span>
                        </div>
                      </div>*/}

                    </div>
                  </div>
                </div>
              </div>
          </div>
      </div>
          );
      }
  }

function mapDispatchToProps(dispatch) {

    // return {
    //     getFlights : (data) => dispatch(getFlights(data)),
    //     getCars : (data) => dispatch(getCars(data))
    // };

    // return {
    //     getFlights : (data) => dispatch(getFlights(data)),

    // };

    return bindActionCreators({loadHotels : loadHotels, getFlights: getFlights,getCars:getCars,getReturnFlights:getReturnFlights}, dispatch);

}

//export default Search;

export default connect(null, mapDispatchToProps)(Search);
