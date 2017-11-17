import React, {Component} from 'react';
import * as API from '../../api/Admin/CarAdmin-API';
import ReactDOM from 'react-dom';
import FormErrors from "../FormErrors";

class Car extends Component {

    state={
        user:'',
        cartype: '',
        carcolor: '',
        carmodel:'',
        caryear:'',
        carrent:'',

        formErrors: {cartype:'',carcolor:'',carmodel: '',caryear: '',carrent: '' },
        type:false,
        carTypeValid:false,
        carColorValid:false,
        carModelValid: false,
        carYearValid: false,
        carRentValid:false,

    };

    componentWillMount(){
        this.setState({formErrors: {cartype: '',carcolor: '',carmodel: '',caryear:'',carrent:''},
            carTypeValid: true,
            carColorValid: true,
            carModelValid: true,
            carYearValid:true,
            carRentValid:true,
 });


    }


    validateField(fieldName, value) {
        let fieldValidationErrors = this.state.formErrors;
        let carTypeValid=this.state.carTypeValid;
        let carColorValid=this.state.carColorValid;
        let carModelValid=this.state.carModelValid;
        let carYearValid=this.state.carYearValid;
        let carRentValid=this.state.carRentValid;

        switch(fieldName) {
            case 'cartype':
                carTypeValid = value.length !== 0;
                fieldValidationErrors.hotelname = carTypeValid ? '': ' is required';
                break;
            case 'carcolor':
                carColorValid = value.length !== 0;
                fieldValidationErrors.hoteladdress = carColorValid ? '': ' is required';
                break;
            case 'carmodel':
                carModelValid = value.length !== 0 ;
                fieldValidationErrors.hotelcity = carModelValid ? '': ' is required';
                break;
            case 'caryear':
                carYearValid = value.length !== 0;
                fieldValidationErrors.hotelstate = carYearValid ? '': ' is required';
                break;

            case 'carrent':
                carRentValid = value.length !== 0;
                fieldValidationErrors.hoteldesc = carRentValid ? '': ' is required';
                break;
            default:
                break;
        }
        this.setState({formErrors: fieldValidationErrors,
            carTypeValid: carTypeValid,
            carColorValid: carColorValid,
            carModelValid: carModelValid,
            carYearValid: carYearValid,
            carRentValid: carRentValid,

        }, this.validateForm);
    }

    validateForm() {
        this.setState({formValid: this.state.carTypeValid && this.state.carColorValid && this.state.carModelValid && this.state.carYearValid && this.state.carRentValid});
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
                                            <label>Car Type:</label>
                                            <input type="text" placeholder="Enter Car Type" value={this.state.cartype} className="form-control" onChange={(event)=>{const name="cartype"
                                                const value=event.target.value
                                                this.setState({cartype: event.target.value,
                                                    type:true}, () => { this.validateField(name, value)});}}/>
                                        </div>
                                    </div>
                                    <div className="col-xxs-12 col-xs-6 mt">
                                        <div className="input-field">
                                            <label>Car Color:</label>
                                            <input type="text" placeholder="Enter Car Color" value={this.state.carcolor} className="form-control" onChange={(event)=>{const name="carcolor"
                                                const value=event.target.value
                                                this.setState({carcolor: event.target.value,
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
                                            <label>Car Year:</label>
                                            <input type="text" placeholder="Enter Car Year" value={this.state.caryear} className="form-control" onChange={(event)=>{const name="caryear"
                                                const value=event.target.value
                                                this.setState({caryear: event.target.value,
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

export default Car;