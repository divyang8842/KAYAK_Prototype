import {connect} from 'react-redux';
import React, {Component} from 'react';
import { Route, Link,Switch,withRouter } from 'react-router-dom';
import {getCarsBooking} from '../../actions/Cars/CarBooking';
import SearchPanel from './SearchPanel';
import * as UserTracking from '../../api/UserTracking';
import {bindActionCreators} from 'redux';
import {updateTracking} from '../../actions/Analytics/Tracking';

class Results extends Component {

    state ={
        airlines :['small','medium','large','SUV','convertible','luxury','van'],
        checkbox_small:1,
        checkbox_medium:1,
        checkbox_large:1,
        checkbox_suv:1,
        checkbox_convertible:1,
        checkbox_luxury:1,
        checkbox_van:1,
        array_for_sorting:[],
        array_for_sorting_result:[],
        flag:0,
        check_boxes:[],

        price_filter:500,
       

        duration_filter:0,
        filtered: false

    };

    componentWillMount(){
        this.state.array_for_sorting = this.props.cars;
        this.state.array_for_sorting_result = this.props.cars;
    }

    flights(price_flag,duration_flag)
    {
        var flight_flag=false;
        var array_used_for_sorting =[];

        console.log("array_for_sorting:"+this.state.array_for_sorting);
        console.log("array_for_sorting_result:"+this.state.array_for_sorting_result);


        this.props.cars.map((cars,index) =>{

            // Filter Condition for AIRLINES
            var array =this.state.airlines;

            for (var i=0;i<array.length;i++)
            {
                if(array[i] == cars.cars.car_type)
                {
                    flight_flag= true;

                }
            }

            if (flight_flag){
                flight_flag= false;

                    if(cars.cars.car_rent < this.state.price_filter)
                    {
                        array_used_for_sorting.push(cars.cars);
                        if(price_flag )
                        {
                            array_used_for_sorting.sort(function(a, b) {
                                return parseFloat(a.car_rent) - parseFloat(b.car_rent);
                            });

                        }

                        if(duration_flag)
                        {
                            array_used_for_sorting.sort(function(a, b) {
                                return parseFloat(a.car_distance) - parseFloat(b.car_distance);
                            });


                        }

                    }




            }

        });

        const cars = Object.keys(array_used_for_sorting).map((items) => (
            {
                'cars' : array_used_for_sorting[items]


            }
        ));


        this.setState({
            array_for_sorting_result: cars,
            filtered: true
        });

        this.setState({
            flag:1
        });
    }

    temp()
    {
        var car_array = [];
        if(this.state.filtered) car_array = this.state.array_for_sorting_result;
        else car_array = this.props.cars;
        return car_array.map((cars,index) => {


            return (
                <tr>
                    <h3>
                        {cars.cars.car_model}
                    </h3>
                    <br/>

                    {cars.cars.car_type}

                    {cars.cars.car_class}

                    {cars.cars.car_city}

                    {cars.cars.passengers}

                    {cars.cars.doors}
                    <img ref={"base64img"} style={{display: 'block', width: 100, height: 100}} alt={"Please select image"} src={"data:image/png;base64,"+cars.cars.srcdata}></img>
                    {this.props.isLogged=='false' ? 
                        (<button type="button" class="searchbtn" data-toggle="modal" data-target="#loginModal">View Deal</button>)
                        :
                        (<button className="searchbtn"
                        onClick={() =>{
                            var payload = {};
                            this.props.getCarsBooking(cars);

                            var tracking_object = {};
                            tracking_object.current_page = "BILLING_CAR";
                            tracking_object.previous_page = "CAR_PAGE";
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
                            var currentpage = "BILLING_CAR";
                            currentpath.push(currentpage);
                            this.props.history.push("/carsbooking");
                            this.props.updateTracking({currentpath, currentpage, timenow});
                        }
                        }>View Deal</button>)
                    }
                    {/* <button className="btn btn-primary btn-block"
                            onClick={() =>{
                                var payload = {};
                                this.props.getCarsBooking(cars);
                                this.props.history.push("/carsbooking");
                            }
                            }>View Deal</button> */}

                </tr>
            )

        })
    }

    constructor(props) {
        super(props)
    
        this.handler = this.handler.bind(this)
    }

    handler(){
        // this.forceUpdate();
        // this.setFreebies();
        // this.filterHotels();
        this.forceUpdate();
        this.temp();
        this.flights(null,null);
    }

    render() {
        return(
            <div>
            <div>
              <SearchPanel handler = {this.handler}/>
            </div>
            <div className="container-fluid">
                <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/latest/css/bootstrap.min.css"/>
                <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/latest/css/bootstrap-theme.min.css"/>

                <div className="col-sm-2 col-lg-2 col-md-2 col-xs-2" id="divfilter">


                <div id="divleftpanel">
                    <h4 id="h4filter">Car Type</h4>
                    <hr />
                    <form>
                        <div>
                        <label class="control control--checkbox">Small
                            <input type="checkbox"
                                   id="small"
                                   name="small"
                                   value="small"
                                   onClick={(event) => {

                                       if ( this.state.checkbox_small === 1){
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
                                               checkbox_small:0
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
                                               checkbox_small: 1
                                           });
                                           this.temp();
                                       }
                                   }}

