import {UPDATE_CARS} from '../../actions/Cars/Cars';

const cars ={};

const getCars=(state=cars,action)=>
{
    switch (action.type) {
        case UPDATE_CARS :
            state = action.data.results;
            return state;


        default :
            return state;
    }

}

export default getCars;