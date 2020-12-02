import md5 from 'js-md5';
// 秘钥
const  secretKey = 'jBBLz5tZQDqMmkGZ';

export function getQueryString(name) {
  var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
  var r = window.location.search.substr(1).match(reg);
  if(r != null) {
      return  unescape(r[2]);
  } else {
      return null
  }
}

export const getLocal = (name) => {
  return localStorage.getItem(name)
}

export const setLocal = (name, value) => {
  localStorage.setItem(name, value)
}

// 图片前缀方法
export const prefix = (url) => {
  if (url && url.startsWith('http')) {
    return url
  } else {
    url = `http://47.99.134.126:28019${url}`
    return url
  }
}

//做一个安全认证   所有请求都加一个timestamp    秘钥： jBBLz5tZQDqMmkGZ    md5 一下 生成sign   sign = md5(timestamp + 秘钥)
export const sign = () => {
  let timestamp  = new Date().getTime();
  let sign = md5(timestamp + secretKey); 
  console.log('sign and timestamp:', {timestamp, sign});
  return {
    timestamp,
    sign
  }
}
