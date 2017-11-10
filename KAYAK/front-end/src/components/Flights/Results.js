import React, {Component} from 'react';
//import * as API from '../api/api';
import {connect} from 'react-redux';


class Results extends Component {

    flights()
    {
        return this.props.flights.map((flights,index) =>{
            return(
                <tr>
                    <td>
                        {flights.flights.airline_name}
                    </td>
                    <td>
                        {flights.flights.origin_station}
                    </td>
                    <td>
                        {flights.flights.destination_station}
                    </td>
                    <td>
                        {flights.flights.flight_departure}
                    </td>
                    <td>
                        {flights.flights.flight_arrival}
                    </td>
                    <td>
                        {flights.flights.totalprice}
                    </td>
                </tr>
            )
        });
    }

    render()
    {
        return(
            <div className="container-fluid">
                <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/latest/css/bootstrap.min.css"/>
                <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/latest/css/bootstrap-theme.min.css"/>
                <div className="row">

                    <table >

                        <tbody>

                        {this.flights()}
                        </tbody>
                    </table>
                </div>
            </div>
        );
    }
}

function mapStateToProps(state) {
    const flights = Object.keys(state.getflights).map((items) => (
        {
            'flights' : state.getflights[items]


        }
    ));
    return {flights};
}

//export default Results;

export default connect(mapStateToProps, null)(Results);