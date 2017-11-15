/*import React, {Component} from 'react';
import {withRouter} from 'react-router-dom';
import PropTypes from 'prop-types';
import Button from 'react-bootstrap/lib/Button';
import Panel from 'react-bootstrap/lib/Panel';
import * as API from '../../api/HotelAdmin-API';

import { FormControl, Checkbox } from 'react-bootstrap';

var formstyle= {marginTop: 10, marginLeft:250};
var buttonstyle={marginRight:400};


class Hotel extends  Component{

    static propTypes = {
        handleSignUp: PropTypes.func.isRequired,
    };


    state = {
        userid: localStorage.getItem("token"),
        hotelname: '',
        hoteladdress: '',
        hotelcity:'',
        hotelstate:'',
        hotelzipcode:'',
        hoteldesc:'',
        hotelameneties:''
    };


    componentWillMount(){
        this.setState({
            userid: localStorage.getItem("token"),


        });
    }

    insertHotelDetails = (userdata) => {
        alert(JSON.stringify(userdata));
        API.insertHotelData(userdata)
            .then((status) => {
                if (status.status == '201') {
                    this.setState({
                        root:status.root,
                        isLoggedIn: false,
                        message: "Inserted Hotel Data Successfully..!!",
                    });
                    this.props.history.push("/login");
                } else if (status === 401) {
                    this.setState({
                        isLoggedIn: false,
                        message: "SignUp Failed"
                    });
                }
            });
    };


    render(){


        return(
            <div className="col-md-4 col-md-offset-4">
                <div className="text-center">
                    <h1 className="login-brand-text">Admin Page for Hotel</h1>
                </div>
                <div className="row justify-content-md-center">

                </div>
                <Panel header={<h3>Insert Hotel data Here</h3>} className="login-panel">

                    <form  >
                        <fieldset>
                            <div className="form-group" controlId="formHorizontalPassword">
                                <FormControl
                                    controlId="hotelname"
                                    placeholder="Hotel Name"
                                    type="text"
                                    value={this.state.hotelname}
                                    onChange={(event)=>{
                                        const name="hotelname"
                                        const value=event.target.value
                                        this.setState({
                                            hotelname:event.target.value,
                                        });
                                    }}
                                    required
                                    autoFocus
                                />
                            </div>

                            <div className="form-group" controlId="formHorizontalPassword">
                                <FormControl
                                    type="text"
                                    placeholder="Hotel Address"
                                    value={this.state.hoteladdress}
                                    onChange={(event)=>{
                                        const name="hoteladdress"
                                        const value=event.target.value
                                        this.setState({
                                            hoteladdress:event.target.value,
                                        });
                                    }}
                                    required
                                />
                            </div>

                            <div className="form-group" controlId="formHorizontalPassword">
                                <FormControl
                                    type="text"
                                    name="hotelcity"
                                    placeholder="Hotel City"
                                    value={this.state.hotelcity}
                                    onChange={(event)=>{
                                        const name="hotelcity"
                                        const value=event.target.value
                                        this.setState({
                                            hotelcity:event.target.value,
                                        });
                                    }}
                                    required
                                />
                            </div>


                            <div className="form-group" controlId="formHorizontalPassword">
                                <FormControl
                                    controlId="hotelstate"
                                    placeholder="Hotel State"
                                    type="text"
                                    value={this.state.hotelstate}
                                    onChange={(event)=>{
                                        const name="hotelstate"
                                        const value=event.target.value
                                        this.setState({
                                            hotelstate:event.target.value,
                                        });
                                    }}
                                    required
                                    autoFocus
                                />
                            </div>
                            <div className="form-group" controlId="formHorizontalPassword">
                                <FormControl
                                    controlId="hotelzipcode"
                                    placeholder="Hotel ZipCode"
                                    type="text"
                                    value={this.state.hotelzipcode}
                                    onChange={(event)=>{
                                        const name="hotelzipcode"
                                        const value=event.target.value
                                        this.setState({
                                            hotelzipcode:event.target.value,
                                        });
                                    }}
                                    required
                                    autoFocus
                                />
                            </div>
                            <div className="form-group" controlId="formHorizontalPassword">
                                <FormControl
                                    controlId="hoteldesc"
                                    placeholder="Hotel Description"
                                    type="text"
                                    value={this.state.hoteldesc}
                                    onChange={(event)=>{
                                        const name="hoteldesc"
                                        const value=event.target.value
                                        this.setState({
                                            hoteldesc:event.target.value,
                                        });
                                    }}
                                    required
                                    autoFocus
                                />
                            </div>
                            <div className="form-group" controlId="formHorizontalPassword">
                                <FormControl
                                    controlId="hotelameneties"
                                    placeholder="Hotel Ameneties"
                                    type="text"
                                    value={this.state.hotelameneties}
                                    onChange={(event)=>{
                                        const name="hotelameneties"
                                        const value=event.target.value
                                        this.setState({
                                            hotelameneties:event.target.value,
                                        });
                                    }}
                                    required
                                    autoFocus
                                />
                            </div>
                            <Button  onClick={() => this.insertHotelDetails(this.state)} bsSize="large" bsStyle="success" block>Submit</Button>

                        </fieldset>
                    </form>

                </Panel>

            </div>


        )
    }
}

export default withRouter(Hotel);*/



