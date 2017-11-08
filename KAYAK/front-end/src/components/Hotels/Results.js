import React, { Component } from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
// import Results from './../Header';

class Results extends Component {

  render() {
    return (
        <div>
            Results
        </div>
    );
  }
}

// function mapDispatchToProps(dispatch){
//   return bindActionCreators({LoadFiles : LoadFiles, LoadShared: LoadShared}, dispatch);
// }

// function mapStateToProps(state){
//   return {
//       userdetail: state.userdetail,
//       files: state.directory
//   }
// }

export default Results;