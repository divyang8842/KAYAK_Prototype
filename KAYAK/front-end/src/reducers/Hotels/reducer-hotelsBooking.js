import {UPDATE_HOTELS_BOOKING} from '../../actions/Hotels/Hotels';

const hotels_booking ={};

const hotelsBooking=(state=hotels_booking,action)=>
{
    switch (action.type) {
        case UPDATE_HOTELS_BOOKING :
            state = action.data;
            return state;


        default :
            return state;
    }

}

export default hotelsBooking;