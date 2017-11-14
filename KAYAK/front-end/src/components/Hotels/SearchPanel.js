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

class SearchPanel extends Component {

  render() {
    return (
        <div>
            <div role="tabpanel" className="tab-pane" id="hotelsearch">
            <div className="row">
              <span>
              <div className="col-xxs-3 col-xs-3 mt">
                <div className="input-field">
                  <input type="text" className="form-control" id="from-place" placeholder="City"/>
                </div>
              </div>
              <div className="col-xxs-2 col-xs-2 mt">
                <div className="input-field">
                  <input type="text" className="form-control" id="date-start" placeholder="Check In (mm/dd/yyyy)"/>
                </div>
              </div>
              <div className="col-xxs-2 col-xs-2 mt">
                <div className="input-field">
                  <input type="text" className="form-control" id="date-end" placeholder="Check Out (mm/dd/yyyy)"/>
                </div>
              </div>
              <div className="col-sm-1 mt">
                <div className="input-field">
                  <input type="number" className="form-control" id="date-end" placeholder="Rooms"/>
                </div>
              </div>
              <div className="col-xxs-1 col-xs-1 mt">
                <div className="input-field">
                  <input type="number" className="form-control" id="date-end" placeholder="Guests"/>
                </div>
              </div>
              <div className="col-xs-2">
                <button className="btn btn-primary btn-block"
                  onClick={() => this.handleHotelSearch()}>Search</button>
              </div>
              </span>
            </div>
          </div>
        </div>
    );
  }
}

export default SearchPanel;