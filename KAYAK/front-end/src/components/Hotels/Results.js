import React, {Component} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {getHotelsBooking, updateRoomtype} from '../../actions/Hotels/Hotels';
import {Route, Link, Switch, withRouter} from 'react-router-dom';
import '../../public/css/animate.css';
import '../../public/css/bootstrap.css';
import '../../public/css/magnific-popup.css';
import '../../public/css/superfish.css';
import '../../public/css/bootstrap-datepicker.min.css';
import '../../public/css/magnific-popup.css';
import '../../public/css/cs-select.css';
import '../../public/css/cs-skin-border.css';
import '../../public/css/style.css';
import '../../public/css/filter.css';
import '../../public/css/star.css';
import '../../public/css/pages.css';
//import '../../public/css/radio.css';
import * as HotelsAPI from '../../api/HotelsAPI';
import star from '../../public/images/starfilled.svg';
import SearchPanel from './SearchPanel';
import * as UserTracking from '../../api/UserTracking';
import {updateTracking} from '../../actions/Analytics/Tracking';

class Results extends Component {
  state = {
    hotelsArray: [],
    sort_review: 0,
    sort_price: 0,
    filterparams: {
      price: "500",
      star: "1",
      freebies: [],
      chk_breakfast: false,
      chk_parking: false,
      chk_fitness: false,
      chk_pool: false,
      chk_tennis: false,
      chk_airport: false
    },
    filtered: false,
    roomtype: 0, //0-King, 1-Queen, 2-Standard
    currentPage: 1,
    itemsPerPage: 5,
    hotelitem:{}
  }

  handleClick(event) {
    this.setState({
      currentPage: Number(event.target.id)
    });
  }

  componentWillMount() {
    this.state.hotelsArray = this.props.hotels.hotels;
  }

  handleBooking(hotelItem) {
      if(this.props.isLogged =='true'){
      this
        .props
        .getHotelsBooking(hotelItem);
          var tracking_object = {};
          tracking_object.current_page = "BILLING_HOTEL";
          tracking_object.previous_page = "HOTEL_PAGE";
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
          var currentpage = "BILLING_HOTEL";
          if(currentpath[currentpath.length-1] != currentpage)
          currentpath.push(currentpage);
          this.props.updateTracking({currentpath, currentpage, timenow});
      this
        .props
        .history
        .push("/hotelsbooking");
    }

    // var checkin = this.props.hotels.checkin; var checkout =
    // this.props.hotels.checkout; var roomtype = "0"; //0=King, 1=Queen, 2=Standard
    // var roomcount = this.props.hotels.roomcount;
    // HotelsAPI.doHotelBooking({hotelItem, checkin, checkout, roomtype, roomcount})
    // .then((status) => {     if(status == 200){       alert("Booking Done!");  //
    // this.props.loadHotels(result);       //
    // this.props.loadFilteredHotels(result);       //
    // this.props.history.push("/Hotels");     } });
  }

  setRoomType(){
    this.props.updateRoomtype(this.state.roomtype);
  }

  renderStars(hotelItem){
    var indents = [];
    for (var i = 0; i < hotelItem.hotel_star; i++) {
      indents.push(<img type="image/svg+xml" src={star} height="15px" style={{margin:2}} key={i} alt={hotelItem.hotel_star}/>);
    }
    return (
      <span>
       {indents}
      </span>
   );
  }

  handleModal(hotelItem){
    this.setState({
      hotelitem: hotelItem
    })
  }

