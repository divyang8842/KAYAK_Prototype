import React, { Component } from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import '../../public/css/animate.css';
import '../../public/css/bootstrap.css';
import '../../public/css/magnific-popup.css';
import '../../public/css/superfish.css';
import '../../public/css/bootstrap-datepicker.min.css';
import '../../public/css/magnific-popup.css';
import '../../public/css/cs-select.css';
import '../../public/css/cs-skin-border.css';
import '../../public/css/style.css';
import * as FlightsAPI from '../../api/FlightsAPI';
import {getFlights} from '../../actions/Flights/Flights';
import {getReturnFlights} from '../../actions/Flights/Flights';

class SearchPanel extends Component {

    state={
        Flights:{
            Source:'',
            Destination:'',
            Depart:'',
            Return:'',
            Class:'',
            Adult:''
        }
    };

    componentWillMount(){

        if(this.props.flights){
            if(!(this.props.flights.length>0)){
                var flights = {
                    Source:localStorage.flight_Source,
                    Destination:localStorage.flight_Destination,
                    Depart:localStorage.flight_Depart,
                    Return:localStorage.flight_Return,
                    Class:localStorage.flight_Class,
                    Adult:localStorage.flight_Adult
                };

                FlightsAPI.getFlights(flights)
                    .then((output) => {
                        this.props.getFlights(output);

                        if(flights.Return !== null && flights.Return !== "")
                        {
                            var flights_return = {
                                Source:localStorage.flight_Source_return,
                                Destination:localStorage.flight_Destination_return,
                                Depart:localStorage.flight_Depart_return,
                                Return:localStorage.flight_Return_return,
                                Class:localStorage.flight_Class_return,
                                Adult:localStorage.flight_Adult_return
                            };

                            FlightsAPI.getFlights(flights_return)
                                .then((output) => {

                                    this.props.getReturnFlights(output);
                                    this.props.handler();

                                });

                        }
                        else
                            {
                                this.props.handler();

                        }

                })

            }}
    }
    handleFlightSearch(){
        if (typeof(Storage) !== "undefined") {
            localStorage.flight_Source = this.state.Flights.Source;
            localStorage.flight_Destination = this.state.Flights.Destination;
            localStorage.flight_Depart = this.state.Flights.Depart;
            localStorage.flight_Return = this.state.Flights.Return;
            localStorage.flight_Class = this.state.Flights.Class;
            localStorage.flight_Adult  = this.state.Flights.Adult;
        }

        FlightsAPI.getFlights(this.state.Flights)
            .then((output) => {
                this.props.getFlights(output);


                if(this.state.Flights.Return !== null && this.state.Flights.Return !== "")
                {
                    if (typeof(Storage) !== "undefined") {
                        localStorage.flight_Source_return = this.state.Flights.Destination;
                        localStorage.flight_Destination_return = this.state.Flights.Source;
                        localStorage.flight_Depart_return = this.state.Flights.Return;
                        localStorage.flight_Return_return = '';
                        localStorage.flight_Class_return = this.state.Flights.Class;
                        localStorage.flight_Adult_return  = this.state.Flights.Adult;
                    }

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
                            this.props.handler();

                        });

                }
                else
                {
                    this.props.handler();
                }

            });

    }

    render() {
        var styles = {
            padding:'10px'
        };
        return (
            <div>
                <div role="tabpanel" className="tab-pane" id="hotelsearch">
                    <div className="row" style={styles}>
              <span>
              <div className="col-xxs-2 col-xs-2">
                <div className="input-field">
                    <div className="input-field">
                   <input type="text"
                          className="searchcss"
                          id="from-place"
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
              </div>
              <div className="col-xxs-2 col-xs-2">
                <div className="input-field">
                   <input type="text"
                          className="searchcss"
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
              <div className="col-xxs-2 col-xs-2 ">
                <div className="input-field">
                   <input type="date"
                          className="searchcss"
                          id="date-start"
                          placeholder="mm/dd/yyyy"
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
              <div className="col-xxs-2 col-xs-2">
                <div className="input-field">
                  <input type="date"
                         className="searchcss"
                         id="date-end"
                         placeholder="mm/dd/yyyy"
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
                      <div className="input-field">

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

              <div className="col-xs-2">
                <button className="searchbtn"
                        onClick={() => this.handleFlightSearch()}>></button>
              </div>
              </span>
                    </div>
                </div>
            </div>
        );
    }
}

function mapDispatchToProps(dispatch) {
    return {
        getFlights : (data) => dispatch(getFlights(data)),
        getReturnFlights:(data) => dispatch(getReturnFlights(data))
    };
}

function mapStateToProps(state) {
    const flights = Object.keys(state.getflights).map((items) => (
        {
            'flights' : state.getflights[items]


        }
    ));

    const flights_return = Object.keys(state.getreturnflights).map((items) => (
        {
            'flights_return' : state.getreturnflights[items]


        }
    ));

    return {flights,flights_return};
}

export default connect(mapStateToProps, mapDispatchToProps)(SearchPanel);