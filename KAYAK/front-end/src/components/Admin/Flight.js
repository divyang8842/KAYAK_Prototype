import React, {Component} from 'react';
import * as API from '../../api/Admin/CarAdmin-API';
import ReactDOM from 'react-dom';
import FormErrors from "../FormErrors";
import TimePicker from 'react-bootstrap-time-picker';


class Flight extends Component {

    state={
        user:'',
        flightnumber: '',
        airlinename: '',
        stationname:'',
        departuretime:'',
        arrivaltime:'',
        flightduration:'',
        flightclasses:'',
        flightprice:'',

        formErrors: {flightnumber:'',airlinename:'',stationname: '',departuretime: '',arrivaltime: '',flightduration:'', flightclasses:'',flightprice:''},
        type:false,
        flightNumberValid:false,
        airlineNameValid:false,
        stationNameValid: false,
        departureTimeValid: false,
        arrivalTimeValid:false,
        flightDurationValid:false,
        flightClassesValid:false,
        flightPriceValid:false,

    };

    componentWillMount(){
        this.setState({formErrors: {flightnumber:'',airlinename:'',stationname: '',departuretime: '',arrivaltime: '',flightduration:'', flightclasses:'',flightprice:''},
            flightNumberValid: true,
            airlineNameValid: true,
            stationNameValid: true,
            departureTimeValid:true,
            arrivalTimeValid:true,
            flightDurationValid:true,
            flightClassesValid:true,
            flightPriceValid:true,
        });



    }


    validateField(fieldName, value) {
        let fieldValidationErrors = this.state.formErrors;
        let flightNumberValid=this.state.flightNumberValid;
        let airlineNameValid=this.state.airlineNameValid;
        let stationNameValid=this.state.stationNameValid;
        let departureTimeValid=this.state.departureTimeValid;
        let arrivalTimeValid=this.state.arrivalTimeValid;
        let flightDurationValid=this.state.flightDurationValid;
        let flightClassesValid=this.state.flightClassesValid;
        let flightPriceValid=this.state.flightPriceValid;

        switch(fieldName) {
            case 'flightnumber':
                flightNumberValid = value.length !== 0;
                fieldValidationErrors.hotelname = flightNumberValid ? '': ' is required';
                break;
            case 'airlinename':
                airlineNameValid = value.length !== 0;
                fieldValidationErrors.hoteladdress = airlineNameValid ? '': ' is required';
                break;
            case 'stationname':
                stationNameValid = value.length !== 0 ;
                fieldValidationErrors.hotelcity = stationNameValid ? '': ' is required';
                break;
            case 'departuretime':
                departureTimeValid = value.length !== 0;
                fieldValidationErrors.hotelstate = departureTimeValid ? '': ' is required';
                break;

            case 'arrivaltime':
                arrivalTimeValid = value.length !== 0;
                fieldValidationErrors.hoteldesc = arrivalTimeValid ? '': ' is required';
                break;
            case 'flightduration':
                flightDurationValid = value.length !== 0;
                fieldValidationErrors.hoteldesc = flightDurationValid ? '': ' is required';
                break;
            case 'flightclasses':
                flightClassesValid = value.length !== 0;
                fieldValidationErrors.hoteldesc = flightClassesValid ? '': ' is required';
                break;
            case 'flightprice':
                flightPriceValid = value.length !== 0;
                fieldValidationErrors.hoteldesc = flightPriceValid ? '': ' is required';
                break;
            default:
                break;
        }
        this.setState({formErrors: fieldValidationErrors,
            flightNumberValid: flightNumberValid,
            airlineNameValid: airlineNameValid,
            stationNameValid: stationNameValid,
            departureTimeValid:departureTimeValid,
            arrivalTimeValid:arrivalTimeValid,
            flightDurationValid:flightDurationValid,
            flightClassesValid:flightClassesValid,
            flightPriceValid:flightPriceValid,

        }, this.validateForm);
    }

    validateForm() {
        this.setState({formValid: this.state.flightNumberValid && this.state.airlineNameValid && this.state.stationNameValid && this.state.departureTimeValid && this.state.arrivalTimeValid  && this.state.flightDurationValid  && this.state.flightClassesValid && this.state.flightPriceValid});
    }

    errorClass(error) {
        return(error.length === 0 ? '' : 'has-error');
    }


    insertCarDetails = (userdata) => {
        alert(JSON.stringify(userdata));
        API.insertCarData(userdata)
            .then((status) => {
                alert(JSON.stringify(status))
                if (status.status == '201') {
                    this.setState({
                        root:status.root,
                        isLoggedIn: false,
                        message: "Inserted Car Data Successfully..!!",
                    });
                    alert("Inserted Car Data Successfully..!!")
                    this.props.history.push("/login");
                } else if (status === 401) {
                    this.setState({
                        isLoggedIn: false,
                        message: "SignUp Failed"
                    });
                }
            });
    };


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
                                                this.setState({carcolor: event.target.value,
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
                                    <TimePicker start="10:00" end="21:00" step={30} />
                                    <div className="col-xxs-12 col-xs-6 mt">
                                        <div className="input-field">
                                            <label>Departure Time:</label>
                                            <input type="text" placeholder="Enter Departure Time" value={this.state.departuretime} className="form-control" onChange={(event)=>{const name="departuretime"
                                                const value=event.target.value
                                                this.setState({departuretime: event.target.value,
                                                    type:true}, () => { this.validateField(name, value)});}}/>
                                        </div>
                                    </div>


                                    <div className="col-xxs-12 col-xs-6 mt">
                                        <div className="input-field">
                                            <label>Arrival Time:</label>
                                            <input type="text" placeholder="Enter Arrival Time" value={this.state.arrivaltime} className="form-control" onChange={(event)=>{const name="arrivaltime"
                                                const value=event.target.value
                                                this.setState({arrivaltime: event.target.value,
                                                    type:true}, () => { this.validateField(name, value)});}}/>
                                        </div>
                                    </div>

                                    <div className="col-xxs-12 col-xs-6 mt">
                                        <div className="input-field">
                                            <label>Flight Duration:</label>
                                            <input type="text" placeholder="Enter Flight Duration" value={this.state.flightduration} className="form-control" onChange={(event)=>{const name="flightduration"
                                                const value=event.target.value
                                                this.setState({flightduration: event.target.value,
                                                    type:true}, () => { this.validateField(name, value)});}}/>
                                        </div>
                                    </div>





                                    <div className="col-xxs-12 col-xs-6 mt">
                                        <div className="input-field">
                                            <label>Arrival Time:</label>
                                            <input type="text" placeholder="Enter Flight Price" value={this.state.flightprice} className="form-control" onChange={(event)=>{const name="flightprice"
                                                const value=event.target.value
                                                this.setState({flightprice: event.target.value,
                                                    type:true}, () => { this.validateField(name, value)});}}/>
                                        </div>
                                    </div>


                                    <div className="col-xxs-12 col-xs-12 mt"></div>


                                    <div className="col-xs-2">
                                        <button type="button" disabled={!this.state.formValid} className="btn btn-primary btn-block" value="Submit" onClick={() => this.insertCarDetails(this.state)}>Submit</button>
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