import React, {Component} from 'react';
import * as API from '../../api/HotelAdmin-API';
import ReactDOM from 'react-dom';
import FormErrors from "../FormErrors";

class Hotel extends Component {

    state={
        user:'',
        hotelname: '',
        hoteladdress: '',
        hotelcity:'',
        hotelstate:'',
        hotelzipcode:'',
        hoteldesc:'',
        hotelameneties:'',
        hotelstar:'',

        formErrors: {hotelname:'',hoteladdress:'',hotelcity: '',hotelstate: '',hotelzipcode: '',hoteldesc:'',hotelameneties:'',hotelstar:''  },
        type:false,
        hotelNameValid:false,
        hotelAddressValid:false,
        hotelCityValid: false,
        hotelStateValid: false,
        hotelZipcodeValid:false,
        hotelDescValid:false,
        hotelAmenetiesValid:false,
        hotelStarValid:false,
    };

    componentWillMount(){
        this.setState({formErrors: {hotelname: '',hoteladdress: '',hotelcity: '',hotelstate:'',hotelzipcode:'',hoteldesc:'',hotelameneties:'',hotelstar:''},
            hotelNameValid: true,
            hotelAddressValid: true,
            hotelCityValid: true,
            hotelStateValid:true,
            hotelZipcodeValid:true,
            hotelDescValid:true,
            hotelAmenetiesValid:true,
            hotelStarValid:true,
            type:false});


    }


    validateField(fieldName, value) {
        let fieldValidationErrors = this.state.formErrors;
        let hotelNameValid=this.state.hotelNameValid;
        let hotelAddressValid=this.state.hotelAddressValid;
        let hotelCityValid=this.state.hotelCityValid;
        let hotelStateValid=this.state.hotelStateValid;
        let hotelZipcodeValid=this.state.hotelZipcodeValid;
        let hotelDescValid=this.state.hotelDescValid;
        let hotelAmenetiesValid=this.state.hotelAddressValid;
        let hotelStarValid=this.state.hotelStarValid;


        switch(fieldName) {
            case 'hotelname':
                hotelNameValid = value.length !== 0;
                fieldValidationErrors.hotelname = hotelNameValid ? '': ' is required';
                break;
            case 'hoteladdress':
                hotelAddressValid = value.length !== 0;
                fieldValidationErrors.hoteladdress = hotelAddressValid ? '': ' is required';
                break;
            case 'hotelcity':
                hotelCityValid = value.length !== 0 ;
                fieldValidationErrors.hotelcity = hotelCityValid ? '': ' is required';
                break;
            case 'hotelstate':
                hotelStateValid = value.length !== 0;
                fieldValidationErrors.hotelstate = hotelStateValid ? '': ' is required';
                break;
            case 'hotelzipcode':
                hotelZipcodeValid = value.length !== 0 && value.length ===5 && value.match('^[0-9]+$');
                fieldValidationErrors.hotelzipcode = hotelZipcodeValid ? '': ' is invalid';
                break;
            case 'hoteldesc':
                hotelDescValid = value.length !== 0;
                fieldValidationErrors.hoteldesc = hotelDescValid ? '': ' is required';
                break;
            case 'hotelameneties':
                hotelAmenetiesValid = value.length !== 0;
                fieldValidationErrors.hotelameneties = hotelAmenetiesValid ? '': ' is required';
                break;
            case 'hotelstar':
                hotelStarValid = value.length !== 0;
                fieldValidationErrors.hotelstar = hotelStarValid ? '': ' is required';
                break;
            default:
                break;
        }
        this.setState({formErrors: fieldValidationErrors,
            hotelNameValid: hotelNameValid,
            hotelAddressValid: hotelAddressValid,
            hotelCityValid: hotelCityValid,
            hotelStateValid: hotelStateValid,
            hotelZipcodeValid: hotelZipcodeValid,
            hotelDescValid: hotelDescValid,
            hotelAmenetiesValid:hotelAmenetiesValid,
            hotelStarValid:hotelStarValid
        }, this.validateForm);
    }