  createHotelsList() {
    var hotel_array = [];
    if (this.state.filtered) 
      hotel_array = this.state.hotelsArray;
    else 
      hotel_array = this.props.hotels.hotels;
    if(hotel_array){
       // Logic for displaying current todos
       const indexOfLastTodo = this.state.currentPage * this.state.itemsPerPage;
       const indexOfFirstTodo = indexOfLastTodo - this.state.itemsPerPage;
       const currentItems = hotel_array.slice(indexOfFirstTodo, indexOfLastTodo);

       const pageNumbers = [];
       for (let i = 1; i <= Math.ceil(hotel_array.length / this.state.itemsPerPage); i++) {
         pageNumbers.push(i);
       }


      const items= currentItems.map((hotelItem, index) => {
        var styles = {
          background: 'white',
          'margin-bottom': '8px',
          height: 175,
          padding: 0
        };

        return (
          <div style={styles}>
            <div className="row">
              <div className="col-md-3 col-sm-3 ">
                <img
                  ref={"base64img"}
                  style={{
                  display: 'block',
                  width: 160,
                  height: 175
                }}
                  alt={"Image will appear here"}
                  src={"data:image/png;base64," + hotelItem.srcdata}></img>
              </div>
              <div className="row col-md-6 col-sm-6 " style={{padding:0}}>
                <div style={{marginLeft:20}}>
                  <h3 style={{marginBottom:0}}>{hotelItem.hotel_name}</h3>
                  <div className="row">
                    <div className="col-lg-8" style={{width:125}}>
                      {this.renderStars(hotelItem)}
                    </div>
                    <div className="col-lg-4" style={{marginLeft:-20, marginTop:5}}>
                      <p style={{color:'black', fontSize:12}}>{hotelItem.hotel_location}</p>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-6 col-sm-6" style={{height:30, marginLeft:13, width:30, 'border-radius':5, background:'#333333', paddingTop:5}}>
                      <p style={{color:'#ffffff', fontSize:12, fontWeight:'bold', textAlign:'center', marginLeft:-8}}>{hotelItem.review_overall}</p>
                    </div>
                    <div className="col-md-6 col-sm-6" style={{marginTop:5}}>
                      <p style={{color:'black', fontSize:12}}>{hotelItem.review_count} reviews</p>
                    </div>
                  </div>
                  <div>
                    <ul style={{listStyle:'none', padding:0}}>
                      <li style={{color:'#000000', fontSize:12}}>{hotelItem.hotel_description}</li>
                      <li style={{color:'#3071a9', fontSize:12, fontWeight:'bold'}}>{hotelItem.hotel_amenities}</li>
                    </ul>
                  </div>
                </div>
              </div>
              <div className="col-md-3 col-sm-3 " style={{background:'#f2f6fc', height:165, width:140, 'margin-top':5, 'margin-left':55}}>
                  <h3 style={{'margin-left':30, 'margin-top':30}}>${hotelItem.standard_rates}</h3>
                  <br/>
                  {/* <button class="btn btn-primary" onClick={() => this.handleBooking(hotelItem)}>View Deal</button> */}
                  {this.props.isLogged=='false' ? 
                    (<button type="button" class="searchbtn" style={{'font-size':12, marginLeft:13, marginTop:10}} data-toggle="modal" data-target="#loginModal">VIEW DEAL</button>)
                    :
                    (<button type="button" class="searchbtn" style={{'font-size':12, marginLeft:13, marginTop:10}} onClick={()=>{this.handleModal(hotelItem)}} data-toggle="modal" data-target="#myModal">View Deal</button>)
                  }
                  {/* <button type="button" class="searchbtn" data-toggle="modal" data-target="#myModal">View Deal</button> */}
                  
                  
                </div>
            </div>

          </div>
        );
      });

      const renderPageNumbers = pageNumbers.map(number => {
        return (
          <li
            key={number}
            id={number}
            onClick={this.handleClick}
          >
            {number}
          </li>
        );
      });

      return (
        <div>
          <ul>
            {items}
          </ul>
          <ul id="page-numbers">
            {renderPageNumbers}
          </ul>
        </div>
      );
    }
  }

  setSortCriteria(sort_criteria) {
    if (sort_criteria == "price") {
      if (this.state.sort_price == 0) {
        this.setState({
          ...this.state,
          sort_price: 1,
          filtered: true
        }, this.sortHotels(sort_criteria));
      } else {
        this.setState({
          ...this.state,
          sort_price: 0,
          filtered: true
        }, this.sortHotels(sort_criteria));
      }
    } else if (sort_criteria == "review") {
      if (this.state.sort_review == 0) {
        this.setState({
          ...this.state,
          sort_review: 1,
          filtered: true
        }, this.sortHotels(sort_criteria));
      } else {
        this.setState({
          ...this.state,
          sort_review: 0,
          filtered: true
        }, this.sortHotels(sort_criteria));
      }
    }
  }

