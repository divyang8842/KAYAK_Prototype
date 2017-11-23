
export const UPDATE_FLIGHTS_BOOKING='UPDATE_FLIGHTS_BOOKING';

export function getFlightsBooking(data) {
    return {
        type: 'UPDATE_FLIGHTS_BOOKING',
        data,
    };
}