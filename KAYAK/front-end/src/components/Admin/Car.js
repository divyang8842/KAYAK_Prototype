import React, {Component} from 'react';
import * as API from '../../api/Admin/CarAdmin-API';
import ReactDOM from 'react-dom';
import FormErrors from "../FormErrors";
import '../../../node_modules/react-bootstrap-table/dist/react-bootstrap-table-all.min.css';
var ReactBsTable  = require('react-bootstrap-table');
var BootstrapTable = ReactBsTable.BootstrapTable;
var TableHeaderColumn = ReactBsTable.TableHeaderColumn;


class Car extends Component {

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
        carData:[],
        visible:false,

        formErrors: {cartype:'',carclass:'',carmodel: '',carcity: '',car_dropoffcity: '',passengers:'',doors:'',bags:'',availableplace:'',carrent:'',cardistance:''},
        type:false,
        carTypeValid:false,
        carClassValid:false,
        carModelValid: false,
        carCityValid: false,
        carDropOffCityValid:false,
        carPassengersValid:false,
        carDoorsValid:false,
        carBagsValid:false,
        carAvailablePlaceValid:false,
        carRentValid:false,
        carDistanceValid:false

    };

    componentWillMount(){
        this.setState({formErrors: {cartype:'',carclass:'',carmodel: '',carcity: '',car_dropoffcity: '',passengers:'',doors:'',bags:'',availableplace:'',carrent:'',cardistance:''},
            carTypeValid:true,
            carClassValid:true,
            carModelValid: true,
            carCityValid: true,
            carDropOffCityValid:true,
            carPassengersValid:true,
            carDoorsValid:true,
            carBagsValid:true,
            carAvailablePlaceValid:true,
            carRentValid:true,
            carDistanceValid:true
 });
        this.getCarDetails();

    }


    validateField(fieldName, value) {
        let fieldValidationErrors = this.state.formErrors;
        let carTypeValid=this.state.carTypeValid;
        let carClassValid=this.state.carClassValid;
        let carModelValid=this.state.carModelValid;
        let carCityValid=this.state.carCityValid;
        let carDropOffCityValid=this.state.carDropOffCityValid;
        let carPassengersValid=this.state.carPassengersValid;
        let carDoorsValid=this.state.carDoorsValid;
        let carBagsValid=this.state.carBagsValid;
        let carAvailablePlaceValid=this.state.carAvailablePlaceValid;
        let carRentValid=this.state.carRentValid;
        let carDistanceValid=this.state.carDistanceValid;




        switch(fieldName) {
            case 'cartype':
                carTypeValid = value.length !== 0;
                fieldValidationErrors.hotelname = carTypeValid ? '': ' is required';
                break;
            case 'carclass':
                carClassValid = value.length !== 0;
                fieldValidationErrors.hoteladdress = carClassValid ? '': ' is required';
                break;
            case 'carmodel':
                carModelValid = value.length !== 0 ;
                fieldValidationErrors.hotelcity = carModelValid ? '': ' is required';
                break;
            case 'carcity':
                carCityValid = value.length !== 0;
                fieldValidationErrors.hotelstate = carCityValid ? '': ' is required';
                break;
            case 'car_dropoffcity':
                carDropOffCityValid = value.length !== 0;
                fieldValidationErrors.hotelstate = carDropOffCityValid ? '': ' is required';
                break;
            case 'passengers':
                carPassengersValid = value.length !== 0;
                fieldValidationErrors.hotelstate = carPassengersValid ? '': ' is required';
                break;
            case 'doors':
                carDoorsValid = value.length !== 0;
                fieldValidationErrors.hotelstate = carDoorsValid ? '': ' is required';
                break;
            case 'bags':
                carBagsValid = value.length !== 0;
                fieldValidationErrors.hotelstate = carBagsValid ? '': ' is required';
                break;
            case 'availableplace':
                carAvailablePlaceValid = value.length !== 0;
                fieldValidationErrors.hotelstate = carAvailablePlaceValid ? '': ' is required';
                break;

            case 'carrent':
                carRentValid = value.length !== 0;
                fieldValidationErrors.hoteldesc = carRentValid ? '': ' is required';
                break;

            case 'cardistance':
                carDistanceValid = value.length !== 0;
                fieldValidationErrors.hoteldesc = carDistanceValid ? '': ' is required';
                break;
            default:
                break;
        }
        this.setState({formErrors: fieldValidationErrors,
            carTypeValid: carTypeValid,
            carClassValid: carClassValid,
            carModelValid: carModelValid,
            carCityValid: carCityValid,
            carDropOffCityValid:carDropOffCityValid,
            carPassengersValid:carPassengersValid,
            carDoorsValid:carDoorsValid,
            carBagsValid:carBagsValid,
            carAvailablePlaceValid:carAvailablePlaceValid,
            carRentValid: carRentValid,
            carDistanceValid:carDistanceValid

        }, this.validateForm);
    }

    validateForm() {
        this.setState({formValid: this.state.carTypeValid && this.state.carClassValid && this.state.carModelValid && this.state.carCityValid && this.state.carDropOffCityValid && this.state.carPassengersValid && this.state.carDoorsValid && this.state.carBagsValid && this.state.carAvailablePlaceValid  && this.state.carRentValid && this.state.carDistanceValid});
    }

    errorClass(error) {
        return(error.length === 0 ? '' : 'has-error');
    }






    getCarDetails=()=>{
            API.viewCarDetails()
                .then((data)=>{
                    //alert(JSON.stringify(data));
                    if(data){
                        this.setState({
                            carData:data.value
                        });

                    }
                    else
                    {

                    }
                });
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
                    alert("Inserted Flight Data Successfully..!!")
                } else if (status === 401) {
                    this.setState({
                        isLoggedIn: false,
                        message: "SignUp Failed"
                    });
                }
            });
    };
    updateCarData= (newdata) => {
        alert("CARID: "+JSON.stringify(newdata));
        API.updatecar(newdata)
            .then((output) => {
                if (output === 1) {
                    alert("Car updated");
                } else {
                    alert("Car not updated");
                }
            });
    };


    updateCar(data){
        this.setState({update:data,visible: !this.state.visible});

    }

    showInsert() {
        this.setState({visible: true});

        alert(this.state.visible);

    }



    render() {

        var carList=this.state.carData;

       var updateCarData= (newdata) => {
            alert("CARID: "+JSON.stringify(newdata));
            API.updatecar(newdata)
                .then((output) => {
                    if (output === 1) {
                        alert("Car updated");
                    } else {
                       alert("Car not updated");
                    }
                });
        };

        var insertCarDetails=(userdata) =>{
            alert(JSON.stringify(userdata));
            API.insertCarData(userdata)
                .then((status) => {
                    alert(JSON.stringify(status))
                    if (status.status == '201') {

                        alert("Inserted Car Data Successfully..!!")
                        this.componentWillMount();
                    } else if (status === 401) {
                        this.setState({
                            isLoggedIn: false,
                            message: "SignUp Failed"
                        });
                    }
                });
        };

        function deleteCar(data) {
            alert(data);
            var carid={carid:data};

            API.deleteCar(carid)
                .then((output) => {
                    if (output === 1) {
                        console.log("Deleted");
                    } else {
                        console.log("Cars not updated");
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
            insertCarDetails(obj);
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
               deleteCar(dropRowKeys);
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
           // alert(obj.car_type);
            if (window.confirm(`Are you sure you want to edit?`)) {

                this.setState({
                    carid:obj.car_id,
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
                    cardistance: obj.car_distance
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

         <BootstrapTable  data={carList} selectRow={ selectRowProp }  deleteRow={ true } cellEdit={ cellEditProp } options={ options } pagination>
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


                </BootstrapTable>

                {this.state.visible ? <div id="fh5co-page">

                    <div className="container">
                        <div className="row">

                            <form>
                                <FormErrors formErrors={this.state.formErrors} />
                                <div className="row">
                                    <div className="col-xxs-12 col-xs-6 mt">
                                        <div className="input-field">
                                            <label>Car Type:</label>
                                            <input type="text" placeholder="Enter Car Type" value={this.state.cartype} className="form-control"  onChange={(event)=>{const name="cartype"
                                                const value=event.target.value
                                                this.setState({cartype: event.target.value,
                                                    type:true}, () => { this.validateField(name, value)});}}/>
                                        </div>
                                    </div>
                                    <div className="col-xxs-12 col-xs-6 mt">
                                        <div className="input-field">
                                            <label>Car Class:</label>
                                            <input type="text" placeholder="Enter Car Class" value={this.state.carclass} className="form-control" onChange={(event)=>{const name="carclass"
                                                const value=event.target.value
                                                this.setState({carclass: event.target.value,
                                                    type:true}, () => { this.validateField(name, value)});}}/>
                                        </div>
                                    </div>
                                    <div className="col-xxs-12 col-xs-6 mt">
                                        <div className="input-field">
                                            <label>Car Model:</label>
                                            <input type="text" placeholder="Enter Car Model" value={this.state.carmodel} className="form-control" onChange={(event)=>{const name="carmodel"
                                                const value=event.target.value
                                                this.setState({carmodel: event.target.value,
                                                    type:true}, () => { this.validateField(name, value)});}}/>
                                        </div>
                                    </div>

                                    <div className="col-xxs-12 col-xs-6 mt">
                                        <div className="input-field">
                                            <label>Car City:</label>
                                            <input type="text" placeholder="Enter Car City" value={this.state.carcity} className="form-control" onChange={(event)=>{const name="carcity"
                                                const value=event.target.value
                                                this.setState({carcity: event.target.value,
                                                    type:true}, () => { this.validateField(name, value)});}}/>
                                        </div>
                                    </div>
                                    <div className="col-xxs-12 col-xs-6 mt">
                                        <div className="input-field">
                                            <label>Car DropOff:</label>
                                            <input type="text" placeholder="Enter Car Dropoff" value={this.state.car_dropoffcity} className="form-control" onChange={(event)=>{const name="car_dropoffcity"
                                                const value=event.target.value
                                                this.setState({car_dropoffcity: event.target.value,
                                                    type:true}, () => { this.validateField(name, value)});}}/>
                                        </div>
                                    </div>
                                    <div className="col-xxs-12 col-xs-6 mt">
                                        <div className="input-field">
                                            <label>Car Passengers:</label>
                                            <input type="text" placeholder="Enter Car Passengers" value={this.state.passengers} className="form-control" onChange={(event)=>{const name="passengers"
                                                const value=event.target.value
                                                this.setState({passengers: event.target.value,
                                                    type:true}, () => { this.validateField(name, value)});}}/>
                                        </div>
                                    </div>
                                    <div className="col-xxs-12 col-xs-6 mt">
                                        <div className="input-field">
                                            <label>Car Doors::</label>
                                            <input type="text" placeholder="Enter Car Doors:" value={this.state.doors} className="form-control" onChange={(event)=>{const name="doors"
                                                const value=event.target.value
                                                this.setState({doors: event.target.value,
                                                    type:true}, () => { this.validateField(name, value)});}}/>
                                        </div>
                                    </div>

                                    <div className="col-xxs-12 col-xs-6 mt">
                                        <div className="input-field">
                                            <label>Car Bags::</label>
                                            <input type="text" placeholder="Enter Car Bags:" value={this.state.doors} className="form-control" onChange={(event)=>{const name="doors"
                                                const value=event.target.value
                                                this.setState({doors: event.target.value,
                                                    type:true}, () => { this.validateField(name, value)});}}/>
                                        </div>
                                    </div>

                                    <div className="col-xxs-12 col-xs-6 mt">
                                        <div className="input-field">
                                            <label>Car Available Place:</label>
                                            <input type="text" placeholder="Enter Car Available Place:" value={this.state.availableplace} className="form-control" onChange={(event)=>{const name="availableplace"
                                                const value=event.target.value
                                                this.setState({availableplace: event.target.value,
                                                    type:true}, () => { this.validateField(name, value)});}}/>
                                        </div>
                                    </div>
                                    <div className="col-xxs-12 col-xs-6 mt">
                                        <div className="input-field">
                                            <label>Car Rent:</label>
                                            <input type="text" placeholder="Enter Car Rent" value={this.state.carrent} className="form-control" onChange={(event)=>{const name="carrent"
                                                const value=event.target.value
                                                this.setState({carrent: event.target.value,
                                                    type:true}, () => { this.validateField(name, value)});}}/>
                                        </div>
                                    </div>

                                    <div className="col-xxs-12 col-xs-6 mt">
                                        <div className="input-field">
                                            <label>Car Distance:</label>
                                            <input type="text" placeholder="Enter Car Distance" value={this.state.cardistance} className="form-control" onChange={(event)=>{const name="cardistance"
                                                const value=event.target.value
                                                this.setState({cardistance: event.target.value,
                                                    type:true}, () => { this.validateField(name, value)});}}/>
                                        </div>
                                    </div>


                                    <div className="col-xxs-12 col-xs-12 mt"></div>


                                    <div className="col-xs-2">{this.state.update ? <button type="button"  className="btn btn-primary btn-block" value="Submit" onClick={() => this.updateCarData(this.state)}>Update</button>
                                        :<button type="button" disabled={!this.state.formValid} className="btn btn-primary btn-block" value="Submit" onClick={() => this.insertCarDetails(this.state)}>Submit</button>
                                       }
                                        </div>
                                </div>

                            </form>




                        </div>
                    </div>
                </div> : null
                }


            </div>
        );
    }
}



export default Car;

