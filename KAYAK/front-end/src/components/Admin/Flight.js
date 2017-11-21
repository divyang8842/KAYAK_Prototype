import React, {Component} from 'react';
import * as API from '../../api/Admin/FlightAdmin-API';
import ReactDOM from 'react-dom';
import FormErrors from "../FormErrors";
import TimePicker from 'react-bootstrap-time-picker';
import TimePicker1 from 'react-bootstrap-time-picker';
import { timeToInt } from 'time-number';


class Flight extends Component {

    constructor() {
        super();

        this.filterState = this.filterState.bind(this);
        this.handleTimeChange = this.handleTimeChange.bind(this);

        this.state = {
            format: 12,
            initialValue: "00:00",
            start: "00:00",
            end: "23:59",
            step: 1,
            onChange: this.handleTimeChange,
            departuretime:'',
            arrivaltime:'',
            type:''
        };
    }

    handleTimeChange(value) {
        //alert(this.state.type)
        if(this.state.type=='d'){
            this.setState({ value ,
                "departuretime":value
            },alert(JSON.stringify(this.state)));
        }else if(this.state.type=='a'){
            this.setState({ value ,
                "arrivaltime":value},alert(JSON.stringify(this.state)));
        }

    }

    state={
        user:'',
        flightnumber: '',
        airlinename: '',
        stationname:'',
        flightduration:'',
        flightclasses:'',
        economyClassFare:'',
        firstClassFare:'',
        businessClassFare:'',
        premiumEcoFare:'',

        formErrors: {flightnumber:'',airlinename:'',stationname: '',flightduration:'', flightclasses:'',economyClassFare:'',firstClassFare:'',businessClassFare:'',premiumEcoFare:''},
        type:false,
        flightNumberValid:false,
        airlineNameValid:false,
        stationNameValid: false,
        flightDurationValid:false,
        economyClassFareValid:false,
        firstClassValid:false,
        businessClassFareValid:false,
        premiumEcoFareValid:false,


    };

    componentWillMount(){
        this.setState({formErrors: {flightnumber:'',airlinename:'',stationname: '',flightduration:'', flightclasses:'',economyClassFare:'',firstClassFare:'',businessClassFare:'',premiumEcoFare:''},
            flightNumberValid: true,
            airlineNameValid: true,
            stationNameValid: true,
            flightDurationValid:true,
            economyClassFareValid:true,
            firstClassValid:true,
            businessClassFareValid:true,
            premiumEcoFareValid:true,
        });



    }


    validateField(fieldName, value) {
        let fieldValidationErrors = this.state.formErrors;
        let flightNumberValid=this.state.flightNumberValid;
        let airlineNameValid=this.state.airlineNameValid;
        let stationNameValid=this.state.stationNameValid;
        let flightDurationValid=this.state.flightDurationValid;
        let economyClassFareValid=this.state.economyClassFareValid;
        let firstClassValid=this.state.firstClassValid;
        let businessClassFareValid=this.state.businessClassFareValid;
        let premiumEcoFareValid=this.state.premiumEcoFareValid;

        switch(fieldName) {
            case 'flightnumber':
                flightNumberValid = value.length !== 0;
                fieldValidationErrors.flightnumber = flightNumberValid ? '': ' is required';
                break;
            case 'airlinename':
                airlineNameValid = value.length !== 0;
                fieldValidationErrors.airlinename = airlineNameValid ? '': ' is required';
                break;
            case 'stationname':
                stationNameValid = value.length !== 0 ;
                fieldValidationErrors.stationname = stationNameValid ? '': ' is required';
                break;
            case 'flightduration':
                flightDurationValid = value.length !== 0;
                fieldValidationErrors.flightduration = flightDurationValid ? '': ' is required';
                break;
            case 'economyClassFare':
                economyClassFareValid = value.length !== 0;
                fieldValidationErrors.economyClassFare = economyClassFareValid ? '': ' is required';
                break;
            case 'firstClassFare':
                firstClassValid = value.length !== 0;
                fieldValidationErrors.firstClassFare = firstClassValid ? '': ' is required';
                break;
            case 'businessClassFare':
                businessClassFareValid = value.length !== 0;
                fieldValidationErrors.businessClassFare = businessClassFareValid ? '': ' is required';
                break;
            case 'premiumEcoFare':
                premiumEcoFareValid = value.length !== 0;
                fieldValidationErrors.premiumEcoFare = premiumEcoFareValid ? '': ' is required';
                break;
            default:
                break;
        }
        this.setState({formErrors: fieldValidationErrors,
            flightNumberValid: flightNumberValid,
            airlineNameValid: airlineNameValid,
            stationNameValid: stationNameValid,
            flightDurationValid:flightDurationValid,
            economyClassFareValid:economyClassFareValid,
            firstClassValid:firstClassValid,
            businessClassFareValid:businessClassFareValid,
            premiumEcoFareValid:premiumEcoFareValid,

        }, this.validateForm);
    }

