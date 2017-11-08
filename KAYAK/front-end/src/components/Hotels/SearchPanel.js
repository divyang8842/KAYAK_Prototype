import React, { Component } from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
// import Results from './../Header';

class SearchPanel extends Component {

  render() {
    return (
        <div>
            SearchPanel
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

export default SearchPanel;