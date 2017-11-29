
export const UPDATE_FLIGHTS='UPDATE_FLIGHTS';
export const UPDATE_RETURN_FLIGHTS='UPDATE_RETURN_FLIGHTS';

export function getFlights(data) {
    return {
        type: 'UPDATE_FLIGHTS',
        data,
    };
}

export function getReturnFlights(data) {
    return {
        type: 'UPDATE_RETURN_FLIGHTS',
        data,
    };
}