const api = process.env.REACT_APP_CONTACTS_API_URL || 'http://localhost:3004'

const headers = {
    'Accept': 'application/json'
};

export const getChartsData = (payload) =>
    fetch(`${api}/getChartsData`, {
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
            console.log("This is error");
            return error;
        });
