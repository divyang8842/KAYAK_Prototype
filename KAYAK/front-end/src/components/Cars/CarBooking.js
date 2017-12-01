import React, {Component} from 'react';
//import * as API from '../api/api';
import {bindActionCreators} from 'redux';
import { Route, Link,Switch,withRouter } from 'react-router-dom';
import {connect} from 'react-redux';
import {carsbooking} from '../../api/CarsAPI'
import * as UserTracking from '../../api/UserTracking';
import {updateTracking} from '../../actions/Analytics/Tracking';


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

                                            var tracking_object = {};
                                            tracking_object.current_page = "SEARCH_PAGE";
                                            tracking_object.previous_page = "BILLING_CAR";
                                            tracking_object.user_id = "jay";
                                            tracking_object.session_id = "1";
                                            var prev_time = this.props.tracking.time;
                                            var current_time = Date.now();
                                            var diff= Math.abs(current_time-prev_time);
                                            console.log("Time on page:"+diff);
                                            tracking_object.timeonpage= diff;

                                            UserTracking.userTracking(tracking_object)
                                                .then((status) => {
                                                    console.log("Tracking status:" + status);


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
    return {
        carsbooking: state.carsbooking,
        tracking: state.tracking
    }
}


export default withRouter(connect(mapStateToProps, mapDispatchToProps)(CarBooking)) ;

