import {combineReducers} from 'redux';

import GetFlights from './Flights/Flights-reducers'
import GetReturnFlights from './Flights/Flights-return-reducer';
import HotelsReducer from './Hotels/reducer-hotels'
import GetCars from './Cars/Cars-reducer'
import FilteredHotelsReducer from './Hotels/reducer-hotels-filtered';
import FlightsBooking from './Flights/FlightsBooking-reducers';
import HotelBookingReducer from './Hotels/reducer-hotelsBooking';
import CarsBooking from './Cars/CarsBooking- reducers';



const allReducers = combineReducers({
    //insert reducer name here to combine
    hotels : HotelsReducer,
    hotelbooking: HotelBookingReducer,

    getflights : GetFlights,
    getcars:GetCars,

    // filteredHotels : FilteredHotelsReducer,
    flightbooking:FlightsBooking,
    carsbooking:CarsBooking,
    getreturnflights:GetReturnFlights
});

export default allReducers;