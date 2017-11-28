
export const LOAD_HOTELS='LOAD_HOTELS';
// export const LOAD_FILTERED_HOTELS='LOAD_FILTERED_HOTELS';
export const UPDATE_HOTELS_BOOKING='UPDATE_HOTELS_BOOKING';

export function loadHotels(data) {
    return {
        type: 'LOAD_HOTELS',
        data,
    };
}

// export function loadFilteredHotels(data) {
//     return {
//         type: 'LOAD_FILTERED_HOTELS',
//         data,
//     };
// }

export function getHotelsBooking(data) {
    return {
        type: 'UPDATE_HOTELS_BOOKING',
        data,
    };
}