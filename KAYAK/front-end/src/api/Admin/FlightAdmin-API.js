const api = process.env.REACT_APP_CONTACTS_API_URL || 'http://localhost:3004'

const headers = {
    'Accept': 'application/json'
};

//insertHotelData
export const insertFlightData = (payload) =>
    fetch(`${api}/setFlightData`, {
        method: 'POST',
        headers: {
            ...headers,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload),
        credentials:'include'
    }).then(res => res.json())
        .then(res=>{
            return res;
        })
        .catch(error => {
            console.log("This is error");
            return error;
        });

export const viewFlightDetails = (payload) =>
    fetch(`${api}/listFlightsData`, {
        method: 'POST',
        headers: {
            ...headers,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload),
        credentials:'include'
    }).then(res=>res.json())
        .then(res => {
            return res.output;
        })
        .catch(error => {
            console.log("This is list error");
            return error;
        });

export const deleteFlight = (payload) =>
    fetch(`${api}/deleteFlight`, {
        method: 'POST',
        headers: {
            ...headers,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload),
        credentials:'include'
    }).then(res=>res.json())
        .then(res => {
            return res.output;
        })
        .catch(error => {
            console.log("This is list error");
            return error;
        });

export const updateFlight = (payload) =>
    fetch(`${api}/updateflight`, {
        method: 'POST',
        headers: {
            ...headers,
            'Content-Type': 'application/json'
        },
        credentials:'include',
        body: JSON.stringify(payload)
    }).then(res=>res.json())
        .then(res => {
            return res.output;
        })
        .catch(error => {
            console.log("This is update error");
            return error;
        });

export const uploadFile = (payload) =>
    fetch(`${api}/uploadFile`, {
        method: 'POST',
        body: payload
    }).then(res=>res.json())
        .then(res => {
            return res;
        }).catch(error => {
        console.log("This is error");
        return error;
    });

export const getFile = (payload) =>
    fetch(`${api}/getFile`, {
        method: 'POST',
        body: payload
    }).then(res=>res.json())
        .then(res => {
            return res;
        }).catch(error => {
        console.log("This is error");
        return error;
    });
