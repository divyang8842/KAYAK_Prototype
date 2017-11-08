import React, {Component} from 'react';
//import * as API from '../api/api';
import FLightLeftPanel from './LeftPanel'
import FLightSerachPanel from './SearchPanel'
import FLightResults from './Results'

class FlightsHome extends Component {

    render()
    {
        return(
            <div className="container-fluid">
                <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/latest/css/bootstrap.min.css"/>
                <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/latest/css/bootstrap-theme.min.css"/>
                <div className="row">
                    <h1>
                       <FLightSerachPanel/>
                    </h1>
                </div>
                <div className="row">
                    <div className="col-sm-2 col-lg-2 col-md-2 col-xs-2" >
                        <FLightLeftPanel/>
                    </div>
                    <div className="col-sm-10 col-lg-10 col-md-10 col-xs-10" >
                        <FLightResults/>
                    </div>

                </div>
            </div>
        );
    }
}

export default FlightsHome;
