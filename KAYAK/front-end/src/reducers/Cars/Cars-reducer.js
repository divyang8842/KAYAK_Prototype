import {UPDATE_CARS} from '../../actions/Cars/Cars';
import {UPDATE_CARIMAGE} from '../../actions/Cars/Cars';

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

        case UPDATE_CARIMAGE :
            state.results= state.results.map((carItem) => {
                if (carItem.car_id == action.data.carItem.car_id) {
                    return Object.assign({}, carItem, {
                        srcdata : action.data.output.image
                    })
                  }
                  return carItem;
            });
            state = {
                results: state.results,
                Pickup: state.Pickup,
                Dropoff: state.Dropoff
            };
            return state;

        default :
            return state;
    }

}

export default getCars;