import {combineReducers} from 'redux';
import GetFlights from './Flights/Flights-reducers';
import HotelsReducer from './Hotels/reducer-hotels';
import FilteredHotelsReducer from './Hotels/reducer-hotels-filtered';


const allReducers = combineReducers({
    //insert reducer name here to combine
    hotels : HotelsReducer,
    filteredHotels : FilteredHotelsReducer,
    getflights : GetFlights
});

export default allReducers;