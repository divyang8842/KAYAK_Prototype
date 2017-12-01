    import React, {Component} from 'react';
//import * as API from '../api/api';
import { Route, Link,Switch,withRouter } from 'react-router-dom';
import {connect} from 'react-redux';
import {carsbooking} from '../../api/CarsAPI'


class CarBooking extends Component {



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
                            Order Details
                        </h1>
                        <div className="col-md-4 col-sm-4 ">
                            <h2>
                                Car/Date
                            </h2>
                            <br/>
                            <h4>
                                {this.props.carsbooking.car_model}
                            </h4>

                            <h4>
                                {this.props.carsbooking.car_type}
                            </h4>

                            <h4>
                                {this.props.carsbooking.end_date}
                            </h4>
                        </div>
                        <div className="col-md-4 col-sm-4 ">
                            <h2>
                                PickUp
                            </h2>
                            <br/>
                            <h4>
                                {this.props.carsbooking.car_city}
                            </h4>

                            <h4>
                                {this.props.carsbooking.Pickup}

                            </h4>
                        </div>

                        <div className="col-md-4 col-sm-4 ">
                            <h2>
                                Drop Off
                            </h2>
                            <br/>
                            <h4>
                                {this.props.carsbooking.Dropoff}
                            </h4>

                            <h4>
                                {this.props.carsbooking.end_date}
                            </h4>
                        </div>
                        <button className="searchbtn"
                                onClick={() =>{
                                    var payload = {};
                                    carsbooking(this.props.carsbooking)
                                        .then((output) => {
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

function mapStateToProps(state) {
    const carsbooking = state.carsbooking;

    return {carsbooking};
}


export default withRouter(connect(mapStateToProps, null)(CarBooking)) ;

