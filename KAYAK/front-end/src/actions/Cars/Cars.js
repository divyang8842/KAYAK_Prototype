export const UPDATE_CARS='UPDATE_CARS';
export const UPDATE_CARIMAGE='UPDATE_CARIMAGE';

export function getCars(data) {
    return {
        type: 'UPDATE_CARS',
        data,
    };
}

export function getCarImage(data) {
    return {
        type: 'UPDATE_CARIMAGE',
        data,
    };
}