import React, {Component} from 'react';
//import * as API from '../api/api';
import { Route, Link,Switch,withRouter } from 'react-router-dom';
import {connect} from 'react-redux';
import {carsbooking} from '../../api/CarsAPI'


class CarBooking extends Component {



    render()
    {
        return(
            <div className="container-fluid">
                <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/latest/css/bootstrap.min.css"/>
                <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/latest/css/bootstrap-theme.min.css"/>
                <div className="row">

                    Order Confirmation!
                    <h3>
                       Car Name!
                        <br/>
                        {this.props.carsbooking.car_model}
                        <br/>
                        Car Type!
                        <br/>
                        {this.props.carsbooking.car_type}
                        {this.props.carsbooking.Pickup}
                        {this.props.carsbooking.Dropoff}

                    </h3>
                    <button className="btn btn-primary btn-block"
                            onClick={() =>{
                                var payload = {};
                                 carsbooking(this.props.carsbooking)
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
    const carsbooking = state.carsbooking;

    return {carsbooking};
}


export default withRouter(connect(mapStateToProps, null)(CarBooking)) ;

