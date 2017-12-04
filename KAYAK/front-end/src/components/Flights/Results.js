import React, {Component} from 'react';
//import react from 'react-native';
//import * as API from '../api/api';
import {connect} from 'react-redux';
//import CheckBox from 'react-native-checkbox';
//import Slider from 'react-native-slider';
import { Route, Link,Switch,withRouter } from 'react-router-dom';
import {getFlightsBooking} from '../../actions/Flights/FlightBooking';
import FLightSerachPanel from './SearchPanel';
import * as UserTracking from '../../api/UserTracking';
import {updateTracking} from '../../actions/Analytics/Tracking';

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


class Results extends Component {

    state ={
        airlines :['airindia','airasia','luftansa','jetblue','emirates','alaska'],
        checkbox_airindia:1,
        checkbox_airasia:1,
        checkbox_emirates:1,
        checkbox_jetblue:1,
        checkbox_luftansa:1,
        array_for_sorting:this.props.flights,
        array_for_sorting_return:this.props.flights_return,
        array_for_sorting_result:this.props.flights,
        array_for_sorting_result_return:[],
        flag:0,
        check_boxes:[],
        price_filter:500,
        duration_filter:20,
        price_asc:1,
        duration_asc:1,
        currentPage: 1,
        itemsPerPage: 3
    };

    handleClick(event) {
        this.setState({
          currentPage: Number(event.target.id)
        });
      }


