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
import * as API from '../../api/Admin/HotelAdmin-API';
import ReactDOM from 'react-dom';
import FormErrors from "../FormErrors";
import 'w3-css/w3.css';


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
        roomtype:'',
        roomsize:'',
        guestAllowed:'',
        roomprice:'',
        roomcount:'',
        hotelid:'',
        roomlist:[],
        updateID:'',
        updateType:'',
        hotelData:[],
        hname:'',
        hcity:'',

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
                        hotelid:status.hotelid
                    });
                    alert("Inserted Hotel Data Successfully..!!"+status.hotelid)
                } else if (status === 401) {
                    this.setState({
                        isLoggedIn: false,
                        message: "SignUp Failed"
                    });
                }
            });
    };
    insertRoomDetails=(userdata)=>{
        API.insertRoomData(userdata)
            .then((status) => {
                if (status.status == '201') {
                    this.setState({
                        root:status.root,
                        isLoggedIn: false,
                        message: "Inserted Room Data Successfully..!!",
                    });
                    this.getRooms();
                    alert("Inserted Room Data Successfully..!!")
                } else if (status === 401) {
                    this.setState({
                        isLoggedIn: false,
                        message: "SignUp Failed"
                    });
                }
            });

    }

    getRooms=()=>{
      var x={hid:this.state.hotelid},resAr=[];
      this.setState({roomlist:[]});
      API.listrooms(x)
      .then((data) => {
          if (data) {
            console.log("ROOM CHECK: "+data);
            for(var i=0;i<data.length;i++){
            resAr = this.state.roomlist.concat(data[i]);
            this.setState({ roomlist: resAr });
          }
          } else {
              console.log("File not listed");
          }
      });
    }

    viewHotelDetails=()=>{
        API.getHotelDetails()
            .then((data)=>{
            alert(JSON.stringify(data));
            if(data){
                this.setState({
                    hotelData:data.value
                });

            }
            else
            {

            }
            });
    }



    deleteRoom= (id) => {
      var x={roomid:id};
      console.log("ROOMID: "+x.roomid);
        API.deleteroom(x)
            .then((output) => {
                if (output === 1) {
                  this.getRooms();
                    console.log("Deleted");
                } else {
                    console.log("Star not updated");
                }
            });
    };

    showComp(id,t) {
      this.setState({updateID:id,updateType:t,visible: !this.state.visible});
    }

    hotelFilter=()=>
    {
            var input, filter, table, tr, td, i;
            input = document.getElementById("myInput");
            filter = input.value.toUpperCase();
            table = document.getElementById("myTable");
            tr = table.getElementsByTagName("tr");
            for (i = 0; i < tr.length; i++) {
                td = tr[i].getElementsByTagName("td")[0];
                if (td) {
                    if (td.innerHTML.toUpperCase().indexOf(filter) > -1) {
                        tr[i].style.display = "";
                    } else {
                        tr[i].style.display = "none";
                    }
                }
            }
    }
    render() {
        var hoteldata=this.state.hotelData;

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
                                                <input type="text" placeholder="Enter Hotel Name" value={this.state.hotelname} className="form-control" onChange={(event)=>{const name="hotelname"
                                                    const value=event.target.value
                                                    this.setState({hotelname: event.target.value,
                                                        type:true}, () => { this.validateField(name, value)});}}/>
                                            </div>
                                        </div>
                                        <div className="col-xxs-12 col-xs-6 mt">
                                            <div className="input-field">
                                                <label>Hotel Address:</label>
                                                <input type="text" placeholder="Enter Hotel Address" value={this.state.hoteladdress} className="form-control" onChange={(event)=>{const name="hoteladdress"
                                                    const value=event.target.value
                                                    this.setState({hoteladdress: event.target.value,
                                                        type:true}, () => { this.validateField(name, value)});}}/>
                                            </div>
                                        </div>
                                        <div className="col-xxs-12 col-xs-6 mt">
                                            <div className="input-field">
                                                <label>Hotel City:</label>
                                                <input type="text" placeholder="Enter Hotel City" value={this.state.hotelcity} className="form-control" onChange={(event)=>{const name="hotelcity"
                                                    const value=event.target.value
                                                    this.setState({hotelcity: event.target.value,
                                                        type:true}, () => { this.validateField(name, value)});}}/>
                                            </div>
                                        </div>

                                        <div className="col-xxs-12 col-xs-6 mt">
                                            <div className="input-field">
                                                <label>Hotel State:</label>
                                                <input type="text" placeholder="Enter Hotel State" value={this.state.hotelstate} className="form-control" onChange={(event)=>{const name="hotelstate"
                                                    const value=event.target.value
                                                    this.setState({hotelstate: event.target.value,
                                                        type:true}, () => { this.validateField(name, value)});}}/>
                                            </div>
                                        </div>

                                        <div className="col-xxs-12 col-xs-6 mt">
                                            <div className="input-field">
                                                <label>Hotel Zipcode:</label>
                                                <input type="text" placeholder="Enter Hotel ZipCode" maxLength="5" value={this.state.hotelzipcode} className="form-control" onChange={(event)=>{const name="hotelzipcode"
                                                    const value=event.target.value
                                                    this.setState({hotelzipcode: event.target.value,
                                                        type:true}, () => { this.validateField(name, value)});}}/>
                                            </div>
                                        </div>

                                        <div className="col-xxs-12 col-xs-6 mt">
                                            <div className="input-field">
                                                <label>Hotel Description:</label>
                                                <input type="text" placeholder="Enter Hotel Description" value={this.state.hoteldesc} className="form-control" onChange={(event)=>{const name="hoteldesc"
                                                    const value=event.target.value
                                                    this.setState({hoteldesc: event.target.value,
                                                        type:true}, () => { this.validateField(name, value)});}}/>
                                            </div>
                                        </div>
                                        <div className="col-xxs-12 col-xs-6 mt">
                                            <div className="input-field">
                                                <label>Hotel Ameneties:</label>
                                                <input type="text" placeholder="Enter Hotel Ameneties" value={this.state.hotelameneties} className="form-control" onChange={(event)=>{const name="hotelameneties"
                                                    const value=event.target.value
                                                    this.setState({hotelameneties: event.target.value,
                                                        type:true}, () => { this.validateField(name, value)});}}/>
                                            </div>
                                        </div>
                                        <div className="col-xxs-12 col-xs-6 mt">
                                            <div className="input-field">
                                                <label>Hotel Stars:</label>
                                                <input type="text" placeholder="Enter Hotel Stars" value={this.state.hotelstar} className="form-control" onChange={(event)=>{const name="hotelstar"
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


                                <div className="control-group span6 container row">
                                    <div className="form-group">
                                        <div className="col-xxs-12 col-xs-12 mt"></div>

                                        <h4>Rooms</h4>
                                        <div className="col-md-4">
                                            <label htmlFor="trp_code" className="control-label">Room Types: </label>
                                            <select className="form-control" name="trp_code" id="trp_code" title="Transporter" style={{width: 350}} onChange={(event)=>{const name="roomtype"
                                                const value=event.target.value
                                                this.setState({roomtype: event.target.value,
                                                    type:true})}}>
                                                <option value="" disabled selected>Select Room Type</option>
                                                <option className="form-control" value="Standard Room">Standard Room</option>
                                                <option className="form-control" value="Deluxe Room">Deluxe Room</option>
                                                <option className="form-control" value="Grand Deluxe Room">Grand Deluxe Room</option>
                                                <option className="form-control" value="Superior Suite">Superior Suite</option>
                                            </select>
                                        </div>
                                        <div className="col-md-2">
                                            <label htmlFor="lrno" className="control-label">Room Size: </label>
                                            <select className="form-control" name="trp_code" id="trp_code" title="Transporter" style={{width: 160}} onChange={(event)=>{const name="roomsize"
                                                const value=event.target.value
                                                this.setState({roomsize: event.target.value,
                                                    type:true})}}>
                                                <option value="" disabled selected>Select Room Size</option>
                                                <option className="form-control" value="325 sqft">325 sqft</option>
                                                <option className="form-control" value="460 sqft">460 sqft</option>
                                                <option className="form-control" value="550 sqft">550 sqft</option>
                                                <option className="form-control" value="700 sqft">700 sqft</option>
                                            </select>
                                            </div>
                                        <div className="col-md-2">
                                            <label htmlFor="lrdate" className="control-label">Guests Allowed: </label>
                                            <input type="text" className="form-control" name="lrdate" id="lrdate" style={{width: 100}} onChange={(event)=>{const name="guestsAllowed"
                                                const value=event.target.value
                                                this.setState({guestAllowed: event.target.value,
                                                    type:true})}} />
                                        </div>
                                        <div className="col-md-2">
                                            <label htmlFor="lrdate" className="control-label">Room Price: </label>
                                            <input type="text" className="form-control" name="lrdate" id="lrdate" style={{width: 100}} onChange={(event)=>{const name="roomprice"
                                                const value=event.target.value
                                                this.setState({roomprice: event.target.value,
                                                    type:true})}}  />
                                        </div>
                                        <div className="col-md-2">
                                            <label htmlFor="lrdate" className="control-label">Count: </label>
                                            <input type="text" className="form-control" name="lrdate" id="lrdate" style={{width: 100}} onChange={(event)=>{const name="roomcount"
                                                const value=event.target.value
                                                this.setState({roomcount: event.target.value,
                                                    type:true})}}  />
                                        </div>
                                        <div className="col-xxs-12 col-xs-12 mt"></div>

                                        <div className="col-xs-2">
                                            <button type="button"  className="btn btn-primary btn-block" value="Submit" onClick={() => this.insertRoomDetails(this.state)}>ADD</button>
                                        </div>
                                        <div className="col-xxs-12 col-xs-12 mt"></div>
                                    </div>
                                </div>
                            </div>

                            <div>
                            <ul className="w3-ul">
                            <li>
                            <div className="col-xs-2 col-xxs-2 mt">Room Type</div>
                            <div className="col-xs-2 col-xxs-2 mt">Size</div>
                            <div className="col-xs-2 col-xxs-2 mt">Guests</div>
                            <div className="col-xs-2 col-xxs-2 mt">Price</div>
                            <div className="col-xs-2 col-xxs-2 mt">Count</div>
                            <div className="col-xs-2 col-xxs-2 mt">Action</div>
                            </li></ul></div>

                            {this.state.roomlist.map(f => {
                              return (
                                <div  key={f.room_id}>
                                <ul className="w3-ul">
                                <li>
                                <div className="col-xs-2 col-xxs-2 mt">{f.room_type}</div>
                                <div className="col-xs-2 col-xxs-2 mt">{f.room_size}</div>
                                <div className="col-xs-2 col-xxs-2 mt">{f.guestAllowed}</div>
                                <div className="col-xs-2 col-xxs-2 mt">{f.room_price}</div>
                                <div className="col-xs-2 col-xxs-2 mt">{f.count}</div>
                                <div className="col-xs-2 col-xxs-2 mt">
                                <button onClick={()=> this.showComp(f.room_id,f.room_type)}>Update</button>
                                <button onClick={()=> this.deleteRoom(f.room_id)}>Remove</button></div>
                              </li></ul></div>
                              )})}
                              <div>
                                {
                                  this.state.visible
                                    ? <Updateroom id={this.state.updateID} type={this.state.updateType} display={this.getRooms}/>
                                    : null
                                }
                              </div>

                        </div>{/*container*/}
                    </div>
                <div>
                    <button onClick={() => this.viewHotelDetails()}>View Hotel Records</button>

                    <div className="filter-list">
                        <input type="text" placeholder="Search by hotelname" onChange={(event)=>{
                            this.setState({hname: event.target.value,
                                type:true})}}/>
                    </div>
                    <div className="filter-list">
                        <input type="text" placeholder="Search by hotel city" onChange={(event)=>{
                            this.setState({hcity: event.target.value,
                                type:true})}}/>
                    </div>

                    <div className="col-xs-2">
                        <button type="button"  className="btn btn-primary btn-block" value="Submit" onClick={() => this.insertHotelDetails(this.state)}>Search</button>
                    </div>


                    <table id="myTable">
                        <tbody><tr className="header">
                            <th style={{width: '10%'}}>Hotel Name</th>
                            <th style={{width: '10%'}}>Hotel Location</th>
                            <th style={{width: '10%'}}>Hotel City</th>
                            <th style={{width: '10%'}}>Hotel State</th>
                            <th style={{width: '10%'}}>Hotel ZipCode</th>
                            <th style={{width: '10%'}}>Hotel Description</th>
                            <th style={{width: '10%'}}>Hotel Star</th>
                        </tr>
                        {hoteldata.map((logs, i)  =>  <tr  key={i}>

                            <td>{logs.hotel_name}</td>
                            <td>{logs.hotel_location}</td>
                            <td>{logs.hotel_city}</td>
                            <td>{logs.hotel_state}</td>
                            <td>{logs.hotel_zipcode}</td>
                            <td>{logs.hotel_description}</td>
                            <td>{logs.hotel_star}</td>
                            </tr>
                        )};
                        </tbody></table>


                </div>
            </div>
        );
    }
}



