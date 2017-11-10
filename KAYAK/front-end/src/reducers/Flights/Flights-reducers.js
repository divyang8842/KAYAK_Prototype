import {UPDATE_FLIGHTS} from '../../actions/Flights/Flights';

const flights ={};

const getFlights=(state=flights,action)=>
{
    switch (action.type) {
        case UPDATE_FLIGHTS :
            state = action.data.results;
            return state;


        default :
            return state;
    }

}

export default getFlights;