  sortHotels(sort_criteria) {
    var sortPrice = this.state.sort_price;
    var sortReview = this.state.sort_review;
    if (sort_criteria == "price") {
      function comparePrice(a, b) {
        if (a.standard_rates < b.standard_rates) 
          return (sortPrice == 1)
            ? -1
            : 1;
        if (a.standard_rates > b.standard_rates) 
          return (sortPrice == 1)
            ? 1
            : -1;
        return 0;
      }
      this
        .state
        .hotelsArray
        .sort(comparePrice);
    } else {
      function compareReviews(a, b) {
        if (a.review_overall < b.review_overall) 
          return (sortReview == 1)
            ? -1
            : 1;
        if (a.review_overall > b.review_overall) 
          return (sortReview == 1)
            ? 1
            : -1;
        return 0;
      }
      this
        .state
        .hotelsArray
        .sort(compareReviews);
    }
  }

  filterHotels() {
    var tempHotelsArray = [];
    var price = this.state.filterparams.price;
    var star = this.state.filterparams.star;
    var freebies = this.state.filterparams.freebies;
    if(this.props.hotels.hotels){
      this.props.hotels.hotels.map((hotelItem) => {
          var amenities = hotelItem
            .hotel_amenities
            .split(',');
          var filterflag = false;
          if (hotelItem.standard_rates <= price) {
            if (hotelItem.hotel_star >= star) {
              for (var i = 0; i < freebies.length; i++) {
                if (amenities.indexOf(freebies[i]) == -1) {
                  filterflag = true;
                  break;
                }
              }
              if (!filterflag) {
                tempHotelsArray.push(hotelItem);
              }
            }
          }
        });
    }
    this.setState({
      ...this.state,
      hotelsArray: tempHotelsArray,
      filtered: true
    });
  }

  setFreebies() {
    var tempFreebies = [];
    if (this.state.filterparams.chk_airport == true) 
      tempFreebies.push("Airport Pick-up");
    if (this.state.filterparams.chk_parking == true) 
      tempFreebies.push("Free Parking");
    if (this.state.filterparams.chk_fitness == true) 
      tempFreebies.push("Fitness Center");
    if (this.state.filterparams.chk_pool == true) 
      tempFreebies.push("Swimming Pool");
    if (this.state.filterparams.chk_tennis == true) 
      tempFreebies.push("Tennis Court");
    if (this.state.filterparams.chk_breakfast == true) 
      tempFreebies.push("Free Breakfast");
    this.setState({
      filterparams: {
        ...this.state.filterparams,
        freebies: tempFreebies
      }
    }, this.filterHotels);
    console.log(this.state.filterparams.freebies);
  }

