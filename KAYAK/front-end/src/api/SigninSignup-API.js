const api = process.env.REACT_APP_CONTACTS_API_URL || 'http://localhost:3001'

const headers = {
    'Accept': 'application/json'
};

//signup
export const signup = (payload) =>
fetch(`${api}/signup/signup`, {
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
  body: JSON.stringify(payload)
}).then(res=>res.json())
.then(res => {
  return res.output;
})
.catch(error => {
  console.log("This is login error");
  return error;
});
