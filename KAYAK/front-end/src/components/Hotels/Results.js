import React, { Component } from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {loadFilteredHotels} from '../../actions/Hotels/Hotels';
import '../../public/css/animate.css';
import '../../public/css/bootstrap.css';
import '../../public/css/magnific-popup.css';
import '../../public/css/superfish.css';
import '../../public/css/bootstrap-datepicker.min.css';
import '../../public/css/magnific-popup.css';
import '../../public/css/cs-select.css';
import '../../public/css/cs-skin-border.css';
import '../../public/css/style.css';
import * as HotelsAPI from '../../api/HotelsAPI';

class Results extends Component {
  state={
    sort_review:0,
    sort_price:0
  }

  handleBooking(hotelItem){
    var checkin = this.props.hotels.checkin;
    var checkout = this.props.hotels.checkout;
    var roomtype = "0"; //0=King, 1=Queen, 2=Standard
    var roomcount = this.props.hotels.roomcount;
    HotelsAPI.doHotelBooking({hotelItem, checkin, checkout, roomtype, roomcount})
    .then((status) => {
        if(status == 200){
          alert("Booking Done!");
          // this.props.loadHotels(result);
          // this.props.loadFilteredHotels(result);
          // this.props.history.push("/Hotels");
        }
    });
  }

  createHotelsList(){
    return this.props.filteredHotels.hotels.map((hotelItem) => {
      return(
        <div className="col-md-8 col-sm-8 ">
          <div className="row">
            <div className="col-md-8 col-sm-8 ">
                <h3>{hotelItem.hotel_name}</h3>
                <span>
                  <h4>{hotelItem.hotel_star} star</h4>
                  <h4>{hotelItem.hotel_location}</h4>
                </span>
                <br/>
                <h4>Review: {hotelItem.review_overall}/10</h4>
            </div>
            <div className="col-md-4 col-sm-4 ">
                <h4 class="price">$1,000</h4>
                <br/>
                <button class="btn btn-primary" onClick={() => this.handleBooking(hotelItem)}>Book Now</button>
            </div>
          </div>
          <div>
            <h4>{hotelItem.hotel_description}</h4>
          </div>
        </div>
      );
  });
  }

  filterHotels(){
    this.props.loadFilteredHotels(this.props.hotels.hotels);
  }

  setSortCriteria(sort_criteria){
    if(sort_criteria == "price"){
      if(this.state.sort_price == 0){
        this.setState({
          ...this.state,
          sort_price:1
        },this.sortHotels(sort_criteria));
      }
      else{
        this.setState({
          ...this.state,
          sort_price:0
        },this.sortHotels(sort_criteria));
      }
    }
    else if(sort_criteria == "review"){
      if(this.state.sort_review == 0){
        this.setState({
          ...this.state,
          sort_review:1
        },this.sortHotels(sort_criteria));
      }
      else{
        this.setState({
          ...this.state,
          sort_review:0
        },this.sortHotels(sort_criteria));
      }
    }
  }

  sortHotels(sort_criteria){
    if(sort_criteria == "price"){

    }
    else{

    }

  }

  render() {
    return (
      // <table class="c-table">
      //   <tbody>
      //     {this.createHotelsList()}
      //   </tbody>
      // </table>

      <div>
        <div className="row">
            <div className="col-sm-6 col-lg-6 col-md-6 col-xs-6" >
                <button className="btn btn-primary btn-block"
                        onClick={() => this.sortHotels("price")}
                >
                    PRICE
                </button>
            </div>
            <div className="col-sm-6 col-lg-6 col-md-6 col-xs-6" >
                <button className="btn btn-primary btn-block"
                        onClick={() => this.sortHotels("review")}>
                    REVIEW SCORE
                </button>
            </div>
        </div> 
        <div>
          <span>
          {this.createHotelsList()}
          </span>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state){
  return {
      hotels: state.hotels,
      filteredHotels: state.filteredHotels
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({loadFilteredHotels : loadFilteredHotels}, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Results);