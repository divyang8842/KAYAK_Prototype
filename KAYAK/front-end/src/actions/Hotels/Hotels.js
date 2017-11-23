
export const LOAD_HOTELS='LOAD_HOTELS';
// export const LOAD_FILTERED_HOTELS='LOAD_FILTERED_HOTELS';

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