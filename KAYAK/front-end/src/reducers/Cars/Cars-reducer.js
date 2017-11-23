import {UPDATE_CARS} from '../../actions/Cars/Cars';

const cars ={
    results:[],
    Pickup:'',
    Dropoff:''
};

const getCars=(state=cars,action)=>
{
    switch (action.type) {
        case UPDATE_CARS :
            state = {
                results: action.data.results,
                Pickup:action.data.Pickup,
                Dropoff:action.data.Dropoff,
            };
            return state;


        default :
            return state;
    }

}

export default getCars;