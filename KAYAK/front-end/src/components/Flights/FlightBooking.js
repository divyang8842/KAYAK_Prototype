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
                <div>
                    <br/>
                    <h4>
                        {this.props.flightsbooking.airline_name_return}
                    </h4>
                    <label>Return Date</label>
                    <p>
                        {this.props.flightsbooking.date_return}
                    </p>
                </div>
                <div>
                    <h2>
                        Depart
                    </h2>
                    <br/>
                    <label>Origin</label>
                    <p>
                        {this.props.flightsbooking.origin_station_return}
                    </p>
                    <label>Departure</label>
                    <p>
                        {this.props.flightsbooking.flight_departure_return}
                    </p>
                </div>

                <div className="col-md-4 col-sm-4 ">
                    <h2>
                        Arrival
                    </h2>
                    <br/>
                    <label>Destination</label>
                    <p>
                        {this.props.flightsbooking.destination_station_return}
                    </p>
                    <label>Arrival</label>
                    <p>
                        {this.props.flightsbooking.flight_arrival_return}
                    </p>
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
            height: '90vh',
            background: '#f2f6fc'
        };
        return(
            <div className="container-fluid" style={{height:'90vh'}}>
                <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/latest/css/bootstrap.min.css"/>
                <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/latest/css/bootstrap-theme.min.css"/>
                <div className="row">
                    <div className="col-md-3 col-sm-3 ">
                    </div>
                    <div className="col-md-6 col-sm-6 " style={styles}>
                    <div style={{height:50}}>
                        <img style={{width:160,height:40,paddingTop:12}}

                                                                           src={require('../../public/images/KAYAK_LOGO.png')}
                                    />
                        </div>
                        <h3>
                       Trip Detail
                        </h3>
                        <hr/>
                        <div>
                            <br/>
                            <h4>
                        {this.props.flightsbooking.airline_name}
                            </h4>
                            <label width='200'>Date</label>
                            <p>
                         {this.props.flightsbooking.date}
                            </p>
                        </div>
                        <div>
                            <h2>
                                Depart
                            </h2>
                            <br/>
                            <label width='200'>Origin</label>
                            <p>
                            {this.props.flightsbooking.origin_station}
                            </p>
                            <label width='200'>Departure</label>
                            <p>
                            {this.props.flightsbooking.flight_departure}
                            </p>
                        </div>

                        <div>
                            <h2>
                                Arrival
                            </h2>
                            <br/>
                            <label width='200'>Destination</label>
                            <p>
                            {this.props.flightsbooking.destination_station}
                            </p>
                            <label width='200'>Arrival</label>
                            <p>
                            {this.props.flightsbooking.flight_arrival}
                            </p>
                        </div>
                        {this.return_display()}

                        <div className="row">
                                <div className="col-lg-4 col-md-4">
                                </div>
                        <div className="col-lg-4 col-md-4">
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
                                        if(currentpath[currentpath.length-1] != currentpage)
                                        currentpath.push(currentpage);
                                        this.props.updateTracking({currentpath, currentpage, timenow});
                                        this.props.history.push("/");
                                    });


                            }
                            }>Book Now</button>
                            </div>
                            <div className="col-lg-4 col-md-4">
                            </div>
                            </div>
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