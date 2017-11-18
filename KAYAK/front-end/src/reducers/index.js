import {combineReducers} from 'redux';
import GetFlights from './Flights/Flights-reducers'
import HotelsReducer from './Hotels/reducer-hotels'


const allReducers = combineReducers({
    //insert reducer name here to combine
    hotels : HotelsReducer,
    getflights : GetFlights
});

export default allReducers;