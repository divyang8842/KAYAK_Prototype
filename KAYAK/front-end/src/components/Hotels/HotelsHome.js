import React, { Component } from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import LeftPanel from './LeftPanel';
import SearchPanel from './SearchPanel';
import Results from './Results';
// import Results from './../Header';

class HotelsHome extends Component {

  render() {
    return (
        <div>
            {/* <div className = "row">
                    <Header/>
            </div> */}
            <div>
                    <SearchPanel/>
            </div>
            <div className = "row">
                <div className="col-lg-2">
                    <LeftPanel/>
                </div>
                <div className="col-lg-10">
                    <Results/>
                </div>
            </div>
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

export default HotelsHome;