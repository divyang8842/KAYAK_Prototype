import React, {Component} from 'react';
//import * as API from '../api/api';
import { Route, Link,Switch,withRouter } from 'react-router-dom';
import {connect} from 'react-redux';
import {flightsbooking} from '../../api/FlightsAPI';
import * as UserTracking from '../../api/UserTracking';


class FlightBooking extends Component {



    render()
    {
        return(
            <div className="container-fluid">
                <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/latest/css/bootstrap.min.css"/>
                <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/latest/css/bootstrap-theme.min.css"/>
                <div className="row">

                   Order Confirmation!
                    <h3>
                        AirLine Name:
                        {this.props.flightsbooking.airline_name}

                    </h3>
                    <button className="btn btn-primary btn-block"
                            onClick={() =>{
                                var payload = {};
                                var tracking_object={};

                                tracking_object.current_page="SEARCH_PAGE";
                                tracking_object.previous_page="BILLING_FLIGHT";
                                tracking_object.user_id="jay";
                                tracking_object.session_id="1";

                                flightsbooking(this.props.flightsbooking)
                                    .then((output) => {

                                        UserTracking.userTracking(tracking_object)
                                            .then((status) => {
                                                console.log("Tracking status:"+status);


                                            });

                                        this.props.history.push("/");
                                    });


                            }
                            }>View Deal</button>

                    {/*FlightsAPI.flightsbooking(this.props.flightsbooking)*/}
                    {/*.then((result) => {*/}

                {/*});*/}
                </div>
            </div>
        );
    }
}

function mapStateToProps(state) {
    const flightsbooking = state.flightbooking;

    return {flightsbooking};
}


export default withRouter(connect(mapStateToProps, null)(FlightBooking)) ;