    flights(price_flag,duration_flag)
    {
       // IF condition decides the flow for Single trip processing/ Round Trip processing
        //Single Trip Processing

       if(this.state.array_for_sorting_return.length === 0 ){

        var flight_flag=false;
        var duration ;
        var array_used_for_sorting =[];

        console.log("this.props.flights:"+this.props.flights);

        console.log("array_for_sorting:"+this.state.array_for_sorting);
        console.log("array_for_sorting_result:"+this.state.array_for_sorting_result);
        console.log("array_for_sorting_result_return:"+this.state.array_for_sorting_result_return.length);


         this.state.array_for_sorting.map((flights,index) =>{

            // Filter Condition for AIRLINES
            var array =this.state.airlines;

            duration = new Date("01/01/2007 " + flights.flights.flight_arrival).getHours() - new Date("01/01/2007 " + flights.flights.flight_departure).getHours();

            for (var i=0;i<array.length;i++)
            {
                if(array[i] == flights.flights.airline_name)
                {
                    flight_flag= true;

                }
            }

            if (flight_flag){
                flight_flag= false;

                if( flights.flights.duration< this.state.duration_filter)
                {
                    if(flights.flights.totalprice < this.state.price_filter)
                    {
                        array_used_for_sorting.push(flights.flights);
                        if(price_flag )
                        {
                            if(this.state.price_asc === 1){
                                array_used_for_sorting.sort(function(a, b) {
                                    return parseFloat(a.totalprice) - parseFloat(b.totalprice);
                                });

                                this.setState({
                                    price_asc: 0
                                });

                            }

                            else
                            {
                                array_used_for_sorting.sort(function(a, b) {
                                    return parseFloat(b.totalprice) - parseFloat(a.totalprice);
                                });
                                this.setState({
                                    price_asc: 1
                                });
                            }


                        }

                        if(duration_flag)
                        {
                            if(this.state.duration_asc === 1){
                            array_used_for_sorting.sort(function(a, b) {
                                return parseFloat(a.duration) - parseFloat(b.duration);
                            });
                                this.setState({
                                    duration_asc: 0
                                });

                        }

                        else
                        {
                            array_used_for_sorting.sort(function(a, b) {
                                return parseFloat(b.duration) - parseFloat(a.duration);
                            });
                            this.setState({
                                duration_asc: 1
                            });
                        }


                        }

                    }
                }



            }

        });

        const flights = Object.keys(array_used_for_sorting).map((items) => (
            {
                'flights' : array_used_for_sorting[items]


            }
        ));


        this.setState({
            array_for_sorting_result: flights
        });

        this.setState({
            flag:1
        });

        }

        else // Round Trip processing
       {
           var result={};
           var resuult_array=[];
           var flight_flag=false;
           var duration ;
           var array_used_for_sorting =[];

           this.state.array_for_sorting.map((flights,index) => {

                   this.state.array_for_sorting_return.map((flightsreturn,index) => {

                       result.airline_name = flights.flights.airline_name;
                       result.class  = flights.flights.class;
                       result.date  = flights.flights.date;
                       result.nooftickets  = flights.flights.nooftickets;
                       result.flight_id  = flights.flights.flight_id;
                       result.origin_station = flights.flights.origin_station;
                       result.destination_station = flights.flights.destination_station;
                       result.flight_departure = flights.flights.flight_departure;
                       result.flight_arrival = flights.flights.flight_arrival;
                       result.duration=flights.flights.duration;

                       result.totalprice = flights.flights.totalprice+ flightsreturn.flights_return.totalprice;

                       result.airline_name_return = flightsreturn.flights_return.airline_name;
                       result.origin_station_return = flightsreturn.flights_return.origin_station;
                       result.destination_station_return = flightsreturn.flights_return.destination_station;
                       result.flight_departure_return = flightsreturn.flights_return.flight_departure;
                       result.flight_arrival_return = flightsreturn.flights_return.flight_arrival;
                       result.duration_return=flightsreturn.flights_return.duration;
                       result.class_return  = flightsreturn.flights_return.class;
                       result.date_return  = flightsreturn.flights_return.date;
                       result.nooftickets_return  = flightsreturn.flights_return.nooftickets;
                       result.flight_id_return  = flightsreturn.flights_return.flight_id;

                       resuult_array.push(result);
                       console.log(resuult_array);
                       result={};

                   })
               }
           );

           resuult_array.map((flights,index) =>{

               // Filter Condition for AIRLINES
               var array =this.state.airlines;

               // for (var i=0;i<array.length;i++)
               // {
               //     if(array[i] == flights.airline_name && array[i] == flights.airline_name_return)
               //     {
               //         flight_flag= true;
               //
               //     }
               // }

               if(array.indexOf(flights.airline_name) >=0 && array.indexOf(flights.airline_name_return) >=0)
               {
                   flight_flag= true;
               }

               if (flight_flag){
                   flight_flag= false;

                   if( flights.duration< this.state.duration_filter && flights.duration_return < this.state.duration_filter)
                   {
                       if(flights.totalprice < this.state.price_filter)
                       {
                           array_used_for_sorting.push(flights);
                           if(price_flag )
                           {
                               if(this.state.price_asc === 1){
                                   array_used_for_sorting.sort(function(a, b) {
                                       return parseFloat(a.totalprice) - parseFloat(b.totalprice);
                                   });

                                   this.setState({
                                       price_asc: 0
                                   });

                               }

                               else
                               {
                                   array_used_for_sorting.sort(function(a, b) {
                                       return parseFloat(b.totalprice) - parseFloat(a.totalprice);
                                   });
                                   this.setState({
                                       price_asc: 1
                                   });
                               }


                           }

                           if(duration_flag)
                           {
                               if(this.state.duration_asc === 1){
                                   array_used_for_sorting.sort(function(a, b) {
                                       return parseFloat(a.duration) - parseFloat(b.duration);
                                   });
                                   this.setState({
                                       duration_asc: 0
                                   });

                               }

                               else
                               {
                                   array_used_for_sorting.sort(function(a, b) {
                                       return parseFloat(b.duration) - parseFloat(a.duration);
                                   });
                                   this.setState({
                                       duration_asc: 1
                                   });
                               }


                           }

                       }
                   }



               }

           });

           this.setState({
               array_for_sorting_result_return: array_used_for_sorting
           });

           this.setState({
               flag:1
           });

       }
    }

    bookflight()
    {

    }


