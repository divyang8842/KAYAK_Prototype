const api = process.env.REACT_APP_CONTACTS_API_URL || 'http://localhost:3004'

const headers = {
    'Accept': 'application/json'
};

export const listusers = (payload) =>
fetch(`${api}/listusers`, {
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

export const updateuser = (payload) =>
    fetch(`${api}/updateroom`, {
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

export const deleteuser = (payload) =>
    fetch(`${api}/deleteuser`, {
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


export const newadmin = (payload) =>
      fetch(`${api}/newadmin`, {
          method: 'POST',
          headers: {
            ...headers,
            'Content-Type': 'application/json'
          },
          credentials:'include',
          body: JSON.stringify(payload)
      }).then(res => {
              return res.output;
                })
                .catch(error => {
                  console.log("This is signup error");
                  return error;
                });
