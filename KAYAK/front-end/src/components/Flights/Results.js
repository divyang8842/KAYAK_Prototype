import React, {Component} from 'react';
//import react from 'react-native';
//import * as API from '../api/api';
import {connect} from 'react-redux';
//import CheckBox from 'react-native-checkbox';
//import Slider from 'react-native-slider';
import { Route, Link,Switch,withRouter } from 'react-router-dom';
import {getFlightsBooking} from '../../actions/Flights/FlightBooking';
import FLightSerachPanel from './SearchPanel';

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
        airlines :['airindia','airasia','luftansa','jetblue','emirates'],
        checkbox_airindia:1,
        checkbox_airasia:1,
        checkbox_emirates:1,
        checkbox_jetblue:1,
        checkbox_luftansa:1,
        array_for_sorting:this.props.flights,
        array_for_sorting_result:this.props.flights,
        flag:0,
        check_boxes:[],
        price_filter:0,
        duration_filter:0
    };


    flights(price_flag,duration_flag)
    {
        var flight_flag=false;
        var duration ;
        var array_used_for_sorting =[];

        console.log("this.props.flights:"+this.props.flights);

        console.log("array_for_sorting:"+this.state.array_for_sorting);
        console.log("array_for_sorting_result:"+this.state.array_for_sorting_result);


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

                if( flights.flights.duration> this.state.duration_filter)
                {
                    if(flights.flights.totalprice > this.state.price_filter)
                    {
                        array_used_for_sorting.push(flights.flights);
                        if(price_flag )
                        {
                            array_used_for_sorting.sort(function(a, b) {
                                return parseFloat(a.totalprice) - parseFloat(b.totalprice);
                            });

                        }

                        if(duration_flag)
                        {
                            array_used_for_sorting.sort(function(a, b) {
                                return parseFloat(a.duration) - parseFloat(b.duration);
                            });


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

    bookflight()
    {

    }


    temp()
    {

        return this.state.array_for_sorting_result.map((flights,index) => {


            return (
                <tr>
                    <h3>
                        {flights.flights.airline_name}
                    </h3>
                    <br/>

                        {flights.flights.origin_station}

                        {flights.flights.destination_station}

                        {flights.flights.flight_departure}

                        {flights.flights.flight_arrival}

                        {flights.flights.totalprice}

                    <button className="btn btn-primary btn-block"
                            onClick={() =>{
                                var payload = {};
                                this.props.getFlightsBooking(flights);
                                this.props.history.push("/flightsbooking");
                            }
                                }>View Deal</button>

                </tr>
            )

        })
    }

    render()
    {
        var styles={
            height:'100px'
        };
        return(
            <div>
            <div>
                <FLightSerachPanel/>
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
                                   },this.flights(null,null));
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
                                   },this.flights(null,null));}
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

                    <table >

                        <tbody>

                        {/*{this.flights(null,null)}*/}

                        {this.temp()}
                        </tbody>
                    </table>
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

    return {flights};
}

function mapDispatchToProps(dispatch) {

    return {
        getFlightsBooking : (data) => dispatch(getFlightsBooking(data))
    };
}

//export default Results;

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Results));
