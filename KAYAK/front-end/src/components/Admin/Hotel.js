

import React, {Component} from 'react';
import * as API from '../../api/Admin/HotelAdmin-API';
import ReactDOM from 'react-dom';
import FormErrors from "../FormErrors";
import 'w3-css/w3.css';
import '../../../node_modules/react-bootstrap-table/dist/react-bootstrap-table-all.min.css';
var ReactBsTable  = require('react-bootstrap-table');
var BootstrapTable = ReactBsTable.BootstrapTable;
var TableHeaderColumn = ReactBsTable.TableHeaderColumn;


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
        kingrooms:'',
        queenrooms:'',
        standardrooms:'',
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

        this.viewHotelDetails();


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

    updateHotelData= (newdata) => {
        alert("HOTEL: "+JSON.stringify(newdata));
        API.updateHotel(newdata)
            .then((output) => {
                if (output === 1) {
                    alert("Hotel updated");
                } else {
                    alert("Hotel not updated");
                }
            });
    };


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


    showInsert() {
        this.setState({visible: true});


    }
    render() {
        var hoteldata=this.state.hotelData;
        var roomData=this.state.roomlist;

        function deleteHotel(data) {
            alert(data);
            var hotelid={hotelid:data};

            API.deleteHotel(hotelid)
                .then((output) => {
                    if (output === 1) {
                        console.log("Deleted");
                    } else {
                        console.log("Hotels not deleted");
                    }
                });

        };

        function onAfterInsertRow(row) {
            let newRowStr = '';
            var obj = {};
            var myJsonString = JSON.stringify(row);
            alert(myJsonString);
            for (const prop in row) {
                obj += '"'+prop +'":"'+ row[prop]+'",';
            }
            //obj+='}';
            obj = JSON.parse(myJsonString);
            alert('The new row is:' + JSON.stringify(obj));
            this.insertHotelDetails(obj);
        }

        function onAfterDeleteRow(rowKeys) {
            alert('The rowkey you drop: ' + rowKeys);
        }
        function customConfirm(next, dropRowKeys) {
            alert(dropRowKeys);
            const dropRowKeysStr = dropRowKeys.join(',');
            if (window.confirm(`Are you sure you want to delete ${dropRowKeysStr}?`)) {
                // If the confirmation is true, call the function that
                // continues the deletion of the record.
                deleteHotel(dropRowKeys);
                next();
            }
        }


        var onRowSelect =(row, isSelected, e) => {
            let rowStr = '';
            var obj = {};
            var myJsonString = JSON.stringify(row);
            // alert(myJsonString);
            for (const prop in row) {
                obj += '"'+prop +'":"'+ row[prop]+'",';
            }
            obj = JSON.parse(myJsonString);
            alert('The new row is:' + JSON.stringify(obj));
            if (window.confirm(`Are you sure you want to edit?`)) {

                this.setState({
                    hotelid:obj.hotel_id,
                    hotelname: obj.hotel_name,
                    hoteladdress: obj.hotel_location,
                    hotelcity:obj.hotel_city,
                    hotelstate:obj.hotel_state,
                    hotelzipcode:obj.hotel_zipcode,
                    hoteldesc:obj.hotel_description,
                    hotelameneties:obj.hotel_ameneties,
                    hotelstar:obj.hotel_star,
                });

                this.setState({update:true,visible: !this.state.visible});

            }

            //alert(`is selected: ${isSelected}, ${rowStr}`);
        }
        const options = {
            afterInsertRow: onAfterInsertRow,
            afterDeleteRow: onAfterDeleteRow,  // A hook for after droping rows.
            handleConfirmDeleteRow: customConfirm
        };
        const cellEditProp = {
            mode: 'click',
            blurToSave: true

        };

        const selectRowProp = {
            mode: 'checkbox',
            clickToSelect: true,
            onSelect: onRowSelect
        };

        return (
            <div>

                <div className="btn-group btn-group-sm" role="group">
                    <button type="button" className="btn btn-info react-bs-table-add-btn "  onClick={() => this.showInsert()}><i class="fa glyphicon glyphicon-plus fa-plus"></i>New</button>
                </div>

                <BootstrapTable data={hoteldata}  selectRow={ selectRowProp }  deleteRow={ true } cellEdit={ cellEditProp } options={ options } pagination>
                    <TableHeaderColumn dataField='hotel_id' isKey hidden>Hotel ID</TableHeaderColumn>
                    <TableHeaderColumn dataField='hotel_name' >Hotel Name</TableHeaderColumn>
                    <TableHeaderColumn dataField='hotel_star'  filter={ { type: 'TextFilter', delay: 1000 } }>Hotel Star</TableHeaderColumn>
                    <TableHeaderColumn dataField='hotel_location'>Hotel Location</TableHeaderColumn>
                    <TableHeaderColumn dataField='hotel_city'>Hotel City</TableHeaderColumn>
                    <TableHeaderColumn dataField='hotel_state'>Hotel State</TableHeaderColumn>

                    <TableHeaderColumn dataField='hotel_zipcode'>Hotel Zipcode</TableHeaderColumn>

                    <TableHeaderColumn dataField='hotel_description' hidden>Hotel Description</TableHeaderColumn>



                </BootstrapTable>




                {this.state.visible ? <div id="fh5co-page">
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
                                        <div className="col-xxs-12 col-xs-6 mt">
                                            <div className="input-field">
                                                <label>King Rooms:</label>
                                                <input type="text" placeholder="Enter King Rooms" value={this.state.kingrooms} className="form-control" onChange={(event)=>{const name="kingrooms"
                                                    const value=event.target.value
                                                    this.setState({kingrooms: event.target.value,
                                                        type:true}, () => { this.validateField(name, value)});}}/>
                                            </div>
                                        </div>
                                        <div className="col-xxs-12 col-xs-6 mt">
                                            <div className="input-field">
                                                <label>Queen Rooms:</label>
                                                <input type="text" placeholder="Enter Queen Rooms" value={this.state.queenrooms} className="form-control" onChange={(event)=>{const name="queenrooms"
                                                    const value=event.target.value
                                                    this.setState({queenrooms: event.target.value,
                                                        type:true}, () => { this.validateField(name, value)});}}/>
                                            </div>
                                        </div>
                                        <div className="col-xxs-12 col-xs-6 mt">
                                            <div className="input-field">
                                                <label>Standard Rooms:</label>
                                                <input type="text" placeholder="Enter Standard Rooms" value={this.state.standardrooms} className="form-control" onChange={(event)=>{const name="standardrooms"
                                                    const value=event.target.value
                                                    this.setState({standardrooms: event.target.value,
                                                        type:true}, () => { this.validateField(name, value)});}}/>
                                            </div>
                                        </div>


                                        <div className="col-xxs-12 col-xs-12 mt"></div>


                                        <div className="col-xs-2">{this.state.update ? <button type="button"  className="btn btn-primary btn-block" value="Submit" onClick={() => this.updateHotelData(this.state)}>Update</button> :
                                            <button type="button" disabled={!this.state.formValid} className="btn btn-primary btn-block" value="Submit" onClick={() => this.insertHotelDetails(this.state)}>Submit</button>}
                                        </div>


                                    </div>

                                </form>


                                {/*<div className="control-group span6 container row">
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
                                </div>*/}
                            </div>

                        </div>{/*container*/}
                    </div> : null}
                <div>

                </div>
            </div>
        );
    }
}



/*class Updateroom extends Component {

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
);}}*/




export default Hotel;
