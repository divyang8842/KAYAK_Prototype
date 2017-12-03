const api = process.env.REACT_APP_CONTACTS_API_URL || 'http://localhost:3004'

const headers = {
    'Accept': 'application/json'
};

export const deleteaccount = (payload) =>
    fetch(`${api}/deleteaccount`, {
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


//signup
export const signup = (payload) =>
fetch(`${api}/signup/signup`, {
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
  console.log("This is signup error");
  return error;
});


//login
export const login = (payload) =>
fetch(`${api}/login`, {
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
  console.log("This is login error");
  return error;
});


//check username
export const checkuser = (payload) =>
fetch(`${api}/checkuser/checkuser`, {
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
  console.log("This is login error");
  return error;
});


//logout
export const logout = (payload) =>
    fetch(`${api}/logout`, {
      method: 'POST',
      headers: {
          ...headers,
          'Content-Type': 'application/json'
      },
      credentials:'include',
      body: JSON.stringify(payload)
            }).then(res => {
                return res.status;
            }).catch(error => {
                    console.log("This is error");
                    return error;
                });


// user details
export const details = (payload) =>
fetch(`${api}/account/account`, {
  method: 'POST',
  headers: {
    ...headers,
    'Content-Type': 'application/json'
  },
  credentials:'include',
  body: JSON.stringify(payload)
}).then(res=>res.json())
.then(res => {
  if(res.output)
    return res.output;
  else
    return res;
})
.catch(error => {
  console.log("This is login error");
  return error;
});


// update user details
export const update = (payload) =>
fetch(`${api}/update`, {
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

export const updatePwd = (payload) =>
    fetch(`${api}/password`, {
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

        export const updateEmail = (payload) =>
            fetch(`${api}/updateusername`, {
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

        export const checkLogged = (payload) =>
            fetch(`${api}/validateLogin`, {
                method: 'POST',
                headers: {
                    ...headers,
                    'Content-Type': 'application/json'
                },
                credentials:'include',
                body: JSON.stringify(payload)
            }).then(res=>res.json())
                .then(res => {
                    return res;
                })
                .catch(error => {
                    console.log("This is update error");
                    return error;
                });
