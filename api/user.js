import request from "../utils/request"
import { BASE_URL } from "../config"
// import { HTTP_CMS_URL } from '/config'
//小程序用户登录
export function login(data) {
  return request.post(`sys/dingtalk/login`, data, {
    noAuth: true
  });
}
