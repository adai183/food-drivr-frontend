import axios from 'axios';

module.exports = {
  login(email, pass) {
    // ensure callback is always last argument

    console.log(JSON.stringify({ session: { email: email, password: pass } }));
    const token = (typeof window !== "undefined") ? localStorage.getItem('token') : undefined;
    return axios({
      url: '/sessions',
      method: 'post',
      baseURL: 'https://wastenotfoodtaxi.herokuapp.com/api/v1',
      transformRequest: [function(data) {
        // Do whatever you want to transform the data
        return JSON.stringify(data);
      }],
      data: { session: { email: email, password: pass } },
      responseType: 'json',
      headers: { 'Content-Type': 'application/json' },
    });

    if (token) return this.onChange(true)

  },

  register(name, email, pass, passconf, role) {
    // ensure callback is always last argument
    // create new session, pass in email and password as object
    console.log(JSON.stringify({ user: { name: name, email: email, password: pass, password_confirmation: pass, role_id: role } }));
    return axios({
      url: '/users',
      method: 'post',
      baseURL: 'https://wastenotfoodtaxi.herokuapp.com/api/v1',
      transformRequest: [function(data) {
        // Do whatever you want to transform the data
        return JSON.stringify(data);
      }],
      data: {
        'user': {
          'name': name,
          'email': email,
          'password': pass,
          'password_confirmation': passconf,
          'role_id': role
        }
      },
      responseType: 'json',
      headers: { 'Content-Type': 'application/json' }
    });
  },

  /* Simple shortcut for getting the token, because typing localStorage takes too darn long
   * @params none
   * @return String || undefined - Token from local storage or undefined
   */
   getToken() {
     return (typeof window !== "undefined") ? localStorage.getItem('token') : undefined;
   },

   // send a DELETE request with the auth_token as a URL parameter
  logout() {
    return axios({
      url: '/sessions/' + localStorage.getItem('token'),
      method: 'delete',
      baseURL: 'https://wastenotfoodtaxi.herokuapp.com/api/v1',
      responseType: 'json',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': localStorage.getItem('token')
      }
    });
  },

  getUser() {
    return axios({
      url: '/users/' + localStorage.getItem('token'),
      method: 'get',
      baseURL: 'https://wastenotfoodtaxi.herokuapp.com/api/v1',
      responseType: 'json',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': localStorage.getItem('token')
      }
    });
  },

  loggedIn() {
    return !!((typeof window !== "undefined") ? localStorage.getItem('token') : undefined);
  },

  onChange() {}
};
