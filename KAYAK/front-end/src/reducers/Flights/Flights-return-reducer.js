import {UPDATE_RETURN_FLIGHTS} from '../../actions/Flights/Flights';

const flights ={};

const getReturnFlights=(state=flights,action)=>
{
    switch (action.type) {
        case UPDATE_RETURN_FLIGHTS :
            state = action.data.results;
            return state;


        default :
            return state;
    }

}

export default getReturnFlights;