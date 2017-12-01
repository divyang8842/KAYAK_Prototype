import React, { Component } from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import * as CarsAPI from '../../api/CarsAPI';
import {getCars} from '../../actions/Cars/Cars';
import Results from './Results';
import '../../public/css/animate.css';
import '../../public/css/bootstrap.css';
import '../../public/css/magnific-popup.css';
import '../../public/css/superfish.css';
import '../../public/css/bootstrap-datepicker.min.css';
import '../../public/css/magnific-popup.css';
import '../../public/css/cs-select.css';
import '../../public/css/cs-skin-border.css';
import '../../public/css/style.css';

class SearchPanel extends Component {
  state={
      Cars:{
          City:'',
          destination:'',
          Pickup:'',
          Dropoff:'',
          different_drop_off:false
      }
  };


  handleCarSearch(){
    console.log(this.state.Cars);

      if (typeof(Storage) !== "undefined") {
          localStorage.car_City = this.state.Cars.City;
          localStorage.car_destination = this.state.Cars.destination;
          localStorage.car_Pickup = this.state.Cars.Pickup;
          localStorage.car_Dropoff = this.state.Cars.Dropoff;
          localStorage.car_different_drop_off = this.state.Cars.different_drop_off;
      }
    CarsAPI.getCars(this.state.Cars)
    .then((output) => {
        this.props.getCars(output);
        this.props.handler();
    });
  }

  render() {
    var styles = {
      padding:'10px'
  };
    return (
        <div>
            <div role="tabpanel" className="tab-pane" id="hotelsearch" >
            <div className="row" style={styles}>
              <span>
              <div className="col-xxs-2 col-xs-2 ">
                <div className="input-field">
                  <input type="text" className="searchcss" id="from-place" placeholder="From"
                    onChange={(event) => {
                      this.setState({
                          Cars: {
                              ...this.state.Cars,
                              City: event.target.value
                          }
                      });}
                      }/>
                </div>
              </div>
              <div className="col-xxs-2 col-xs-2 ">
                <div className="input-field">
                <input type="text" className="searchcss" id="from-place" placeholder="To"
                    onChange={(event) => {
                      this.setState({
                          Cars: {
                              ...this.state.Cars,
                              destination: event.target.value
                          }
                      });}
                      }/>
                </div>
              </div>
              <div className="col-xxs-3 col-xs-3 ">
                <div className="input-field">
                <span>
                <label>Pick-up:</label>
                  <input type="date" className="searchcss" id="date-end" placeholder="Pick-up"
                    onChange={(event) => {
                      this.setState({
                          Cars: {
                              ...this.state.Cars,
                              Pickup: event.target.value
                          }
                      });}
                      }/>
                </span>
                </div>
              </div>
              <div className="col-sm-3 ">
                <div className="input-field">
                <span>
                <label>Drop-off:</label>
                <input type="date" className="searchcss" id="date-end" placeholder="Drop-off"
                    onChange={(event) => {
                      this.setState({
                          Cars: {
                              ...this.state.Cars,
                              Dropoff: event.target.value
                          }
                      });}
                      }/>
                </span>
                </div>
              </div>
              <div className="col-xs-2">
                <button className="searchbtn"
                  onClick={() => this.handleCarSearch()}>></button>
              </div>
              </span>
            </div>
          </div>
        </div>
    );
  }
}

function mapDispatchToProps(dispatch) {
      return bindActionCreators({getCars:getCars}, dispatch);
  }
  
  //export default Search;
  
  export default connect(null, mapDispatchToProps)(SearchPanel);