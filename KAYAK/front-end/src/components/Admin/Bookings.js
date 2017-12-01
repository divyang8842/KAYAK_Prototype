import React, {Component} from 'react';
import * as API from '../../api/Admin/BookingsAdmin-API';

import ReactDOM from 'react-dom';
import FormErrors from "../FormErrors";
import '../../../node_modules/react-bootstrap-table/dist/react-bootstrap-table-all.min.css';
import TextField from 'material-ui/TextField';

var ReactBsTable  = require('react-bootstrap-table');
var BootstrapTable = ReactBsTable.BootstrapTable;
var TableHeaderColumn = ReactBsTable.TableHeaderColumn;


class Bookings extends Component {

    state={
        flightBooking:true,
        hotelBooking:false,
        carBooking:false,
        carBookingData:[],
        hotelBookingData:[],
        flightBookingData:[],
        visible:false,



    };

    componentWillMount(){
        this.getFlightBookings();


    }

    getHotelBookings=()=>{
        API.getHotelBookings()
            .then((status)=>{
                if(status){
                    this.setState({
                        hotelBookingData:status.data
                    });

                }
                else
                {

                }
            });
    }

    getCarBookings=()=>{
        API.getCarBookings()
            .then((status)=>{
                if(status){
                    this.setState({
                        carBookingData:status.data
                    });

                }
                else
                {

                }
            });
    }

    getFlightBookings=()=>{
        API.getFlightBookings()
            .then((status)=>{
                if(status){
                    this.setState({
                        flightBookingData:status.data
                    });

                }
                else
                {

                }
            });
    }

     showDiv(n) {
        if(n===1){
            this.getFlightBookings();
            this.setState({flightBooking: true,hotelBooking: false,carBooking: false});
        }
        else if(n===2){
            this.getHotelBookings();
            this.setState({flightBooking: false,hotelBooking: true,carBooking: false});

        }
        else if(n===3){
            this.getCarBookings();
            this.setState({flightBooking: false,hotelBooking: false,carBooking: true});

        }

    }







