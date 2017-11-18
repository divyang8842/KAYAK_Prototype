import {combineReducers} from 'redux';

import GetFlights from './Flights/Flights-reducers'
import HotelsReducer from './Hotels/reducer-hotels'
import GetCars from './Cars/Cars-reducer'
import FilteredHotelsReducer from './Hotels/reducer-hotels-filtered';



const allReducers = combineReducers({
    //insert reducer name here to combine
    hotels : HotelsReducer,

    getflights : GetFlights,
    getcars:GetCars,
    filteredHotels : FilteredHotelsReducer

});

export default allReducers;