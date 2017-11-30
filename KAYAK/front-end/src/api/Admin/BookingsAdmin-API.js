const api = process.env.REACT_APP_CONTACTS_API_URL || 'http://localhost:3004'

const headers = {
    'Accept': 'application/json'
};

export const getHotelBookings = (payload) =>
    fetch(`${api}/getHotelBookings`, {
        method: 'POST',
        headers: {
            ...headers,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload),
        credentials:'include',

    }).then(res=>res.json())
        .then(res => {
            return res;
        })
        .catch(error => {
            console.log("This is list error");
            return error;
        });
export const getCarBookings = (payload) =>
    fetch(`${api}/getCarBookings`, {
        method: 'POST',
        headers: {
            ...headers,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload),
        credentials:'include',

    }).then(res=>res.json())
        .then(res => {
            return res;
        })
        .catch(error => {
            console.log("This is list error");
            return error;
        });
export const getFlightBookings = (payload) =>
    fetch(`${api}/getFlightBookings`, {
        method: 'POST',
        headers: {
            ...headers,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload),
        credentials:'include',

    }).then(res=>res.json())
        .then(res => {
            return res;
        })
        .catch(error => {
            console.log("This is list error");
            return error;
        });
