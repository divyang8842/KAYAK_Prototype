import {LOAD_HOTELS} from '../../actions/Hotels/Hotels';
import {LOAD_HOTELIMAGE} from '../../actions/Hotels/Hotels';

const initialState ={
    hotels:[],
    checkin:'',
    checkout:'',
    roomcount: ''
};

const Hotels = (state = initialState, action) => { 
    switch (action.type) {
        case LOAD_HOTELS :
        state = {
            hotels: action.data.results.value,
            checkin: action.data.checkin,
            checkout: action.data.checkout,
            roomcount: action.data.rooms
        };
        console.log(state);
        return state;

        case LOAD_HOTELIMAGE :
            state.hotels= state.hotels.map((hotelItem) => {
                if (hotelItem.hotel_id == action.data.hotelItem.hotel_id) {
                    return Object.assign({}, hotelItem, {
                        srcdata : action.data.output.image
                    })
                }
                return hotelItem;
            });
            state = {
                hotels: state.hotels,
                checkin: state.checkin,
                checkout: state.checkout,
                roomcount: state.roomcount
            };
            return state;

        default :
        return state;
    }
}

export default Hotels;

/*** HotelItem ***/
// deleteflag:0
// hotel_amenities:"Pool, Cafe"
// hotel_city:"Mumbai"
// hotel_description:"The taj mahal"
// hotel_id:1
// hotel_locaion:"Marine Drive"
// hotel_name:"Taj"
// hotel_star:5
// hotel_state:"CAL"
// hotel_zipcode:"95110"
// review_amenities:8.5
// review_count:9000
// review_food:9
// review_location:8.5
// review_overall:8.5
// review_room:8
// review_service:9
// review_vibe:8