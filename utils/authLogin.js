import {
  CACHE_USERINFO,
  CACHE_TOKEN,
  CACHE_CODE,
  CACHE_CODE_TIME,
  CODE_EFFECTIVE_TIME,
  TOKEN_EFFECTIVE_TIME,
  CACHE_TOKEN_TIME
} from "../config"

import {
  login
} from "../api/user"


/* 
  authLogin，用于校验 token 是否过期以及重新登陆，检验通过返回 true，反之 false
  loginReconnectionCount 记录重新连接次数
  init 为true是，初始化 loginReconnectionCount
*/
let loginReconnectionCount = 0
let timer = null
export async function authLogin(init, instance) {
  if (init) loginReconnectionCount = 0

  //有token时，不需要重新登录 
  const { data: token } = dd.getStorageSync({ key: CACHE_TOKEN })
  const { data: tokenTime } = dd.getStorageSync({ key: CACHE_TOKEN_TIME })
  if (token && (tokenTime + TOKEN_EFFECTIVE_TIME > (new Date()).getTime())) return true

  //判断 authCode是否过期， 防止反复调用 dd.getAuthCode，超出频率规范
  const { data: code } = dd.getStorageSync({ key: CACHE_CODE })
  const { data: codeTime } = dd.getStorageSync({ key: CACHE_CODE_TIME })
  if (code && (codeTime + CODE_EFFECTIVE_TIME > (new Date()).getTime())) {
    return await loginMain(code, instance)
  }

  return new Promise(async (resolve, reject) => {
    dd.getAuthCode({
      success: async ({ authCode }) => {
        if (authCode) resolve(await loginMain(authCode, instance))
      },
      fail: async () => {
        await reconnection()
        resolve(false)
      }
    })
  })

}

// 登陆失败后，尝试重新登陆三次。
async function reconnection() {
  clearTimeout(timer)
  if (loginReconnectionCount < 3) timer = setTimeout(async () => {
    let isLogin = await authLogin()
    //登录成功，清掉定时器。
    if (isLogin) clearTimeout(timer)
  }, 5000)
  loginReconnectionCount++
}


//调用登录接口，设置 storage、全局变量  globalData.userInfo
async function loginMain(authCode, instance) {
  const loginRes = await login({ authCode: authCode })
  if (!loginRes) {
    await reconnection()
    return false
  }
  dd.setStorageSync({ key: CACHE_TOKEN, data: loginRes.token })
  dd.setStorageSync({ key: CACHE_TOKEN_TIME, data: (new Date()).getTime() })
  dd.setStorageSync({ key: CACHE_CODE, data: authCode })
  dd.setStorageSync({ key: CACHE_CODE_TIME, data: (new Date()).getTime() })
  dd.setStorageSync({ key: CACHE_USERINFO, data: JSON.stringify(loginRes.userInfo) })
  getApp().globalData.userInfo = loginRes.userInfo
  const globalData = getApp().globalData
  globalData.userInfo = loginRes.userInfo || {}
  loginReconnectionCount = 0
  return true
}
