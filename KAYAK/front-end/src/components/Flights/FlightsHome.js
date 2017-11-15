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
                     <FLightResults/>

                </div>
            </div>
        );
    }
}

export default FlightsHome;
