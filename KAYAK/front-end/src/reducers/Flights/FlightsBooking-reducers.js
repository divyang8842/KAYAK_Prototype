import {UPDATE_FLIGHTS_BOOKING} from '../../actions/Flights/FlightBooking';

const flights_booking ={};

const getFlightsBooking=(state=flights_booking,action)=>
{
    switch (action.type) {
        case UPDATE_FLIGHTS_BOOKING :
            state = action.data.flights;
            return state;


        default :
            return state;
    }

}

export default getFlightsBooking;