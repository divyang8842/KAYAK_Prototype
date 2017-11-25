import React, { Component } from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import * as HotelsAPI from '../../api/HotelsAPI';
import {loadHotels} from '../../actions/Hotels/Hotels';
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
    Hotels:{
      City:'',
      Checkin:'',
      Checkout:'',
      Rooms:'',
      Guests:''
    }
  }

  handleHotelSearch(){
    console.log(this.state.Hotels.City);
    HotelsAPI.getHotels(this.state.Hotels)
    .then((result) => {
        if(result.results.code == 200){
          this.props.loadHotels(result);
          this.props.handler();
          // window.location.reload();          
          // Results.forceUpdate();
          // this.props.history.push("/Hotels");
        }
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
                  <input type="text" className="searchcss" id="from-place" placeholder="City"
                    onChange={(event) => {
                      this.setState({
                          Hotels: {
                              ...this.state.Hotels,
                              City: event.target.value
                          }
                      });}
                      }/>
                </div>
              </div>
              <div className="col-xxs-2 col-xs-2 ">
                <div className="input-field">
                  <input type="date" className="searchcss" id="date-start" placeholder="Check In"
                    onChange={(event) => {
                      this.setState({
                          Hotels: {
                              ...this.state.Hotels,
                              Checkin: event.target.value
                          }
                      });}
                      }/>
                </div>
              </div>
              <div className="col-xxs-2 col-xs-2 ">
                <div className="input-field">
                  <input type="date" className="searchcss" id="date-end" placeholder="Check Out"
                    onChange={(event) => {
                      this.setState({
                          Hotels: {
                              ...this.state.Hotels,
                              Checkout: event.target.value
                          }
                      });}
                      }/>
                </div>
              </div>
              <div className="col-sm-2 ">
                <div className="input-field">
                  <input type="number" className="searchcss" id="date-end" placeholder="Rooms"
                    onChange={(event) => {
                      this.setState({
                          Hotels: {
                              ...this.state.Hotels,
                              Rooms: event.target.value
                          }
                      });}
                      }/>
                </div>
              </div>
              <div className="col-xxs-2 col-xs-2 ">
                <div className="input-field">
                  <input type="number" className="searchcss" id="date-end" placeholder="Guests"
                    onChange={(event) => {
                      this.setState({
                          Hotels: {
                              ...this.state.Hotels,
                              Guests: event.target.value
                          }
                      });}
                      }/>
                </div>
              </div>
              <div className="col-xs-2">
                <button className="searchbtn"
                  onClick={() => this.handleHotelSearch()}>></button>
              </div>
              </span>
            </div>
          </div>
        </div>
    );
  }
}

function mapDispatchToProps(dispatch) {
      return bindActionCreators({loadHotels : loadHotels}, dispatch);
  }
  
  //export default Search;
  
  export default connect(null, mapDispatchToProps)(SearchPanel);