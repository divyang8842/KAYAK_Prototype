
const api = process.env.REACT_APP_CONTACTS_API_URL || 'http://localhost:3004'
const headers = {
    'Accept': 'application/json'
};

export const uploadFile = (payload) =>
    fetch(`${api}/uploadFile`, {
        method: 'POST',
        credentials:'include',
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
        credentials:'include',
        headers: {
          ...headers,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
    }).then(res=>res.json())
        .then(res => {
            return res;
        }).catch(error => {
        console.log("This is error");
        return error;
    });
