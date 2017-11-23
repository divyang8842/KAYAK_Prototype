const api = process.env.REACT_APP_CONTACTS_API_URL || 'http://localhost:3004'

const headers = {
    'Accept': 'application/json'
};

//insertHotelData
export const getCars = (payload) =>
    fetch(`${api}/getcars`, {
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


// Cars Booking API Call

export const carsbooking = (payload) =>
    fetch(`${api}/carsbooking`, {
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