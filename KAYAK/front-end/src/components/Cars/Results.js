import {connect} from 'react-redux';
import React, {Component} from 'react';
import { Route, Link,Switch,withRouter } from 'react-router-dom';
import {getCarsBooking} from '../../actions/Cars/CarBooking';
import SearchPanel from './SearchPanel';
import * as UserTracking from '../../api/UserTracking';
import {bindActionCreators} from 'redux';
import {updateTracking} from '../../actions/Analytics/Tracking';
import personimage from '../../public/images/user.svg';
import doorimage from '../../public/images/door.svg';
import bagimage from '../../public/images/bag.svg';
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
        currentPage: 1,
        itemsPerPage: 2,
        price_filter:500,


        duration_filter:100,
        filtered: false,
        price_asc:1,
        duration_asc:1

    };

    handleClick(event) {
        this.setState({
          currentPage: Number(event.target.id)
        });
      }

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

            if (flight_flag) {
                flight_flag = false;
                if(Number(cars.cars.car_distance) <= this.state.duration_filter)
                {
                if (cars.cars.car_rent <= this.state.price_filter) {
                    array_used_for_sorting.push(cars.cars);
                    if (price_flag) {

                        if(this.state.price_asc === 1) {
                            array_used_for_sorting.sort(function (a, b) {
                                return parseFloat(a.car_rent) - parseFloat(b.car_rent);
                            });

                            this.setState({
                                price_asc: 0
                            });
                        }
                        else
                        {
                            array_used_for_sorting.sort(function (a, b) {
                                return parseFloat(b.car_rent) - parseFloat(a.car_rent);
                            });

                            this.setState({
                                price_asc: 1
                            });

                        }

                    }

                    if (duration_flag) {

                        if(this.state.duration_asc === 1) {
                            array_used_for_sorting.sort(function (a, b) {
                                return parseFloat(a.car_distance) - parseFloat(b.car_distance);
                            });

                            this.setState({
                                duration_asc: 0
                            });
                        }
                        else
                        {
                            array_used_for_sorting.sort(function (a, b) {
                                return parseFloat(b.car_distance) - parseFloat(a.car_distance);
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

        // Logic for displaying current todos
       const indexOfLastTodo = this.state.currentPage * this.state.itemsPerPage;
       const indexOfFirstTodo = indexOfLastTodo - this.state.itemsPerPage;
       const currentItems = car_array.slice(indexOfFirstTodo, indexOfLastTodo);

       const pageNumbers = [];
       for (let i = 1; i <= Math.ceil(car_array.length / this.state.itemsPerPage); i++) {
         pageNumbers.push(i);
       }

        const items= currentItems.map((cars,index) => {
            var styles = {
                background: 'white',
                'margin-bottom': '8px',
                height: 140,
                padding: 0
            };

            return (
                <div className="row" style={styles}>
                    <div className="col-sm-8 col-lg-8 col-md-8 col-xs-8" style={{padding:0, paddingLeft:10}}>
                        <h3 style={{margin:0, marginTop:5}}>{cars.cars.car_class}</h3>
                        <p style={{fontSize:12, fontWeight:'bold',color:'#7D7D7D', margin:0}}> {cars.cars.car_model} </p>
                        <br/>
                        <span>
 <img type="image/svg+xml" src={personimage} height="18px" style={{margin:0, marginLeft:0, marginBottom:7}} alt="pessangerImage"/>
 <label style={{marginLeft:5, fontSize:20}}>{cars.cars.passengers}</label>
 <img type="image/svg+xml" src={bagimage} height="18px" style={{margin:0,marginLeft:30, marginBottom:7}} alt="bagImage"/>
 <label style={{marginLeft:5, fontSize:20}}>{cars.cars.bags}</label>
 <img type="image/svg+xml" src={doorimage} height="18px" style={{margin:0,marginLeft:30, marginBottom:7}} alt="doorImage"/>
 <label style={{marginLeft:5, fontSize:20}}>{cars.cars.doors}</label>
 </span>
                        <hr style={{margin:0}}/>
                        <div className="row">
                            <div className="col-lg-10 col-md-10 col-sm-10">
                            </div>
                            <div className="col-lg-2 col-md-2 col-sm-2">
                                {/* <h4>{this.props.car_agency}</h4> */}
                                <h4 style={{color:'#3071a9', fontWeight:'bold'}}>Zipcar</h4>
                            </div>
                        </div>
                    </div>
                    <div className="col-sm-2 col-lg-2 col-md-2 col-xs-2" style={{padding:0}}>
                        <img
                            ref={"base64img"}
                            style={{
                                display: 'block',
                                width: 140,
                                height: 140
                            }}
                            alt={"Image will appear here"}
                            src={"data:image/png;base64," + cars.cars.srcdata}></img>
                    </div>
                    <div className="col-sm-2 col-lg-2 col-md-2 col-xs-2" style={{borderLeft: '1px solid #999999', padding:0}}>
                        <div className="col-md-3 col-sm-3 " style={{background:'#ffffff', height:140}}>
                            <h3 style={{'margin-left':20, 'margin-top':30}}>${cars.cars.car_rent}</h3>
                            <br/>
                            {this.props.isLogged=='false' ?
                                (<button type="button" class="searchbtn" style={{'font-size':12,width:90, marginLeft:0, marginTop:0}} data-toggle="modal" data-target="#loginModal">VIEW DEAL</button>)
                                :
                                (<button className="searchbtn" style={{'font-size':12,width:90, marginLeft:0, marginTop:0}}
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
                                             if(currentpath[currentpath.length-1] != currentpage)
                                             currentpath.push(currentpage);
                                             this.props.history.push("/carsbooking");
                                             this.props.updateTracking({currentpath, currentpage, timenow});
                                         }
                                         }>VIEW DEAL</button>)}
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
              <ul>
                {items}
              </ul>
              <ul id="page-numbers">
                {renderPageNumbers}
              </ul>
            </div>
          );
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
        this.forceUpdate();
        this.temp();
        this.flights(null,null);
    }

    render() {
        var styles={
            height:'100px'
        };
        return(
            <div>
                <div>
                    <SearchPanel handler = {this.handler}/>
                </div>
                <div className="container-fluid">
                    {/* <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/latest/css/bootstrap.min.css"/> */}
                    {/* <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/latest/css/bootstrap-theme.min.css"/> */}

                    <div className="col-sm-3 col-lg-3 col-md-3 col-xs-3" id="divfilter">
                        <div className="row">
                            <div className="col-sm-1 col-lg-1 col-md-1 col-xs-1">
                            </div>
                            <div id="divleftpanel" className="col-sm-10 col-lg-10 col-md-10 col-xs-10">
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
                                <h4 id="h4filter">Distance</h4>
                                <hr/>
                                <div style={styles}>
                                <div>
                                    <h6 id="sliderh6">{this.state.duration_filter}</h6>
                                </div>
                                <input type="range"
                                       min="10"
                                       max="100"
                                       step="10"
                                       defaultValue="100"
                                       value={this.state.duration_filter}
                                       onChange={(event) => {
                                           this.setState({
                                               duration_filter: event.target.value
                                           },this.flights);
                                       }

                                       }
                                />

                                </div>
                            </div>
                            <div className="col-sm-1 col-lg-1 col-md-1 col-xs-1">
                            </div>
                        </div>
                    </div>
                    <div className="col-sm-9 col-lg-9 col-md-9 col-xs-9" >
                        <div className="row">
                            <div className="col-sm-6 col-lg-6 col-md-6 col-xs-6" >
                                <label className="sortbtn btn-block"
                                       onClick={() => this.flights(true,null)}
                                >
                                    PRICE
                                </label>
                            </div>
                            <div className="col-sm-6 col-lg-6 col-md-6 col-xs-6" >
                                <label className="sortbtn btn-block"
                                       onClick={() => this.flights(null,true)}
                                >
                                    DISTANCE
                                </label>
                            </div>

                        </div>

                        <div className="row">
                            <div className="col-sm-1 col-lg-1 col-md-1 col-xs-1">
                            </div>
                            <div className="col-sm-9 col-lg-9 col-md-9 col-xs-9" style={{marginLeft:50, width:750}}>
                                <div>
                                    {/*{this.flights(null,null)}*/}
                                    {this.temp()}
                                </div>
                            </div>
                            <div className="col-sm-1 col-lg-1 col-md-1 col-xs-1">
                            </div>
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