    validateForm() {
        this.setState({formValid: this.state.flightNumberValid && this.state.airlineNameValid && this.state.stationNameValid && this.state.flightDurationValid && this.state.economyClassFareValid  && this.state.firstClassValid  && this.state.businessClassFareValid && this.state.premiumEcoFareValid});
    }

    errorClass(error) {
        return(error.length === 0 ? '' : 'has-error');
    }


    insertFlightDetails = (userdata) => {
        alert(JSON.stringify(userdata));
        API.insertFlightData(userdata)
            .then((status) => {
                alert(JSON.stringify(status))
                if (status.status == '201') {
                    this.setState({
                        root:status.root,
                        isLoggedIn: false,
                        message: "Inserted Flight Data Successfully..!!",
                    });
                    alert("Inserted Flight Data Successfully..!!")
                } else if (status === 401) {
                    this.setState({
                        isLoggedIn: false,
                        message: "SignUp Failed"
                    });
                }
            });
    };
    filterState() {
        const ret = {...this.state};

        try {
            timeToInt(ret.start);
        } catch(ex) {
            ret.start = "00:00";
        }

        try {
            timeToInt(ret.end);
        } catch(ex) {
            ret.end = "23:59";
        }

        if (ret.step < 1) {
            ret.step = 30;
        }

        return ret;
    }


