
export const UPDATE_CARS_BOOKING='UPDATE_CARS_BOOKING';

export function getCarsBooking(data) {
    return {
        type: 'UPDATE_CARS_BOOKING',
        data,
    };
}