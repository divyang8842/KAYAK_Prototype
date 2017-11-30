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
        user:'',
        carid:'',
        cartype: '',
        carclass: '',
        carmodel:'',
        carcity:'',
        car_dropoffcity:'',
        passengers:'',
        doors:'',
        bags:'',
        availableplace:'',
        carrent:'',
        cardistance:'',
        caragency:'',
        carBookingData:[],
        hotelBookingData:[],
        flightBookingData:[],
        visible:false,



    };

    componentWillMount(){

       this.getCarBookings();
       this.getHotelBookings();
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






    render() {

        var carBookings=this.state.carBookingData;
        var hotelBookings=this.state.hotelBookingData;
        var flightBookings=this.state.flightBookingData;


        return (
            <div>

                <h3>Car Bookings</h3>
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


                </BootstrapTable>

                <h3>Flight Bookings</h3>
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


                </BootstrapTable>

                <h3>Hotel Bookings</h3>
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


                </BootstrapTable>


            </div>
        );
    }
}



export default Bookings;