    render() {
        return (
            <div>
                <div id="fh5co-page">
                    <div className="container">
                        <div className="row">
                            <form>
                                <FormErrors formErrors={this.state.formErrors} />
                                <div className="row">
                                    <div className="col-xxs-12 col-xs-6 mt">
                                        <div className="input-field">
                                            <label>Flight Number:</label>
                                            <input type="text" placeholder="Enter Flight Number" value={this.state.flightnumber} className="form-control" onChange={(event)=>{const name="flightnumber"
                                                const value=event.target.value
                                                this.setState({flightnumber: event.target.value,
                                                    type:true}, () => { this.validateField(name, value)});}}/>
                                        </div>
                                    </div>
                                    <div className="col-xxs-12 col-xs-6 mt">
                                        <div className="input-field">
                                            <label>Airline Name:</label>
                                            <input type="text" placeholder="Enter Airline Name" value={this.state.airlinename} className="form-control" onChange={(event)=>{const name="airlinename"
                                                const value=event.target.value
                                                this.setState({airlinename: event.target.value,
                                                    type:true}, () => { this.validateField(name, value)});}}/>
                                        </div>
                                    </div>
                                    <div className="col-xxs-12 col-xs-6 mt">
                                        <div className="input-field">
                                            <label>Station Name:</label>
                                            <input type="text" placeholder="Enter Station Name" value={this.state.stationname} className="form-control" onChange={(event)=>{const name="stationname"
                                                const value=event.target.value
                                                this.setState({stationname: event.target.value,
                                                    type:true}, () => { this.validateField(name, value)});}}/>
                                        </div>
                                    </div>
                                    <div className="col-xxs-12 col-xs-6 mt">
                                        <div className="input-field">
                                            <label>Departure Time:</label>
                                            {/* <input type="time" placeholder="Enter Departure Time" value={this.state.departuretime} className="form-control" onChange={(event)=>{const name="departuretime"
                                                const value=event.target.value
                                                this.setState({departuretime: event.target.value,
                                                    type:true}, () => { this.validateField(name, value)});}}/>*/}
                                            <TimePicker value={this.state.departuretime}  onClick ={()=>this.setState({type:'d'})}  {...this.filterState(this.state)}   />

                                        </div>
                                    </div>


                                    <div className="col-xxs-12 col-xs-6 mt">
                                        <div className="input-field">
                                            <label>Arrival Time:</label>
                                            <TimePicker1 value={this.state.arrivaltime} onClick ={()=>this.setState({type:'a'})}  {...this.filterState(this.state)}   />

                                        </div>
                                    </div>

                                    <div className="col-xxs-12 col-xs-6 mt">
                                        <div className="input-field">
                                            <label>Flight Duration:</label>
                                            <input type="text" placeholder="Enter Flight Duration (Minutes)" value={this.state.flightduration} className="form-control" onChange={(event)=>{const name="flightduration"
                                                const value=event.target.value
                                                this.setState({flightduration: event.target.value,
                                                    type:true}, () => { this.validateField(name, value)});}}/>
                                        </div>
                                    </div>

                                    <div className="col-xxs-12 col-xs-6 mt">
                                        <div className="input-field">
                                            <label>Economy Class Fare:</label>
                                            <input type="text" placeholder="Enter Economy Class Fare" value={this.state.economyClassFare} className="form-control" onChange={(event)=>{const name="economyClassFare"
                                                const value=event.target.value
                                                this.setState({economyClassFare: event.target.value,
                                                    type:true}, () => { this.validateField(name, value)});}}/>
                                        </div>
                                    </div>
                                    <div className="col-xxs-12 col-xs-6 mt">
                                        <div className="input-field">
                                            <label>First Class:</label>
                                            <input type="text" placeholder="Enter First Class Fare " value={this.state.firstClassFare} className="form-control" onChange={(event)=>{const name="firstClassFare"
                                                const value=event.target.value
                                                this.setState({firstClassFare: event.target.value,
                                                    type:true}, () => { this.validateField(name, value)});}}/>
                                        </div>
                                    </div>
                                    <div className="col-xxs-12 col-xs-6 mt">
                                        <div className="input-field">
                                            <label>Business Class Fare:</label>
                                            <input type="text" placeholder="Enter Business Class Fare" value={this.state.businessClassFare} className="form-control" onChange={(event)=>{const name="businessClassFare"
                                                const value=event.target.value
                                                this.setState({businessClassFare: event.target.value,
                                                    type:true}, () => { this.validateField(name, value)});}}/>
                                        </div>
                                    </div>
                                    <div className="col-xxs-12 col-xs-6 mt">
                                        <div className="input-field">
                                            <label>Premium Economy Class Fare:</label>
                                            <input type="text" placeholder="Enter Premium Economy Class Fare" value={this.state.premiumEcoFare} className="form-control" onChange={(event)=>{const name="premiumEcoFare"
                                                const value=event.target.value
                                                this.setState({premiumEcoFare: event.target.value,
                                                    type:true}, () => { this.validateField(name, value)});}}/>
                                        </div>
                                    </div>




                                    <div className="col-xxs-12 col-xs-12 mt"></div>


                                    <div className="col-xs-2">
                                        <button type="button" disabled={!this.state.formValid} className="btn btn-primary btn-block" value="Submit" onClick={() => this.insertFlightDetails(this.state)}>Submit</button>
                                    </div>
                                </div>

                            </form>



                        </div>
                    </div>
                </div>


            </div>
        );
    }
}

export default Flight;