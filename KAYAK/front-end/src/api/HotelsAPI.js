const api = process.env.REACT_APP_CONTACTS_API_URL || 'http://localhost:3004'

const headers = {
    'Accept': 'application/json'
};

//insertHotelData
export const getHotels = (payload) =>
    fetch(`${api}/getHotels`, {
        method: 'POST',
        headers: {
            ...headers,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload),
        credentials:'include'
    })
    // .then(res => {
    //     return res;
    .then(res => res.json())
    .then(res=>{
        return res;
    })
    .catch(error => {
        console.log("This is error");
        return error;
    });

//insertHotelData
export const doHotelBooking = (payload) =>
fetch(`${api}/doHotelBooking`, {
    method: 'POST',
    headers: {
        ...headers,
        'Content-Type': 'application/json'
    },
    body: JSON.stringify(payload),
    credentials:'include'
})
// .then(res => {
//     return res;
.then(res => {
    return res.status;
})
.catch(error => {
    console.log("This is error");
    return error;
});