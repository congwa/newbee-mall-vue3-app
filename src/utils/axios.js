
import axios from 'axios'
import { Toast } from 'vant'
import store from '@/store';
import router from '@/router';

axios.defaults.baseURL = process.env.NODE_ENV == 'development' ? '/' : 'http://ls.im30.net/'
// axios.defaults.withCredentials = true // 允许携带token ,这个是解决跨域产生的相关问题
// axios.defaults.headers['X-Requested-With'] = 'XMLHttpRequest'
// axios.defaults.headers['token'] = localStorage.getItem('token') || ''
axios.defaults.headers.post['Content-Type'] = 'application/json'

axios.interceptors.request.use((config) => {
  if(config.method ==' post'){
    config.data = {
        ...config.data,
        sign: store.state.sign
        }
  }else if(config.method=='get'){
      config.params = {
          ...config.params,
          sign: store.state.sign
      }
  }
  return config;
})

axios.interceptors.response.use(res => {
  if(res.status !== 200) {
    Toast.fail('服务端异常！')
    return Promise.reject(res)
  }
  if (typeof res.data !== 'object') {
    Toast.fail('服务端异常！')
    return Promise.reject(res)
  }
  if (res.data.code != 1) {
    if (res.data.msg) Toast.fail(res.data.msg);
    router.push('./error');
    return Promise.reject(res.data);
  }
  return res.data.data;
})

export default axios