    render() {

        var carBookings=this.state.carBookingData;
        var hotelBookings=this.state.hotelBookingData;
        var flightBookings=this.state.flightBookingData;


        return (

            <div>
                <div>
                    <div id="fh5co-page">
                        <div className="container">
                            <h3 style={{fontWeight:"bold",textAlign:"center"}}>Bookings</h3>
                            <div className="col-xxs-12 col-xs-12 mt"></div>

                            <div className="row">

                                <div className="w3-bar">
                                    <div className="col-xxs-3 col-xs-3 mt"></div>
                                    <div className="col-xxs-7 col-xs-7 mt" style={{marginLeft: 60}}>
                                        <button type="button" style={{color:"#F78536"}} className="w3-bar-item w3-button" value="Top 10 car agency" onClick={() => this.showDiv(1)}>Flight Bookings</button>
                                        <button type="button" style={{color:"#F78536"}} className="w3-bar-item w3-button" value="Top 10 flights" onClick={() => this.showDiv(2)}>Hotel Bookings</button>
                                        <button type="button" style={{color:"#F78536"}} className="w3-bar-item w3-button" value="Top 10 hotels" onClick={() => this.showDiv(3)}>Car Bookings</button>
                                    </div>
                                </div>
                            </div>
                            <div className="col-xxs-12 col-xs-12 mt"></div>
                            <div className="col-xxs-12 col-xs-12 mt"></div>




                        </div>
                    </div>
                </div>

                {this.state.carBooking? (<div>  <h3>Car Bookings</h3>
                <BootstrapTable  data={carBookings} pagination>
                    <TableHeaderColumn dataField='_id' isKey hidden>Car ID</TableHeaderColumn>
                    <TableHeaderColumn dataField='car_type'  filter={ { type: 'TextFilter', delay: 1000 } }>Car Type</TableHeaderColumn>
                    <TableHeaderColumn dataField='car_class'>Car Class</TableHeaderColumn>
                    <TableHeaderColumn dataField='car_model' >Car Model</TableHeaderColumn>
                    <TableHeaderColumn dataField='car_city'>Car City</TableHeaderColumn>

                    <TableHeaderColumn dataField='car_dropoff_city'  hidden>Car DropOff City</TableHeaderColumn>

                    <TableHeaderColumn dataField='passengers'>Passengers Capacity</TableHeaderColumn>

                    <TableHeaderColumn dataField='doors' hidden>Car Doors</TableHeaderColumn>
                    <TableHeaderColumn dataField='bags' hidden>Car Bags</TableHeaderColumn>
                    <TableHeaderColumn dataField='available_place' width='150'  hidden>Car Available Place</TableHeaderColumn>

                    <TableHeaderColumn dataField='car_rent'>Car Rent</TableHeaderColumn>

                    <TableHeaderColumn dataField='car_distance' width='150'  hidden>Car Distance</TableHeaderColumn>
                    <TableHeaderColumn dataField='car_agency' width='150'  >Car Agency</TableHeaderColumn>


                </BootstrapTable></div>):

                    (this.state.flightBooking ? (<div>   <h3>Flight Bookings</h3>
                <BootstrapTable  data={flightBookings} pagination>
                    <TableHeaderColumn dataField='car_id' isKey hidden>Car ID</TableHeaderColumn>
                    <TableHeaderColumn dataField='car_type'  filter={ { type: 'TextFilter', delay: 1000 } }>Car Type</TableHeaderColumn>
                    <TableHeaderColumn dataField='car_class'>Car Class</TableHeaderColumn>
                    <TableHeaderColumn dataField='car_model' >Car Model</TableHeaderColumn>
                    <TableHeaderColumn dataField='car_city'>Car City</TableHeaderColumn>

                    <TableHeaderColumn dataField='car_dropoff_city'  hidden>Car DropOff City</TableHeaderColumn>

                    <TableHeaderColumn dataField='passengers'>Passengers Capacity</TableHeaderColumn>

                    <TableHeaderColumn dataField='doors' hidden>Car Doors</TableHeaderColumn>
                    <TableHeaderColumn dataField='bags' hidden>Car Bags</TableHeaderColumn>
                    <TableHeaderColumn dataField='available_place' width='150'  hidden>Car Available Place</TableHeaderColumn>

                    <TableHeaderColumn dataField='car_rent'>Car Rent</TableHeaderColumn>

                    <TableHeaderColumn dataField='car_distance' width='150'  hidden>Car Distance</TableHeaderColumn>
                    <TableHeaderColumn dataField='car_agency' width='150'  >Car Agency</TableHeaderColumn>


                </BootstrapTable></div>):

                        (this.state.hotelBooking ? (<div>  <h3>Hotel Bookings</h3>
                <BootstrapTable  data={hotelBookings}  pagination>
                    <TableHeaderColumn dataField='car_id' isKey hidden>Car ID</TableHeaderColumn>
                    <TableHeaderColumn dataField='car_type'  filter={ { type: 'TextFilter', delay: 1000 } }>Car Type</TableHeaderColumn>
                    <TableHeaderColumn dataField='car_class'>Car Class</TableHeaderColumn>
                    <TableHeaderColumn dataField='car_model' >Car Model</TableHeaderColumn>
                    <TableHeaderColumn dataField='car_city'>Car City</TableHeaderColumn>

                    <TableHeaderColumn dataField='car_dropoff_city'  hidden>Car DropOff City</TableHeaderColumn>

                    <TableHeaderColumn dataField='passengers'>Passengers Capacity</TableHeaderColumn>

                    <TableHeaderColumn dataField='doors' hidden>Car Doors</TableHeaderColumn>
                    <TableHeaderColumn dataField='bags' hidden>Car Bags</TableHeaderColumn>
                    <TableHeaderColumn dataField='available_place' width='150'  hidden>Car Available Place</TableHeaderColumn>

                    <TableHeaderColumn dataField='car_rent'>Car Rent</TableHeaderColumn>

                    <TableHeaderColumn dataField='car_distance' width='150'  hidden>Car Distance</TableHeaderColumn>
                    <TableHeaderColumn dataField='car_agency' width='150'  >Car Agency</TableHeaderColumn>


                </BootstrapTable></div>): null))}


            </div>
        );
    }
}



export default Bookings;

