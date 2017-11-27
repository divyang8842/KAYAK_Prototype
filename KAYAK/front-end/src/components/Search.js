import React, {Component} from 'react';
import { Route, Link,Switch } from 'react-router-dom';
import {bindActionCreators} from 'redux';
import * as FlightsAPI from '../api/FlightsAPI';
import * as HotelsAPI from '../api/HotelsAPI';
import * as CarsAPI from '../api/CarsAPI';
import * as UserTracking from '../api/UserTracking';
import {connect} from 'react-redux';
import {getFlights} from '../actions/Flights/Flights';

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
              this.props.history.push("/Flights");

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
                              <li role="presentation" className="active">
                                <a href="#flights" aria-controls="flights" role="tab" data-toggle="tab">Flights</a>
                              </li>
                              <li role="presentation">
                                <a href="#hotels" aria-controls="hotels" role="tab" data-toggle="tab">Hotels</a>
                              </li>
                              <li role="presentation">
                                <a href="#packages" aria-controls="packages" role="tab" data-toggle="tab">Cars</a>
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

                          <div role="tabpanel" className="tab-pane" id="packages">
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
                                       onClick={() => this.handleCarsSearch()}*/}
                                />
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

    return bindActionCreators({loadHotels : loadHotels, getFlights: getFlights,getCars:getCars}, dispatch);

}

//export default Search;

export default connect(null, mapDispatchToProps)(Search);