                            defaultChecked/>
                            <div class="control__indicator"></div>
                            </label>
                        </div>
                        <div>
                        <label class="control control--checkbox">Medium
                            <input type="checkbox"
                                   id="medium"
                                   name="medium"
                                   value="medium"
                                   onClick={(event) => {

                                       if ( this.state.checkbox_medium === 1){
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
                                               checkbox_medium:0
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
                                               checkbox_medium: 1
                                           });
                                           this.temp();
                                       }
                                   }}
                                   defaultChecked/>
                            <div class="control__indicator"></div>
                            </label>

                        </div>
                        <div>
                        <label class="control control--checkbox">Large
                            <input type="checkbox"
                                   id="large"
                                   name="large"
                                   value="large"
                                   onClick={(event) => {

                                       if ( this.state.checkbox_large === 1){
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
                                               checkbox_large:0
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
                                               checkbox_large: 1
                                           });
                                           this.temp();
                                       }
                                   }}
                                   defaultChecked/>
                            <div class="control__indicator"></div>
                            </label>

                        </div>
                        <div>
                        <label class="control control--checkbox">SUV
                            <input type="checkbox"
                                   id="SUV"
                                   name="SUV"
                                   value="SUV"
                                   onClick={(event) => {

                                       if ( this.state.checkbox_suv === 1){
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
                                               checkbox_suv:0
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
                                               checkbox_suv: 1
                                           });
                                           this.temp();
                                       }
                                   }}
                                   defaultChecked/>
                             <div class="control__indicator"></div>
                            </label>
                        </div>



                        <div>
                        <label class="control control--checkbox">Convertible
                            <input type="checkbox"
                                   id="convertible"
                                   name="convertible"
                                   value="convertible"
                                   onClick={(event) => {

                                       if ( this.state.checkbox_convertible === 1){
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
                                               checkbox_convertible:0
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
                                               checkbox_convertible: 1
                                           });
                                           this.temp();
                                       }
                                   }}
                                   defaultChecked/>
                            <div class="control__indicator"></div>
                            </label>
                        </div>

                        <div>
                        <label class="control control--checkbox">Luxury
                            <input type="checkbox"
                                   id="luxury"
                                   name="luxury"
                                   value="luxury"
                                   onClick={(event) => {

                                       if ( this.state.checkbox_luxury === 1){
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
                                               checkbox_luxury:0
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
                                               checkbox_luxury: 1
                                           });
                                           this.temp();
                                       }
                                   }}
                                   defaultChecked/>
                            <div class="control__indicator"></div>
                            </label>
                        </div>

                        <div>
                        <label class="control control--checkbox">Van
                            <input type="checkbox"
                                   id="van"
                                   name="van"
                                   value="van"
                                   onClick={(event) => {

                                       if ( this.state.checkbox_van === 1){
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
                                               checkbox_van:0
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
                                               checkbox_van: 1
                                           });
                                           this.temp();
                                       }
                                   }}
                                   defaultChecked/>
                            <div class="control__indicator"></div>
                            </label>
                        </div>

                    </form>

                    <br/>
                    <br/>
                    <h4 id="h4filter">Price</h4>
                    <hr/>
                    <div>
                        <h6 id="sliderh6">${this.state.price_filter}</h6>
                    </div>
                    <input type="range"
                            min="50"
                            max="500"
                            step="10"
                            defaultValue="500"
                           value={this.state.price_filter}
                           onChange={(event) => {
                               this.setState({
                                   price_filter: event.target.value
                               },this.flights);
                           }

                           }
                    />

                    <br/>
                    <br/>
                    <h4 id="h4filter">Duration</h4>
                    <hr/>
                    <div>
                        {/* <h6 id="sliderh6">${this.state.filterparams.price}</h6> */}
                    </div>
                    <input type="text"
                           className="form-control"
                           id="from-place"
                           placeholder="Price"
                           value={this.state.duration_filter}
                           onChange={(event) => {
                               this.setState({
                                   duration_filter: event.target.value
                               },this.flights(null,null));}
                           }
                    />


                </div>
                </div>
                <div className="col-sm-10 col-lg-10 col-md-10 col-xs-10" >
                    <div className="row">
                        <div className="col-sm-6 col-lg-6 col-md-6 col-xs-6" >
                            <label className="sortbtn btn-block"
                                    onClick={() => this.flights(true,null)}
                            >
                                PRICE
                            </label>
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


    };
}

function mapStateToProps(state) {
        const cars = Object.keys(state.getcars.results).map((items) => (
            {
                'cars' : state.getcars.results[items]


            }
        ));
        const tracking = state.tracking

        return {cars, tracking};
    }

function mapDispatchToProps(dispatch) {

    return {
        getCarsBooking : (data) => dispatch(getCarsBooking(data)),
        updateTracking: updateTracking
    };
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Results));

