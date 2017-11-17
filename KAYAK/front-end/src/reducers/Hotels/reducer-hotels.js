// import {UPDATE_FLIGHTS} from '../../actions/Flights/Flights';

const initialState ={
    hotels:[]
};

const Hotels = (state = initialState, action) => { 
    // switch (action.type) {
    //     case LOAD_FILES :
        state = {
            hotels: action.obj
        };
        console.log(state);
        return state;
    // }
}

export default Hotels;