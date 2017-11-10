import {combineReducers} from 'redux';
import GetFlights from './Flights/Flights-reducers'


const allReducers = combineReducers({
    //insert reducer name here to combine

    getflights : GetFlights
});

export default allReducers;