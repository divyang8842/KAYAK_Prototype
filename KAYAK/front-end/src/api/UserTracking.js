const api = process.env.REACT_APP_CONTACTS_API_URL || 'http://localhost:3004'

const headers = {
    'Accept': 'application/json'
};

//API for User tracking
export const userTracking = (payload) =>
    fetch(`${api}/usertracking`, {
        method: 'POST',
        headers: {
            ...headers,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload),
        credentials:'include'
    }).then(res => res.json())
        .then(res=>{
            return res.status;
        })
        .catch(error => {
            console.log("This is error");
            return error;
        });