
import axios from '../utils/axios'

// export function getUserInfo() {
//   return axios.get('/user/info');
// }

// export function EditUserInfo(params) {
//   return axios.put('/user/info', params);
// }

// export function login(params) {
//   return axios.post('/user/login', params);
// }

// export function logout() {
//   return axios.post('/user/logout')
// }

// export function register(params) {
//   return axios.post('/user/register', params);
// }

let bindUrl= '/gzh';

if(process.env.test_node_dev) {
  bindUrl= '/gzh_test';
}


//http://ls.im30.net/gzh_test/bd/bind.php
export const bind = (params) => {
  return axios.get(bindUrl +'/bd/bind.php', {
    params
  });
}

export const sign = (params) => {
  return axios.get(bindUrl +'/signin/signin.php', {
    params
  })
}

