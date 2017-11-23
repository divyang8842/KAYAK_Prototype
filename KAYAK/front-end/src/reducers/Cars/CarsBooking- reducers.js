import {UPDATE_CARS_BOOKING} from '../../actions/Cars/CarBooking';

const cars_booking ={};

const getCarsBooking=(state=cars_booking,action)=>
{
    switch (action.type) {
        case UPDATE_CARS_BOOKING :
            state = action.data.cars;
            return state;


        default :
            return state;
    }

}

export default getCarsBooking;