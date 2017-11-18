import React, {Component} from 'react';
//import * as API from '../api/api';
//import FLightLeftPanel from './LeftPanel'
import CarSerachPanel from './SearchPanel'
import CarsResults from './Results'

class CarsHome extends Component {

    render()
    {
        return(
            <div className="container-fluid">
                <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/latest/css/bootstrap.min.css"/>
                <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/latest/css/bootstrap-theme.min.css"/>
                <div className="row">
                    <h1>
                        Search
                    </h1>
                </div>
                <div className="row">
                    <CarsResults/>

                </div>

            </div>
        );
    }
}

export default CarsHome;
