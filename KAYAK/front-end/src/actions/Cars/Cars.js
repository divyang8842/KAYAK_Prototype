export const UPDATE_CARS='UPDATE_CARS';

export function getCars(data) {
    return {
        type: 'UPDATE_CARS',
        data,
    };
}