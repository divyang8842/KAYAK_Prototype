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
                    {this.props.hotelsbooking.standard_rates}
                </h4>
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
                            Hotel Detail
                        </h3>
                        
                        <hr/>
                            <div>
                                <h3>
                                    {this.props.hotelsbooking.hotel_name}

                                </h3>
                            </div>
                            <br/>
                            <div>
                                <label width='200'>City</label>
                                <p>
                                    {this.props.hotelsbooking.hotel_city}
                                </p>
                                <label width='200'>Checkin Date</label>
                                <p>
                                    {this.props.hotels.checkin}
                                </p>
                                <label width='200'>Checkout Date</label>
                                <p>
                                    {this.props.hotels.checkout}
                                </p>
                                <label width='200'>Number of rooms</label>
                                <p>
                                    {this.props.hotels.roomcount}
                                </p>
                                <label width='200'>Type of room</label>
                                <p>
                                    {this.props.hotels.roomtype}
                                </p>
                                <label width='200'>City</label>
                                <p>
                                    {this.roomrent()}
                                </p>

                            </div>
                            <div className="row">
                                <div className="col-lg-4 col-md-4">
                                </div>
                        <div className="col-lg-4 col-md-4">
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
                                                if(currentpath[currentpath.length-1] != currentpage)
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
                            <div className="col-lg-4 col-md-4">
                            </div>
                        </div>  
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