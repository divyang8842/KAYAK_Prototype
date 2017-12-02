import React, {Component} from 'react';
//import * as API from '../api/api';
import {bindActionCreators} from 'redux';
import { Route, Link,Switch,withRouter } from 'react-router-dom';
import {connect} from 'react-redux';
import {flightsbooking} from '../../api/FlightsAPI';
import * as UserTracking from '../../api/UserTracking';
import {updateTracking} from '../../actions/Analytics/Tracking';


class FlightBooking extends Component {


    return_display()
    {
        if(this.props.flightsbooking.airline_name_return)
        {
            return (
            <div>
                <div className="col-md-4 col-sm-4 ">
                    <h2>
                        Flight/Date
                    </h2>
                    <br/>
                    <h4>
                        {this.props.flightsbooking.airline_name_return}
                    </h4>

                    <h4>
                        {this.props.flightsbooking.date_return}
                    </h4>
                </div>
                <div className="col-md-4 col-sm-4 ">
                    <h2>
                        Depart
                    </h2>
                    <br/>
                    <h4>
                        {this.props.flightsbooking.origin_station_return}
                    </h4>

                    <h4>
                        {this.props.flightsbooking.flight_departure_return}
                    </h4>
                </div>

                <div className="col-md-4 col-sm-4 ">
                    <h2>
                        Arrival
                    </h2>
                    <br/>
                    <h4>
                        {this.props.flightsbooking.destination_station_return}
                    </h4>

                    <h4>
                        {this.props.flightsbooking.flight_arrival_return}
                    </h4>
                </div>

            </div>
            );
        }
        else
        {
            return(
                <div>
                    No Return Ticket Booked!
                </div>
            );
        }

    }
    render()
    {
        var styles = {
            'border-size':'1px',
        'border-style':'solid',
        'border-color':'black'
        };
        return(
            <div className="container-fluid">
                <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/latest/css/bootstrap.min.css"/>
                <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/latest/css/bootstrap-theme.min.css"/>
                <div className="row">
                    <div className="col-md-3 col-sm-3 ">
                    </div>
                    <div className="col-md-6 col-sm-6 " style={styles}>
                        <h1 align="center">
                       Trip Details
                        </h1>
                        <div className="col-md-4 col-sm-4 ">
                    <h2>
                        Flight/Date
                    </h2>
                            <br/>
                            <h4>
                        {this.props.flightsbooking.airline_name}
                            </h4>

                            <h4>
                         {this.props.flightsbooking.date}
                            </h4>
                        </div>
                        <div className="col-md-4 col-sm-4 ">
                            <h2>
                                Depart
                            </h2>
                            <br/>
                            <h4>
                            {this.props.flightsbooking.origin_station}
                            </h4>

                            <h4>
                            {this.props.flightsbooking.flight_departure}
                            </h4>
                        </div>

                        <div className="col-md-4 col-sm-4 ">
                            <h2>
                                Arrival
                            </h2>
                            <br/>
                            <h4>
                            {this.props.flightsbooking.destination_station}
                            </h4>

                            <h4>
                            {this.props.flightsbooking.flight_arrival}
                            </h4>
                        </div>
                        {this.return_display()}


                    <button className="searchbtn"

                            onClick={() =>{
                                var payload = {};
                                var tracking_object={};

                                tracking_object.current_page="SEARCH_PAGE";
                                tracking_object.previous_page="BILLING_FLIGHT";
                                tracking_object.user_id="jay";
                                tracking_object.session_id="1";
                                var prev_time = this.props.tracking.time;
                                var current_time = Date.now();
                                var diff= Math.abs(current_time-prev_time);
                                console.log("Time on page:"+diff);
                                tracking_object.timeonpage= diff;

                                flightsbooking(this.props.flightsbooking)
                                    .then((output) => {

                                        UserTracking.userTracking(tracking_object)
                                            .then((status) => {
                                                console.log("Tracking status:"+status);


                                            });
                                        //Tracking userpath
                                        var currentpath = this.props.tracking.path;
                                        var timenow = Date.now();
                                        var currentpage = "SEARCH_PAGE";
                                        currentpath.push(currentpage);
                                        this.props.updateTracking({currentpath, currentpage, timenow});
                                        this.props.history.push("/");
                                    });


                            }
                            }>Book Now</button>
                    </div>
                    <div className="col-md-3 col-sm-3 ">
                    </div>
                    {/*FlightsAPI.flightsbooking(this.props.flightsbooking)*/}
                    {/*.then((result) => {*/}

                {/*});*/}
                </div>
            </div>
        );
    }
}

function mapDispatchToProps(dispatch) {  
        return bindActionCreators({
            updateTracking: updateTracking}, dispatch);
}

function mapStateToProps(state) {
    const flightsbooking = state.flightbooking;
    const tracking = state.tracking;
    return {flightsbooking, tracking};
}


export default withRouter(connect(mapStateToProps, mapDispatchToProps)(FlightBooking)) ;