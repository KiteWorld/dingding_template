import {
  HEADER,
  TOKENNAME,
  CACHE_TOKEN,
  HTTP_REQUEST_URL,
} from './../config.js';
import { authLogin } from "./authLogin"
import { toast } from './utils.js';

const request = {}
/*
  api：Stirng 接口URL
  method ：Stirng 请求方法 ：get post
  data：Object  请求数据
  noAuth: Boolean true，不需要携带 token; false,反之
  customHeader：自定义请求头（覆盖默认的）
  baseURL: 覆盖默认的 baseURL
  dataType： 数据类型
  resultFeild 传对应字段，返回请求数据对象的对应属性的值
*/
//箭牌
async function requestMain(api, method, data, {
  noAuth = false,
  customHeader = null,
  baseURL = '',
  dataType = '',
  resultFeild = 'result'
}) {
  if (!noAuth && !(await authLogin(true))) return
  let header = customHeader || HEADER;
  const { data: token } = dd.getStorageSync({ key: CACHE_TOKEN })
  if (!noAuth && token) header[TOKENNAME] = token
  return new Promise(reslove => {
    dd.httpRequest({
      url: (baseURL || HTTP_REQUEST_URL) + api,
      method: method || 'GET',
      headers: header,
      // get请求参数没有做序列化处理
      data: method === 'GET' ? data || {} : JSON.stringify(data || {}),
      dataType: dataType || 'json',
      success: (res) => {
        const { code, message } = res.data
        if (errorHandle(code, message)) reslove(null)
        //请求成功 200 ，返回 result 的值 
        reslove(res.data[resultFeild] || true)
      },
      fail: (error) => {
        const { status, message } = error.data
        errorHandle(status, message)
        reslove(null)
      }
    })
  });
}

['get', 'post'].forEach((method) => {
  request[method] = (api, data, opt) => requestMain(api, method.toUpperCase(), data, opt || {})
});

export default request

//异常处理
function errorHandle(code, message) {
  if (code === 500) {
    toast.fail(message)
    return true
  }
  if (code === 401) {
    dd.removeStorageSync({
      key: CACHE_TOKEN,
    });
    toast.fail('超出登录有效期，重新登录中...')
    authLogin(true)
    return true
  }
}