class Updateroom extends Component {

state={roomsize:'',
guestAllowed:'',
roomprice:'',
roomcount:'',
roomid:this.props.id
};

updateRoom= (newdata) => {
  console.log("ROOMID: "+newdata);
    API.updateroom(newdata)
        .then((output) => {
            if (output === 1) {
                console.log("Room updated");
                this.props.display();
            } else {
                console.log("Room not updated");
            }
        });
};


  render() {
console.log("ID: "+this.props.id+" "+this.props.type);
      return (
        <div>
        <div className="control-group span6 container row">
            <div className="form-group">

                <h4>Update for {this.props.type}</h4>
                <div className="col-md-2">
                    <label htmlFor="lrno" className="control-label">Room Size: </label>
                    <select className="form-control" name="trp_code" id="trp_code" title="Transporter" style={{width: 160}} onChange={(event)=>{const name="roomsize"
                        const value=event.target.value
                        this.setState({roomsize: event.target.value,
                            type:true})}}>
                        <option value="" disabled selected>Select Room Size</option>
                        <option className="form-control" value="325 sqft">325 sqft</option>
                        <option className="form-control" value="460 sqft">460 sqft</option>
                        <option className="form-control" value="550 sqft">550 sqft</option>
                        <option className="form-control" value="700 sqft">700 sqft</option>
                    </select>
                    </div>
                <div className="col-md-2">
                    <label htmlFor="lrdate" className="control-label">Guests Allowed: </label>
                    <input type="text" className="form-control" name="lrdate" id="lrdate" style={{width: 100}} onChange={(event)=>{const name="guestsAllowed"
                        const value=event.target.value
                        this.setState({guestAllowed: event.target.value,
                            type:true})}} />
                </div>
                <div className="col-md-2">
                    <label htmlFor="lrdate" className="control-label">Room Price: </label>
                    <input type="text" className="form-control" name="lrdate" id="lrdate" style={{width: 100}} onChange={(event)=>{const name="roomprice"
                        const value=event.target.value
                        this.setState({roomprice: event.target.value,
                            type:true})}}  />
                </div>
                <div className="col-md-2">
                    <label htmlFor="lrdate" className="control-label">Count: </label>
                    <input type="text" className="form-control" name="lrdate" id="lrdate" style={{width: 100}} onChange={(event)=>{const name="roomcount"
                        const value=event.target.value
                        this.setState({roomcount: event.target.value,
                            type:true})}}  />
                </div>
                <div className="col-xxs-12 col-xs-12 mt"></div>

                <div className="col-xs-2">
                    <button type="button"  className="btn btn-primary btn-block" value="Submit" onClick={() => this.updateRoom(this.state)}>UPDATE</button>
                </div>
        </div>
    </div>
</div>
);}}




export default Hotel;
