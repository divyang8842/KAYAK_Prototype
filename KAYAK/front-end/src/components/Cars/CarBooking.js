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
                            Order Detail
                        </h3>

                        <hr/>
                        <div>
                        <label width='200'>Model</label>
                            <p>
                                {this.props.carsbooking.car_model}
                            </p>
                            <label width='200'>Car Type</label>
                            <p>
                                {this.props.carsbooking.car_type}
                            </p>
                            {/* <label width='200'>Date</label>
                            <p>
                                {this.props.carsbooking.end_date}
                            </p> */}
                        </div>
                        <div>
                        <br/>
                            <h4>
                                PickUp
                            </h4>
                            
                            <label width='200'>City</label>
                            <p>
                                {this.props.carsbooking.car_city}
                            </p>
                            <label width='200'>Pickup</label>
                            <p>
                                {this.props.carsbooking.Pickup}

                            </p>
                        </div>

                        <div>
                        <br/>
                            <h4>
                                Drop Off
                            </h4>
                            
                            <label width='200'>Dropoff</label>
                            <p>
                                {this.props.carsbooking.Dropoff}
                            </p>
                            {/* <label width='200'>Date</label>
                            <p>
                                {this.props.carsbooking.end_date}
                            </p> */}
                        </div>
                        <div className="row">
                                <div className="col-lg-4 col-md-4">
                                </div>
                        <div className="col-lg-4 col-md-4">
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
    return {
        carsbooking: state.carsbooking,
        tracking: state.tracking
    }
}


export default withRouter(connect(mapStateToProps, mapDispatchToProps)(CarBooking)) ;