    validateForm() {
        this.setState({formValid: this.state.hotelNameValid && this.state.hotelAddressValid && this.state.hotelCityValid && this.state.hotelStateValid && this.state.hotelZipcodeValid && this.state.hotelDescValid && this.state.hotelAmenetiesValid && this.state.hotelStarValid});
    }

    errorClass(error) {
        return(error.length === 0 ? '' : 'has-error');
    }


    insertHotelDetails = (userdata) => {
        alert(JSON.stringify(userdata));
        API.insertHotelData(userdata)
            .then((status) => {
                if (status.status == '201') {
                    this.setState({
                        root:status.root,
                        isLoggedIn: false,
                        message: "Inserted Hotel Data Successfully..!!",
                    });
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
                                                <label>Hotel Name:</label>
                                                <input type="text" value={this.state.hotelname} className="form-control" onChange={(event)=>{const name="hotelname"
                                                    const value=event.target.value
                                                    this.setState({hotelname: event.target.value,
                                                        type:true}, () => { this.validateField(name, value)});}}/>
                                            </div>
                                        </div>
                                        <div className="col-xxs-12 col-xs-6 mt">
                                            <div className="input-field">
                                                <label>Hotel Address:</label>
                                                <input type="text" value={this.state.hoteladdress} className="form-control" onChange={(event)=>{const name="hoteladdress"
                                                    const value=event.target.value
                                                    this.setState({hoteladdress: event.target.value,
                                                        type:true}, () => { this.validateField(name, value)});}}/>
                                            </div>
                                        </div>
                                        <div className="col-xxs-12 col-xs-6 mt">
                                            <div className="input-field">
                                                <label>Hotel City:</label>
                                                <input type="text" value={this.state.hotelcity} className="form-control" onChange={(event)=>{const name="hotelcity"
                                                    const value=event.target.value
                                                    this.setState({hotelcity: event.target.value,
                                                        type:true}, () => { this.validateField(name, value)});}}/>
                                            </div>
                                        </div>

                                        <div className="col-xxs-12 col-xs-6 mt">
                                            <div className="input-field">
                                                <label>Hotel State:</label>
                                                <input type="text" value={this.state.hotelstate} className="form-control" onChange={(event)=>{const name="hotelstate"
                                                    const value=event.target.value
                                                    this.setState({hotelstate: event.target.value,
                                                        type:true}, () => { this.validateField(name, value)});}}/>
                                            </div>
                                        </div>

                                        <div className="col-xxs-12 col-xs-6 mt">
                                            <div className="input-field">
                                                <label>Hotel Zipcode:</label>
                                                <input type="text" maxLength="5" value={this.state.hotelzipcode} className="form-control" onChange={(event)=>{const name="hotelzipcode"
                                                    const value=event.target.value
                                                    this.setState({hotelzipcode: event.target.value,
                                                        type:true}, () => { this.validateField(name, value)});}}/>
                                            </div>
                                        </div>

                                        <div className="col-xxs-12 col-xs-6 mt">
                                            <div className="input-field">
                                                <label>Hotel Description:</label>
                                                <input type="text" value={this.state.hoteldesc} className="form-control" onChange={(event)=>{const name="hoteldesc"
                                                    const value=event.target.value
                                                    this.setState({hoteldesc: event.target.value,
                                                        type:true}, () => { this.validateField(name, value)});}}/>
                                            </div>
                                        </div>
                                        <div className="col-xxs-12 col-xs-6 mt">
                                            <div className="input-field">
                                                <label>Hotel Ameneties:</label>
                                                <input type="text" value={this.state.hotelameneties} className="form-control" onChange={(event)=>{const name="hotelameneties"
                                                    const value=event.target.value
                                                    this.setState({hotelameneties: event.target.value,
                                                        type:true}, () => { this.validateField(name, value)});}}/>
                                            </div>
                                        </div>
                                        <div className="col-xxs-12 col-xs-6 mt">
                                            <div className="input-field">
                                                <label>Hotel Stars:</label>
                                                <input type="text" value={this.state.hotelstar} className="form-control" onChange={(event)=>{const name="hotelstar"
                                                    const value=event.target.value
                                                    this.setState({hotelstar: event.target.value,
                                                        type:true}, () => { this.validateField(name, value)});}}/>
                                            </div>
                                        </div>


                                        <div className="col-xxs-12 col-xs-12 mt"></div>


                                        <div className="col-xs-2">
                                            <button type="button" disabled={!this.state.formValid} className="btn btn-primary btn-block" value="Submit" onClick={() => this.insertHotelDetails(this.state)}>Submit</button>
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

export default Hotel;