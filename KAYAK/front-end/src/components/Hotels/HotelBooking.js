import React, {Component} from 'react';
//import * as API from '../api/api';
import { Route, Link,Switch,withRouter } from 'react-router-dom';
import {connect} from 'react-redux';
import * as HotelsAPI from '../../api/HotelsAPI';
import * as UserTracking from '../../api/UserTracking';


class HotelBooking extends Component {



    render()
    {
        return(
            <div className="container-fluid">
                <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/latest/css/bootstrap.min.css"/>
                <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/latest/css/bootstrap-theme.min.css"/>
                <div className="row">

                   Order Confirmation!
                    <h3>
                        Hotel Name:
                        {this.props.hotelsbooking.hotel_name}

                    </h3>
                    <button className="btn btn-primary btn-block"
                            onClick={() =>{
                                var payload = {};
                                // var tracking_object={};

                                // tracking_object.current_page="SEARCH_PAGE";
                                // tracking_object.previous_page="BILLING_HOTEL";
                                // tracking_object.user_id="jay";
                                // tracking_object.session_id="1";


                                var checkin = this.props.hotels.checkin;
                                var checkout = this.props.hotels.checkout;
                                var roomcount = this.props.hotels.roomcount;
                                var roomtype = this.props.hotels.roomtype;
                                var hotelItem = this.props.hotelsbooking;
                                console.log(hotelItem);
                            
                                HotelsAPI.doHotelBooking({hotelItem, checkin, checkout, roomtype, roomcount})
                                .then((status) => {
                                    if(status == 200){
                                      alert("Booking Done!");

                                        var tracking_object = {};
                                        tracking_object.current_page = "SEARCH_PAGE";
                                        tracking_object.previous_page = "BILLING_HOTEL";
                                        tracking_object.user_id = "jay";
                                        tracking_object.session_id = "1";

                                        UserTracking.userTracking(tracking_object)
                                            .then((status) => {
                                                console.log("Tracking status:" + status);


                                            });

                                      this.props.history.push("/");
                                      // this.props.loadHotels(result);
                                      // this.props.loadFilteredHotels(result);
                                      // this.props.history.push("/Hotels");
                                    }
                                });
                            }
                            }>Book Now</button>
                </div>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return{
        hotels: state.hotels,
        hotelsbooking: state.hotelbooking
    }
}


export default withRouter(connect(mapStateToProps)(HotelBooking)) ;