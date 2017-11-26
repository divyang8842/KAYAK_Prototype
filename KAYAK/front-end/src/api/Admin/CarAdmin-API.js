const api = process.env.REACT_APP_CONTACTS_API_URL || 'http://localhost:3004'

const headers = {
    'Accept': 'application/json'
};

//insertHotelData
export const insertCarData = (payload) =>
    fetch(`${api}/setCarData`, {
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


export const viewCarDetails = (payload) =>
    fetch(`${api}/listCarsData`, {
        method: 'GET',
        headers: {
            ...headers,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
    }).then(res=>res.json())
        .then(res => {
            return res.output;
        })
        .catch(error => {
            console.log("This is list error");
            return error;
        });

export const deleteCar = (payload) =>
    fetch(`${api}/deleteCar`, {
        method: 'POST',
        headers: {
            ...headers,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
    }).then(res=>res.json())
        .then(res => {
            return res.output;
        })
        .catch(error => {
            console.log("This is list error");
            return error;
        });

export const updatecar = (payload) =>
    fetch(`${api}/updatecar`, {
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