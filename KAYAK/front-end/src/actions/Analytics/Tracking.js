export const UPDATE_TRACKING='UPDATE_TRACKING';

export function updateTracking(data) {
    return {
        type: 'UPDATE_TRACKING',
        data,
    };
}