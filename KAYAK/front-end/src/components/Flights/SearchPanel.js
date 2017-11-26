import React, { Component } from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import '../../public/css/animate.css';
import '../../public/css/bootstrap.css';
import '../../public/css/magnific-popup.css';
import '../../public/css/superfish.css';
import '../../public/css/bootstrap-datepicker.min.css';
import '../../public/css/magnific-popup.css';
import '../../public/css/cs-select.css';
import '../../public/css/cs-skin-border.css';
import '../../public/css/style.css';
import * as FlightsAPI from '../../api/FlightsAPI';
import {getFlights} from '../../actions/Flights/Flights';

class SearchPanel extends Component {

    state={
        Flights:{
            Source:'',
            Destination:'',
            Depart:'',
            Return:'',
            Class:'',
            Adult:''
        }
    };

    handleFlightSearch(){
        FlightsAPI.getFlights(this.state.Flights)
            .then((output) => {
                this.props.getFlights(output);

            });

    }

    render() {
        var styles = {
            padding:'10px'
        };
        return (
            <div>
                <div role="tabpanel" className="tab-pane" id="hotelsearch">
                    <div className="row" style={styles}>
              <span>
              <div className="col-xxs-2 col-xs-2">
                <div className="input-field">
                    <div className="input-field">
                   <input type="text"
                          className="searchcss"
                          id="from-place"
                          placeholder="Los Angeles, USA"
                          value={this.state.Flights.Source}
                          onChange={(event) => {
                              this.setState({
                                  Flights: {
                                      ...this.state.Flights,
                                      Source: event.target.value
                                  }
                              });}
                          }
                   />
                    </div>
                </div>
              </div>
              <div className="col-xxs-2 col-xs-2">
                <div className="input-field">
                   <input type="text"
                          className="searchcss"
                          id="to-place"
                          placeholder="Tokyo, Japan"
                          value={this.state.Flights.Destination}
                          onChange={(event) => {
                              this.setState({
                                  Flights: {
                                      ...this.state.Flights,
                                      Destination: event.target.value
                                  }
                              });}
                          }
                   />
                </div>
              </div>
              <div className="col-xxs-2 col-xs-2 ">
                <div className="input-field">
                   <input type="date"
                          className="searchcss"
                          id="date-start"
                          placeholder="mm/dd/yyyy"
                          value={this.state.Flights.Depart}
                          onChange={(event) => {
                              this.setState({
                                  Flights: {
                                      ...this.state.Flights,
                                      Depart: event.target.value
                                  }
                              });}
                          }
                   />
                </div>
              </div>
              <div className="col-xxs-2 col-xs-2">
                <div className="input-field">
                  <input type="date"
                         className="searchcss"
                         id="date-end"
                         placeholder="mm/dd/yyyy"
                         value={this.state.Flights.Return}
                         onChange={(event) => {
                             this.setState({
                                 Flights: {
                                     ...this.state.Flights,
                                     Return: event.target.value
                                 }
                             });}
                         }
                  />
                </div>
              </div>

              <div className="col-xs-2">
                <button className="searchbtn"
                        onClick={() => this.handleFlightSearch()}>></button>
              </div>
              </span>
                    </div>
                </div>
            </div>
        );
    }
}

function mapDispatchToProps(dispatch) {
    return {
        getFlights : (data) => dispatch(getFlights(data))
    };
}

export default connect(null, mapDispatchToProps)(SearchPanel);