  constructor(props) {
    super(props)

    this.handler = this
      .handler
      .bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  handler() {
    this.forceUpdate();
    this.setFreebies();
    this.filterHotels();
    // this.setState(this.state); window.location.reload();
  }

  render() {
    return (
      <div>
        <div>
          <SearchPanel handler={this.handler}/>
        </div>
        <div className="row">
          <div className="col-lg-3 col-md-3 col-sm-3" id="divfilter">
            <div className="row">
              <div className="col-sm-1 col-lg-1 col-md-1 col-xs-1">
              </div>
              <div id="divleftpanel" className="col-sm-10 col-lg-10 col-md-10 col-xs-10">
                <h4 id="h4filter">Star</h4>
                <hr/>
                <span class="rating">
                  <input
                    type="radio"
                    class="rating-input"
                    value="1"
                    id="rating-input-1-5"
                    name="rating-input-1"
                    onClick={(event) => {
                    this.setState({
                      ...this.state,
                      filterparams: {
                        ...this.state.filterparams,
                        star: event.target.value
                      }
                    }, this.filterHotels);
                  }}/>
                  <label for="rating-input-1-5" class="rating-star">
                    <p id="parstar">1</p>
                  </label>
                  <input
                    type="radio"
                    class="rating-input"
                    value="2"
                    id="rating-input-1-4"
                    name="rating-input-1"
                    onClick={(event) => {
                    this.setState({
                      ...this.state,
                      filterparams: {
                        ...this.state.filterparams,
                        star: event.target.value
                      }
                    }, this.filterHotels);
                  }}/>
                  <label for="rating-input-1-4" class="rating-star">
                    <p id="parstar">2</p>
                  </label>
                  <input
                    type="radio"
                    class="rating-input"
                    value="3"
                    id="rating-input-1-3"
                    name="rating-input-1"
                    onClick={(event) => {
                    this.setState({
                      ...this.state,
                      filterparams: {
                        ...this.state.filterparams,
                        star: event.target.value
                      }
                    }, this.filterHotels);
                  }}/>
                  <label for="rating-input-1-3" class="rating-star">
                    <p id="parstar">3</p>
                  </label>
                  <input
                    type="radio"
                    class="rating-input"
                    value="4"
                    id="rating-input-1-2"
                    name="rating-input-1"
                    onClick={(event) => {
                    this.setState({
                      ...this.state,
                      filterparams: {
                        ...this.state.filterparams,
                        star: event.target.value
                      }
                    }, this.filterHotels);
                  }}/>
                  <label for="rating-input-1-2" class="rating-star">
                    <p id="parstar">4</p>
                  </label>
                  <input
                    type="radio"
                    class="rating-input"
                    value="5"
                    id="rating-input-1-1"
                    name="rating-input-1"
                    onClick={(event) => {
                    this.setState({
                      ...this.state,
                      filterparams: {
                        ...this.state.filterparams,
                        star: event.target.value
                      }
                    }, this.filterHotels);
                  }}/>
                  <label for="rating-input-1-1" class="rating-star">
                    <p id="parstar">5</p>
                  </label>
                </span>
                <br/>
                <br/>
                <h4 id="h4filter">Price</h4>
                <hr/>
                <div>
                  <h6 id="sliderh6">${this.state.filterparams.price}</h6>
                </div>
                <input
                  type="range"
                  min="50"
                  max="500"
                  step="10"
                  defaultValue="500"
                  onChange={(event) => {
                  this.setState({
                    ...this.state,
                    filterparams: {
                      ...this.state.filterparams,
                      price: event.target.value
                    }
                  }, this.filterHotels);
                }}/>
                <br/>
                <br/>

                <h4 id="h4filter">Freebies</h4>
                <hr/>
                <div class="control-group">
                  <label class="control control--checkbox">Free Parking
                    <input
                      type="checkbox"
                      onChange={(event) => {
                      this.setState({
                        ...this.state,
                        filterparams: {
                          ...this.state.filterparams,
                          chk_parking: event.target.checked
                        }
                      }, this.setFreebies);
                    }}/>
                    <div class="control__indicator"></div>
                  </label>
                  <label class="control control--checkbox">Fitness Center
                    <input
                      type="checkbox"
                      onChange={(event) => {
                      this.setState({
                        ...this.state,
                        filterparams: {
                          ...this.state.filterparams,
                          chk_fitness: event.target.checked
                        }
                      }, this.setFreebies);
                    }}/>
                    <div class="control__indicator"></div>
                  </label>
                  <label class="control control--checkbox">Free Breakfast
                    <input
                      type="checkbox"
                      onChange={(event) => {
                      this.setState({
                        ...this.state,
                        filterparams: {
                          ...this.state.filterparams,
                          chk_breakfast: event.target.checked
                        }
                      }, this.setFreebies);
                    }}/>
                    <div class="control__indicator"></div>
                  </label>
                  <label class="control control--checkbox">Swimming Pool
                    <input
                      type="checkbox"
                      onChange={(event) => {
                      this.setState({
                        ...this.state,
                        filterparams: {
                          ...this.state.filterparams,
                          chk_pool: event.target.checked
                        }
                      }, this.setFreebies);
                    }}/>
                    <div class="control__indicator"></div>
                  </label>
                  <label class="control control--checkbox">Tennis Court
                    <input
                      type="checkbox"
                      onChange={(event) => {
                      this.setState({
                        ...this.state,
                        filterparams: {
                          ...this.state.filterparams,
                          chk_tennis: event.target.checked
                        }
                      }, this.setFreebies);
                    }}/>
                    <div class="control__indicator"></div>
                  </label>
                  <label class="control control--checkbox">Airport Pick-up
                    <input
                      type="checkbox"
                      onChange={(event) => {
                      this.setState({
                        ...this.state,
                        filterparams: {
                          ...this.state.filterparams,
                          chk_airport: event.target.checked
                        }
                      }, this.setFreebies);
                    }}/>
                    <div class="control__indicator"></div>
                  </label>
                </div>
              </div>
              <div className="col-sm-1 col-lg-1 col-md-1 col-xs-1">
              </div>
            </div>
          </div>
          <div className="col-lg-9 col-md-9 col-sm-9">
            <div className="row">
              <div className="col-sm-6 col-lg-6 col-md-6 col-xs-6">
                <label
                  className="sortbtn btn-block"
                  onClick={() => this.setSortCriteria("price")}>
                  PRICE
                </label>
              </div>
              <div className="col-sm-6 col-lg-6 col-md-6 col-xs-6">
                <label
                  className="sortbtn btn-block"
                  onClick={() => this.setSortCriteria("review")}>
                  REVIEW SCORE
                </label>
              </div>
            </div>
            <div className="row">
              <div className="col-sm-1 col-lg-1 col-md-1 col-xs-1">
              </div>
              <div className="col-sm-9 col-lg-9 col-md-9 col-xs-9" style={{marginLeft:50, width:750}}>
                <div>
                  {this.createHotelsList()}
                </div>
              </div>
              <div className="col-sm-1 col-lg-1 col-md-1 col-xs-1">
              </div>
              <div id="myModal" class="modal fade" role="dialog">
                    <div class="modal-dialog">
                      <div class="modal-content">
                        <div class="modal-header">
                          <button type="button" class="close" data-dismiss="modal">&times;</button>
                          <h4 class="modal-title">Select Room</h4>
                        </div>
                        <div id="modalbody" class="modal-body">
                          {/* <p>Modal Body</p> */}

                          <div class="container">
                            <div>
                              <input type="radio" id="f-option" name="selector"
                                onClick={(event) => {
                                  this.setState({
                                    ...this.state,
                                    roomtype: 0
                                  }, this.setRoomType);
                                }}/>
                              <label style={{width:150, margin:4}} for="f-option">King Room</label>
                              <label style={{width:50, margin:4}} for="f-option">${this.state.hotelitem.king_rates}</label>
                            </div>
                            <div>
                              <input type="radio" id="s-option" name="selector"
                              onClick={(event) => {
                                this.setState({
                                  ...this.state,
                                  roomtype: 1
                                }, this.setRoomType);
                              }}/>
                              <label style={{width:150, margin:4}} for="f-option">Queen Room</label>
                              <label style={{width:50, margin:4}} for="f-option">${this.state.hotelitem.queen_rates}</label>
                            </div>
                            <div>
                              <input type="radio" id="s-option" name="selector"
                              onClick={(event) => {
                                this.setState({
                                  ...this.state,
                                  roomtype: 2
                                }, this.setRoomType);
                              }}/>
                              <label style={{width:150, margin:4}} for="f-option">Standard Room</label>
                              <label style={{width:50, margin:4}} for="f-option">${this.state.hotelitem.standard_rates}</label>
                            </div>
                          </div>


                        </div> 
                        <div class="modal-footer">
                          <button type="button" class="searchbtn" data-dismiss="modal" onClick={() =>
                          {

                              this.handleBooking(this.state.hotelitem)} }>Continue</button>
                        </div>
                      </div>

                    </div>
                  </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    hotels: state.hotels,
    tracking: state.tracking
    // filteredHotels: state.filteredHotels
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    getHotelsBooking: getHotelsBooking,
    updateRoomtype:updateRoomtype,
    updateTracking:updateTracking
  }, dispatch);
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Results));