import React, {Component} from 'react';
//import * as API from '../api/api';
import {bindActionCreators} from 'redux';
import { Route, Link,Switch,withRouter } from 'react-router-dom';
import {connect} from 'react-redux';
import * as HotelsAPI from '../../api/HotelsAPI';
import * as UserTracking from '../../api/UserTracking';
import {updateTracking} from '../../actions/Analytics/Tracking';


class HotelBooking extends Component {


    roomrent()
    {
        if(this.props.hotels.roomtype == 0)
        {
            return(
                <h4>
                    {this.props.hotelsbooking.king_rates}
                </h4>
            );

        }
        else if(this.props.hotels.roomtype == 1)
        {
            return(
                <h4>
                    {this.props.hotelsbooking.queen_rates}
                </h4>
            );

        }
        else if(this.props.hotels.roomtype == 2)
        {
            return(
                <h4>
                    {<this className="props hotelsbooking standard_rates"></this>}
                </h4>
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
                            Hotel Confirmation!
                        </h1>
                            <div className="col-md-6 col-sm-6 ">
                                <h2>
                                    {this.props.hotelsbooking.hotel_name}

                                </h2>
                            </div>
                            <div className="col-md-6 col-sm-6 ">

                                <h4>
                                {this.props.hotelsbooking.hotel_city}
                                </h4>

                                <h4>
                                {this.props.hotels.checkin}
                                </h4>
                                <h4>
                                {this.props.hotels.checkout}
                                </h4>

                                <h4>
                                {this.props.hotels.roomcount}
                                </h4>

                                <h4>
                                {this.props.hotels.roomtype}
                                </h4>
                                {this.roomrent()}

                            </div>

                        <button className="searchbtn"
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
                                                // this.props.loadHotels(result);
                                                // this.props.loadFilteredHotels(result);
                                                // this.props.history.push("/Hotels");
                                            }
                                        });
                                }
                                }>Book Now</button>
                    </div>

                    <div className="col-md-3 col-sm-3 ">
                    </div>




                </div>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return{
        hotels: state.hotels,
        hotelsbooking: state.hotelbooking,
        tracking: state.tracking
    }
}

function mapDispatchToProps(dispatch) {
    
        return bindActionCreators({
            updateTracking: updateTracking}, dispatch);
    
    
    }

export default withRouter(connect(mapStateToProps,mapDispatchToProps)(HotelBooking)) ;