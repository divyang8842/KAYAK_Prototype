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

class HotelItem extends Component {

  render() {
    return (
        <div>
            <div className="col-md-6 col-sm-6 fh5co-tours animate-box" data-animate-effect="fadeIn">
                <div>
                    <div>
                        <span></span>
                        <h3>Philippines</h3>
                        <span>4 nights + Flight 5*Hotel</span>
                        <span class="price">$1,000</span>
                        <a class="btn btn-primary btn-outline">Book Now <i class="icon-arrow-right22"></i></a>
                    </div>
                </div>
            </div>
        </div>
    );
  }
}

export default HotelItem;