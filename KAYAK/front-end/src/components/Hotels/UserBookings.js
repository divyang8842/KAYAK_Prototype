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
        hotelid:'',
        reviewoverall:'',
        reviewcount: '',
        reviewlocation: '',
        reviewvibe:'',
        reviewservice:'',
        reviewameneties:'',
        reviewroom:'',
        reviewfood:'',
        formValid:false

    };

    componentWillMount(){
        this.getFlightBookings();


    }

    getHotelBookings=()=>{
        API.getHotelBooking()
            .then((status)=>{
            //alert(JSON.stringify(status));
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
                   // alert(JSON.stringify(status));
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
                    // /alert(JSON.stringify(status));
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

    insertRevieweDetails = (userdata) => {
        API.insertReviewData(userdata)
            .then((status) => {
         //  alert(JSON.stringify(status))
                if (status.status == '200') {
                    this.setState({

                        message: "Inserted Hotel Review Data Successfully..!!",
                    });
                } else if (status === 401) {

                }
            });
    };



    toggleVisible = (event) =>{
        this.setState({update:true,visible: !this.state.visible});
    }


    render() {

        var carBookings=this.state.carBookingData;
        var hotelBookings=this.state.hotelBookingData;
        //alert("hotelBookings is "+JSON.stringify(hotelBookings));
        var flightBookings=this.state.flightBookingData;

var abc=hotelBookings;

        var onRowSelect =(row, isSelected, e) => {
            this.setState({update:true,visible: !this.state.visible});



            let rowStr = '';
            var obj = {};
            var myJsonString = JSON.stringify(row);
            for (const prop in row) {
                obj += '"'+prop +'":"'+ row[prop]+'",';
            }
            obj = JSON.parse(myJsonString);
            // alert('The new row is:' + JSON.stringify(obj));
            // alert(obj.car_type);
            checkIfReviewDone(obj.hotel_id);
            this.setState({
                hotelid:obj.hotel_id,
                cartype: obj.car_type,
                carclass: obj.car_class,
                carmodel: obj.car_model,
                carcity: obj.car_city,
                car_dropoffcity: obj.car_dropoff_city,
                passengers: obj.passengers,
                doors: obj.doors,
                bags: obj.bags,
                availableplace: obj.available_place,
                carrent: obj.car_rent,
                cardistance: obj.car_distance,
                caragency:obj.car_agency,
                srcdata :''
            });
        }
        const options = {

            onRowDoubleClick:onRowSelect

        };
        var checkIfReviewDone=(data)=>{
            var abc={hotelid:data};
            API.checkIfReviewDone(abc)
                .then((status) => {
                    //  alert(JSON.stringify(status))
                    if (status.status == '200') {
                        this.setState({
                            message: "Inserted Hotel Review Data Successfully..!!",
                        });
                        alert("Review already submitted for this particular hotel");
                        this.setState({update:true,visible: !this.state.visible});

                    } else if (status.status == '401') {

                    }
                });
        }
        return (
            <div>
                <div>
                    <div id="fh5co-page">
                        <div className="container">
                            <h3 style={{fontWeight:"bold",textAlign:"center"}}>Bookings & Reviews</h3>
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
                            <TableHeaderColumn dataField='hotel_id' isKey hidden>Hotel ID</TableHeaderColumn>
                            <TableHeaderColumn dataField='car_type'  filter={ { type: 'TextFilter', delay: 1000 } }>Car Type</TableHeaderColumn>
                            <TableHeaderColumn dataField='car_class'>Car Class</TableHeaderColumn>
                            <TableHeaderColumn dataField='car_model' >Car Model</TableHeaderColumn>
                            <TableHeaderColumn dataField='car_city'>Car City</TableHeaderColumn>

                            <TableHeaderColumn dataField='car_dropoff_city'  hidden>Car DropOff City</TableHeaderColumn>


                            <TableHeaderColumn dataField='doors' hidden>Car Doors</TableHeaderColumn>
                            <TableHeaderColumn dataField='bags' hidden>Car Bags</TableHeaderColumn>
                            <TableHeaderColumn dataField='available_place' width='150'  hidden>Car Available Place</TableHeaderColumn>

                            <TableHeaderColumn dataField='car_rent'>Car Rent</TableHeaderColumn>

                            <TableHeaderColumn dataField='car_distance' width='150'  hidden>Car Distance</TableHeaderColumn>
                        </BootstrapTable></div>):

                    (this.state.flightBooking ? (<div>   <h3>Flight Bookings</h3>
                            <BootstrapTable  data={flightBookings} pagination>
                                <TableHeaderColumn dataField='flight_id' isKey hidden>Flight Id</TableHeaderColumn>
                                <TableHeaderColumn dataField='airline_name'  filter={ { type: 'TextFilter', delay: 1000 } }>Airline Name</TableHeaderColumn>
                                <TableHeaderColumn dataField='origin_station'>Flight Station</TableHeaderColumn>
                                <TableHeaderColumn dataField='flight_departure' >Departure</TableHeaderColumn>
                                <TableHeaderColumn dataField='flight_arrival'>Arrival</TableHeaderColumn>


                                <TableHeaderColumn dataField='class'>Seat Class</TableHeaderColumn>



                            </BootstrapTable></div>):

                        (this.state.hotelBooking && !this.state.visible ? (<div>  <h3>Hotel Bookings</h3>
                            <BootstrapTable  data={abc}  options={ options }   pagination>
                                <TableHeaderColumn dataField='billid' isKey hidden>Bill ID</TableHeaderColumn>
                                <TableHeaderColumn dataField='hotel_name'  filter={ { type: 'TextFilter', delay: 1000 } }>Hotel Name</TableHeaderColumn>
                                <TableHeaderColumn dataField='hotelcity'>Hotel City</TableHeaderColumn>
                                <TableHeaderColumn dataField='hotel_state' >Hotel State</TableHeaderColumn>
                                <TableHeaderColumn dataField='checkin'>Check-in</TableHeaderColumn>

                                <TableHeaderColumn dataField='checkout'>Check-out</TableHeaderColumn>

                                <TableHeaderColumn dataField='room_rent'>Room Rent</TableHeaderColumn>



                            </BootstrapTable></div>): null))}


                {this.state.visible && this.state.hotelBooking ? <div id="fh5co-page">
                    <div className="container">
                        <div className="row">

                            <form>

                                <div className="row">
                                    <div className="col-xxs-12 col-xs-6 mt">
                                        <div className="input-field">
                                            <label>Review Overall:</label>
                                            <select className="form-control" name="trp_code" id="trp_code" title="Transporter" style={{width: 350}} onChange={(event)=>{const name="reviewoverall"
                                                const value=event.target.value
                                                this.setState({reviewoverall: event.target.value,
                                                    type:true})}}>
                                                <option value="" disabled selected>Enter Overall Review</option>
                                                <option className="form-control" >1</option>
                                                <option className="form-control" >2</option>
                                                <option className="form-control">3</option>
                                                <option className="form-control" >4</option>
                                                <option className="form-control" >5</option>

                                            </select>
                                        </div>
                                    </div>
                                    <div className="col-xxs-12 col-xs-6 mt">
                                        <div className="input-field">
                                            <label>Review Count:</label>

                                            <select className="form-control" name="trp_code" id="trp_code" title="Transporter" style={{width: 350}} onChange={(event)=>{const name="reviewcount"
                                                const value=event.target.value
                                                this.setState({reviewcount: event.target.value,
                                                    type:true})}}>
                                                <option value="" disabled selected>Enter Review Count</option>
                                                <option className="form-control" >1</option>
                                                <option className="form-control" >2</option>
                                                <option className="form-control">3</option>
                                                <option className="form-control" >4</option>
                                                <option className="form-control" >5</option>

                                            </select>
                                        </div>
                                    </div>
                                    <div className="col-xxs-12 col-xs-6 mt">
                                        <div className="input-field">
                                            <label>Review Location:</label>

                                            <select className="form-control" name="trp_code" id="trp_code" title="Transporter" style={{width: 350}} onChange={(event)=>{const name="reviewlocation"
                                                const value=event.target.value
                                                this.setState({reviewlocation: event.target.value,
                                                    type:true})}}>
                                                <option value="" disabled selected>Enter Location Review</option>
                                                <option className="form-control" >1</option>
                                                <option className="form-control" >2</option>
                                                <option className="form-control">3</option>
                                                <option className="form-control" >4</option>
                                                <option className="form-control" >5</option>

                                            </select>
                                        </div>
                                    </div>
                                    <div className="col-xxs-12 col-xs-6 mt">
                                        <div className="input-field">
                                            <label>Review Vibe:</label>
                                            <select className="form-control" name="trp_code" id="trp_code" title="Transporter" style={{width: 350}} onChange={(event)=>{const name="reviewvibe"
                                                const value=event.target.value
                                                this.setState({reviewvibe: event.target.value,
                                                    type:true})}}>
                                                <option value="" disabled selected>Enter Vibe Review</option>
                                                <option className="form-control" >1</option>
                                                <option className="form-control" >2</option>
                                                <option className="form-control">3</option>
                                                <option className="form-control" >4</option>
                                                <option className="form-control" >5</option>

                                            </select>
                                        </div>
                                    </div>

                                    <div className="col-xxs-12 col-xs-6 mt">
                                        <div className="input-field">
                                            <label>Review Service:</label>
                                            <select className="form-control" name="trp_code" id="trp_code" title="Transporter" style={{width: 350}} onChange={(event)=>{const name="reviewservice"
                                                const value=event.target.value
                                                this.setState({reviewservice: event.target.value,
                                                    type:true})}}>
                                                <option value="" disabled selected>Enter Service Review</option>
                                                <option className="form-control" >1</option>
                                                <option className="form-control" >2</option>
                                                <option className="form-control">3</option>
                                                <option className="form-control" >4</option>
                                                <option className="form-control" >5</option>

                                            </select>
                                        </div>
                                    </div>

                                    <div className="col-xxs-12 col-xs-6 mt">
                                        <div className="input-field">
                                            <label>Review Amenities:</label>
                                            <select className="form-control" name="trp_code" id="trp_code" title="Transporter" style={{width: 350}} onChange={(event)=>{const name="reviewameneties"
                                                const value=event.target.value
                                                this.setState({reviewameneties: event.target.value,
                                                    type:true})}}>
                                                <option value="" disabled selected>Enter Amenities Review</option>
                                                <option className="form-control" >1</option>
                                                <option className="form-control" >2</option>
                                                <option className="form-control">3</option>
                                                <option className="form-control" >4</option>
                                                <option className="form-control" >5</option>

                                            </select>
                                        </div>
                                    </div>

                                    <div className="col-xxs-12 col-xs-6 mt">
                                        <div className="input-field">
                                            <label>Review Room:</label>
                                            <select className="form-control" name="trp_code" id="trp_code" title="Transporter" style={{width: 350}} onChange={(event)=>{const name="reviewroom"
                                                const value=event.target.value
                                                this.setState({reviewroom: event.target.value,
                                                    type:true})}}>
                                                <option value="" disabled selected>Enter Room Review</option>
                                                <option className="form-control" >1</option>
                                                <option className="form-control" >2</option>
                                                <option className="form-control">3</option>
                                                <option className="form-control" >4</option>
                                                <option className="form-control" >5</option>

                                            </select>
                                        </div>
                                    </div>
                                    <div className="col-xxs-12 col-xs-6 mt">
                                        <div className="input-field">
                                            <label>Review Food:</label>
                                            <select className="form-control" name="trp_code" id="trp_code" title="Transporter" style={{width: 350}} onChange={(event)=>{const name="reviewfood"
                                                const value=event.target.value
                                                this.setState({reviewfood: event.target.value,
                                                    type:true})}}>
                                                <option value="" disabled selected>Enter Food Review</option>
                                                <option className="form-control" >1</option>
                                                <option className="form-control" >2</option>
                                                <option className="form-control">3</option>
                                                <option className="form-control" >4</option>
                                                <option className="form-control" >5</option>

                                            </select>
                                        </div>
                                    </div>




                                    <div className="col-xs-2">
                                        <button type="button" disabled={!this.state.formValid} className="btn btn-primary btn-block" value="Submit" onClick={() => this.insertRevieweDetails(this.state)}>Submit</button>
                                    </div>


                                </div>

                            </form>


                        </div>

                    </div>{/*container*/}
                </div> : null}


            </div>
        );
    }
}



export default Bookings;