    temp()
    {
        var styles = {
            background:'white',
            'margin-bottom':'8px',
            'margin-left':'10px'
        };
        if(this.state.array_for_sorting_return.length === 0 ){
            // Logic for displaying current todos
            const indexOfLastTodo = this.state.currentPage * this.state.itemsPerPage;
            const indexOfFirstTodo = indexOfLastTodo - this.state.itemsPerPage;
            const currentItems = this.state.array_for_sorting_result.slice(indexOfFirstTodo, indexOfLastTodo);

            const pageNumbers = [];
            for (let i = 1; i <= Math.ceil(this.state.array_for_sorting_result.length / this.state.itemsPerPage); i++) {
                pageNumbers.push(i);
            }




        const items= currentItems.map((flights,index) => {
            return (
                <div className="col-md-10 col-sm-10 " style={styles}>
                    <div className="row">
                        <div className="col-md-8 col-sm-8 ">
                            <div className="col-md-4 col-sm-4 ">
                                <h2>
                                    {flights.flights.airline_name}
                                </h2>
                            </div>
                            <div className="col-md-4 col-sm-4 ">
                                <div className="col-md-6 col-sm-6 ">
                                    <div className="row">
                                    <h3>
                                {flights.flights.flight_departure}
                                    </h3>
                                    </div>
                                    <div className="row">
                                 {flights.flights.origin_station}
                                    </div>

                                </div>
                                <div className="col-md-6 col-sm-6 ">
                                    <div className="row">
                                        <h3>
                                {flights.flights.flight_arrival}
                                        </h3>
                                    </div>
                                    <div className="row">
                                {flights.flights.destination_station}
                                    </div>
                                </div>

                            </div>
                            <div className="col-md-4 col-sm-4 ">
                                <div className="row">
                                    <h3 align="center">
                                {flights.flights.totalprice}
                                    </h3>
                                </div>
                                <div className="row">
                    {this.props.isLogged=='false' ? 
                    (<button type="button" class="searchbtn" data-toggle="modal" data-target="#loginModal">View Deal</button>)
                        :
                    (<button className="btn btn-primary btn-block"
                            onClick={() => {

                                var payload = {};
                                var tracking_object = {};

                                this.props.getFlightsBooking(flights);

                                tracking_object.current_page = "BILLING_FLIGHT";
                                tracking_object.previous_page = "FLIGHT_PAGE";
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
                                var currentpage = "BILLING_FLIGHT";
                                if(currentpath[currentpath.length-1] != currentpage)
                                currentpath.push(currentpage);
                                this.props.updateTracking({currentpath, currentpage, timenow});
                                this.props.history.push("/flightsbooking");
                            }
                            }>View Deal
                    </button>)}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>


            )
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
            <div>
              <ul>
                {items}
              </ul>
            </div>
                <br/>
            <div>
              <ul id="page-numbers">
                {renderPageNumbers}
              </ul>
            </div>
            </div>
          );
    }

    else {
            var result = {};
            var resuult_array = [];
          

            this.state.array_for_sorting.map((flights, index) => {

                    this.state.array_for_sorting_return.map((flightsreturn, index) => {

                        result.airline_name = flights.flights.airline_name;
                        result.class  = flights.flights.class;
                        result.date  = flights.flights.date;
                        result.nooftickets  = flights.flights.nooftickets;
                        result.flight_id  = flights.flights.flight_id;
                        result.origin_station = flights.flights.origin_station;
                        result.destination_station = flights.flights.destination_station;
                        result.flight_departure = flights.flights.flight_departure;
                        result.flight_arrival = flights.flights.flight_arrival;

                        result.totalprice = flights.flights.totalprice + flightsreturn.flights_return.totalprice;

                        result.airline_name_return = flightsreturn.flights_return.airline_name;
                        result.origin_station_return = flightsreturn.flights_return.origin_station;
                        result.destination_station_return = flightsreturn.flights_return.destination_station;
                        result.flight_departure_return = flightsreturn.flights_return.flight_departure;
                        result.flight_arrival_return = flightsreturn.flights_return.flight_arrival;
                        result.class_return  = flightsreturn.flights_return.class;
                        result.date_return  = flightsreturn.flights_return.date;
                        result.nooftickets_return  = flightsreturn.flights_return.nooftickets;
                        result.flight_id_return  = flightsreturn.flights_return.flight_id;

                        resuult_array.push(result);
                        result={};




                    })
                }
            );
            console.log(resuult_array);

           if(this.state.array_for_sorting_result_return.length===0 && this.state.flag === 0)
            {
                // Logic for displaying current todos
                const indexOfLastTodo = this.state.currentPage * this.state.itemsPerPage;
                const indexOfFirstTodo = indexOfLastTodo - this.state.itemsPerPage;
                const currentItems = resuult_array.slice(indexOfFirstTodo, indexOfLastTodo);

                const pageNumbers = [];
                for (let i = 1; i <= Math.ceil(resuult_array.length / this.state.itemsPerPage); i++) {
                    pageNumbers.push(i);
                }


                const items= currentItems.map((flights, index) => {
                return (
                    <div className="col-md-10 col-sm-10 " style={styles}>
                        <div className="row">
                            <div className="col-md-8 col-sm-8 ">
                                <div className="col-md-4 col-sm-4 ">
                                    <div className="row">
                                    <h2>
                                        {flights.airline_name}
                                    </h2>
                                    </div>
                                    <div className="row">
                                    <h2>
                                        {flights.airline_name_return}
                                    </h2>
                                    </div>
                                </div>
                                <div className="col-md-4 col-sm-4 ">
                                    <div className="col-md-6 col-sm-6 ">
                                        <div className="row">
                                            <h3>
                                                {flights.flight_departure}
                                            </h3>
                                        </div>
                                        <div className="row">
                                            {flights.origin_station}
                                        </div>
                                        <div className="row">
                                            <h3>
                                                {flights.flight_departure_return}
                                            </h3>
                                        </div>
                                        <div className="row">
                                            {flights.origin_station_return}
                                        </div>
                                    </div>
                                    <div className="col-md-6 col-sm-6 ">
                                        <div className="row">
                                            <h3>
                                                {flights.flight_arrival}
                                            </h3>
                                        </div>
                                        <div className="row">
                                            {flights.destination_station}
                                        </div>
                                        <div className="row">
                                            <h3>
                                                {flights.flight_arrival_return}
                                            </h3>
                                        </div>
                                        <div className="row">
                                            {flights.destination_station_return}
                                        </div>
                                    </div>
                                </div>
                                <div className="col-md-4 col-sm-4 ">
                                    <div className="row">
                                        <h3 align="center">
                                            {flights.totalprice}
                                        </h3>
                                    </div>
                                    <div className="row">
                                    {this.props.isLogged=='false' ? 
                                        (<button type="button" class="searchbtn" data-toggle="modal" data-target="#loginModal">View Deal</button>)
                                        :
                                        (<button className="btn btn-primary btn-block"
                                                onClick={() => {

                                                    var payload = {flights:flights};
                                                    var tracking_object = {};

                                                    this.props.getFlightsBooking(payload);

                                                    tracking_object.current_page = "BILLING_FLIGHT";
                                                    tracking_object.previous_page = "FLIGHT_PAGE";
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

                                                    this.props.history.push("/flightsbooking");
                                                }
                                                }>View Deal
                                        </button>)}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )
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
                      <div>
                          <ul>
                              {items}
                          </ul>
                      </div>
                      <br/>
                      <div>
                          <ul id="page-numbers">
                              {renderPageNumbers}
                          </ul>
                      </div>
                  </div>
              );

            
        }

        else
           {
            // Logic for displaying current todos
            const indexOfLastTodo = this.state.currentPage * this.state.itemsPerPage;
            const indexOfFirstTodo = indexOfLastTodo - this.state.itemsPerPage;
            const currentItems = this.state.array_for_sorting_result_return.slice(indexOfFirstTodo, indexOfLastTodo);

            const pageNumbers = [];
            for (let i = 1; i <= Math.ceil(this.state.array_for_sorting_result_return.length / this.state.itemsPerPage); i++) {
                pageNumbers.push(i);
            }



               const items = currentItems.map((flights, index) => {
                   return (
                       <div className="col-md-10 col-sm-10 " style={styles}>
                           <div className="row">
                               <div className="col-md-8 col-sm-8 ">
                                   <div className="col-md-4 col-sm-4 ">
                                       <div className="row">
                                           <h2>
                                               {flights.airline_name}
                                           </h2>
                                       </div>
                                       <div className="row">
                                           <h2>
                                               {flights.airline_name_return}
                                           </h2>
                                       </div>
                                   </div>
                                   <div className="col-md-4 col-sm-4 ">
                                       <div className="col-md-6 col-sm-6 ">
                                           <div className="row">
                                               <h3>
                                                   {flights.flight_departure}
                                               </h3>
                                           </div>
                                           <div className="row">
                                               {flights.origin_station}
                                           </div>
                                           <div className="row">
                                               <h3>
                                                   {flights.flight_departure_return}
                                               </h3>
                                           </div>
                                           <div className="row">
                                               {flights.origin_station_return}
                                           </div>
                                       </div>
                                       <div className="col-md-6 col-sm-6 ">
                                           <div className="row">
                                               <h3>
                                                   {flights.flight_arrival}
                                               </h3>
                                           </div>
                                           <div className="row">
                                               {flights.destination_station}
                                           </div>
                                           <div className="row">
                                               <h3>
                                                   {flights.flight_arrival_return}
                                               </h3>
                                           </div>
                                           <div className="row">
                                               {flights.destination_station_return}
                                           </div>
                                       </div>
                                   </div>
                                   <div className="col-md-4 col-sm-4 ">
                                       <div className="row">
                                           <h3 align="center">
                                               {flights.totalprice}
                                           </h3>
                                       </div>
                                       <div className="row">
                                       {this.props.isLogged=='false' ? 
                                            (<button type="button" class="searchbtn" data-toggle="modal" data-target="#loginModal">View Deal</button>)
                                            :
                                            (<button className="btn btn-primary btn-block"
                                                   onClick={() => {

                                                       var payload = {flights:flights};
                                                       var tracking_object = {};

                                                       this.props.getFlightsBooking(payload);

                                                       tracking_object.current_page = "BILLING_FLIGHT";
                                                       tracking_object.previous_page = "FLIGHT_PAGE";
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

                                                       this.props.history.push("/flightsbooking");
                                                   }
                                                   }>View Deal
                                           </button>)}
                                       </div>
                                   </div>
                               </div>
                           </div>
                       </div>
                   )
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
                      <div className="row">
                          <ul>
                              {items}
                          </ul>
                      </div>
                      <br/>
                      <div className="row">
                          <ul id="page-numbers">
                              {renderPageNumbers}
                          </ul>
                      </div>
                  </div>
              );

           }

        }
    }

    constructor(props) {
        super(props)

        this.handler = this.handler.bind(this);
        this.handleClick = this.handleClick.bind(this);
    }
    handler(){
        // this.forceUpdate();
        // this.setFreebies();
        // this.filterHotels();
        // this.setState(this.state);
        // window.location.reload();
        var array_flights = this.props.flights;
        var array_flights_return = this.props.flights_return;
        console.log(array_flights);
        this.setState({
            array_for_sorting:array_flights

        });

        this.setState({
            array_for_sorting_return:array_flights_return

        });
        this.setState({
            array_for_sorting_result:array_flights

        });


    }

    render()
    {
        var styles={
            height:'100px'
        };
        return(
            <div>
            <div>
                <FLightSerachPanel handler = {this.handler}/>
            </div>
            <div className="container-fluid">
                <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/latest/css/bootstrap.min.css"/>
                <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/latest/css/bootstrap-theme.min.css"/>

                <div className="col-lg-2" id="divfilter" >
                    <div id="divleftpanel">
                        <h4 id="h4filter">Air Lines</h4>
                        <hr />
                    <form>
                        <div>
                            <label for="airindia" class="control control--checkbox">Air India
                            <input type="checkbox"
                                    id="airindia"
                                    name="airindia"
                                    value="airindia"
                                    onClick={(event) => {

                                         if ( this.state.checkbox_airindia === 1){
                                        var temp = this.state.airlines;
                                        var index = temp.indexOf(event.target.value);
                                        temp.splice(index,1);
                                        console.log(temp);
                                            // this.setState(Object.assign({},this.state,{airlines:temp}),this.flights(null,null));
                                        // temp ********

                                             this.setState({
                                                 airlines: temp
                                             },this.flights(null,null));

                                             this.setState({
                                                 checkbox_airindia:0
                                             });
                                        this.temp();

                                         }
                                         else
                                        {
                                            var temp = this.state.airlines;
                                            temp.push(event.target.value);
                                            console.log(temp);
                                            // this.setState(Object.assign({},this.state,{airlines:temp}),this.flights(null,null));

                                            this.setState({
                                                airlines: temp
                                            },this.flights(null,null));

                                            this.setState({
                                                checkbox_airindia: 1
                                            });
                                            this.temp();
                                         }
                                    }}
                                   defaultChecked
                                />
                                <div class="control__indicator"></div>
                                </label>
                        </div>
                        <div>
                            <label for="airasia" class="control control--checkbox">Air Asia
                            <input type="checkbox"
                                   id="airasia"
                                   name="airasia"
                                   value="airasia"
                                   onClick={(event) => {

                                       if ( this.state.checkbox_airasia === 1){
                                           var temp = this.state.airlines;
                                           var index = temp.indexOf(event.target.value);
                                           temp.splice(index,1);
                                           console.log(temp);
                                           // this.setState(Object.assign({},this.state,{airlines:temp}),this.flights(null,null));
                                           // temp ********

                                           this.setState({
                                               airlines: temp
                                           },this.flights(null,null));

                                           this.setState({
                                               checkbox_airasia:0
                                           });
                                           this.temp();

                                       }
                                       else
                                       {
                                           var temp = this.state.airlines;
                                           temp.push(event.target.value);
                                           console.log(temp);
                                           // this.setState(Object.assign({},this.state,{airlines:temp}),this.flights(null,null));

                                           this.setState({
                                               airlines: temp
                                           },this.flights(null,null));

                                           this.setState({
                                               checkbox_airasia: 1
                                           });
                                           this.temp();
                                       }
                                   }}
                                   defaultChecked
                                   />
                                <div class="control__indicator"></div>
                            </label>

                        </div>
                        <div>
                            <label for="emirates" class="control control--checkbox">Emirates
                            <input type="checkbox"
                                   id="emirates"
                                   name="emirates"
                                   value="emirates"
                                   onClick={(event) => {

                                       if ( this.state.checkbox_emirates === 1){
                                           var temp = this.state.airlines;
                                           var index = temp.indexOf(event.target.value);
                                           temp.splice(index,1);
                                           console.log(temp);
                                           // this.setState(Object.assign({},this.state,{airlines:temp}),this.flights(null,null));
                                           // temp ********

                                           this.setState({
                                               airlines: temp
                                           },this.flights(null,null));

                                           this.setState({
                                               checkbox_emirates:0
                                           });
                                           this.temp();

                                       }
                                       else
                                       {
                                           var temp = this.state.airlines;
                                           temp.push(event.target.value);
                                           console.log(temp);
                                           // this.setState(Object.assign({},this.state,{airlines:temp}),this.flights(null,null));

                                           this.setState({
                                               airlines: temp
                                           },this.flights(null,null));

                                           this.setState({
                                               checkbox_emirates: 1
                                           });
                                           this.temp();
                                       }
                                   }}
                                   defaultChecked
                            />
                                <div class="control__indicator"></div>
                            </label>

                        </div>
                        <div>
                            <label for="jetblue" class="control control--checkbox">Jet Blue

                            <input type="checkbox"
                                    id="jetblue"
                                   name="jetblue"
                                    value="jetblue"
                                   onClick={(event) => {

                                       if ( this.state.checkbox_jetblue === 1){
                                           var temp = this.state.airlines;
                                           var index = temp.indexOf(event.target.value);
                                           temp.splice(index,1);
                                           console.log(temp);
                                           // this.setState(Object.assign({},this.state,{airlines:temp}),this.flights(null,null));
                                           // temp ********

                                           this.setState({
                                               airlines: temp
                                           },this.flights(null,null));

                                           this.setState({
                                               checkbox_jetblue:0
                                           });
                                           this.temp();

                                       }
                                       else
                                       {
                                           var temp = this.state.airlines;
                                           temp.push(event.target.value);
                                           console.log(temp);
                                           // this.setState(Object.assign({},this.state,{airlines:temp}),this.flights(null,null));

                                           this.setState({
                                               airlines: temp
                                           },this.flights(null,null));

                                           this.setState({
                                               checkbox_jetblue: 1
                                           });
                                           this.temp();
                                       }
                                   }}
                                   defaultChecked
                                   />

                                <div class="control__indicator"></div></label>
                        </div>

                    </form>

                    <h4 id="h4filter">Price</h4>
                        <hr/>
                    {/*<input type="text"*/}
                           {/*className="form-control"*/}
                           {/*id="from-place"*/}
                           {/*placeholder="Price"*/}
                           {/*value={this.state.price_filter}*/}
                           {/*onChange={(event) => {*/}
                               {/*this.setState({*/}
                                   {/*price_filter: event.target.value*/}
                               {/*},this.flights(null,null));*/}
                           {/*}*/}

                           {/*}*/}
                    {/*/>*/}

                        <div>
                            <h6 id="sliderh6">${this.state.price_filter}</h6>
                        </div>
                    <input type="range"
                               min="10"
                               max="500"
                               step="10"
                               defaultValue="500"
                               onChange={(event) => {
                                   this.setState({
                                       price_filter: event.target.value
                                   },this.flights);
                               }

                               }
                        />

                        <h4 id="h4filter">Duration</h4>
                        <hr/>
                    {/*<input type="text"*/}
                           {/*className="form-control"*/}
                           {/*id="from-place"*/}
                           {/*placeholder="Price"*/}
                           {/*value={this.state.duration_filter}*/}
                           {/*onChange={(event) => {*/}
                               {/*this.setState({*/}
                                   {/*duration_filter: event.target.value*/}
                               {/*},this.flights(null,null));}*/}
                           {/*}*/}
                    {/*/>*/}
                    <div style={styles}>
                        <div>
                            <h6 id="sliderh6">${this.state.duration_filter}</h6>
                        </div>
                        <input type="range"
                               min="1"
                               max="20"
                               step="1"
                               defaultValue="20"
                               onChange={(event) => {
                                   this.setState({
                                       duration_filter: event.target.value
                                   },this.flights);}
                               }
                        />
                    </div>

                </div>
                </div>
                <div className="col-lg-10" >
                    <div className="row">
                    <div className="col-sm-6 col-lg-6 col-md-6 col-xs-6" >
                        <button className="sortbtn btn-block"
                                onClick={() => this.flights(true,null)}
                        >
                            PRICE
                        </button>
                    </div>
                    <div className="col-sm-6 col-lg-6 col-md-6 col-xs-6" >
                        <button className="sortbtn btn-block"
                                onClick={() => this.flights(null,true)}>
                            DURATION
                        </button>
                    </div>
                </div>
                <div className="row">

                    {/*<table >*/}

                        {/*<tbody>*/}

                        {/*{this.flights(null,null)}*/}
                    <span>
                        {this.temp()}
                    </span>
                        {/*</tbody>*/}
                    {/*</table>*/}
                </div>
            </div>
            </div>
            </div>
        );
    }
}

function mapStateToProps(state) {
    const flights = Object.keys(state.getflights).map((items) => (
        {
            'flights' : state.getflights[items]


        }
    ));

    const flights_return = Object.keys(state.getreturnflights).map((items) => (
        {
            'flights_return' : state.getreturnflights[items]


        }
    ));

    const tracking= state.tracking;

    return {flights,flights_return, tracking};
}

function mapDispatchToProps(dispatch) {

    return {
        getFlightsBooking : (data) => dispatch(getFlightsBooking(data)),
        updateTracking: updateTracking
    };
}

//export default Results;

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Results));
