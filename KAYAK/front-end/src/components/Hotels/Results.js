import React, { Component } from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import HotelItem from './HotelItem';

class Results extends Component {

  render() {
    return (
        <div>
            <span>
              <HotelItem/>
              <HotelItem/>
              <HotelItem/>
              <HotelItem/>
            </span>
        </div>
    );
  }
}

export default Results;