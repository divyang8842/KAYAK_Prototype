import React, {Component} from 'react';
//import * as API from '../api/api';
import { Route, Link,Switch,withRouter } from 'react-router-dom';
import {connect} from 'react-redux';
import {flightsbooking} from '../../api/FlightsAPI'


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
                                flightsbooking(this.props.flightsbooking)
                                    .then((output) => {
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