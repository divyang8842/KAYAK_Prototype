
export const UPDATE_FLIGHTS='UPDATE_FLIGHTS';

export function getFlights(data) {
    return {
        type: 'UPDATE_FLIGHTS',
        data,
    };
}