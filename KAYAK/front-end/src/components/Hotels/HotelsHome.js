import React, {Component} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import LeftPanel from './LeftPanel';
import SearchPanel from './SearchPanel';
import Results from './Results';
import '../../public/css/filter.css';

class HotelsHome extends Component {
    render() {
        return (
            <div id="divresult">
                {/* <div>
                    <SearchPanel handler = {this.handler}/>
                </div> */}
                <div className="row">
                    {/* <div className="col-lg-2">
                    <LeftPanel/>
                </div> */}
                    <div className="col-lg-12">
                        <Results isLogged={this.props.isLogged}/>
                    </div>
                </div>
            </div>
        );
    }
}

export default HotelsHome;