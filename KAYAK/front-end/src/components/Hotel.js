import React, {Component} from 'react';
import {withRouter} from 'react-router-dom';
import PropTypes from 'prop-types';
import Button from 'react-bootstrap/lib/Button';
import Panel from 'react-bootstrap/lib/Panel';
import * as API from '../api/HotelAdmin-API';

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

export default withRouter(Hotel);
