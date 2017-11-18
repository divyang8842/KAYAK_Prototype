import {combineReducers} from 'redux';
import GetFlights from './Flights/Flights-reducers'
import HotelsReducer from './Hotels/reducer-hotels'
import GetCars from './Cars/Cars-reducer'


const allReducers = combineReducers({
    //insert reducer name here to combine
    hotels : HotelsReducer,
    getflights : GetFlights,
    getcars:GetCars
});

export default allReducers;